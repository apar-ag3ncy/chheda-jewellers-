/**
 * LIVE GOLD RATE - provider abstraction.
 *
 * Components/pages NEVER call a third-party API directly; they read through
 * the Route Handler at /api/gold-rate, which calls `getGoldRate()` here.
 *
 * The data source is pluggable via env (GOLD_RATE_PROVIDER):
 *   • "fallback"   → indicative, offline-safe values (default; no key needed)
 *   • "metals-dev" → https://metals.dev  (set GOLD_RATE_API_KEY)
 *   • "goldapi"    → https://goldapi.io   (set GOLD_RATE_API_KEY)
 *
 * Every response carries `indicative: true` unless a live provider succeeds,
 * so the UI can always show the correct "indicative rate" disclaimer.
 */

export type Karat = "22K" | "24K";

export interface GoldRate {
  karat: Karat;
  /** Price per gram in INR. */
  pricePerGram: number;
  currency: "INR";
  city: string;
  /** ISO timestamp of when the rate was produced. */
  updatedAt: string;
  /** Human-readable provider label. */
  source: string;
  /** True when the value is indicative (not a live market quote). */
  indicative: boolean;
}

export interface GoldRateResponse {
  city: string;
  rates: GoldRate[];
  updatedAt: string;
  indicative: boolean;
  disclaimer: string;
}

const CITY = process.env.GOLD_RATE_CITY ?? "Mumbai";
const PROVIDER = (process.env.GOLD_RATE_PROVIDER ?? "fallback").toLowerCase();
const API_KEY = process.env.GOLD_RATE_API_KEY ?? "";

const DISCLAIMER =
  "Indicative rate for reference only. Not a live quote or an offer to sell. " +
  "Please confirm the applicable rate in-store before any transaction.";

/**
 * Indicative baseline (₹ per gram). Deliberately approximate.
 * A gentle time-based drift makes the widget feel alive without a live feed.
 * TODO(client): set a live provider + key in .env to replace these.
 */
/** Shared with lib/gold-rate-client so the browser fallback cannot drift. */
export const BASE_24K = 8450;
export const PURITY_22K = 22 / 24;

function indicativeRates(): GoldRate[] {
  const now = new Date();
  // Deterministic ±0.6% intraday drift from the hour+minute - no randomness.
  const minuteOfDay = now.getHours() * 60 + now.getMinutes();
  const drift = Math.sin((minuteOfDay / 1440) * Math.PI * 2) * 0.006;
  const price24 = Math.round(BASE_24K * (1 + drift));
  const price22 = Math.round(price24 * PURITY_22K);
  const updatedAt = now.toISOString();

  return [
    {
      karat: "24K",
      pricePerGram: price24,
      currency: "INR",
      city: CITY,
      updatedAt,
      source: "Indicative",
      indicative: true,
    },
    {
      karat: "22K",
      pricePerGram: price22,
      currency: "INR",
      city: CITY,
      updatedAt,
      source: "Indicative",
      indicative: true,
    },
  ];
}

/**
 * Live provider adapters. Each returns null on ANY failure so the caller can
 * fall back gracefully - a jeweller's site must never render a wrong number
 * confidently, and must never render nothing at all.
 *
 * ── On accuracy ───────────────────────────────────────────────────────────
 * International spot gold is quoted in USD per TROY OUNCE. Indian RETAIL rates
 * are not spot: they add import duty, GST and a local premium, and the number
 * families actually quote each morning is the IBJA (India Bullion & Jewellers
 * Association) rate for their city. So:
 *   • a spot feed converted to INR/g is CLOSE, but is not the counter rate;
 *   • only an IBJA-aligned feed should ever be shown without the "indicative"
 *     flag on it.
 * `indicative` is therefore true for every source except an IBJA-grade one.
 */

const GRAMS_PER_TROY_OUNCE = 31.1034768;

