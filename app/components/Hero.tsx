const stats = [
  { value: "3.4x", label: "Avg. return on ad spend" },
  { value: "120+", label: "Local businesses grown" },
  { value: "14 days", label: "To your first new leads" },
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
            Marketing built for small &amp; local businesses
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
            More customers,{" "}
            <span className="text-brand-600">without the guesswork.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            We run the ads, build the websites, and handle the follow-up so you
            can stay focused on the work you do best. Simple pricing, real
            results, no jargon.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href="#contact"
              className="w-full rounded-full bg-brand-600 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:w-auto"
            >
              Get my free marketing audit
            </a>
            <a
              href="#services"
              className="w-full rounded-full bg-white px-7 py-3 text-center font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300 sm:w-auto"
            >
              See what we do
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No contracts. Cancel anytime. First audit is on us.
          </p>
        </div>

        <dl className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100"
            >
              <dt className="text-3xl font-bold text-brand-600">{s.value}</dt>
              <dd className="mt-1 text-sm text-slate-500">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
