/** Formatting helpers — Indian locale conventions. */

const inr = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

const inrPerGram = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** ₹1,23,456 */
export function formatINR(value: number): string {
  return inr.format(value);
}

/** 1,23,456 (no symbol) — for large numerals with a separate ₹ glyph. */
export function formatNumberIN(value: number): string {
  return inrPerGram.format(value);
}

/** Short relative-ish timestamp, e.g. "21 Aug 2026, 4:32 PM". */
export function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return new Intl.DateTimeFormat("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(d);
}
