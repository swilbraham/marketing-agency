/* =============================================================
   Satellite measuring tool — Google Maps
   Injects itself into <div id="roof-tool"></div>
   Exposes window.RoofTool.getSummary() and fires "roof:updated".
   ============================================================= */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var SQM_TO_SQFT = 10.7639104;

  /* Each service has its own rate, minimum and wording. Flat surfaces
     (driveways, patios) skip the pitch step. */
  var SERVICES = (CFG.services && CFG.services.length) ? CFG.services : [
    { id: "roof", label: "Roof cleaning", noun: "roof", perSqm: 10,
      minCharge: 250, pitch: true }
  ];

  /* Roof pitch -> multiplier applied to the flat (plan) area seen from above. */
  var PITCHES = [
    { label: "Flat / very low (0–10°)", mult: 1.02 },
    { label: "Low — 4/12 (18°)", mult: 1.054 },
    { label: "Standard — 6/12 (27°)", mult: 1.118 },
    { label: "Steep — 9/12 (37°)", mult: 1.25 },
    { label: "Very steep — 12/12 (45°)", mult: 1.414 }
  ];
  var DEFAULT_PITCH = 2;

  var state = {
    map: null,
    shapes: [],        // { polygon, listeners }
    draft: [],         // LatLng[]
    draftLine: null,
    draftDots: [],
    units: CFG.defaultUnits === "imperial" ? "imperial" : "metric",
    pitch: DEFAULT_PITCH,
    service: 0,
    address: ""
  };

  var el = {};

  /* ---------- helpers ------------------------------------- */
  function $(sel, root) { return (root || document).querySelector(sel); }

  /* Shapes are drawn in the site's accent colour, so a rebrand carries
     through to the map as well as the page. */
  function accent() {
    var v = getComputedStyle(document.documentElement)
              .getPropertyValue("--lime").trim();
    return v || "#a6e22e";
  }

  function svc() { return SERVICES[state.service] || SERVICES[0]; }
  function SURFACE_NOUN() { return svc().noun || "area"; }
  function PITCH_ON() { return svc().pitch === true; }

  function money(n) {
    return (CFG.currency || "£") + Math.round(n / 10) * 10;
  }

  function perSqm() { return svc().perSqm || 0; }
  function minCharge() { return svc().minCharge || 0; }
  function rate() { return (CFG.currency || "£") + perSqm() + " per m²"; }
  function quote() { return Math.max(surfaceArea() * perSqm(), minCharge()); }
  function isMinimum() { return surfaceArea() * perSqm() < minCharge(); }

  function fmtArea(sqm) {
    if (state.units === "imperial") {
      return Math.round(sqm * SQM_TO_SQFT).toLocaleString() + " ft²";
    }
    return (sqm < 100 ? sqm.toFixed(1) : Math.round(sqm).toLocaleString()) + " m²";
  }

  function planArea() {
    var t = 0;
    for (var i = 0; i < state.shapes.length; i++) t += state.shapes[i].area;
    return t;
  }

  function pitchMult() { return PITCH_ON() ? PITCHES[state.pitch].mult : 1; }
  function surfaceArea() { return planArea() * pitchMult(); }

  /* ---------- markup -------------------------------------- */
  function markup() {
    var pitchOptions = PITCHES.map(function (p, i) {
      return '<option value="' + i + '"' + (i === DEFAULT_PITCH ? " selected" : "") + ">" + p.label + "</option>";
    }).join("");

    var svcButtons = SERVICES.map(function (v, i) {
      return '<button type="button" data-svc="' + i + '"' +
             (i === 0 ? ' class="is-on"' : '') + '>' + v.label + '</button>';
    }).join("");

    return '' +
    '<div class="tool">' +
      (SERVICES.length > 1 ?
      '<div class="tool__services" id="rt-services" role="group" aria-label="What are we cleaning?">' +
        '<span class="tool__serviceslabel">What are we cleaning?</span>' +
        svcButtons +
      '</div>' : '') +
      '<div class="tool__mapcol">' +
        '<div class="tool__search">' +
          '<div class="tool__searchbox" id="rt-searchbox">' +
            '<input id="rt-address" type="text" inputmode="text" autocomplete="postal-code" autocapitalize="characters" autocorrect="off" spellcheck="false" enterkeyhint="search" placeholder="Enter your postcode" aria-label="Property postcode or address">' +
          '</div>' +
          '<button type="button" class="btn btn--dark" id="rt-find">Find my property</button>' +
          '<button type="button" class="btn btn--ghost btn--icon" id="rt-locate" title="Use my current location" aria-label="Use my current location">◎</button>' +
        '</div>' +
        '<div class="tool__mapwrap">' +
          '<div id="rt-map" class="tool__map" role="application" aria-label="Satellite map"></div>' +
          '<div class="tool__overlay" id="rt-overlay" hidden><div class="tool__overlaybox" id="rt-overlaymsg"></div></div>' +
          '<div class="tool__badge" id="rt-hint">1 · Search your address above</div>' +
        '</div>' +
        '<div class="tool__actions">' +
          '<button type="button" class="btn btn--ghost" id="rt-finish" disabled>Finish shape</button>' +
          '<button type="button" class="btn btn--ghost" id="rt-undo" disabled>Undo point</button>' +
          '<button type="button" class="btn btn--ghost" id="rt-clear" disabled>Start again</button>' +
          '<span class="tool__tip">Tip: double-click to close a shape. Drag the white dots to fine-tune.</span>' +
        '</div>' +
      '</div>' +

      '<aside class="tool__panel">' +
        '<div class="panel__head">' +
          '<h3>Your measurement</h3>' +
          '<div class="unitswitch" role="group" aria-label="Units">' +
            '<button type="button" data-units="metric" class="' + (state.units === "metric" ? "is-on" : "") + '">m²</button>' +
            '<button type="button" data-units="imperial" class="' + (state.units === "imperial" ? "is-on" : "") + '">ft²</button>' +
          '</div>' +
        '</div>' +

        '<ol class="steps" id="rt-steps">' +
          '<li class="is-now"><b>1</b> Find your property</li>' +
          '<li><b>2</b> <span id="rt-step2">Click each corner of the ' + SURFACE_NOUN() + '</span></li>' +
          '<li><b>3</b> Get your instant estimate</li>' +
        '</ol>' +

        '<ul class="shapes" id="rt-shapes"><li class="shapes__empty">No sections measured yet.</li></ul>' +

        '<div class="field" id="rt-pitchfield"' + (PITCH_ON() ? '' : ' hidden') + '>' +
          '<label for="rt-pitch">Roof pitch <span class="field__hint">(affects true surface area)</span></label>' +
          '<select id="rt-pitch">' + pitchOptions + '</select>' +
        '</div>' +

        '<dl class="totals">' +
          '<div><dt id="rt-planlabel">' + (PITCH_ON() ? "Footprint (from above)" : "Measured area") + '</dt><dd id="rt-plan">—</dd></div>' +
          '<div id="rt-multrow"' + (PITCH_ON() ? '' : ' hidden') + '><dt>Pitch factor</dt><dd id="rt-mult">—</dd></div>' +
          '<div class="totals__big"><dt id="rt-totallabel">Total ' + SURFACE_NOUN() + ' area</dt><dd id="rt-total">—</dd></div>' +
        '</dl>' +

        '<div class="price" id="rt-price" hidden>' +
          '<span class="price__label">Your approximate price</span>' +
          '<strong id="rt-priceval">—</strong>' +
          '<span class="price__calc" id="rt-pricecalc"></span>' +
          '<small id="rt-pricenote"></small>' +
        '</div>' +

        '<button type="button" class="btn btn--primary btn--block" id="rt-cta" disabled>Book my free survey →</button>' +
        '<p class="panel__foot">Measurements are taken from satellite imagery and are accurate to roughly ±5%.</p>' +
      '</aside>' +
    '</div>';
  }

  /* ---------- overlay / errors ---------------------------- */
  function overlay(html) {
    el.overlay.hidden = !html;
    if (html) el.overlaymsg.innerHTML = html;
  }

  function keyHelp(title, detail) {
    return '<h4>' + title + '</h4><p>' + detail + '</p>' +
      '<p class="small">Open <code>site-config.js</code> and set <code>googleMapsApiKey</code>. ' +
      'See <code>README.md</code> for the 3-minute setup.</p>';
  }

  /* ---------- map loading --------------------------------- */
  function loadMaps(key) {
    return new Promise(function (resolve, reject) {
      if (window.google && window.google.maps) return resolve();
      window.__rtReady = function () { resolve(); };
      // Only ask for the Places library when autocomplete is switched on — requesting
      // a library whose API isn't enabled fails the whole map with ApiNotActivatedMapError.
      var libs = "geometry" + ((CFG.map && CFG.map.autocomplete) ? ",places" : "");
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://maps.googleapis.com/maps/api/js?key=" + encodeURIComponent(key) +
              "&v=weekly&libraries=" + libs + "&loading=async&callback=__rtReady";
      s.onerror = function () { reject(new Error("network")); };
      document.head.appendChild(s);
    });
  }

  /* ---------- drawing ------------------------------------- */
  function hint(text, step) {
    el.hint.textContent = text;
    var items = el.steps.children;
    for (var i = 0; i < items.length; i++) {
      items[i].classList.toggle("is-now", i === step);
      items[i].classList.toggle("is-done", i < step);
    }
  }

  function dot(latLng) {
    return new google.maps.Marker({
      position: latLng,
      map: state.map,
      draggable: false,
      icon: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 6,
        fillColor: "#ffffff",
        fillOpacity: 1,
        strokeColor: accent(),
        strokeWeight: 3
      },
      zIndex: 50
    });
  }

  function redrawDraft() {
    if (!state.draftLine) {
      state.draftLine = new google.maps.Polyline({
        map: state.map,
        strokeColor: accent(),
        strokeWeight: 3,
        strokeOpacity: 0.95
      });
    }
    var path = state.draft.slice();
    if (path.length > 2) path.push(path[0]);
    state.draftLine.setPath(path);

    while (state.draftDots.length > state.draft.length) state.draftDots.pop().setMap(null);
    for (var i = 0; i < state.draft.length; i++) {
      if (state.draftDots[i]) state.draftDots[i].setPosition(state.draft[i]);
      else state.draftDots[i] = dot(state.draft[i]);
    }

    el.finish.disabled = state.draft.length < 3;
    el.undo.disabled = state.draft.length === 0;
    el.clear.disabled = state.draft.length === 0 && state.shapes.length === 0;

    if (state.draft.length && state.draft.length < 3) {
      hint("Keep clicking the corners — " + (3 - state.draft.length) + " more to go", 1);
    } else if (state.draft.length >= 3) {
      hint("Double-click, or press Finish shape, to close it", 1);
    }
  }

  function clearDraft() {
    state.draft = [];
    if (state.draftLine) { state.draftLine.setMap(null); state.draftLine = null; }
    state.draftDots.forEach(function (d) { d.setMap(null); });
    state.draftDots = [];
    el.finish.disabled = true;
    el.undo.disabled = true;
  }

  function finishShape() {
    if (state.draft.length < 3) return;

    var poly = new google.maps.Polygon({
      map: state.map,
      paths: state.draft.slice(),
      editable: true,
      strokeColor: accent(),
      strokeWeight: 3,
      fillColor: accent(),
      fillOpacity: 0.28,
      zIndex: 20
    });

    var shape = { polygon: poly, area: 0 };
    state.shapes.push(shape);

    var path = poly.getPath();
    ["set_at", "insert_at", "remove_at"].forEach(function (evt) {
      google.maps.event.addListener(path, evt, recalc);
    });
    // Right-click a vertex to remove it; right-click the shape to delete it.
    google.maps.event.addListener(poly, "rightclick", function (e) {
      if (typeof e.vertex === "number" && path.getLength() > 3) path.removeAt(e.vertex);
      else if (typeof e.vertex !== "number") removeShape(shape);
    });
    google.maps.event.addListener(poly, "mouseover", function () { poly.setOptions({ fillOpacity: 0.42 }); });
    google.maps.event.addListener(poly, "mouseout", function () { poly.setOptions({ fillOpacity: 0.28 }); });

    clearDraft();
    recalc();
    hint("Add another section, or read your estimate →", 2);
  }

  function removeShape(shape) {
    shape.polygon.setMap(null);
    state.shapes = state.shapes.filter(function (s) { return s !== shape; });
    recalc();
    if (!state.shapes.length) hint("Click each corner of the " + SURFACE_NOUN(), 1);
  }

  /* ---------- totals -------------------------------------- */
  function recalc() {
    state.shapes.forEach(function (s) {
      s.area = google.maps.geometry.spherical.computeArea(s.polygon.getPath());
    });

    /* shape list */
    if (!state.shapes.length) {
      el.shapes.innerHTML = '<li class="shapes__empty">No sections measured yet.</li>';
    } else {
      el.shapes.innerHTML = state.shapes.map(function (s, i) {
        return '<li data-i="' + i + '"><span class="shapes__name">Section ' + (i + 1) + '</span>' +
               '<span class="shapes__area">' + fmtArea(s.area) + '</span>' +
               '<button type="button" class="shapes__del" aria-label="Remove section ' + (i + 1) + '">×</button></li>';
      }).join("");
    }

    var plan = planArea();
    var total = surfaceArea();

    el.plan.textContent = plan ? fmtArea(plan) : "—";
    el.mult.textContent = plan ? "× " + pitchMult().toFixed(3) : "—";
    el.total.textContent = plan ? fmtArea(total) : "—";

    if (plan) {
      el.price.hidden = false;
      el.priceval.textContent = money(quote());
      el.pricecalc.textContent = Math.round(total).toLocaleString() + " m² × " + rate() +
        (isMinimum() ? "  ·  minimum charge applied" : "");
      el.pricenote.textContent = svc().note || "";
    } else {
      el.price.hidden = true;
    }

    el.cta.disabled = !plan;
    el.clear.disabled = !plan && !state.draft.length;

    document.dispatchEvent(new CustomEvent("roof:updated", { detail: getSummary() }));
  }

  function getSummary() {
    var plan = planArea(), total = surfaceArea();
    return {
      service: svc().label,
      serviceId: svc().id,
      formOption: svc().formOption || svc().label,
      address: state.address,
      sections: state.shapes.length,
      planAreaSqm: +plan.toFixed(2),
      pitch: PITCH_ON() ? PITCHES[state.pitch].label : null,
      pitchMultiplier: pitchMult(),
      totalAreaSqm: +total.toFixed(2),
      totalAreaSqft: +(total * SQM_TO_SQFT).toFixed(0),
      units: state.units,
      price: plan ? money(quote()) : "",
      priceNumber: plan ? Math.round(quote() / 10) * 10 : 0,
      readable: plan
        ? svc().label + ": " + fmtArea(total) + " total " + SURFACE_NOUN() +
          " area across " + state.shapes.length +
          " section(s)" + (PITCH_ON() ? ", pitch: " + PITCHES[state.pitch].label : "") +
          " — approx " + money(quote()) + " at " + rate() +
          (state.address ? " — " + state.address : "")
        : ""
    };
  }

  /* ---------- switching service --------------------------- */
  function applyService(i) {
    state.service = i;
    Array.prototype.forEach.call(el.services.children, function (b) {
      if (b.dataset.svc !== undefined) b.classList.toggle("is-on", +b.dataset.svc === i);
    });
    el.step2.textContent = "Click each corner of the " + SURFACE_NOUN();
    el.pitchfield.hidden = !PITCH_ON();
    el.multrow.hidden = !PITCH_ON();
    el.planlabel.textContent = PITCH_ON() ? "Footprint (from above)" : "Measured area";
    el.totallabel.textContent = "Total " + SURFACE_NOUN() + " area";
    recalc();
  }

  /* ---------- address search ------------------------------ */
  function goTo(latLng, label, zoom) {
    state.address = label || state.address;
    var want = zoom || (CFG.map && CFG.map.addressZoom) || 20;
    state.map.setCenter(latLng);
    state.map.setZoom(want);
    clampToImagery(latLng, want);
    hint("2 · Click each corner of the " + SURFACE_NOUN(), 1);
    document.dispatchEvent(new CustomEvent("roof:updated", { detail: getSummary() }));
  }

  // Satellite tiles render black past the deepest zoom Google has imagery for,
  // which varies by area. Pull back to the deepest level that actually exists.
  function clampToImagery(latLng, want) {
    if (!google.maps.MaxZoomService) return;
    try {
      new google.maps.MaxZoomService().getMaxZoomAtLatLng(latLng, function (res) {
        if (!res || res.status !== "OK" || typeof res.zoom !== "number") return;
        if (res.zoom < want) {
          state.map.setZoom(res.zoom);
          if (res.zoom < 18) {
            hint("Close-up imagery is limited here - zoom and drag to your " + SURFACE_NOUN(), 1);
          }
        }
      });
    } catch (e) { /* keep the requested zoom */ }
  }

  function geocodeSearch() {
    var q = el.address.value.trim();
    if (!q) return;
    el.find.disabled = true;
    el.find.textContent = "Searching...";
    var settled = false;
    var done = function () {
      if (settled) return;
      settled = true;
      el.find.disabled = false;
      el.find.textContent = "Find my property";
    };
    // Guard against the request never calling back (API not enabled, offline).
    setTimeout(function () {
      if (settled) return;
      done();
      hint("Address search didn't respond - check the Geocoding API is enabled", 0);
    }, 8000);
    new google.maps.Geocoder().geocode(
      { address: q, componentRestrictions: (CFG.map && CFG.map.country) ? { country: CFG.map.country } : undefined },
      function (results, status) {
        done();
        if (status === "OK" && results[0]) {
          var types = results[0].types || [];
          var has = function (t) { return types.indexOf(t) !== -1; };
          // A country or county match means Google didn't recognise the address.
          if (has("country") || has("administrative_area_level_1") ||
              has("administrative_area_level_2")) {
            hint("Couldn't find that address - try a full postcode", 0);
          } else if (has("locality") || has("postal_town")) {
            // Only a town matched: drop them there zoomed out to find the roof.
            goTo(results[0].geometry.location, results[0].formatted_address, 16);
            hint("Found the town - now zoom in and drag to your " + SURFACE_NOUN(), 1);
          } else {
            goTo(results[0].geometry.location, results[0].formatted_address);
          }
        } else if (status === "REQUEST_DENIED") {
          hint("Address search is off - enable the Geocoding API for this key", 0);
        } else {
          hint("Address not found — try a postcode, or drag the map yourself", 0);
        }
      }
    );
  }

  function setupAutocomplete() {
    try {
      var Auto = google.maps.places && google.maps.places.PlaceAutocompleteElement;
      if (!Auto) return;
      var opts = {};
      if (CFG.map && CFG.map.country) opts.includedRegionCodes = [CFG.map.country];
      var ac = new Auto(opts);
      ac.id = "rt-address";
      ac.setAttribute("placeholder", "Enter your postcode or full address");
      el.searchbox.innerHTML = "";
      el.searchbox.appendChild(ac);
      el.searchbox.classList.add("is-places");

      var onPick = function (ev) {
        var pred = ev.placePrediction || (ev.detail && ev.detail.placePrediction);
        if (!pred) return;
        var place = pred.toPlace();
        place.fetchFields({ fields: ["location", "formattedAddress"] }).then(function () {
          goTo(place.location, place.formattedAddress);
        });
      };
      ac.addEventListener("gmp-select", onPick);
      ac.addEventListener("gmp-placeselect", onPick);
      el.address = ac;
      el.find.hidden = true;
    } catch (e) { /* fall back to the plain input + geocoder */ }
  }

  /* ---------- boot ---------------------------------------- */
  function boot() {
    var root = document.getElementById("roof-tool");
    if (!root) return;
    root.innerHTML = markup();

    el = {
      searchbox: $("#rt-searchbox"), address: $("#rt-address"), find: $("#rt-find"),
      locate: $("#rt-locate"), overlay: $("#rt-overlay"), overlaymsg: $("#rt-overlaymsg"),
      hint: $("#rt-hint"), finish: $("#rt-finish"), undo: $("#rt-undo"), clear: $("#rt-clear"),
      steps: $("#rt-steps"), shapes: $("#rt-shapes"), pitch: $("#rt-pitch"),
      services: $("#rt-services"), step2: $("#rt-step2"),
      pitchfield: $("#rt-pitchfield"), multrow: $("#rt-multrow"),
      planlabel: $("#rt-planlabel"), totallabel: $("#rt-totallabel"),
      plan: $("#rt-plan"), mult: $("#rt-mult"), total: $("#rt-total"),
      price: $("#rt-price"), priceval: $("#rt-priceval"), pricecalc: $("#rt-pricecalc"),
      pricenote: $("#rt-pricenote"),
      cta: $("#rt-cta")
    };

    var key = CFG.googleMapsApiKey;
    if (!key || key === "YOUR_GOOGLE_MAPS_API_KEY") {
      overlay(keyHelp("Add your Google Maps API key", "The map will appear here as soon as a key is set."));
      return;
    }

    window.gm_authFailure = function () {
      overlay(keyHelp("Google rejected this API key",
        "Check the key is enabled for <b>Maps JavaScript API</b> and <b>Geocoding API</b>, " +
        "that billing is switched on, and that this domain is allowed under the key's website restrictions."));
    };

    loadMaps(key).then(startMap).catch(function () {
      overlay(keyHelp("Could not load Google Maps",
        "Check your internet connection and that the key in the config has no typos."));
    });
  }

  function startMap() {
    var m = CFG.map || {};
    state.map = new google.maps.Map(document.getElementById("rt-map"), {
      center: { lat: m.lat || 53.39, lng: m.lng || -3.02 },
      zoom: m.zoom || 12,
      mapTypeId: "hybrid",
      tilt: 0,
      rotateControl: false,
      streetViewControl: false,
      fullscreenControl: true,
      mapTypeControl: true,
      mapTypeControlOptions: { mapTypeIds: ["hybrid", "satellite", "roadmap"] },
      gestureHandling: "greedy",
      draggableCursor: "crosshair"
    });

    if (CFG.map && CFG.map.autocomplete) setupAutocomplete();
    hint("1 · Search your address above", 0);

    google.maps.event.addListener(state.map, "click", function (e) {
      state.draft.push(e.latLng);
      redrawDraft();
    });
    google.maps.event.addListener(state.map, "dblclick", function () {
      if (state.draft.length >= 3) finishShape();
    });
    state.map.setOptions({ disableDoubleClickZoom: true });

    wireControls();
  }

  function wireControls() {
    el.find.addEventListener("click", function () {
      if (el.address && el.address.value !== undefined && el.address.tagName === "INPUT") geocodeSearch();
      else if (el.address && el.address.focus) el.address.focus();
    });
    if (el.address && el.address.tagName === "INPUT") {
      el.address.addEventListener("keydown", function (e) {
        if (e.key === "Enter") { e.preventDefault(); geocodeSearch(); }
      });
    }

    el.locate.addEventListener("click", function () {
      if (!navigator.geolocation) return;
      el.locate.disabled = true;
      navigator.geolocation.getCurrentPosition(function (pos) {
        el.locate.disabled = false;
        goTo(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude), "My current location");
      }, function () {
        el.locate.disabled = false;
        hint("Location unavailable — type your postcode instead", 0);
      }, { enableHighAccuracy: true, timeout: 8000 });
    });

    el.finish.addEventListener("click", finishShape);

    el.undo.addEventListener("click", function () {
      state.draft.pop();
      redrawDraft();
      if (!state.draft.length) hint("Click each corner of the " + SURFACE_NOUN(), 1);
    });

    el.clear.addEventListener("click", function () {
      clearDraft();
      state.shapes.forEach(function (s) { s.polygon.setMap(null); });
      state.shapes = [];
      recalc();
      hint("Click each corner of the " + SURFACE_NOUN(), 1);
    });

    el.shapes.addEventListener("click", function (e) {
      var btn = e.target.closest(".shapes__del");
      if (!btn) return;
      removeShape(state.shapes[+btn.parentNode.dataset.i]);
    });
    el.shapes.addEventListener("mouseover", function (e) {
      var li = e.target.closest("li[data-i]");
      if (li && state.shapes[+li.dataset.i]) state.shapes[+li.dataset.i].polygon.setOptions({ fillOpacity: 0.5 });
    });
    el.shapes.addEventListener("mouseout", function (e) {
      var li = e.target.closest("li[data-i]");
      if (li && state.shapes[+li.dataset.i]) state.shapes[+li.dataset.i].polygon.setOptions({ fillOpacity: 0.28 });
    });

    if (el.services) el.services.addEventListener("click", function (e) {
      var b = e.target.closest("button[data-svc]");
      if (b) applyService(+b.dataset.svc);
    });

    if (el.pitch) el.pitch.addEventListener("change", function () {
      state.pitch = +el.pitch.value;
      recalc();
    });

    Array.prototype.forEach.call(document.querySelectorAll(".unitswitch button"), function (b) {
      b.addEventListener("click", function () {
        state.units = b.dataset.units;
        document.querySelectorAll(".unitswitch button").forEach(function (x) {
          x.classList.toggle("is-on", x.dataset.units === state.units);
        });
        recalc();
      });
    });

    el.cta.addEventListener("click", function () {
      var form = document.getElementById("quote");
      if (form) {
        form.scrollIntoView({ behavior: "smooth", block: "start" });
        var first = form.querySelector("input[name='name']");
        if (first) setTimeout(function () { first.focus(); }, 500);
      } else {
        window.location.href = "index.html#quote";
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { clearDraft(); redrawDraft(); }
      if (e.key === "Enter" && state.draft.length >= 3 && document.activeElement === document.body) finishShape();
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z" && state.draft.length) {
        e.preventDefault(); state.draft.pop(); redrawDraft();
      }
    });
  }


  /* ---------- embedding ----------------------------------- */
  /* When the tool is inside an iframe (a WordPress page, say) tell the
     parent how tall it needs to be, so the host can size the frame to the
     content instead of guessing. The host listens for "roof-tool:height". */
  function reportHeight() {
    if (window.parent === window) return;
    var h = Math.ceil(document.documentElement.scrollHeight);
    if (h === reportHeight.last) return;
    reportHeight.last = h;
    try {
      window.parent.postMessage({ type: "roof-tool:height", height: h }, "*");
    } catch (e) { /* cross-origin parent that refuses messages */ }
  }

  function watchHeight() {
    if (window.parent === window) return;
    reportHeight();
    if (window.ResizeObserver) {
      new ResizeObserver(reportHeight).observe(document.body);
    } else {
      setInterval(reportHeight, 500);
    }
    window.addEventListener("load", reportHeight);
    document.addEventListener("roof:updated", reportHeight);
  }

  window.RoofTool = { getSummary: getSummary, map: function () { return state.map; } };

  watchHeight();

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
