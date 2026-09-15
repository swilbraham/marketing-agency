export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#top" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              S
            </span>
            SkyQuote<span className="text-brand-600">.</span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <a href="/demo" className="hover:text-brand-600">Live demo</a>
            <a href="#services" className="hover:text-brand-600">Services</a>
            <a href="#pricing" className="hover:text-brand-600">Pricing</a>
            <a href="#contact" className="hover:text-brand-600">Contact</a>
            <a href="/privacy" className="hover:text-brand-600">Privacy</a>
            <a href="/terms" className="hover:text-brand-600">Terms</a>
          </nav>
          <a
            href="mailto:hello@skyquote.co.uk"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            hello@skyquote.co.uk
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} SkyQuote. Instant quote calculators
          for UK trades.
        </p>
      </div>
    </footer>
  );
}
