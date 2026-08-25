"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import {
  MAP_VIEW,
  MUMBAI_CITY_PATHS,
  MUMBAI_SUBURBAN_PATHS,
  projectPoint,
} from "@/lib/mumbai-geo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/**
 * BRANCHES — Greater Mumbai as a chart plate, with the two doors pinned on it.
 *
 * The geography is REAL: both district boundaries come from OpenStreetMap
 * (see lib/mumbai-geo — simplified and projected at generation time), and
 * every marker on the plate is projected from true WGS84 coordinates — the
 * shops from `config/site`, the rail lines through their actual stations,
 * localities, the airport, the national park. Fix a lat/lng and the mark
 * moves.
 *
 * The drawing language is a surveyor's chart done in the house palette: a
 * fine graticule with edge ticks, a luminous coastal glow, bathymetric
 * ripples in the sea, stippled land, the two suburban rail lines as glowing
 * routes (Western through Vile Parle, Central through Ghatkopar — exactly
 * how customers arrive), concentric-ring station marks for the two shops
 * with their coordinates set beside them, a scale bar and a north arrow.
 */

const pt = (lat: number, lng: number) => projectPoint(lat, lng);

/** The two suburban lines, drawn through their real stations. */
const WESTERN_STATIONS: [number, number][] = [
  [18.9351, 72.8277], // Churchgate
  [18.9695, 72.8194], // Mumbai Central
  [19.0189, 72.8446], // Dadar
  [19.0544, 72.8402], // Bandra
  [19.0997, 72.8468], // Vile Parle
  [19.1197, 72.8464], // Andheri
  [19.2307, 72.8567], // Borivali
];
const CENTRAL_STATIONS: [number, number][] = [
  [18.9398, 72.8355], // CSMT
  [18.9764, 72.833], // Byculla
  [19.0186, 72.8484], // Dadar
  [19.0653, 72.8791], // Kurla
  [19.0866, 72.9081], // Ghatkopar
  [19.144, 72.9367], // Bhandup
  [19.1723, 72.9566], // Mulund
];

