import Image from "next/image";
import { featuredProduct } from "../data/products";

const points = [
  "Answers “how much?” while you’re on the tools",
  "Enquiries arrive already measured and priced",
  "Your rates, your branding, yours to keep",
];

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-b from-brand-50 via-white to-white"
    >
      <div className="mx-auto max-w-6xl px-6 pb-14 pt-16 md:pb-16 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.05fr_1.35fr]">
          {/* Copy */}
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-500 opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-600" />
              </span>
              Quoting software for trades
            </span>

            <h1 className="mt-6 text-4xl font-extrabold leading-[1.05] tracking-tight text-ink sm:text-5xl">
              Let customers price{" "}
              <span className="text-brand-600">their own job</span>
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-slate-600">
              They type a postcode, trace their roof or driveway on a satellite
              map, and see your price in about 30 seconds. You get the enquiry
              with the measurement already done.
            </p>

            <ul className="mt-7 space-y-3">
              {points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-slate-700">
                  <span className="mt-0.5 grid h-5 w-5 flex-shrink-0 place-items-center rounded-full bg-brand-600/10 text-brand-600">
                    <svg width="12" height="12" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 011.4-1.4l3.1 3.1 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                  {p}
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={featuredProduct.demo}
                target="_blank"
                rel="noopener"
                className="rounded-full bg-brand-600 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-brand-600/25 transition hover:bg-brand-700"
              >
                Try the live demo
              </a>
              <a
                href="#pricing"
                className="rounded-full bg-white px-7 py-3 text-center font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300"
              >
                See pricing
              </a>
            </div>

            <p className="mt-4 text-sm text-slate-500">
              No sign-up. From £299 to have it built and installed.
            </p>
          </div>

          {/* The product itself, because that is what we are selling. */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2rem] bg-brand-600/5 blur-2xl" />
            <div className="relative overflow-hidden rounded-2xl bg-ink shadow-2xl ring-1 ring-slate-900/10">
              <div className="flex items-center gap-2 border-b border-white/10 px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                <span className="ml-2 text-xs text-white/40">
                  Instant Quote Calculator
                </span>
              </div>
              <Image
                src="/quote-calculator-screenshot.jpg"
                alt="The quote calculator: a roof traced on a satellite map, priced at £1120"
                width={1600}
                height={900}
                priority
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
