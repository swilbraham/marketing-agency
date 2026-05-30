"use client";

/* ──────────────────────────────────────────────────────────────────────────
   REUSABLE CLIENT LANDING PAGE TEMPLATE
   To make a new one for a client: copy this folder (app/lp) to a new route
   like app/lp-daves-carpets, then edit ONLY the `config` object below.
   Swap the text, the brand colour (one hex), the photos, and the reviews.
   The lead form posts to /api/contact — point that at the client's inbox/CRM.
   ────────────────────────────────────────────────────────────────────────── */

import { useState } from "react";

const config = {
  business: "Dave's Carpet Cleaning",
  accent: "#16a34a", // brand colour — change this one hex to re-skin the page
  phone: "07123 456789",
  area: "Wirral & Chester",
  rating: "4.9",
  reviewCount: "200+",

  // The big promise. Keep it specific and benefit-led.
  headline: "Carpets that look brand new — cleaned in a single visit",
  subheadline:
    "Fast, fully-insured carpet & upholstery cleaning across the Wirral. Dry in 1 hour, no nasty smells, satisfaction guaranteed.",

  // Limited-time offer strip. Drives urgency.
  offer: "This month only: 3 rooms cleaned for £79 (save £40)",

  trustPoints: ["Fully insured", "10+ years' experience", "100% satisfaction guarantee"],

  benefits: [
    {
      title: "Dry in about an hour",
      desc: "Our hot-water extraction means no soggy carpets — back to normal the same day.",
    },
    {
      title: "Upfront, honest pricing",
      desc: "You get a fixed quote before we start. No surprises, no hidden extras.",
    },
    {
      title: "Pet & child friendly",
      desc: "Non-toxic, eco-friendly products that are safe for the whole family.",
    },
  ],

  services: [
    "Carpet cleaning",
    "Rug cleaning",
    "Upholstery & sofas",
    "Stain & odour removal",
    "End-of-tenancy cleans",
    "Commercial carpets",
  ],

  // Add real image URLs to `src` to replace the placeholders.
  gallery: [
    { src: "", label: "Before / after photo" },
    { src: "", label: "Team at work" },
    { src: "", label: "Happy customer" },
  ],

  reviews: [
    { text: "Booked Monday, cleaned Tuesday. Carpets look like new — brilliant job.", name: "Karen H." },
    { text: "Got rid of stains I thought were permanent. Polite, on time, fair price.", name: "Mark T." },
    { text: "Used Dave twice now for our rentals. Always reliable and great value.", name: "Priya S." },
  ],
};

