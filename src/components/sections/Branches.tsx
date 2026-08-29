"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, contactIsReal } from "@/config/site";
import { MumbaiPoster } from "@/components/sections/MumbaiPoster";
import { Reveal } from "@/components/motion/Reveal";

/**
 * VISIT THE HOUSE - one full-screen landscape of the city, nothing else,
 * closing the scroll: the last section before the sign-off footer, so the
 * page ends on the map and the two addresses.
 *
 * The section is a single 100svh cover: the map fills it edge to edge and
 * the two address cards float compact at the top right, paper on the dark
 * plate. No heading, no columns - the map is the section.
 *
 * Ground note: this carries NO data-bg, deliberately. It is full-bleed
 * imagery like the hero and the sign-off photograph, and none of those take
 * part in the painted sections' cream/dark alternation - the map is opaque
 * and fills the viewport, so whatever the themer holds behind it is never
 * seen, and its own edges already feather into --green-deep. Giving it a
 * ground made it the 13th item in a 12-item alternation, which cannot
 * alternate: with a light section second and this one last, the run only
 * works on an even count.
 *
 * Map data (c) OpenStreetMap contributors, ODbL.
 */

export function Branches() {
  /**
   * null until a pin is clicked - the map opens clean, with no card on it.
   * Clicking the active pin again puts it away. The cards are the map's
   * ANSWERS now, not its furniture: they exist only while asked for.
   */
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      id="branches"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ perspective: "1600px" }}
    >
      <MumbaiPoster active={active} onActivate={(i) => setActive((a) => (a === i ? null : i))} />

      {/* ── The answer card - only for the pin that was clicked ──────── */}
      <div className="u-on-light absolute right-4 top-4 w-[min(21rem,calc(100vw-2rem))] md:right-6 md:top-6">
        {siteConfig.branches.map((b, i) =>
          active === i ? (
            <Reveal key={b.id} variant="slide" x={24}>
              <div className="rounded-[var(--radius-brand)] border border-gold/50 bg-cream/95 p-4 shadow-[0_18px_40px_-18px_rgba(4,23,15,0.8)] backdrop-blur-[6px] md:p-5">
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="font-display text-lg font-light leading-none text-text-strong md:text-xl">
                    {b.area}
                  </h3>
                  <button
                    type="button"
                    aria-label="Close"
                    onClick={() => setActive(null)}
                    className="-m-2 flex h-9 w-9 items-center justify-center rounded-full font-body text-[0.9rem] leading-none text-text-muted transition-colors hover:text-text-strong"
                  >
                    ×
                  </button>
                </div>
                <p className="mt-2 font-body text-[0.76rem] font-light leading-relaxed text-text-muted">
                  {b.addressLines.join(", ")}, {b.city} {b.pincode}
                </p>
                <p className="mt-1.5 font-body text-[0.7rem] tracking-wide text-text-muted">{b.hours}</p>
                <div className="mt-3.5 flex flex-wrap gap-2">
                  <Link
                    href={b.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[38px] items-center rounded-full border border-line-strong px-3.5 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.14em] text-text-strong transition-colors hover:border-gold hover:bg-gold/10"
                  >
                    Get directions
                  </Link>
                  {/* Shown only once real numbers are published - a Call
                      button that dials a placeholder fails silently. */}
                  {contactIsReal() ? (
                    <Link
                      href={`tel:${b.phone.replace(/\s+/g, "")}`}
                      className="inline-flex min-h-[38px] items-center rounded-full border border-line px-3.5 py-1.5 font-body text-[0.6rem] uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-text-strong"
                    >
                      Call
                    </Link>
                  ) : null}
                </div>
              </div>
            </Reveal>
          ) : null,
        )}
        {siteConfig.branches.some((b) => !b.verified) && active !== null ? (
          <p className="mt-2.5 self-end rounded-full bg-[#04170f]/60 px-2.5 py-1 text-right font-body text-[0.6rem] leading-none text-beige/80 backdrop-blur-[3px]">
            Phone numbers and hours pending confirmation.
          </p>
        ) : null}
      </div>
    </section>
  );
}
