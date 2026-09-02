const steps = [
  {
    n: "1",
    title: "They find their property",
    body: "Your customer types their postcode and the map drops onto their house in high-resolution satellite view.",
  },
  {
    n: "2",
    title: "They trace the area",
    body: "Click each corner to draw round the roof, drive or lawn. Extra shapes cover a garage, extension or second patio.",
  },
  {
    n: "3",
    title: "You get the enquiry",
    body: "Name, phone, address and the exact measurement land in your inbox, with the price they were shown.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          How it works
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Three steps, about a minute
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          The same satellite measuring an estimator does on site — except the
          customer does it, at eleven at night, without ringing you.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.n} className="rounded-2xl border border-slate-200 p-7">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-bold text-white">
              {s.n}
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-slate-600">{s.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 text-center">
        <a
          href="https://measure-demo-lemon.vercel.app"
          target="_blank"
          rel="noopener"
          className="rounded-full bg-brand-600 px-7 py-3 font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
        >
          Try it yourself — no sign-up
        </a>
      </div>
    </section>
  );
}
