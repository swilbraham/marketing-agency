import { products } from "../data/products";

export default function Tools() {
  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 py-20 md:py-28">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Everything a trade needs to win work
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Get found, answer &ldquo;how much?&rdquo; instantly, never miss a
          call. Take one piece or the lot &mdash; they work better together.
        </p>
      </div>

      <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
        {products.map((p) => (
          <div
            key={p.slug}
            className={`group flex flex-col rounded-2xl border p-7 transition hover:shadow-lg hover:shadow-brand-600/5 ${
              p.featured
                ? "border-brand-200 bg-brand-50/40 md:col-span-2"
                : "border-slate-100 hover:border-brand-200"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 transition group-hover:bg-brand-600 group-hover:text-white">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d={p.icon} />
                </svg>
              </div>
              {p.status === "building" ? (
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                  In development
                </span>
              ) : (
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Live
                </span>
              )}
            </div>

            <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm font-medium text-brand-600">
              {p.tagline}
            </p>
            <p className="mt-3 text-slate-600">{p.blurb}</p>

            <ul className="mt-5 space-y-2">
              {p.bullets.map((b) => (
                <li key={b} className="flex gap-2 text-sm text-slate-600">
                  <svg
                    className="mt-0.5 h-4 w-4 shrink-0 text-brand-600"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M5 13l4 4L19 7" />
                  </svg>
                  {b}
                </li>
              ))}
            </ul>

            <div className="mt-6 flex flex-wrap gap-3 pt-1">
              {p.demo && (
                <a
                  href={p.demo}
                  target={p.demo.startsWith("http") ? "_blank" : undefined}
                  rel={p.demo.startsWith("http") ? "noopener" : undefined}
                  className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white transition hover:bg-brand-700"
                >
                  Try it live
                </a>
              )}
              {p.href && (
                <a
                  href={p.href}
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300"
                >
                  How it works
                </a>
              )}
              {!p.demo && !p.href && (
                <a
                  href="#contact"
                  className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300"
                >
                  Ask about this
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
