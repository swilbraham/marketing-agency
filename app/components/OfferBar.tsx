"use client";

import { useEffect, useState } from "react";
import { offer, isLive, endsLabel, offerEndDate } from "../data/offer";

/**
 * Rendered on the server while the offer is live, then re-checked in the
 * browser — so it vanishes on its own when the deadline passes, even if
 * the site hasn't been redeployed.
 */
export default function OfferBar() {
  const [live, setLive] = useState(isLive());
  const [left, setLeft] = useState<string>("");

  useEffect(() => {
    function tick() {
      const now = Date.now();
      setLive(isLive(now));

      const ms = offerEndDate().getTime() - now;
      if (ms <= 0) return setLeft("");

      const days = Math.floor(ms / 86400000);
      const hours = Math.floor((ms % 86400000) / 3600000);
      setLeft(
        days >= 1
          ? `${days} day${days === 1 ? "" : "s"} left`
          : `${hours} hour${hours === 1 ? "" : "s"} left`
      );
    }
    tick();
    const t = setInterval(tick, 60000);
    return () => clearInterval(t);
  }, []);

  if (!live) return null;

  return (
    <div className="bg-ink text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-3 gap-y-1 px-6 py-2.5 text-sm">
        <span className="rounded-full bg-brand-600 px-3 py-0.5 text-xs font-bold uppercase tracking-wide">
          {offer.percentOff}% off
        </span>
        <span>
          Launch offer — {offer.percentOff}% off {offer.what}.
        </span>
        <span className="text-slate-400">
          Ends {endsLabel()}
          {left ? ` · ${left}` : ""}
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
