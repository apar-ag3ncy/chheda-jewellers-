"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MumbaiPoster } from "@/components/sections/MumbaiPoster";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * VISIT THE HOUSE - the two doors, and a map of the city they are in.
 *
 * The plate itself is `MumbaiPoster`: real OpenStreetMap geometry, a cursor
 * torch that lights the roads, and pins that stand off the surface in 3D.
 * This section owns only the pairing - which branch is active, and the
 * addresses that sit beside the map.
 *
 * The plate is dark and the section is cream, because branches sits between
 * a green section and a deep one and can be neither. The addresses stay
 * outside the plate on cream: they are the part of this section with a job
 * to do, and they are sticky because the poster runs taller than the
 * viewport.
 *
 * Map data (c) OpenStreetMap contributors, ODbL.
 */

export function Branches() {
  const [active, setActive] = useState(0);

  return (
    <Section
      id="branches"
      spacing="lg"
      tone="transparent"
      data-bg="beige"
      className="u-on-light"
    >
      <Container>
        <SectionHeading
          eyebrow="Visit the house"
          title={"Vile Parle &\nGhatkopar"}
          intro="Come sit with us over chai - no appointment needed, though we love it when you book ahead."
          size="md"
        />

        <div className="mt-14 grid grid-cols-1 items-start gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-14">
          {/* ── The poster ───────────────────────────────────────────── */}
          <Reveal variant="mask" className="lg:col-span-6">
            <MumbaiPoster active={active} onActivate={setActive} />
          </Reveal>

          {/* ── The addresses, on cream where they can be read ────────── */}
          {/* Sticky: the poster is a 1:1.85 portrait and runs taller than the
              viewport, so the addresses ride alongside it instead of scrolling
              away and leaving a column of empty cream. */}
          <div className="lg:col-span-6 lg:sticky lg:top-28">
            <ul className="flex flex-col gap-5">
              {siteConfig.branches.map((b, i) => (
                <Reveal as="li" key={b.id} delay={i * 0.06}>
                  <div
                    className={cn(
                      "rounded-[var(--radius-brand)] border p-7 transition-colors duration-[400ms] md:p-8",
                      active === i
                        ? "border-line-strong bg-white/65"
                        : "border-line bg-white/40",
                    )}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-display text-2xl font-light text-text-strong md:text-[1.7rem]">
                        {b.area}
                      </h3>
                      <span className="mt-1 font-body text-[0.7rem] tracking-[0.16em] text-gold">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>
                    <p className="mt-3 font-body text-[0.9rem] font-light leading-relaxed text-text-muted">
                      {b.addressLines.join(", ")}, {b.city} {b.pincode}
                    </p>
                    <p className="mt-3 font-body text-[0.82rem] tracking-wide text-text-muted">
                      {b.hours}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={b.directionsUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-5 py-2.5 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-strong transition-colors hover:border-gold hover:bg-gold/10"
                      >
                        Get directions
                      </Link>
                      <Link
                        href={`tel:${b.phone.replace(/\s+/g, "")}`}
                        className="inline-flex min-h-[44px] items-center rounded-full border border-line px-5 py-2.5 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-text-strong"
                      >
                        Call
                      </Link>
                    </div>
                  </div>
                </Reveal>
              ))}
            </ul>
            {siteConfig.branches.some((b) => !b.verified) ? (
              <p className="mt-5 font-body text-[0.72rem] leading-relaxed text-text-muted">
                Phone numbers and hours pending confirmation.
              </p>
            ) : null}
          </div>
        </div>
      </Container>
    </Section>
  );
}
