/* ---------------------------------------------------------------
   Edit the numbers here. Setup is a one-off; monthly covers
   hosting, support and any changes you ask for.
   --------------------------------------------------------------- */
const tiers = [
  {
    name: "Calculator",
    setup: "£299",
    monthly: "£29",
    tagline: "Add the quote calculator to the website you already have.",
    features: [
      "Instant quote calculator, set up with your services and rates",
      "Matched to your existing branding",
      "Enquiries emailed to you with the measurement attached",
      "Works as its own page or embedded in your site",
      "Google mapping costs covered",
    ],
    cta: "Get the calculator",
    featured: false,
  },
  {
    name: "Website + Calculator",
    setup: "£449",
    monthly: "£39",
    tagline: "A site built to be found, with instant quoting built in.",
    features: [
      "Everything in Calculator",
      "One-page lead-generation website",
      "Built for local search from day one",
      "Your photos, your reviews, your offer",
      "Hosting and SSL included",
    ],
    cta: "Get the full system",
    featured: true,
  },
  {
    name: "Multi-service",
    setup: "£499",
    monthly: "£69",
    tagline: "For larger outfits running several services or areas.",
    features: [
      "Everything in Website + Calculator",
      "Unlimited services and rates in the calculator",
      "Extra pages for each area you cover",
      "Priority support, same-day changes",
      "Quarterly review of what's converting",
    ],
    cta: "Talk it through",
    featured: false,
  },
];

const included = [
  "Unlimited price changes — never wait on a developer",
  "Hosting, SSL and the Google mapping bill",
  "Fixes and updates for as long as you're with us",
  "No contract — cancel with 30 days' notice",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            One job pays for it
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A one-off fee to build and install it, then a small monthly for
            hosting, support and any changes you want. No contract, no ad spend
            to manage, nothing to learn.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "bg-ink text-white shadow-2xl ring-2 ring-brand-600 md:-translate-y-4"
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
                <span className="text-4xl font-extrabold">{t.setup}</span>
                <span className={t.featured ? "text-slate-300" : "text-slate-500"}>
                  one-off
                </span>
              </div>
              <p
                className={`mt-1 text-sm font-medium ${
                  t.featured ? "text-brand-300" : "text-brand-600"
                }`}
              >
                then {t.monthly}/month
              </p>

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
                    ? "bg-brand-600 text-white hover:bg-brand-700"
                    : "bg-white text-slate-700 ring-1 ring-slate-300 hover:ring-slate-400"
                }`}
              >
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        <div className="mx-auto mt-12 max-w-3xl rounded-2xl bg-white p-7 ring-1 ring-slate-200">
          <h3 className="text-center text-sm font-semibold uppercase tracking-wide text-slate-500">
            Every plan includes
          </h3>
          <ul className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {included.map((i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                <svg
                  className="mt-0.5 h-5 w-5 flex-shrink-0 text-brand-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {i}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-center text-sm text-slate-500">
            Call answering is a separate product on its own plan —{" "}
            <a
              href="https://answered247.co.uk"
              target="_blank"
              rel="noopener"
              className="font-semibold text-brand-600 hover:underline"
            >
              see Answered247
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
