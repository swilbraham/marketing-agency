/* ---------------------------------------------------------------
   Two ways to buy. Edit the numbers and wording here.
   --------------------------------------------------------------- */
const tiers = [
  {
    name: "Complete landing page",
    setup: "£399",
    monthly: "£79",
    tagline:
      "A fully branded page built to run Google and Meta ads at, with the calculator in it.",
    features: [
      "Landing page designed around your business and branding",
      "Your own domain and email address, set up for you",
      "Quote calculator built in, with your services and rates",
      "Built for Google Ads and Meta traffic to land on",
      "Unlimited edits — send them over and we make them",
      "Hosting, SSL and the Google mapping bill covered",
      "Enquiries emailed to you with the measurement attached",
    ],
    cta: "Get my landing page",
    featured: true,
  },
  {
    name: "Calculator embed",
    setup: "£199",
    monthly: "£39",
    tagline:
      "The calculator on its own, to drop into the website you already have.",
    features: [
      "Calculator branded and set up with your services and rates",
      "A snippet of code to paste into your WordPress page",
      "Step-by-step instructions for adding it",
      "You install it on your site — we tell you exactly how",
      "Unlimited price and service changes",
      "Hosting and the Google mapping bill covered",
      "Enquiries emailed to you with the measurement attached",
    ],
    cta: "Get the embed",
    featured: false,
  },
];

const included = [
  "No contract — cancel with 30 days' notice",
  "Unlimited edits for as long as you're with us",
  "We host it and keep it running, so there's nothing to manage",
  "On the landing page plan, the domain is yours to keep if you leave",
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-slate-50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
            Pricing
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            One job pays for it
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            A one-off fee to build it, then a monthly for hosting, support and
            as many changes as you want. No contract.
          </p>
        </div>

        <div className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative flex flex-col rounded-3xl p-8 ${
                t.featured
                  ? "bg-ink text-white shadow-2xl ring-2 ring-brand-600"
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
            Both plans include
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
        </div>
      </div>
    </section>
  );
}
