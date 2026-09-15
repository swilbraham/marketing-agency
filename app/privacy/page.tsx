import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Privacy policy — SkyQuote",
  description: "How SkyQuote collects, uses and protects your information.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">Privacy policy</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: 15 September 2026</p>

          <div className="prose prose-slate mt-8 max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-ink">Who we are</h2>
              <p className="mt-2">
                SkyQuote (&ldquo;we&rdquo;, &ldquo;us&rdquo;) provides instant quote
                calculators and landing pages for UK trades, at{" "}
                <a href="https://www.skyquote.co.uk" className="text-brand-600 underline">
                  www.skyquote.co.uk
                </a>
                . For anything in this policy, contact{" "}
                <a href="mailto:hello@skyquote.co.uk" className="text-brand-600 underline">
                  hello@skyquote.co.uk
                </a>
                .
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">What we collect and why</h2>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>
                  <strong>Contact form.</strong> Name, business name, email, phone and your
                  message — used only to reply to your enquiry and set up your calculator.
                  The form is delivered to our inbox by FormSubmit, who process it solely to
                  forward it to us. Lawful basis: taking steps to enter a contract with you.
                </li>
                <li>
                  <strong>The demo calculator.</strong> Postcodes and areas you trace in the
                  demo are used to show a price on screen. The demo does not require an
                  account and the trace is not linked to your identity by us. Mapping is
                  provided by Google Maps, which sets its own cookies and processes data
                  under{" "}
                  <a
                    href="https://policies.google.com/privacy"
                    className="text-brand-600 underline"
                  >
                    Google&rsquo;s privacy policy
                  </a>
                  .
                </li>
                <li>
                  <strong>Analytics and advertising cookies.</strong> Only with your consent
                  (via the cookie banner), we use Google Analytics and the Meta pixel to
                  understand which ads and pages bring visitors here. If you decline, no
                  analytics or advertising cookies are set. Lawful basis: consent, which you
                  can withdraw by clearing this site&rsquo;s data in your browser.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">What we don&rsquo;t do</h2>
              <p className="mt-2">
                We don&rsquo;t sell your information, send marketing you haven&rsquo;t asked
                for, or share your details with anyone except the processors named above
                (FormSubmit, Google, Meta) and the providers who host the site.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">How long we keep it</h2>
              <p className="mt-2">
                Enquiry emails are kept while we&rsquo;re dealing with your enquiry and for
                as long as you&rsquo;re a customer, then deleted within 24 months. Consent
                choices are stored in your own browser.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Your rights</h2>
              <p className="mt-2">
                Under UK GDPR you can ask for a copy of the personal data we hold about you,
                ask us to correct or delete it, or object to our processing — email{" "}
                <a href="mailto:hello@skyquote.co.uk" className="text-brand-600 underline">
                  hello@skyquote.co.uk
                </a>
                . You can also complain to the Information Commissioner&rsquo;s Office
                (ico.org.uk).
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
