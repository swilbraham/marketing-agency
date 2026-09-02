/**
 * Replaces the placeholder testimonials that shipped with the template.
 * Invented quotes and unsubstantiated performance figures are a banned
 * practice under the DMCC Act 2024, so this section shows work a visitor
 * can actually open and check instead. Add real, attributable client
 * quotes here once you have written permission to publish them.
 */

const proof = [
  {
    title: "Instant Quote Calculator",
    body: "A working satellite measuring tool. Type a postcode, trace a roof, see a price. Nothing to sign up for.",
    href: "https://measure-demo-lemon.vercel.app",
    cta: "Open the demo",
  },
  {
    title: "Answered247",
    body: "An AI phone answering service, live on its own domain, taking real calls for real businesses.",
    href: "https://answered247.co.uk",
    cta: "Visit the product",
  },
  {
    title: "Client landing page",
    body: "The lead-generation page template we build local service sites on. Same one our clients get.",
    href: "/lp",
    cta: "See the template",
  },
];

export default function Testimonials() {
  return (
    <section id="proof" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Don&rsquo;t take our word for it
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Most agencies show you testimonials. We&rsquo;d rather show you the
          software. Open any of these and use it yourself.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
        {proof.map((p) => (
          <a
            key={p.title}
            href={p.href}
            target={p.href.startsWith("http") ? "_blank" : undefined}
            rel={p.href.startsWith("http") ? "noopener" : undefined}
            className="group flex flex-col rounded-2xl border border-slate-100 p-7 transition hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
          >
            <h3 className="text-lg font-semibold">{p.title}</h3>
            <p className="mt-2 flex-1 text-slate-600">{p.body}</p>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-600">
              {p.cta}
              <svg
                className="h-4 w-4 transition group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
          </a>
        ))}
      </div>
    </section>
  );
}
