import { offer, isLive } from "../data/offer";

export default function OfferBar() {
  if (!isLive()) return null;

  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-sm">
        <span className="rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wide">
          {offer.percentOff}% off
        </span>
        <span>
          Launch pricing — {offer.percentOff}% off {offer.what},{" "}
          {offer.reason}.
        </span>
        <a
          href="#pricing"
          className="font-semibold text-brand-400 underline underline-offset-2 hover:text-brand-300"
        >
          See pricing
        </a>
      </div>
    </div>
  );
}
