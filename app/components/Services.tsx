const services = [
  {
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
    title: "Paid Ads",
    desc: "Google & Meta ad campaigns that put you in front of ready-to-buy customers in your area.",
  },
  {
    icon: "M4 5a1 1 0 011-1h14a1 1 0 011 1v9a1 1 0 01-1 1H5a1 1 0 01-1-1V5zm0 13h16",
    title: "Websites that convert",
    desc: "Fast, mobile-first sites designed to turn visitors into phone calls and bookings.",
  },
  {
    icon: "M21 21l-4.35-4.35M11 17a6 6 0 100-12 6 6 0 000 12z",
    title: "Local SEO",
    desc: "Rank higher on Google Maps and search so customers find you first, not your competitors.",
  },
  {
    icon: "M3 5h12M3 10h12M3 15h8M17 5l4 4-4 4",
    title: "Lead follow-up",
    desc: "Automated texts and emails that respond instantly so no enquiry ever slips through.",
  },
  {
    icon: "M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-4 0v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z",
    title: "Social content",
    desc: "Done-for-you posts and reels that keep your business top of mind in the community.",
  },
  {
    icon: "M9 19V6l12-3v13M9 9l12-3M6 18a3 3 0 11-6 0 3 3 0 016 0z",
    title: "Reviews & reputation",
    desc: "Collect more 5-star reviews on autopilot and build trust before customers even call.",
  },
];

export default function Services() {
  return (
    <section id="services" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything you need to grow, in one place
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Pick one service or let us run the whole engine. Either way, you get a
          dedicated team and a single point of contact.
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
