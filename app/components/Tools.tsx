import { products, type Product } from "../data/products";

function StatusBadge({ status }: { status: Product["status"] }) {
  return status === "building" ? (
    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
      In development
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
      Live
    </span>
  );
}

function Icon({ d, large }: { d: string; large?: boolean }) {
  return (
    <div
      className={`grid shrink-0 place-items-center rounded-xl bg-brand-50 text-brand-600 ${
        large ? "h-14 w-14" : "h-12 w-12"
      }`}
    >
      <svg
        width={large ? 28 : 24}
        height={large ? 28 : 24}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d={d} />
      </svg>
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((b) => (
        <li key={b} className="flex gap-2.5 text-sm text-slate-600">
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
  );
}

function Actions({ p }: { p: Product }) {
  return (
    <div className="flex flex-wrap gap-3">
      {p.demo && (
        <a
          href={p.demo}
          target={p.demo.startsWith("http") ? "_blank" : undefined}
          rel={p.demo.startsWith("http") ? "noopener" : undefined}
          className="rounded-full bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-brand-700"
        >
          Try it live
        </a>
      )}
      {p.href && (
        <a
          href={p.href}
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300"
        >
          How it works
        </a>
      )}
      {!p.demo && !p.href && (
        <a
          href="#contact"
          className="rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300"
        >
          Ask about this
        </a>
      )}
    </div>
  );
}

export default function Tools() {
  const featured = products.filter((p) => p.featured);
  const rest = products.filter((p) => !p.featured);

  return (
    <section id="tools" className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pb-24 md:pt-20">
      <div className="mx-auto max-w-2xl text-center">
        <p className="text-sm font-semibold uppercase tracking-wider text-brand-600">
          What we build
        </p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
          Everything a trade needs to win work
        </h2>
        <p className="mt-4 text-lg text-slate-600">
          Answer &ldquo;how much?&rdquo; instantly, get found on Google, never
          miss a call. Take one piece or the lot.
        </p>
      </div>

      {featured.map((p) => (
        <div
          key={p.slug}
          className="mt-12 overflow-hidden rounded-3xl border border-brand-200 bg-brand-50/40"
        >
          <div className="grid gap-8 p-8 md:grid-cols-2 md:gap-12 md:p-10">
            <div className="flex flex-col">
              <div className="flex items-center gap-4">
                <Icon d={p.icon} large />
                <StatusBadge status={p.status} />
              </div>
              <h3 className="mt-5 text-2xl font-bold">{p.name}</h3>
              <p className="mt-1 font-medium text-brand-600">{p.tagline}</p>
              <p className="mt-4 flex-1 text-slate-600">{p.blurb}</p>
              <div className="mt-7">
                <Actions p={p} />
              </div>
            </div>
            <div className="self-start rounded-2xl bg-white p-7 ring-1 ring-brand-100">
              <p className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500">
                What you get
              </p>
              <Bullets items={p.bullets} />
            </div>
          </div>
        </div>
      ))}

      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
        {rest.map((p) => (
          <div
            key={p.slug}
            className="flex flex-col rounded-2xl border border-slate-200 p-7 transition hover:border-brand-200 hover:shadow-lg hover:shadow-brand-600/5"
          >
            <div className="flex items-start justify-between gap-4">
              <Icon d={p.icon} />
              <StatusBadge status={p.status} />
            </div>
            <h3 className="mt-5 text-lg font-semibold">{p.name}</h3>
            <p className="mt-1 text-sm font-medium text-brand-600">
              {p.tagline}
            </p>
            <p className="mt-3 text-sm text-slate-600">{p.blurb}</p>
            <div className="mt-5 flex-1">
              <Bullets items={p.bullets} />
            </div>
            <div className="mt-6">
              <Actions p={p} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
