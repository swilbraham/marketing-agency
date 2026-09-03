/* =============================================================
   ROOF CLEANING PRICE CALCULATOR
   Edit this file only (plus /images) to set the page up.
   ============================================================= */
window.SITE_CONFIG = {

  /* ---- 1. GOOGLE MAPS ------------------------------------- */
  // Paste your key between the quotes. See README.md (3-minute setup).
  googleMapsApiKey: "AIzaSyCHsV59b4M7NaC6S_C7Mup8O4CjXNaU0WU",

  /* ---- 1b. BRAND COLOUR ----------------------------------- */
  // One accent drives the whole tool, including the shape drawn on the map.
  // Currently lime, matching the client site.
  brand: {
    accent: "#a6e22e",
    accentDark: "#8fce1c",
    accentRgb: "166,226,46"    // same colour as r,g,b for translucent tints
  },

  /* ---- 2. BUSINESS ---------------------------------------- */
  business: {
    name: "The Exterior Cleaners North West",
    shortName: "Exterior Cleaners NW",
    phone: "07401 718118",
    phoneHref: "tel:07401718118",
    whatsapp: "447401718118",
    email: "hello@theexteriorcleanersnorthwest.co.uk",
    serviceArea: "Manchester · Cheshire · Lancashire & surrounding areas",
    hours: "Mon–Sat, 8am–6pm",
    mainSite: "https://extcleannorthw.wpenginepowered.com",
    // Where the quote form posts. FormSubmit needs activating once:
    // submit the form yourself, then click the link in the confirmation email.
    formEndpoint: "https://formsubmit.co/hello@theexteriorcleanersnorthwest.co.uk"
  },

  /* ---- 3. MAP START POSITION ------------------------------ */
  map: {
    lat: 53.4808,          // Manchester
    lng: -2.2426,
    zoom: 11,
    addressZoom: 20,       // 20 = roof-level detail
    country: "gb",         // bias address search; null = worldwide
    // Google address autocomplete. Needs "Places API (New)" enabled on the key.
    // Leave false and the page uses a plain search box (Geocoding API only).
    autocomplete: false
  },

  /* ---- 4. SERVICES & PRICING ------------------------------ */
  // Add, remove or reorder these and the tool's buttons follow.
  // pitch:true allows for roof slope. Flat surfaces (drives, patios) use
  // the measured area as-is, so leave pitch out or set it false.
  //
  // >>> CHECK THESE RATES BEFORE GOING LIVE <<<
  // Only the roof rate (£10/m²) was given to me. The jet washing rates
  // below are placeholders at typical UK prices - change them to yours.
  currency: "£",
  services: [
    {
      id: "roof",
      label: "Roof cleaning",
      noun: "roof",
      perSqm: 10,
      minCharge: 250,
      pitch: true,
      formOption: "Roof cleaning",
      note: "Approximate price based on satellite measurements. Confirmed with a free, no-obligation site visit - and there's no payment until the job is complete."
    },
    {
      id: "driveway",
      label: "Driveway jet washing",
      noun: "driveway",
      perSqm: 4,            // placeholder
      minCharge: 150,       // placeholder
      pitch: false,
      formOption: "Driveway or patio cleaning",
      note: "Approximate price based on satellite measurements. Re-sanding and sealing quoted separately after a free site visit."
    },
    {
      id: "patio",
      label: "Patio jet washing",
      noun: "patio",
      perSqm: 4,            // placeholder
      minCharge: 150,       // placeholder
      pitch: false,
      formOption: "Driveway or patio cleaning",
      note: "Approximate price based on satellite measurements. Confirmed with a free, no-obligation site visit."
    }
  ],

  /* ---- 5. UNITS ------------------------------------------- */
  defaultUnits: "metric"   // "metric" (m²) or "imperial" (ft²)
};
