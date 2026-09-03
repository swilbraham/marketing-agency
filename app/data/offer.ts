/* ---------------------------------------------------------------
   Launch offer. Set active:false (or let endsAt pass) and every
   trace of it disappears — banner, struck-through prices, the lot.
   --------------------------------------------------------------- */
export const offer = {
  active: true,
  percentOff: 50,
  what: "the one-off setup fee",
  /** Local time. After this the site quietly returns to full price. */
  endsAt: "2026-09-10T23:59:59+01:00",
};

export function offerEndDate(): Date {
  return new Date(offer.endsAt);
}

/** Discount rounded down, so the saving is never less than advertised. */
export function discount(price: number): number {
  return Math.floor(price * (1 - offer.percentOff / 100));
}

export function isLive(now: number = Date.now()): boolean {
  return offer.active && now < offerEndDate().getTime();
}

export function endsLabel(): string {
  return offerEndDate().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}
