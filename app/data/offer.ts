/* ---------------------------------------------------------------
   Launch offer. Deliberately not date-based: a dated countdown that
   outlives its deadline reads as an abandoned site to paid traffic.
   Set active:false and every trace of it disappears — banner,
   struck-through prices, the lot.
   --------------------------------------------------------------- */
export const offer = {
  active: true,
  percentOff: 50,
  what: "the one-off setup fee",
  /** Shown wherever the discount needs a reason. */
  reason: "while we build our first case studies",
};

/** Discount rounded down, so the saving is never less than advertised. */
export function discount(price: number): number {
  return Math.floor(price * (1 - offer.percentOff / 100));
}

export function isLive(): boolean {
  return offer.active;
}