export default function LandingPage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, source: config.business }),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  const accent = config.accent;

  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* Sticky top bar */}
      <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <span className="text-lg font-extrabold">{config.business}</span>
          <a
            href={`tel:${config.phone.replace(/\s/g, "")}`}
            className="rounded-full px-5 py-2 text-sm font-semibold text-white"
            style={{ backgroundColor: accent }}
          >
            Call {config.phone}
          </a>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto grid max-w-5xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-16">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-sm font-medium text-amber-700">
            <Stars />
            {config.rating} stars from {config.reviewCount} reviews
          </div>
          <h1 className="mt-5 text-3xl font-extrabold leading-tight sm:text-4xl md:text-5xl">
            {config.headline}
          </h1>
          <p className="mt-4 text-lg text-slate-600">{config.subheadline}</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a
              href="#quote"
              className="rounded-full px-7 py-3 text-center font-semibold text-white shadow-lg"
              style={{ backgroundColor: accent }}
            >
              Get my free quote
            </a>
            <a
              href={`tel:${config.phone.replace(/\s/g, "")}`}
              className="rounded-full bg-slate-100 px-7 py-3 text-center font-semibold text-slate-800"
            >
              Or call {config.phone}
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-600">
            {config.trustPoints.map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check color={accent} /> {t}
              </li>
            ))}
          </ul>
        </div>
        <Photo label="Hero photo" className="aspect-[4/3] w-full" accent={accent} />
      </section>

      {/* Offer strip */}
      <div className="px-5">
        <div
          className="mx-auto max-w-5xl rounded-2xl px-6 py-4 text-center text-lg font-bold text-white"
          style={{ backgroundColor: accent }}
        >
          {config.offer}
        </div>
      </div>

      {/* Benefits */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">Why choose {config.business}?</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {config.benefits.map((b) => (
            <div key={b.title} className="rounded-2xl border border-slate-100 p-6 text-center shadow-sm">
              <div
                className="mx-auto grid h-12 w-12 place-items-center rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                <Check color="#fff" />
              </div>
              <h3 className="mt-4 font-semibold">{b.title}</h3>
              <p className="mt-2 text-sm text-slate-600">{b.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services + Gallery */}
      <section className="bg-slate-50 py-14">
        <div className="mx-auto grid max-w-5xl gap-10 px-5 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">What we do</h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {config.services.map((s) => (
                <li key={s} className="flex items-center gap-2 text-slate-700">
                  <Check color={accent} /> {s}
                </li>
              ))}
            </ul>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {config.gallery.map((g, i) => (
              <Photo key={i} label={g.label} src={g.src} className="aspect-square" accent={accent} />
            ))}
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="mx-auto max-w-5xl px-5 py-14">
        <h2 className="text-center text-2xl font-bold sm:text-3xl">What our customers say</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {config.reviews.map((r) => (
            <figure key={r.name} className="rounded-2xl border border-slate-100 p-6 shadow-sm">
              <Stars />
              <blockquote className="mt-3 text-slate-700">“{r.text}”</blockquote>
              <figcaption className="mt-4 text-sm font-semibold text-slate-500">— {r.name}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* Quote form */}
      <section id="quote" className="px-5 py-14" style={{ backgroundColor: `${accent}10` }}>
        <div className="mx-auto max-w-xl rounded-3xl bg-white p-8 shadow-xl ring-1 ring-slate-100">
          {status === "success" ? (
            <div className="py-10 text-center">
              <div
                className="mx-auto grid h-14 w-14 place-items-center rounded-full text-white"
                style={{ backgroundColor: accent }}
              >
                <Check color="#fff" />
              </div>
              <h2 className="mt-4 text-2xl font-bold">Thanks — request received!</h2>
              <p className="mt-2 text-slate-600">
                We&rsquo;ll call you back shortly with your free quote. In a hurry? Call{" "}
                {config.phone}.
              </p>
            </div>
          ) : (
            <>
              <h2 className="text-center text-2xl font-bold sm:text-3xl">Get your free quote</h2>
              <p className="mt-2 text-center text-slate-600">
                Covering {config.area}. No obligation — we&rsquo;ll call you back fast.
              </p>
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <input
                  name="name"
                  required
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
                <input
                  name="phone"
                  type="tel"
                  required
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="Email"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
                <textarea
                  name="message"
                  rows={3}
                  placeholder="What do you need cleaning?"
                  className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-slate-400"
                />
                {status === "error" && (
                  <p className="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-600">
                    Something went wrong. Please call {config.phone} instead.
                  </p>
                )}
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full rounded-full px-6 py-3 font-semibold text-white disabled:opacity-60"
                  style={{ backgroundColor: accent }}
                >
                  {status === "loading" ? "Sending…" : "Get my free quote"}
                </button>
              </form>
            </>
          )}
        </div>
      </section>

      <footer className="bg-slate-900 py-8 text-center text-sm text-slate-400">
        <p className="font-semibold text-white">{config.business}</p>
        <p className="mt-1">
          Serving {config.area} · Call {config.phone}
        </p>
        <p className="mt-2">© {new Date().getFullYear()} {config.business}. All rights reserved.</p>
      </footer>
    </div>
  );
}

function Photo({
  label,
  src,
  className = "",
  accent,
}: {
  label: string;
  src?: string;
  className?: string;
  accent: string;
}) {
  if (src) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={src} alt={label} className={`rounded-2xl object-cover ${className}`} />;
  }
  return (
    <div
      className={`grid place-items-center rounded-2xl text-center text-sm font-medium text-white/90 ${className}`}
      style={{ background: `linear-gradient(135deg, ${accent}, ${accent}99)` }}
    >
      <span className="px-3">{label}<br />(add photo)</span>
    </div>
  );
}

function Check({ color }: { color: string }) {
  return (
    <svg className="h-5 w-5 flex-shrink-0" viewBox="0 0 20 20" fill={color}>
      <path
        fillRule="evenodd"
        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Stars() {
  return (
    <span className="flex gap-0.5 text-amber-400">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L10 15l-5.2 2.6 1-5.8L1.5 7.7l5.9-.9L10 1.5z" />
        </svg>
      ))}
    </span>
  );
}
