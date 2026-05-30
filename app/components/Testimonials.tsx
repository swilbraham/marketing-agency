const testimonials = [
  {
    quote:
      "Within three weeks our Facebook ads had the phone ringing with local jobs. Best money we spend each month, no contest.",
    name: "Dave R.",
    role: "Carpet Cleaning, Wirral",
  },
  {
    quote:
      "The Instagram ad videos they made for us look brilliant. Bookings are up around 40% and I barely had to lift a finger.",
    name: "Sarah M.",
    role: "Window Cleaning, Chester",
  },
  {
    quote:
      "Finally someone who actually knows Meta ads inside out, explains it in plain English, and delivers the leads.",
    name: "Tom B.",
    role: "Oven Cleaning, Liverpool",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Loved by local business owners
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          We measure our success the same way you do — by the customers we bring
          through your door.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <figure
            key={t.name}
            className="flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100"
          >
            <div className="flex gap-1 text-accent">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i} className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
                </svg>
              ))}
            </div>
            <blockquote className="mt-4 flex-1 text-slate-700">
              “{t.quote}”
            </blockquote>
            <figcaption className="mt-5 border-t border-slate-100 pt-4">
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-slate-500">{t.role}</div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
