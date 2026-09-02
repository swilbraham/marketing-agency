import type { Metadata } from "next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Contact from "../../components/Contact";
import { products } from "../../data/products";

const product = products.find((p) => p.slug === "quote-calculator")!;

export const metadata: Metadata = {
  title: "Instant Quote Calculator for trades | SkyQuote",
  description:
    "Let customers measure their own roof, driveway or lawn on a satellite map and see your price in 30 seconds. Try the live demo — no sign-up.",
};

const steps = [
  {
    n: "1",
    title: "They find their property",
    body: "A postcode drops the map onto their house in high-resolution satellite view.",
  },
  {
    n: "2",
    title: "They trace the area",
    body: "Click each corner to draw round the roof, drive or lawn. Extra shapes cover a garage or second patio.",
  },
  {
    n: "3",
    title: "You get the enquiry",
    body: "Name, phone, address and the exact measurement land in your inbox, with the price they were shown.",
  },
];

const faqs = [
  {
    q: "How accurate is it?",
    a: "Satellite measurements are typically within about 5% — the same method a surveyor uses on site. The page tells the customer the price is approximate and confirmed at a visit, so you are never held to a number you did not quote.",
  },
  {
    q: "Does it handle roof pitch?",
    a: "Yes. A roof seen from above is smaller than the roof you actually work on, so the footprint is multiplied by a pitch factor you choose. Flat surfaces like driveways and patios are measured as-is, with no multiplier.",
  },
  {
    q: "What does it cost to run?",
    a: "Google's free mapping allowance covers roughly 10,000 uses a month, which is far beyond what a local business will use. Below that it costs nothing in mapping fees.",
  },
  {
    q: "Can I change my prices?",
    a: "Every service, rate and minimum charge lives in one settings file. Changing a price is a one-line edit, not a rebuild.",
  },
  {
    q: "Will it match my branding?",
    a: "Yes — colours, logo and wording are all yours, including the colour of the shape drawn on the map.",
  },
  {
    q: "Does it work on a phone?",
    a: "Yes, and that is where most people will use it. The search, the tracing and the buttons are all built for thumbs.",
  },
];

export default function QuoteCalculatorPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <section className="bg-gradient-to-b from-brand-50 to-white">
          <div className="mx-auto max-w-6xl px-6 py-16 md:py-20">
            <div className="mx-auto max-w-3xl text-center">
              <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
                Live product
              </span>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
                Let customers price{" "}
                <span className="text-brand-600">their own job</span>
              </h1>
              <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
                {product.blurb}
              </p>
            </div>

            {/* The real thing, embedded. */}
            <div className="mt-12 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
              <div className="flex items-center gap-2 border-b border-slate-100 bg-slate-50 px-4 py-3">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
                <span className="ml-3 text-xs text-slate-500">
                  Live demo — try it, it really works
                </span>
              </div>
              <iframe
                src={product.demo}
                title="Instant Quote Calculator live demo"
                className="h-[760px] w-full border-0"
                loading="lazy"
              />
            </div>
            <p className="mt-3 text-center text-sm text-slate-500">
              Trouble with the frame?{" "}
              <a
                href={product.demo}
                target="_blank"
                rel="noopener"
                className="font-semibold text-brand-600 hover:underline"
              >
                Open the demo in a new tab
              </a>
              .
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 py-20">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Three steps for your customer
            </h2>
          </div>
          <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
            {steps.map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-slate-100 p-7"
              >
                <div className="grid h-10 w-10 place-items-center rounded-full bg-brand-600 font-bold text-white">
                  {s.n}
                </div>
                <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-slate-600">{s.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="border-y border-slate-100 bg-slate-50">
          <div className="mx-auto max-w-6xl px-6 py-20">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Works for any job priced by the m&sup2;
                </h2>
                <p className="mt-4 text-lg text-slate-600">
                  If your quote starts with &ldquo;how big is it?&rdquo;, this
                  does the measuring for you.
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {[
                    "Roof cleaning",
                    "Jet washing",
                    "Render & K-rend",
                    "Re-roofing",
                    "Resin drives",
                    "Block paving",
                    "Artificial grass",
                    "Turfing",
                    "Decking",
                    "Solar panels",
                    "Fascias & guttering",
                    "Landscaping",
                  ].map((t) => (
                    <li
                      key={t}
                      className="rounded-full bg-white px-4 py-2 text-sm text-slate-700 ring-1 ring-slate-200"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white p-8 ring-1 ring-slate-200">
                <h3 className="text-lg font-semibold">Common questions</h3>
                <dl className="mt-6 space-y-6">
                  {faqs.map((f) => (
                    <div key={f.q}>
                      <dt className="font-semibold text-ink">{f.q}</dt>
                      <dd className="mt-1 text-slate-600">{f.a}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
