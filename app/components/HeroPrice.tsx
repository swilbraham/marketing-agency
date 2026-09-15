import { isLive, discount, offer } from "../data/offer";

/* Matches the featured "Complete landing page" tier in Pricing.tsx. */
const LANDING_PAGE_SETUP = 399;

export default function HeroPrice() {
  return (
    <p className="mt-4 text-sm text-slate-500">
      No sign-up.{" "}
      {isLive() ? (
        <>
          <span className="font-semibold text-brand-700">
            {offer.percentOff}% off setup at launch
          </span>{" "}
          — <span className="line-through">£{LANDING_PAGE_SETUP}</span>{" "}
          <span className="font-semibold text-ink">
            £{discount(LANDING_PAGE_SETUP)}
          </span>{" "}
          to have it built and installed.
        </>
      ) : (
        <>£{LANDING_PAGE_SETUP} to have it built and installed.</>
      )}
    </p>
  );
}
