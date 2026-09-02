export type ProductStatus = "live" | "building";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  blurb: string;
  status: ProductStatus;
  /** Public demo or live product a prospect can click right now. */
  demo?: string;
  /** Internal page on this site, if one exists. */
  href?: string;
  bullets: string[];
  icon: string;
  featured?: boolean;
};

export const products: Product[] = [
  {
    slug: "quote-calculator",
    name: "Instant Quote Calculator",
    tagline: "Customers measure their own job and see your price",
    blurb:
      "Your visitor types their postcode, traces their roof, driveway or lawn on a satellite map, and gets your price in about 30 seconds. The enquiry reaches you with the address and square metres already worked out.",
    status: "live",
    demo: "https://measure-demo-lemon.vercel.app",
    href: "/tools/quote-calculator",
    featured: true,
    icon: "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",
    bullets: [
      "Works for any job priced by the square metre",
      "Allows for roof pitch, so sloped and flat jobs both price correctly",
      "Your rates, your services, your branding",
      "Runs on Google's free mapping allowance — around 10,000 uses a month",
    ],
  },
  {
    slug: "websites",
    name: "Lead-generation websites",
    tagline: "One-page sites built to make the phone ring",
    blurb:
      "Fast, mobile-first sites for local trades. No page builder bloat, no monthly platform fee. Built to be found on Google and to turn visitors into calls.",
    status: "live",
    demo: "/lp",
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm5 14h6",
    bullets: [
      "Live in days, not months",
      "Built for local search from the start",
      "Enquiries straight to your inbox or phone",
    ],
  },
  {
    slug: "ads",
    name: "Meta & Google ads",
    tagline: "Managed campaigns that bring the work in",
    blurb:
      "Facebook, Instagram and Google campaigns planned, written and optimised for local service businesses — with conversion tracking set up properly so you know what your spend returns.",
    status: "live",
    icon: "M3 3v18h18M7 14l4-4 3 3 5-6",
    bullets: [
      "Campaign build, creative and daily optimisation",
      "Conversion tracking that actually reports real enquiries",
      "Plain-English reporting, no jargon",
    ],
  },
  {
    slug: "answered247",
    name: "Answered247",
    tagline: "An AI receptionist that never misses a call",
    blurb:
      "Answers your phone when you're up a ladder, in a loft or asleep. Takes the job details, books the enquiry and sends it straight to you — so a missed call stops being a lost job.",
    status: "live",
    demo: "https://answered247.co.uk",
    icon: "M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11 11 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z",
    bullets: [
      "Picks up every call, day or night",
      "Captures the job, the address and the callback number",
      "Its own product, on its own plan",
    ],
  },
  {
    slug: "job-management",
    name: "Round & job management",
    tagline: "Rounds, jobs and invoicing in one place",
    blurb:
      "Scheduling, round planning and invoicing for cleaning and maintenance businesses. Currently in development and being tested on live rounds.",
    status: "building",
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    bullets: [
      "Round planning and recurring jobs",
      "Invoicing and payment chasing",
      "In development — early access available",
    ],
  },
];

export const featuredProduct = products.find((p) => p.featured) ?? products[0];
