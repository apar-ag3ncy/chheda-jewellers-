"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * BRANCHES — the whole of Mumbai, drawn, with the two doors pinned on it.
 *
 * The map is a hand-drawn silhouette of Greater Mumbai (the Colaba peninsula,
 * Marine Drive's bay, the Malabar Hill and Bandra headlands, Juhu's shore,
 * the northern suburbs, Thane Creek down the east) with the national park,
 * Powai lake, the airport's crossed runways and the two suburban rail lines —
 * Western through Vile Parle, Central through Ghatkopar — because those two
 * lines are exactly how customers actually reach the two shops.
 *
 * Pin positions are PROJECTED from the real coordinates in `config/site`, not
 * eyeballed: fix the lat/lng there and the pin moves here.
 */

/* Linear projection of Greater Mumbai onto the SVG viewBox. */
const VIEW = { w: 400, h: 720 };
const BOUNDS = { west: 72.75, east: 72.99, north: 19.295, south: 18.885 };

function project(lat: number, lng: number): { x: number; y: number } {
  return {
    x: ((lng - BOUNDS.west) / (BOUNDS.east - BOUNDS.west)) * VIEW.w,
    y: ((BOUNDS.north - lat) / (BOUNDS.north - BOUNDS.south)) * VIEW.h,
  };
}

/**
 * Greater Mumbai, simplified to its recognisable line. Clockwise from the
 * Colaba tip: up the west coast (Marine Drive bay, Malabar Hill, Worli,
 * Mahim bay, Bandra point, Juhu, Versova, the Madh and Gorai inlets), across
 * the northern boundary, down Thane Creek, around the Trombay bulge and the
 * docks, back to the tip.
 */
const MUMBAI =
  "M108,702 C102,684 100,668 100,650 C104,635 109,618 105,600 " +
  "C99,605 90,607 87,600 C85,589 90,581 94,575 C98,570 100,564 100,556 " +
  "C100,538 95,520 94,504 C98,488 110,473 121,465 C129,460 135,458 138,457 " +
  "C129,451 115,446 106,438 C110,416 115,392 118,370 C116,358 114,350 112,340 " +
  "C106,326 101,312 98,300 C93,290 88,282 85,275 C78,268 72,262 70,255 " +
  "C64,232 63,205 62,180 C63,150 66,118 70,95 C100,68 138,45 170,35 " +
  "C220,30 280,36 320,45 C335,58 348,72 355,90 C366,110 374,130 378,150 " +
  "C386,172 390,192 390,215 C386,245 380,275 372,300 C362,318 350,332 340,345 " +
  "C333,362 327,378 322,395 C318,413 313,432 310,450 C326,468 344,486 350,505 " +
  "C348,522 343,536 335,545 C322,556 306,562 290,565 C265,572 240,577 215,580 " +
  "C202,600 188,620 175,635 C162,650 148,660 135,668 C126,680 116,692 108,702 Z";

/** Sanjay Gandhi National Park — the green heart of the northern suburbs. */
const FOREST =
  "M150,90 C190,70 250,66 290,80 C310,110 318,150 310,190 C295,225 260,245 220,240 " +
  "C185,232 158,205 148,170 C143,140 144,112 150,90 Z";

/** Western line (Churchgate → past Vile Parle → north). */
const RAIL_WESTERN = "M122,648 C145,560 152,500 158,462 C164,410 168,300 174,100";
/** Central line (CSMT → past Ghatkopar → north-east). */
const RAIL_CENTRAL = "M140,660 C185,560 225,470 242,418 C258,388 290,260 326,120";

/** Locality reference dots — restrained, just enough to orient. */
const LOCALITIES = [
  { name: "Colaba", lat: 18.915, lng: 72.825, anchor: "start" },
  { name: "Dadar", lat: 19.019, lng: 72.844, anchor: "start" },
  { name: "Bandra", lat: 19.055, lng: 72.83, anchor: "end" },
  { name: "Powai", lat: 19.125, lng: 72.906, anchor: "start" },
] as const;

/** CSMIA — between the two shops, which is a genuinely useful landmark. */
const AIRPORT = { lat: 19.0926, lng: 72.868 };

