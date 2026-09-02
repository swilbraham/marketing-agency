const included = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Set up for you",
    desc: "You send us your services and rates. We build it, install it and hand it over working. Nothing for you to configure.",
  },
  {
    icon: "M12 3v18m9-9H3",
    title: "Your prices, your rules",
    desc: "Every service, rate and minimum charge is yours. Change one and it's live the same day — no developer, no rebuild.",
  },
  {
    icon: "M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.5 12s3.5-7 9.5-7 9.5 7 9.5 7-3.5 7-9.5 7-9.5-7-9.5-7z",
    title: "Looks like your business",
    desc: "Your colours, logo and wording throughout — down to the colour of the shape drawn on the map. Nobody sees ours.",
  },
  {
    icon: "M7 4h10a1 1 0 011 1v14a1 1 0 01-1 1H7a1 1 0 01-1-1V5a1 1 0 011-1zm4 14h2",
    title: "Built for phones",
    desc: "Most people will use it one-handed on a phone in their driveway. That's what it's designed and tested for.",
  },
  {
    icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z",
    title: "Enquiries straight to you",
    desc: "Name, number, address and the measurement, in your inbox. No portal to log into, no leads shared with rivals.",
  },
  {
    icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
    title: "Works with what you have",
    desc: "Bolt it onto your current website as a page or an embed, or let us build the site around it. Either works.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t border-slate-100 bg-slate-50/50 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-6">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          You buy the system, not our time
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          No retainers, no hours billed, nothing to learn. We build it, set it
          up with your prices, and keep it running.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {included.map((s) => (
          <div
            key={s.title}
            className="group rounded-2xl border border-slate-100 p-7 transition hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
          >
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={s.icon} />
              </svg>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.desc}</p>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
