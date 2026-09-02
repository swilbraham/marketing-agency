import { featuredProduct } from "../data/products";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-b from-brand-50 to-white"
    >
      <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-block rounded-full bg-white px-4 py-1.5 text-sm font-medium text-brand-700 shadow-sm ring-1 ring-brand-100">
            Quoting software for trades &amp; local services
          </span>
          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-ink sm:text-5xl md:text-6xl">
            More jobs.{" "}
            <span className="text-brand-600">Less chasing.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Software that answers &ldquo;how much?&rdquo; before you do. An
            instant quote calculator, a website built to be found, and an AI
            receptionist for the calls you miss. Yours to own &mdash; we
            don&rsquo;t run your ads or touch your budget.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={featuredProduct.demo}
              target="_blank"
              rel="noopener"
              className="w-full rounded-full bg-brand-600 px-7 py-3 text-center font-semibold text-white shadow-lg shadow-brand-600/20 transition hover:bg-brand-700 sm:w-auto"
            >
              Try the quote calculator
            </a>
            <a
              href="#tools"
              className="w-full rounded-full bg-white px-7 py-3 text-center font-semibold text-slate-700 ring-1 ring-slate-200 transition hover:ring-slate-300 sm:w-auto"
            >
              See what we build
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500">
            No contracts. No sign-up needed to try the demos.
          </p>
        </div>

        {/* Proof, not claims: things a visitor can open and use. */}
        <div className="mx-auto mt-16 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-3">
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
            <p className="text-3xl font-bold text-brand-600">30 sec</p>
            <p className="mt-1 text-sm text-slate-500">
              From postcode to priced quote
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
            <p className="text-3xl font-bold text-brand-600">~5%</p>
            <p className="mt-1 text-sm text-slate-500">
              Typical accuracy of a satellite measurement
            </p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-slate-100">
            <p className="text-3xl font-bold text-brand-600">24/7</p>
            <p className="mt-1 text-sm text-slate-500">
              Calls answered while you&rsquo;re on the tools
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
