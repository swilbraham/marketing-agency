const services = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Campaign management",
    desc: "End-to-end Facebook & Instagram ad campaigns, planned and optimised daily by a Meta specialist.",
  },
  {
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 13h16M9 9l2.5 3L14 9.5 17 13H7l2-4z",
    title: "Ad creative & video",
    desc: "Thumb-stopping images and short videos made for the feed, so your ads actually get noticed.",
  },
  {
    icon: "M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z",
    title: "Audience targeting",
    desc: "Reach the right people in your area with precise interest, location, and lookalike audiences.",
  },
  {
    icon: "M3 12a9 9 0 1018 0M3 12l3-3M3 12l3 3",
    title: "Retargeting",
    desc: "Win back people who clicked but didn't buy with follow-up ads that bring them home.",
  },
  {
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm5 14h6",
    title: "Conversion landing pages",
    desc: "Fast, mobile-first pages built for your Meta traffic that turn clicks into calls and bookings.",
  },
  {
    icon: "M3 3v18h18M7 14l4-4 3 3 5-6",
    title: "Tracking & reporting",
    desc: "Meta Pixel and Conversions API set up properly, with clear reports on what your spend returns.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          One platform. Done properly.
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          We don&rsquo;t spread ourselves thin across ten channels. We do Meta
          ads &mdash; Facebook and Instagram &mdash; and we do them really well.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
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
    </section>
  );
}
