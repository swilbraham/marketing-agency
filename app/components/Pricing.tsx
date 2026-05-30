const tiers = [
  {
    name: "Starter",
    price: "£499",
    cadence: "/month",
    tagline: "For businesses getting their first leads online.",
    features: [
      "1 ad channel (Google or Meta)",
      "Landing page included",
      "Monthly performance report",
      "Email support",
    ],
    cta: "Start with Starter",
    featured: false,
  },
  {
    name: "Growth",
    price: "£999",
    cadence: "/month",
    tagline: "Our most popular plan for steady, predictable growth.",
    features: [
      "Google + Meta ads",
      "Conversion-built website",
      "Local SEO & Google Maps",
      "Automated lead follow-up",
      "Dedicated account manager",
    ],
    cta: "Choose Growth",
    featured: true,
  },
  {
    name: "Scale",
    price: "Custom",
    cadence: "",
    tagline: "For multi-location or high-volume businesses.",
    features: [
      "Everything in Growth",
      "Multi-location campaigns",
      "Social content & reels",
      "Reputation management",
      "Weekly strategy calls",
    ],
    cta: "Talk to us",
    featured: false,
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple pricing that pays for itself
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            No setup fees, no long contracts. Just one flat monthly price, plus
            your ad budget paid directly to the platforms.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "bg-ink text-white shadow-2xl ring-2 ring-brand-600 lg:-translate-y-4"
                  : "bg-white ring-1 ring-slate-200"
              }`}
            >
              {t.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand-600 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-semibold">{t.name}</h3>
              <div className="mt-4 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold">{t.price}</span>
                <span className={t.featured ? "text-slate-300" : "text-slate-500"}>
                  {t.cadence}
                </span>
              </div>
              <p
                className={`mt-3 text-sm ${
                  t.featured ? "text-slate-300" : "text-slate-600"
                }`}
              >
                {t.tagline}
              </p>
              <ul className="mt-6 flex-1 space-y-3 text-sm">
                {t.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <svg
                      className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-500"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className={t.featured ? "text-slate-200" : "text-slate-700"}>
                      {f}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className={`mt-8 rounded-full px-6 py-3 text-center font-semibold transition ${
                  t.featured
                    ? "bg-brand-600 text-white hover:bg-brand-500"
                    : "bg-brand-50 text-brand-700 hover:bg-brand-100"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
