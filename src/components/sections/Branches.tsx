"use client";

import Link from "next/link";
import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { MAP_VIEW, projectPoint } from "@/lib/mumbai-geo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * VISIT THE HOUSE - the two doors, on a map poster of the city they are in.
 *
 * The map is a real one. `public/media/map/mumbai-network.svg` is generated
 * from OpenStreetMap: every motorway, trunk and primary road in gold, the
 * suburban rail corridors in white, and roughly eighteen thousand residential
 * streets underneath as texture. That texture is the whole point - it is what
 * makes the shape read as Mumbai rather than as a diagram of Mumbai.
 *
 * It ships as a static SVG rather than inline markup for two reasons: 448 KB
 * of path data has no business in the homepage's HTML payload, and as a
 * separate file it is cached, lazily fetched and compressed to about 180 KB
 * on the wire. The pins are drawn in React on top and positioned through the
 * same `projectPoint` the geometry was generated with, so they land on the
 * real coordinates rather than on eyeballed offsets.
 *
 * The plate is dark on a cream section - the section sits between a green and
 * a deep one and cannot be either - so its contents are scoped `u-on-dark` to
 * flip the type back. The addresses stay outside the plate on cream, because
 * they are the part of this section that has a job to do.
 *
 * Map data (c) OpenStreetMap contributors, ODbL - the credit below is required.
 */

/** Where each branch falls inside the poster, as a percentage of the plate. */
const PINS = siteConfig.branches.map((b) => {
  const { x, y } = projectPoint(b.coordinates.lat, b.coordinates.lng);
  return { id: b.id, area: b.area, left: (x / MAP_VIEW.w) * 100, top: (y / MAP_VIEW.h) * 100 };
});

const CENTRE = {
  lat: (siteConfig.branches[0]!.coordinates.lat + siteConfig.branches[1]!.coordinates.lat) / 2,
  lng: (siteConfig.branches[0]!.coordinates.lng + siteConfig.branches[1]!.coordinates.lng) / 2,
};

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
            <figure className="u-on-dark relative overflow-hidden rounded-[var(--radius-brand)] bg-green-deep">
              {/*
                A plain <img>, not next/image: this is a vector, so the image
                optimiser has nothing to gain, and routing SVG through it would
                mean turning on dangerouslyAllowSVG for the whole project.
              */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/media/map/mumbai-network.svg"
                alt="Street map of Greater Mumbai, its arterial roads and suburban railway lines drawn in gold and white on deep green"
                width={MAP_VIEW.w}
                height={MAP_VIEW.h}
                loading="lazy"
                decoding="async"
                className="block w-full"
              />

              {/* Corner vignette, so the plate reads as a printed poster. */}
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0"
                style={{
                  background:
                    "radial-gradient(120% 78% at 50% 34%, transparent 42%, rgba(4,23,15,0.55) 100%), linear-gradient(to bottom, transparent 58%, rgba(4,23,15,0.88) 100%)",
                }}
              />

              {/* ── The two doors ──────────────────────────────────────── */}
              {PINS.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-label={`Show the ${p.area} boutique`}
                  aria-pressed={active === i}
                  className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full p-3 outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
                  style={{ left: `${p.left}%`, top: `${p.top}%` }}
                >
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 m-auto h-8 w-8 rounded-full border border-gold-light transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                      active === i ? "scale-100 opacity-70" : "scale-50 opacity-0",
                    )}
                  />
                  <span
                    aria-hidden
                    className={cn(
                      "block h-2.5 w-2.5 rounded-full bg-gold-light shadow-[0_0_0_3px_rgba(4,23,15,0.7),0_0_14px_4px_rgba(240,207,170,0.55)] transition-transform duration-500 ease-[var(--ease-cinema)]",
                      active === i && "scale-[1.35]",
                    )}
                  />
                  {/*
                    The label needs a plate of its own. Set straight onto the
                    map it fell into the road network and became unreadable -
                    the streets under a pin are the densest part of the frame.
                  */}
                  <span
                    className={cn(
                      "pointer-events-none absolute left-1/2 top-full mt-1.5 -translate-x-1/2 whitespace-nowrap rounded-full px-2 py-[0.2rem] font-body text-[0.58rem] uppercase tracking-[0.18em] backdrop-blur-[2px] transition-colors duration-500",
                      active === i
                        ? "bg-green-deep/85 text-gold-light"
                        : "bg-green-deep/65 text-beige/85",
                    )}
                  >
                    {p.area}
                  </span>
                </button>
              ))}

              {/* ── The plate's lockup ─────────────────────────────────── */}
              <figcaption className="pointer-events-none absolute inset-x-0 bottom-0 px-6 pb-6 text-center md:px-8 md:pb-8">
                <p className="font-body text-[clamp(1.1rem,3.4vw,1.9rem)] font-light uppercase leading-none tracking-[0.42em] text-offwhite -mr-[0.42em]">
                  Mumbai
                </p>
                <span
                  aria-hidden
                  className="mx-auto mt-3 block h-px w-16 bg-gold-light/45 md:w-20"
                />
                <p className="mt-3 font-body text-[0.58rem] uppercase tracking-[0.3em] text-beige/75">
                  {siteConfig.branches.length} doors &middot; India
                </p>
                <p className="mt-2 font-body text-[0.54rem] tracking-[0.14em] text-beige/50 tabular-nums">
                  {CENTRE.lat.toFixed(4)}&deg; N / {CENTRE.lng.toFixed(4)}&deg; E
                </p>
              </figcaption>

              <p className="pointer-events-none absolute bottom-2 right-3 font-body text-[0.5rem] tracking-[0.08em] text-beige/40">
                &copy; OpenStreetMap contributors
              </p>
            </figure>
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
