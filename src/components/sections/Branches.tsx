"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig, contactIsReal } from "@/config/site";
import { MumbaiPoster } from "@/components/sections/MumbaiPoster";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

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
  const [active, setActive] = useState(0);

  return (
    <section
      id="branches"
      className="relative h-[100svh] w-full overflow-hidden"
      style={{ perspective: "1600px" }}
    >
      <MumbaiPoster active={active} onActivate={setActive} />

      {/* ── The two doors, top right, paper on the plate ─────────────── */}
      <div className="u-on-light absolute right-4 top-4 flex w-[min(21rem,calc(100vw-2rem))] flex-col gap-2.5 md:right-6 md:top-6">
        {siteConfig.branches.map((b, i) => (
          <Reveal key={b.id} delay={i * 0.08} variant="slide" x={24}>
            <div
              className={cn(
                "rounded-[var(--radius-brand)] border p-4 backdrop-blur-[6px] transition-all duration-[400ms] md:p-5",
                active === i
                  ? "border-gold/50 bg-cream/95 shadow-[0_18px_40px_-18px_rgba(4,23,15,0.8)]"
                  : "border-line bg-cream/80",
              )}
              onMouseEnter={() => setActive(i)}
              onFocus={() => setActive(i)}
            >
              <div className="flex items-baseline justify-between gap-3">
                <h3 className="font-display text-lg font-light leading-none text-text-strong md:text-xl">
                  {b.area}
                </h3>
                <span className="font-body text-[0.6rem] tracking-[0.16em] text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
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
                {/* Shown only once real numbers are published. It used to
                    fall back to the booking form; that page is gone, and a
                    Call button that dials a placeholder fails silently. Get
                    directions still works either way, so the card is never
                    left without an action. */}
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
        ))}
        {siteConfig.branches.some((b) => !b.verified) ? (
          <p className="self-end rounded-full bg-[#04170f]/60 px-2.5 py-1 font-body text-[0.6rem] leading-none text-beige/80 backdrop-blur-[3px]">
            Phone numbers and hours pending confirmation.
          </p>
        ) : null}
      </div>
    </section>
  );
}