const line = (stations: [number, number][]) =>
  "M" + stations.map(([la, ln]) => { const p = pt(la, ln); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" L");

/** Sanjay Gandhi National Park, coarsely traced. */
const FOREST_PTS: [number, number][] = [
  [19.14, 72.885], [19.17, 72.87], [19.22, 72.868], [19.26, 72.88],
  [19.27, 72.92], [19.23, 72.945], [19.18, 72.935], [19.15, 72.91],
];
const FOREST =
  "M" + FOREST_PTS.map(([la, ln]) => { const p = pt(la, ln); return `${p.x.toFixed(1)},${p.y.toFixed(1)}`; }).join(" L") + "Z";

const LOCALITIES = [
  { name: "Colaba", lat: 18.915, lng: 72.825, anchor: "start" },
  { name: "Dadar", lat: 19.019, lng: 72.844, anchor: "start" },
  { name: "Bandra", lat: 19.055, lng: 72.83, anchor: "end" },
  { name: "Juhu", lat: 19.098, lng: 72.827, anchor: "end" },
  { name: "Powai", lat: 19.125, lng: 72.906, anchor: "start" },
] as const;

const AIRPORT = { lat: 19.0926, lng: 72.868 };

/** Graticule steps and the scale bar, both in real units. */
const GRID_STEP = 0.05; // degrees
const KM5_PX = (5 / 110.9) * (MAP_VIEW.h / 0.4013); // ≈ five kilometres

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
          title={"Vile Parle &\nGhatkopar"}
          intro="Come sit with us over chai — no appointment needed, though we love it when you book ahead."
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

          {/* ── The chart ────────────────────────────────────────────── */}
          <Reveal className="lg:col-span-7">
            <div className="u-on-dark relative h-[560px] w-full overflow-hidden rounded-[var(--radius-brand)] border border-line bg-green-deep md:h-[680px]">
              <MumbaiChart active={active} reduce={reduce} />
              <div className="pointer-events-none absolute left-6 top-6">
                <p className="font-body text-[0.66rem] uppercase tracking-[0.2em] text-text-muted">
                  Greater Mumbai
                </p>
                <p className="mt-1 font-body text-[0.56rem] uppercase tracking-[0.16em] text-text-muted/70">
                  Two houses · one city
                </p>
              </div>
              <div className="pointer-events-none absolute bottom-5 right-6 text-right">
                <p className="font-body text-[0.6rem] uppercase tracking-[0.18em] text-text-muted/80">
                  Western line · Vile Parle&ensp;—&ensp;Central line · Ghatkopar
                </p>
                <p className="mt-1 font-body text-[0.52rem] tracking-[0.08em] text-text-muted/55">
                  Map data © OpenStreetMap contributors
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function MumbaiChart({ active, reduce }: { active: number; reduce: boolean }) {
  const pins = siteConfig.branches.map((b) => ({
    ...pt(b.coordinates.lat, b.coordinates.lng),
    area: b.area,
    landmark: b.addressLines[0]!.replace("Near ", ""),
    coords: `${b.coordinates.lat.toFixed(4)}° N · ${b.coordinates.lng.toFixed(4)}° E`,
  }));
  const airport = pt(AIRPORT.lat, AIRPORT.lng);
  const powai = pt(19.125, 72.906);
  const land = [...MUMBAI_SUBURBAN_PATHS, ...MUMBAI_CITY_PATHS];

  // Graticule lines at real 0.05° intervals.
  const lngLines: number[] = [];
  for (let lng = 72.8; lng < 72.99; lng += GRID_STEP) lngLines.push(lng);
  const latLines: number[] = [];
  for (let lat = 18.9; lat < 19.28; lat += GRID_STEP) latLines.push(lat);

  return (
    <svg
      viewBox={`0 0 ${MAP_VIEW.w} ${MAP_VIEW.h}`}
      className="h-full w-full overflow-visible"
      role="img"
      aria-label={`Chart of Greater Mumbai showing both boutiques: ${siteConfig.branches
        .map((b) => b.area)
        .join(" and ")}`}
      preserveAspectRatio="xMidYMid meet"
    >
      <defs>
        <linearGradient id="cj-sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--green-deep)" />
          <stop offset="1" stopColor="var(--green)" />
        </linearGradient>
        <radialGradient id="cj-landlight" cx="0.45" cy="0.5" r="0.75">
          <stop offset="0" stopColor="var(--green-soft)" stopOpacity="0.6" />
          <stop offset="1" stopColor="var(--green-soft)" stopOpacity="0.3" />
        </radialGradient>
        {/* stippled land — the chart's paper grain */}
        <pattern id="cj-stipple" width="7" height="7" patternUnits="userSpaceOnUse">
          <circle cx="1.2" cy="1.2" r="0.55" fill="var(--beige)" opacity="0.13" />
          <circle cx="4.7" cy="4.9" r="0.45" fill="var(--beige)" opacity="0.09" />
        </pattern>
        <filter id="cj-glow" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="4" />
        </filter>
      </defs>

      {/* the sea — oversized so it reaches the plate's edges */}
      <rect x="-500" y="-500" width={MAP_VIEW.w + 1000} height={MAP_VIEW.h + 1000} fill="url(#cj-sea)" />

      {/* graticule with edge ticks */}
      <g stroke="var(--line)" strokeWidth="0.4" opacity="0.55">
        {lngLines.map((lng) => {
          const x = pt(19, lng).x;
          return <line key={lng} x1={x} y1="0" x2={x} y2={MAP_VIEW.h} />;
        })}
        {latLines.map((lat) => {
          const y = pt(lat, 72.9).y;
          return <line key={lat} x1="0" y1={y} x2={MAP_VIEW.w} y2={y} />;
        })}
      </g>
      <g className="font-body" fontSize="7" letterSpacing="1" fill="var(--beige-dim)" opacity="0.6">
        {lngLines.map((lng) => (
          <text key={lng} x={pt(19, lng).x + 3} y={MAP_VIEW.h - 6}>
            {lng.toFixed(2)}° E
          </text>
        ))}
        {latLines.map((lat) => (
          <text key={lat} x={6} y={pt(lat, 72.9).y - 4}>
            {lat.toFixed(2)}° N
          </text>
        ))}
      </g>

      {/* coastal glow + bathymetric ripples */}
      <g fill="none">
        {land.map((d, i) => (
          <path key={`g${i}`} d={d} stroke="var(--gold)" strokeWidth="7" opacity="0.1" filter="url(#cj-glow)" />
        ))}
        {land.map((d, i) => (
          <path key={`r${i}`} d={d} stroke="var(--beige)" strokeWidth="0.5" strokeDasharray="1 5" opacity="0.35"
            transform={`translate(${MAP_VIEW.w / 2} ${MAP_VIEW.h / 2}) scale(1.035) translate(${-MAP_VIEW.w / 2} ${-MAP_VIEW.h / 2})`} />
        ))}
        {land.map((d, i) => (
          <path key={`r2${i}`} d={d} stroke="var(--beige)" strokeWidth="0.4" strokeDasharray="1 7" opacity="0.2"
            transform={`translate(${MAP_VIEW.w / 2} ${MAP_VIEW.h / 2}) scale(1.075) translate(${-MAP_VIEW.w / 2} ${-MAP_VIEW.h / 2})`} />
        ))}
      </g>

      {/* the city — real district boundaries */}
      {land.map((d, i) => (
        <path key={`l${i}`} d={d} fill="url(#cj-landlight)" stroke="var(--line-strong)" strokeWidth="1" />
      ))}
      {land.map((d, i) => (
        <path key={`s${i}`} d={d} fill="url(#cj-stipple)" stroke="none" />
      ))}

      {/* the national park and Powai lake */}
      <path d={FOREST} fill="var(--green)" opacity="0.55" />
      <ellipse cx={powai.x} cy={powai.y} rx="10" ry="6" fill="var(--green-deep)" opacity="0.9" />

      {/* the two lines, drawn through their real stations */}
      <g fill="none" strokeLinecap="round">
        <path d={line(WESTERN_STATIONS)} stroke="var(--gold-light)" strokeWidth="2.4" opacity="0.16" filter="url(#cj-glow)" />
        <path d={line(WESTERN_STATIONS)} stroke="var(--gold-light)" strokeWidth="0.9" opacity="0.55" />
        <path d={line(CENTRAL_STATIONS)} stroke="var(--gold)" strokeWidth="2.4" opacity="0.14" filter="url(#cj-glow)" />
        <path d={line(CENTRAL_STATIONS)} stroke="var(--gold)" strokeWidth="0.9" opacity="0.5" />
      </g>

      {/* the airport, between the two doors */}
      <g transform={`translate(${airport.x} ${airport.y})`} stroke="var(--beige-dim)" strokeWidth="2.6" opacity="0.55" strokeLinecap="round">
        <line x1="-12" y1="6" x2="12" y2="-6" />
        <line x1="-5" y1="-8" x2="7" y2="7" />
      </g>
      <text x={airport.x + 16} y={airport.y + 3} className="font-body" fontSize="8" letterSpacing="1.4" fill="var(--beige-dim)" opacity="0.8">
        CSMIA
      </text>

      {/* locality bearings — small ringed nodes */}
      {LOCALITIES.map((l) => {
        const p = pt(l.lat, l.lng);
        return (
          <g key={l.name}>
            <circle cx={p.x} cy={p.y} r="4" fill="none" stroke="var(--beige-dim)" strokeWidth="0.5" opacity="0.5" />
            <circle cx={p.x} cy={p.y} r="1.4" fill="var(--beige-dim)" opacity="0.75" />
            <text
              x={l.anchor === "end" ? p.x - 8 : p.x + 8}
              y={p.y + 3}
              textAnchor={l.anchor}
              className="font-body"
              fontSize="9"
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
      <text x="56" y="600" className="font-display" fontSize="15" letterSpacing="6" fill="var(--beige-dim)" opacity="0.5" transform="rotate(-90 56 600)">
        ARABIAN SEA
      </text>
      <text x="405" y="300" className="font-display" fontSize="11" letterSpacing="4" fill="var(--beige-dim)" opacity="0.45" transform="rotate(80 405 300)">
        THANE CREEK
      </text>

      {/* north arrow + scale bar — the chart's credentials */}
      <g transform={`translate(${MAP_VIEW.w - 26} 30)`} opacity="0.75">
        <line x1="0" y1="12" x2="0" y2="-10" stroke="var(--beige-dim)" strokeWidth="0.8" />
        <path d="M0,-14 L4,-4 L0,-7 L-4,-4 Z" fill="var(--beige-dim)" />
        <text x="0" y="26" textAnchor="middle" className="font-body" fontSize="8" letterSpacing="2" fill="var(--beige-dim)">
          N
        </text>
      </g>
      <g transform={`translate(14 ${MAP_VIEW.h - 22})`} opacity="0.8">
        <line x1="0" y1="0" x2={KM5_PX} y2="0" stroke="var(--beige-dim)" strokeWidth="1" />
        <line x1="0" y1="-3" x2="0" y2="3" stroke="var(--beige-dim)" strokeWidth="1" />
        <line x1={KM5_PX} y1="-3" x2={KM5_PX} y2="3" stroke="var(--beige-dim)" strokeWidth="1" />
        <text x={KM5_PX / 2} y="-6" textAnchor="middle" className="font-body" fontSize="7.5" letterSpacing="1.5" fill="var(--beige-dim)">
          5 KM
        </text>
      </g>

      {/* ── the two doors — concentric station marks with coordinates ── */}
      {pins.map((p, i) => {
        const on = active === i;
        const vp = i === 0;
        const lx = vp ? p.x - 34 : p.x + 6;
        const ly = vp ? p.y - 48 : p.y + 52;
        const anchor = vp ? "end" : "middle";
        return (
          <g key={p.area}>
            <path
              d={vp ? `M${p.x - 9},${p.y - 8} L${lx + 5},${ly + 26}` : `M${p.x},${p.y + 10} L${lx},${ly - 30}`}
              stroke="var(--gold)"
              strokeWidth="0.8"
              opacity={on ? 0.85 : 0.4}
              style={{ transition: "opacity .4s var(--ease-lux)" }}
            />
            {/* concentric rings, chart-style */}
            <circle cx={p.x} cy={p.y} r="17" fill="none" stroke="var(--gold)" strokeWidth="0.5" strokeDasharray="1 3"
              opacity={on ? 0.8 : 0.4} style={{ transition: "opacity .4s var(--ease-lux)" }} />
            <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="var(--gold-light)" strokeWidth="0.7"
              opacity={on ? 0.9 : 0.5} style={{ transition: "opacity .4s var(--ease-lux)" }} />
            <circle cx={p.x} cy={p.y} r="16" fill="var(--gold)" opacity={on ? 0.14 : 0.06}
              style={{ transition: "opacity .4s var(--ease-lux)" }} />
            {on && !reduce ? (
              <circle cx={p.x} cy={p.y} r="10" fill="none" stroke="var(--gold-light)" strokeWidth="0.9">
                <animate attributeName="r" from="8" to="24" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="2s" repeatCount="indefinite" />
              </circle>
            ) : null}
            <circle cx={p.x} cy={p.y} r={on ? 4.5 : 3.6} fill={on ? "var(--gold-light)" : "var(--gold)"}
              stroke="var(--green-deep)" strokeWidth="1.2" style={{ transition: "all .4s var(--ease-lux)" }} />

            {/* annotation block */}
            <text x={lx} y={ly} textAnchor={anchor} className="font-body" fontSize="10.5" fontWeight="600"
              letterSpacing="1.8" fill={on ? "var(--gold-light)" : "var(--beige)"}
              style={{ transition: "fill .4s var(--ease-lux)" }}>
              {p.area.toUpperCase()}
            </text>
            <text x={lx} y={ly + 12} textAnchor={anchor} className="font-body" fontSize="8.5" letterSpacing="0.8" fill="var(--beige-dim)">
              {p.landmark}
            </text>
            <text x={lx} y={ly + 23} textAnchor={anchor} className="font-body" fontSize="7" letterSpacing="1" fill="var(--beige-dim)" opacity="0.8">
              {p.coords}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
