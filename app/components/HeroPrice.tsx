"use client";

import { useEffect, useState } from "react";
import { isLive, discount, offer } from "../data/offer";

const LOWEST_SETUP = 199;

export default function HeroPrice() {
  const [live, setLive] = useState(isLive());
  useEffect(() => {
    const t = setInterval(() => setLive(isLive()), 60000);
    setLive(isLive());
    return () => clearInterval(t);
  }, []);

  return (
    <p className="mt-4 text-sm text-slate-500">
      No sign-up.{" "}
      {live ? (
        <>
          <span className="font-semibold text-brand-700">
            {offer.percentOff}% off setup this week
          </span>{" "}
          — from{" "}
          <span className="line-through">£{LOWEST_SETUP}</span>{" "}
          <span className="font-semibold text-ink">
            £{discount(LOWEST_SETUP)}
          </span>{" "}
          to have it built and installed.
        </>
      ) : (
        <>From £{LOWEST_SETUP} to have it built and installed.</>
      )}
    </p>
  );
}
