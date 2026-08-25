/** Formatting helpers - Indian locale conventions. */

const inrPerGram = new Intl.NumberFormat("en-IN", {
  maximumFractionDigits: 0,
});

/** 1,23,456 (no symbol) - for large numerals with a separate ₹ glyph. */
export function formatNumberIN(value: number): string {
  return inrPerGram.format(value);
}
