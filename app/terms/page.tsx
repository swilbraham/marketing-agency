import type { Metadata } from "next";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata: Metadata = {
  title: "Terms of service — SkyQuote",
  description: "The terms that apply to SkyQuote plans and this website.",
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-16">
          <h1 className="text-3xl font-bold tracking-tight">Terms of service</h1>
          <p className="mt-2 text-sm text-slate-500">Last updated: 15 September 2026</p>

          <div className="prose prose-slate mt-8 max-w-none space-y-6 text-slate-700">
            <section>
              <h2 className="text-xl font-semibold text-ink">The service</h2>
              <p className="mt-2">
                SkyQuote builds and hosts instant quote calculators and landing pages for
                trades. Depending on your plan, we provide either a complete hosted landing
                page or an embeddable calculator, set up with your services, rates and
                branding. Enquiries made through your calculator are emailed to you and
                belong to you.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Fees and cancellation</h2>
              <ul className="mt-2 list-disc space-y-2 pl-6">
                <li>Each plan has a one-off setup fee and a monthly fee, as shown on the pricing page at the time you order.</li>
                <li>There is no minimum term. Cancel with 30 days&rsquo; notice by email; the monthly fee stops at the end of that notice period.</li>
                <li>On the landing page plan, your domain name is yours and we&rsquo;ll transfer it to you if you leave.</li>
                <li>
                  <strong>First-month guarantee:</strong> if your calculator brings you no
                  enquiries at all in your first 30 days, tell us and we won&rsquo;t charge
                  the second month.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Quotes are estimates</h2>
              <p className="mt-2">
                Prices shown by a calculator are estimates based on the areas your customer
                traces and the rates you give us. Satellite imagery and customer tracing are
                not a survey; you are responsible for confirming the final price before
                doing the work, and we recommend your pages say the figure is an estimate
                (ours do by default).
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Your responsibilities</h2>
              <p className="mt-2">
                You&rsquo;re responsible for the accuracy of the rates, services and
                business details you ask us to publish, and for having the right to use any
                logos or photos you supply.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Availability and liability</h2>
              <p className="mt-2">
                We aim to keep your calculator online at all times but can&rsquo;t promise
                uninterrupted service — hosting and mapping depend on third parties
                (including Google Maps). Our total liability under these terms is limited to
                the fees you&rsquo;ve paid us in the 12 months before the claim. Nothing in
                these terms limits liability that can&rsquo;t be limited by law.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold text-ink">Contact</h2>
              <p className="mt-2">
                Questions about these terms:{" "}
                <a href="mailto:hello@skyquote.co.uk" className="text-brand-600 underline">
                  hello@skyquote.co.uk
                </a>
                . These terms are governed by the law of England and Wales.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
