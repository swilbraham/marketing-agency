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
];

export const featuredProduct = products.find((p) => p.featured) ?? products[0];
