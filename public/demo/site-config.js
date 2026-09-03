/* =============================================================
   DEMO CONFIGURATION
   This is the same file every client site has. Everything a
   client changes lives here - nothing else needs touching.
   ============================================================= */
window.SITE_CONFIG = {

  /* ---- 1. GOOGLE MAPS ------------------------------------- */
  googleMapsApiKey: "AIzaSyCHsV59b4M7NaC6S_C7Mup8O4CjXNaU0WU",

  /* ---- 1b. BRAND COLOUR ----------------------------------- */
  // One accent drives the whole tool, including the shape drawn on the map.
  // Currently neutral demo blue.
  brand: {
    accent: "#38bdf8",
    accentDark: "#0ea5e9",
    accentRgb: "56,189,248"    // same colour as r,g,b for translucent tints
  },

  /* ---- 2. BUSINESS ---------------------------------------- */
  business: {
    name: "Your Business Name",
    shortName: "Your Business",
    phone: "01234 567 890",
    phoneHref: "tel:01234567890",
    whatsapp: "441234567890",
    email: "hello@yourbusiness.co.uk",
    serviceArea: "Your town, county & surrounding areas",
    hours: "Mon-Sat, 8am-6pm",
    mainSite: "#",
    formEndpoint: ""          // demo only - the form doesn't send
  },

  /* ---- 3. MAP START POSITION ------------------------------ */
  map: {
    lat: 53.4084,             // Liverpool
    lng: -2.9916,
    zoom: 11,
    addressZoom: 20,
    country: "gb",
    autocomplete: false
  },

  /* ---- 4. SERVICES & PRICING ------------------------------ */
  // Any job priced by the square metre works. Mix and match, set
  // your own rates, and the buttons build themselves from this list.
  // pitch:true allows for roof slope; flat surfaces measure as-is.
  currency: "£",
  services: [
    {
      id: "roofclean", label: "Roof cleaning", noun: "roof",
      perSqm: 10, minCharge: 250, pitch: true,
      note: "Example rate for demonstration. Every figure on this page is set by the business owner."
    },
    {
      id: "driveway", label: "Driveway washing", noun: "driveway",
      perSqm: 4, minCharge: 150, pitch: false,
      note: "Example rate for demonstration. Every figure on this page is set by the business owner."
    },
    {
      id: "resin", label: "Resin driveway", noun: "driveway",
      perSqm: 75, minCharge: 2500, pitch: false,
      note: "Example rate for demonstration. Every figure on this page is set by the business owner."
    },
    {
      id: "grass", label: "Artificial grass", noun: "lawn",
      perSqm: 45, minCharge: 900, pitch: false,
      note: "Example rate for demonstration. Every figure on this page is set by the business owner."
    },
    {
      id: "reroof", label: "New roof", noun: "roof",
      perSqm: 120, minCharge: 4000, pitch: true,
      note: "Example rate for demonstration. Every figure on this page is set by the business owner."
    }
  ],

  /* ---- 5. UNITS ------------------------------------------- */
  defaultUnits: "metric"
};
