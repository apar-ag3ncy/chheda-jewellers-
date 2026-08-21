/**
 * LIVE GOLD RATE — provider abstraction.
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
const BASE_24K = 8450;
const PURITY_22K = 22 / 24;

function indicativeRates(): GoldRate[] {
  const now = new Date();
  // Deterministic ±0.6% intraday drift from the hour+minute — no randomness.
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
 * Live provider adapters. Kept minimal & clearly scoped; they return null on
 * any failure so the caller falls back to indicative values gracefully.
 */
async function fetchFromMetalsDev(): Promise<GoldRate[] | null> {
  if (!API_KEY) return null;
  try {
    const res = await fetch(
      `https://api.metals.dev/v1/latest?api_key=${API_KEY}&currency=INR&unit=g`,
      { next: { revalidate: 600 } },
    );
    if (!res.ok) return null;
    const data: { metals?: { gold?: number } } = await res.json();
    const price24 = data.metals?.gold;
    if (typeof price24 !== "number") return null;
    const updatedAt = new Date().toISOString();
    return [
      { karat: "24K", pricePerGram: Math.round(price24), currency: "INR", city: CITY, updatedAt, source: "metals.dev", indicative: false },
      { karat: "22K", pricePerGram: Math.round(price24 * PURITY_22K), currency: "INR", city: CITY, updatedAt, source: "metals.dev", indicative: false },
    ];
  } catch {
    return null;
  }
}

/** Public accessor used by the Route Handler. Always resolves. */
export async function getGoldRate(): Promise<GoldRateResponse> {
  let rates: GoldRate[] | null = null;

  if (PROVIDER === "metals-dev") rates = await fetchFromMetalsDev();
  // TODO(client): add `goldapi` adapter similarly when chosen.

  const resolved = rates ?? indicativeRates();
  const indicative = resolved.some((r) => r.indicative);

  return {
    city: CITY,
    rates: resolved,
    updatedAt: resolved[0]?.updatedAt ?? new Date().toISOString(),
    indicative,
    disclaimer: DISCLAIMER,
  };
}
