/* SkyQuote analytics — one file shared by the Next.js site and the static
   /demo pages, so consent and events behave identically everywhere.

   Fill in the IDs below to switch tracking on. While both are empty this
   script does nothing at all: no cookies, no banner, no requests — so the
   site stays clean until the ad accounts exist.

   Events fired (only after the visitor accepts the banner):
     DemoStarted    — first interaction with the quote calculator
     DemoCompleted  — a price was shown after tracing an area
     Lead           — contact form successfully submitted (Meta standard event)
*/
(function () {
  "use strict";

  var IDS = {
    ga: "",        // GA4 measurement ID, e.g. "G-XXXXXXXXXX"
    metaPixel: "", // Meta pixel ID, e.g. "1234567890"
  };

  var CONSENT_KEY = "sq-consent"; // "granted" | "denied"
  var configured = Boolean(IDS.ga || IDS.metaPixel);

  /* gtag stub + Consent Mode v2 defaults must exist before gtag.js loads. */
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = window.gtag || gtag;
  gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
  });

  function storedConsent() {
    try { return localStorage.getItem(CONSENT_KEY); } catch (e) { return null; }
  }
  function storeConsent(value) {
    try { localStorage.setItem(CONSENT_KEY, value); } catch (e) { /* private mode */ }
  }

  var vendorsLoaded = false;
  function loadVendors() {
    if (vendorsLoaded || !configured) return;
    vendorsLoaded = true;

    gtag("consent", "update", {
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
    });

    if (IDS.ga) {
      var s = document.createElement("script");
      s.async = true;
      s.src = "https://www.googletagmanager.com/gtag/js?id=" + IDS.ga;
      document.head.appendChild(s);
      gtag("js", new Date());
      gtag("config", IDS.ga);
    }

    if (IDS.metaPixel && !window.fbq) {
      /* Standard Meta pixel bootstrap. */
      var n = (window.fbq = function () {
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!window._fbq) window._fbq = n;
      n.push = n; n.loaded = true; n.version = "2.0"; n.queue = [];
      var f = document.createElement("script");
      f.async = true;
      f.src = "https://connect.facebook.net/en_US/fbevents.js";
      document.head.appendChild(f);
      window.fbq("init", IDS.metaPixel);
      window.fbq("track", "PageView");
    }
  }

  /* Meta standard events keep their names; everything else is custom. */
  var META_STANDARD = { Lead: true, Purchase: true, Contact: true };

  window.sqTrack = function (name, params) {
    if (storedConsent() !== "granted" || !configured) return;
    if (IDS.ga && window.gtag) gtag("event", name, params || {});
    if (IDS.metaPixel && window.fbq) {
      window.fbq(META_STANDARD[name] ? "track" : "trackCustom", name, params || {});
    }
  };

  /* The calculator dispatches roof:updated on every change; the detail
     carries priceNumber once an area has been traced (see measure.js). */
  var demoStarted = false, demoCompleted = false;
  document.addEventListener("roof:updated", function (e) {
    if (!demoStarted) { demoStarted = true; window.sqTrack("DemoStarted"); }
    var d = (e && e.detail) || {};
    if (!demoCompleted && d.priceNumber > 0) {
      demoCompleted = true;
      window.sqTrack("DemoCompleted", { value: d.priceNumber, currency: "GBP" });
    }
  });

  function showBanner() {
    var bar = document.createElement("div");
    bar.id = "sq-consent-banner";
    bar.style.cssText =
      "position:fixed;left:0;right:0;bottom:0;z-index:9999;background:#0f172a;" +
      "color:#fff;padding:14px 20px;font:14px/1.5 system-ui,sans-serif;" +
      "display:flex;flex-wrap:wrap;gap:12px;align-items:center;justify-content:center;";
    bar.innerHTML =
      '<span>We use cookies to see which ads bring people here. ' +
      '<a href="/privacy" style="color:#7dd3fc">Privacy policy</a></span>' +
      '<button id="sq-consent-accept" style="background:#2563eb;color:#fff;border:0;' +
      'border-radius:999px;padding:8px 18px;font-weight:600;cursor:pointer">Accept</button>' +
      '<button id="sq-consent-decline" style="background:transparent;color:#cbd5e1;' +
      'border:1px solid #475569;border-radius:999px;padding:8px 18px;cursor:pointer">Decline</button>';
    document.body.appendChild(bar);
    document.getElementById("sq-consent-accept").onclick = function () {
      storeConsent("granted"); loadVendors(); bar.remove();
    };
    document.getElementById("sq-consent-decline").onclick = function () {
      storeConsent("denied"); bar.remove();
    };
  }

  function init() {
    if (!configured) return; // nothing to consent to yet
    var choice = storedConsent();
    if (choice === "granted") loadVendors();
    else if (choice === null) showBanner();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