export function Branches() {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

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
          title={"Two doors,\n*one welcome*"}
          intro="Jewellery is meant to be seen, held and tried on. Come sit with us over chai — no appointment needed, though we love it when you book ahead."
          size="md"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* ── Branch cards ─────────────────────────────────────────── */}
          <div className="lg:col-span-5">
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

          {/* ── The map ──────────────────────────────────────────────── */}
          <Reveal className="lg:col-span-7">
            <div className="u-on-dark relative h-[520px] w-full overflow-hidden rounded-[var(--radius-brand)] border border-line bg-green-deep md:h-[640px]">
              <MumbaiMap active={active} reduce={reduce} />
              <div className="pointer-events-none absolute left-6 top-6">
                <p className="font-body text-[0.66rem] uppercase tracking-[0.2em] text-text-muted">
                  Greater Mumbai
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-5 right-6">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-text-muted/80">
                  Western line · Vile Parle&ensp;—&ensp;Central line · Ghatkopar
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function MumbaiMap({ active, reduce }: { active: number; reduce: boolean }) {
  const pins = siteConfig.branches.map((b) => ({
    ...project(b.coordinates.lat, b.coordinates.lng),
    area: b.area,
    landmark: b.addressLines[0]!.replace("Near ", ""),
  }));
  const airport = project(AIRPORT.lat, AIRPORT.lng);

  return (
    <svg
      viewBox={`0 0 ${VIEW.w} ${VIEW.h}`}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label={`Map of Greater Mumbai showing both boutiques: ${siteConfig.branches
        .map((b) => b.area)
        .join(" and ")}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cj-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--green-deep)" />
          <stop offset="1" stopColor="var(--green)" />
        </linearGradient>
        <radialGradient id="cj-landlight" cx="0.45" cy="0.5" r="0.7">
          <stop offset="0" stopColor="var(--green-soft)" stopOpacity="0.55" />
          <stop offset="1" stopColor="var(--green-soft)" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {/* the sea — oversized so it reaches the plate's edges however
          the viewBox letter-fits inside it */}
      <rect x="-500" y="-500" width={VIEW.w + 1000} height={VIEW.h + 1000} fill="url(#cj-sea)" />

      {/* the city */}
      <path
        d={MUMBAI}
        fill="url(#cj-landlight)"
        stroke="var(--line-strong)"
        strokeWidth="1.1"
      />

      {/* the national park and Powai lake */}
      <path d={FOREST} fill="var(--green)" opacity="0.5" />
      <ellipse
        cx={project(19.125, 72.906).x}
        cy={project(19.125, 72.906).y}
        rx="11"
        ry="7"
        fill="var(--green-deep)"
        opacity="0.85"
      />

      {/* the two rail lines — how customers actually arrive */}
      <g fill="none" stroke="var(--gold)" strokeWidth="1.1" strokeDasharray="1.5 4" opacity="0.5">
        <path d={RAIL_WESTERN} />
        <path d={RAIL_CENTRAL} />
      </g>

      {/* the airport, between the two doors */}
      <g
        transform={`translate(${airport.x} ${airport.y})`}
        stroke="var(--beige-dim)"
        strokeWidth="3"
        opacity="0.55"
        strokeLinecap="round"
      >
        <line x1="-13" y1="7" x2="13" y2="-7" />
        <line x1="-6" y1="-9" x2="8" y2="8" />
      </g>
      <text
        x={airport.x + 18}
        y={airport.y + 3}
        className="font-body"
        fontSize="9"
        letterSpacing="1.5"
        fill="var(--beige-dim)"
        opacity="0.8"
      >
        CSMIA
      </text>

      {/* locality bearings */}
      {LOCALITIES.map((l) => {
        const p = project(l.lat, l.lng);
        return (
          <g key={l.name}>
            <circle cx={p.x} cy={p.y} r="2" fill="var(--beige-dim)" opacity="0.65" />
            <text
              x={l.anchor === "end" ? p.x - 7 : p.x + 7}
              y={p.y + 3}
              textAnchor={l.anchor}
              className="font-body"
              fontSize="9.5"
              letterSpacing="1.2"
              fill="var(--beige-dim)"
              opacity="0.85"
            >
              {l.name.toUpperCase()}
            </text>
          </g>
        );
      })}

      {/* water labels */}
      <text
        x="34"
        y="430"
        className="font-display"
        fontSize="15"
        letterSpacing="6"
        fill="var(--beige-dim)"
        opacity="0.55"
        transform="rotate(-90 34 430)"
      >
        ARABIAN SEA
      </text>
      <text
        x="384"
        y="220"
        className="font-display"
        fontSize="11"
        letterSpacing="4"
        fill="var(--beige-dim)"
        opacity="0.5"
        transform="rotate(76 384 220)"
      >
        THANE CREEK
      </text>

      {/* ── the two doors ─────────────────────────────────────────────── */}
      {pins.map((p, i) => {
        const on = active === i;
        const vp = i === 0;
        // Vile Parle reads up-and-left into the sea; Ghatkopar sits under its
        // own pin, centred, clear of the creek edge.
        const lx = vp ? p.x - 30 : p.x + 2;
        const ly = vp ? p.y - 42 : p.y + 46;
        const anchor = vp ? "end" : "middle";
        return (
          <g key={p.area}>
            {/* leader */}
            <path
              d={
                vp
                  ? `M${p.x - 7},${p.y - 6} L${lx + 4},${ly + 12}`
                  : `M${p.x},${p.y + 8} L${lx},${ly - 15}`
              }
              stroke="var(--gold)"
              strokeWidth="0.9"
              opacity={on ? 0.85 : 0.45}
              style={{ transition: "opacity .4s var(--ease-lux)" }}
            />
            {/* pin */}
            <circle
              cx={p.x}
              cy={p.y}
              r="15"
              fill="var(--gold)"
              opacity={on ? 0.22 : 0.1}
              style={{ transition: "opacity .4s var(--ease-lux)" }}
            />
            {on && !reduce ? (
              <circle cx={p.x} cy={p.y} r="9" fill="none" stroke="var(--gold-light)" strokeWidth="1">
                <animate attributeName="r" from="7" to="20" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            ) : null}
            <circle
              cx={p.x}
              cy={p.y}
              r={on ? 5.5 : 4.5}
              fill={on ? "var(--gold-light)" : "var(--gold)"}
              stroke="var(--green-deep)"
              strokeWidth="1.4"
              style={{ transition: "all .4s var(--ease-lux)" }}
            />
            {/* callout */}
            <text
              x={lx}
              y={ly}
              textAnchor={anchor}
              className="font-body"
              fontSize="11"
              fontWeight="600"
              letterSpacing="1.8"
              fill={on ? "var(--gold-light)" : "var(--beige)"}
              style={{ transition: "fill .4s var(--ease-lux)" }}
            >
              {p.area.toUpperCase()}
            </text>
            <text
              x={lx}
              y={ly + 14}
              textAnchor={anchor}
              className="font-body"
              fontSize="9"
              letterSpacing="1"
              fill="var(--beige-dim)"
            >
              {p.landmark}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