function build(
  price24PerGram: number,
  source: string,
  indicative: boolean,
): GoldRate[] {
  const updatedAt = new Date().toISOString();
  const mk = (karat: Karat, perGram: number): GoldRate => ({
    karat,
    pricePerGram: Math.round(perGram),
    currency: "INR",
    city: CITY,
    updatedAt,
    source,
    indicative,
  });
  return [
    mk("24K", price24PerGram),
    mk("22K", price24PerGram * PURITY_22K),
  ];
}

/** metals.dev - supports INR and per-gram directly, so no conversion needed. */
async function fetchFromMetalsDev(): Promise<GoldRate[] | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${encodeURIComponent(API_KEY)}&currency=INR&unit=g`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data: { status?: string; metals?: { gold?: number } } = await res.json();
    const price = data.metals?.gold;
    if (typeof price !== "number" || !Number.isFinite(price) || price <= 0) return null;
    // Spot-derived, so still flagged indicative for Indian retail purposes.
    return build(price, "metals.dev (spot)", true);
  } catch {
    return null;
  }
}

/** GoldAPI.io - quotes XAU in the requested currency; price_gram_24k is provided. */
async function fetchFromGoldApi(): Promise<GoldRate[] | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch("https://www.goldapi.io/api/XAU/INR", {
      headers: { "x-access-token": API_KEY, "Content-Type": "application/json" },
      next: { revalidate: 600 },
    });
    if (!res.ok) return null;
    const data: { price_gram_24k?: number; price?: number } = await res.json();
    const perGram =
      typeof data.price_gram_24k === "number" && data.price_gram_24k > 0
        ? data.price_gram_24k
        : typeof data.price === "number" && data.price > 0
          ? data.price / GRAMS_PER_TROY_OUNCE
          : null;
    if (perGram === null || !Number.isFinite(perGram)) return null;
    return build(perGram, "goldapi.io (spot)", true);
  } catch {
    return null;
  }
}

/**
 * IBJA-aligned feed - the ONLY source we would publish as non-indicative,
 * because it is the rate Indian jewellers actually quote.
 *
 * TODO(client): IBJA does not offer a free public API. To show a true counter
 * rate you need either (a) a paid IBJA-derived data subscription, or (b) a
 * small internal endpoint the shop updates each morning with the rate on the
 * board. Point GOLD_RATE_IBJA_URL at whichever you choose; it must return
 * { "rate22k": <INR per gram>, "rate24k": <INR per gram> }.
 */
async function fetchFromIbja(): Promise<GoldRate[] | null> {
  const url = process.env.GOLD_RATE_IBJA_URL;
  if (!url) return null;
  try {
    const res = await fetch(url, { next: { revalidate: 600 } });
    if (!res.ok) return null;
    const data: { rate22k?: number; rate24k?: number } = await res.json();
    const r24 = data.rate24k;
    const r22 = data.rate22k;
    if (typeof r24 !== "number" && typeof r22 !== "number") return null;
    const price24 = typeof r24 === "number" ? r24 : (r22 as number) / PURITY_22K;
    if (!Number.isFinite(price24) || price24 <= 0) return null;
    // The real counter rate - the one case where indicative is false.
    return build(price24, "IBJA", false);
  } catch {
    return null;
  }
}

/** Public accessor used by the Route Handler. Always resolves. */
export async function getGoldRate(): Promise<GoldRateResponse> {
  let rates: GoldRate[] | null = null;

  // An IBJA feed always wins when configured, whatever PROVIDER says.
  rates = await fetchFromIbja();

  if (!rates) {
    if (PROVIDER === "metals-dev") rates = await fetchFromMetalsDev();
    else if (PROVIDER === "goldapi") rates = await fetchFromGoldApi();
  }

  const resolved = rates ?? indicativeRates();
  const indicative = resolved.some((r) => r.indicative);

  return {
    city: CITY,
    rates: resolved,
    updatedAt: resolved[0]?.updatedAt ?? new Date().toISOString(),
    indicative,
    disclaimer: indicative
      ? DISCLAIMER
      : `Live ${CITY} rate, updated through the day. Confirm the applicable rate in-store before any transaction.`,
  };
}
