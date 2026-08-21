"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { formatNumberIN } from "@/lib/format";
import type { GoldRateResponse } from "@/lib/gold-rate";

type Variant = "compact" | "full";

/**
 * Shared, deduped fetch — the widget renders in several places (nav, footer,
 * mobile menu); this ensures a single network request per page load. Cleared
 * on failure so a transient error isn't cached forever.
 */
let ratePromise: Promise<GoldRateResponse> | null = null;
function fetchRate(): Promise<GoldRateResponse> {
  if (!ratePromise) {
    ratePromise = fetch("/api/gold-rate")
      .then((r) => {
        if (!r.ok) throw new Error("gold-rate request failed");
        return r.json() as Promise<GoldRateResponse>;
      })
      .catch((err) => {
        ratePromise = null;
        throw err;
      });
  }
  return ratePromise;
}

/**
 * Live (indicative) gold-rate widget. Reads through the app's own Route
 * Handler — never a third-party API directly. Montserrat numerals.
 */
export function GoldRateTicker({
  variant = "compact",
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const [data, setData] = useState<GoldRateResponse | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    fetchRate()
      .then((d) => active && setData(d))
      .catch(() => active && setError(true));
    return () => {
      active = false;
    };
  }, []);

  const rate22 = data?.rates.find((r) => r.karat === "22K");

  if (variant === "compact") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-body text-[0.7rem] tracking-wide text-text-muted",
          className,
        )}
        title={data ? data.disclaimer : "Live gold rate"}
      >
        <span
          className="inline-block h-1.5 w-1.5 rounded-full bg-gold"
          style={{ animation: "goldpulse 2.4s var(--ease-soft) infinite" }}
          aria-hidden
        />
        <span className="uppercase tracking-[0.16em]">22K</span>
        <span className="tabular-nums text-text-strong">
          {error ? "—" : rate22 ? `₹${formatNumberIN(rate22.pricePerGram)}/g` : "····"}
        </span>
      </span>
    );
  }

  return (
    <div className={cn("w-full", className)}>
      {error ? (
        <p className="font-body text-sm text-text-muted">
          Rate unavailable right now. Please check back shortly.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-brand)] border border-line-strong bg-line-strong sm:grid-cols-2">
          {(data?.rates ?? [{ karat: "24K" }, { karat: "22K" }]).map((r) => {
            const full = "pricePerGram" in r ? r : undefined;
            return (
              <div key={r.karat} className="bg-green-deep p-6 md:p-8">
                <p className="u-eyebrow mb-3">{r.karat} · per gram</p>
                <p className="font-body text-3xl font-light tabular-nums text-text-strong md:text-4xl">
                  {full ? `₹${formatNumberIN(full.pricePerGram)}` : "····"}
                </p>
              </div>
            );
          })}
        </div>
      )}
      {data ? (
        <p className="mt-4 font-body text-[0.72rem] leading-relaxed text-text-muted">
          {data.disclaimer}
        </p>
      ) : null}
    </div>
  );
}
