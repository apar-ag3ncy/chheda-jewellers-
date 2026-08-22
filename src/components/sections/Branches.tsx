"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

/** Decorative pin coordinates on the stylised map (not geographic). */
const PINS = [
  { x: 150, y: 175 },
  { x: 285, y: 320 },
];

export function Branches() {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  return (
    <Section id="branches" spacing="lg" tone="transparent" data-bg="green">
      <Container>
        <SectionHeading
          eyebrow="Visit the atelier"
          title={"Two doors,\none welcome"}
          intro="Jewellery is meant to be seen, held and tried on. Come sit with us over chai — no appointment needed, though we love it when you book ahead."
          size="lg"
        />

        <div className="mt-14 grid grid-cols-1 gap-8 lg:mt-20 lg:grid-cols-12 lg:gap-12">
          {/* Branch cards */}
          <div className="lg:col-span-5">
            <ul className="flex flex-col gap-5">
              {siteConfig.branches.map((b, i) => (
                <Reveal as="li" key={b.id} delay={i * 0.06}>
                  <div
                    className={cn(
                      "rounded-[var(--radius-brand)] border p-7 transition-colors duration-[400ms] md:p-8",
                      active === i
                        ? "border-line-strong bg-green-soft/40"
                        : "border-line bg-green-soft/15",
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
                        className="rounded-full border border-line-strong px-4 py-2 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-strong transition-colors hover:border-gold hover:bg-gold/10"
                      >
                        Get directions
                      </Link>
                      <Link
                        href={`tel:${b.phone.replace(/\s+/g, "")}`}
                        className="rounded-full border border-line px-4 py-2 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-text-strong"
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
                Addresses shown are placeholders pending confirmation.
              </p>
            ) : null}
          </div>

          {/* Designed map */}
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[var(--radius-brand)] border border-line bg-green-deep md:aspect-[16/10]">
              <StylisedMap active={active} reduce={reduce} />
              <div className="pointer-events-none absolute left-6 top-6">
                <p className="font-body text-[0.66rem] uppercase tracking-[0.2em] text-text-muted">
                  Mumbai · India
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

function StylisedMap({ active, reduce }: { active: number; reduce: boolean }) {
  return (
    <svg viewBox="0 0 480 380" className="h-full w-full" role="img" aria-label="Stylised map of our two Mumbai locations" preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="var(--green-deep)" />
          <stop offset="1" stopColor="var(--green)" />
        </linearGradient>
      </defs>
      <rect width="480" height="380" fill="url(#sea)" />

      {/* faint grid */}
      <g stroke="var(--line)" strokeWidth="0.5" opacity="0.5">
        {Array.from({ length: 9 }).map((_, i) => (
          <line key={`v${i}`} x1={i * 60} y1="0" x2={i * 60} y2="380" />
        ))}
        {Array.from({ length: 7 }).map((_, i) => (
          <line key={`h${i}`} x1="0" y1={i * 60} x2="480" y2={i * 60} />
        ))}
      </g>

      {/* coastline */}
      <path
        d="M0,60 C70,90 60,150 110,180 C160,210 140,270 190,300 C230,324 210,360 260,380 L0,380 Z"
        fill="color-mix(in srgb, var(--green-soft) 40%, transparent)"
        stroke="var(--line-strong)"
        strokeWidth="1"
        opacity="0.6"
      />

      {/* roads */}
      <g stroke="var(--gold)" strokeWidth="1" fill="none" opacity="0.35">
        <path d="M150,175 C200,150 240,220 285,320" />
        <path d="M60,120 C160,140 260,120 420,200" />
        <path d="M150,175 C120,240 220,300 360,300" />
      </g>

      {/* pins */}
      {PINS.map((p, i) => {
        const on = active === i;
        return (
          <g key={i} transform={`translate(${p.x} ${p.y})`}>
            <circle
              r="16"
              fill="var(--gold)"
              opacity={on ? 0.22 : 0.1}
              style={{ transition: "opacity .4s var(--ease-lux)" }}
            />
            {on && !reduce ? (
              <circle r="10" fill="none" stroke="var(--gold-light)" strokeWidth="1">
                <animate attributeName="r" from="8" to="22" dur="1.8s" repeatCount="indefinite" />
                <animate attributeName="opacity" from="0.7" to="0" dur="1.8s" repeatCount="indefinite" />
              </circle>
            ) : null}
            <circle r={on ? 6 : 4.5} fill={on ? "var(--gold-light)" : "var(--gold)"} style={{ transition: "all .4s var(--ease-lux)" }} />
          </g>
        );
      })}
    </svg>
  );
}
