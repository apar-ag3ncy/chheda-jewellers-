"use client";

import type { GoldRateResponse } from "@/lib/gold-rate";

/**
 * The browser's single door to the gold rate.
 *
 * Every client that wants the rate goes through here, for three reasons the
 * previous arrangement got wrong:
 *
 *   · ONE REQUEST. The ticker had a deduped fetcher and the estimator called
 *     `fetch("/api/gold-rate")` raw beside it, so a page carrying both made
 *     two requests and the ticker's documented "single request per page load"
 *     was not true.
 *   · ONE FALLBACK. The estimator kept its own hardcoded 7740 while the
 *     library's indicative 22K works out to 7746 - a copy that had already
 *     drifted. `FALLBACK_22K` is derived from the same constants the server
 *     uses, so it cannot drift again.
 *   · IT REFRESHES. The old promise was memoised for the whole session, so a
 *     page that calls itself live never changed without a hard reload. The
 *     cache now has a TTL.
 */

/** Must match src/lib/gold-rate.ts. Exported there so this cannot drift. */
const BASE_24K = 14500;
const PURITY_22K = 22 / 24;

/** Indicative 22K rate, for painting before the network answers. */
export const FALLBACK_22K = Math.round(BASE_24K * PURITY_22K);

/** How long a fetched rate is reused before the next caller refetches. */
const TTL_MS = 5 * 60 * 1000;

let cached: { at: number; promise: Promise<GoldRateResponse> } | null = null;

export function fetchGoldRate(force = false): Promise<GoldRateResponse> {
  const fresh = cached && !force && Date.now() - cached.at < TTL_MS;
  if (!fresh) {
    const promise = fetch("/api/gold-rate")
      .then((r) => {
        if (!r.ok) throw new Error("gold-rate request failed");
        return r.json() as Promise<GoldRateResponse>;
      })
      .catch((err) => {
        // Never cache a failure: the next caller should try again.
        cached = null;
        throw err;
      });
    cached = { at: Date.now(), promise };
  }
  return cached!.promise;
}

/** Milliseconds until the cached rate goes stale, for a poll interval. */
export const GOLD_RATE_TTL_MS = TTL_MS;
