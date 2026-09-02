export default function Footer() {
  return (
    <footer className="border-t border-slate-100 bg-white">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <a href="#top" className="flex items-center gap-2 font-bold text-lg">
            <span className="grid h-8 w-8 place-items-center rounded-lg bg-brand-600 text-white">
              B
            </span>
            SkyQuote<span className="text-brand-600">.</span>
          </a>
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <a href="#services" className="hover:text-brand-600">Services</a>
            <a href="#pricing" className="hover:text-brand-600">Pricing</a>
            <a href="#testimonials" className="hover:text-brand-600">Results</a>
            <a href="#contact" className="hover:text-brand-600">Contact</a>
          </nav>
          <a
            href="mailto:hello@skyquote.co.uk"
            className="text-sm font-medium text-brand-600 hover:text-brand-700"
          >
            hello@skyquote.co.uk
          </a>
        </div>
        <p className="mt-8 text-center text-sm text-slate-400">
          © {new Date().getFullYear()} SkyQuote. Facebook &amp; Instagram ads
          for small businesses.
        </p>
      </div>
    </footer>
  );
}
