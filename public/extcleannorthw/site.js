/* Fills business details from site-config.js and links the calculator
   to the quote form. */
(function () {
  var C = window.SITE_CONFIG || {}, B = C.business || {};

  function get(path) {
    return path.split(".").reduce(function (o, k) { return o && o[k]; }, C);
  }

  /* Brand colour from the config, so the tool, the page and any embed all
     match without each page hard-coding it. */
  if (C.brand && C.brand.accent) {
    var root = document.documentElement.style;
    root.setProperty("--lime", C.brand.accent);
    if (C.brand.accentDark) root.setProperty("--lime-2", C.brand.accentDark);
    if (C.brand.accentRgb) root.setProperty("--lime-rgb", C.brand.accentRgb);
  }

  document.querySelectorAll("[data-cfg]").forEach(function (el) {
    var v = get(el.dataset.cfg);
    if (v == null) return;
    if (el.dataset.cfgAttr) el.setAttribute(el.dataset.cfgAttr, v);
    else el.textContent = v;
  });

  document.querySelectorAll("[data-tel]").forEach(function (a) { a.href = B.phoneHref || "#"; });
  document.querySelectorAll("[data-mailto]").forEach(function (a) { a.href = "mailto:" + (B.email || ""); });
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.href = "https://wa.me/" + (B.whatsapp || "");
  });

  var form = document.getElementById("quote-form");
  if (form && B.formEndpoint) form.action = B.formEndpoint;

  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();

  /* Push the measurement into the quote form as the visitor draws. */
  document.addEventListener("roof:updated", function (e) {
    var s = e.detail || {};
    var box = document.getElementById("quote-summary");
    var hidden = document.getElementById("measurement");
    var addr = document.getElementById("quote-address");

    if (hidden) hidden.value = s.readable || "";
    if (addr && s.address && !addr.value) addr.value = s.address;

    // Preselect the matching option in the form's service dropdown.
    var select = document.getElementById("q-service");
    if (select && s.formOption) {
      Array.prototype.forEach.call(select.options, function (o) {
        if (o.text === s.formOption) select.value = o.value || o.text;
      });
    }

    if (box) {
      if (s.totalAreaSqm) {
        box.classList.add("is-on");
        box.innerHTML = "<b>" + (s.service || "Your quote") + "</b> \u2014 " +
          Math.round(s.totalAreaSqm) + " m², approx <b>" + s.price + "</b>." +
          (s.address ? "<br>" + s.address : "");
      } else {
        box.classList.remove("is-on");
      }
    }
  });
})();
