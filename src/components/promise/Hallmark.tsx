"use client";

import { useRef, useState } from "react";
import { hallmarkMarks } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * "Read the mark" - the BIS hallmark drawn at monumental scale inside a
 * jeweller's loupe, with each of the three marks selectable.
 *
 * This is the page's proof device: every jeweller writes "BIS hallmarked" as a
 * bullet; almost none teach the customer to audit one. The marks described are
 * the public national standard, so the claim is verifiable independently of us.
 */
export function Hallmark() {
  const [active, setActive] = useState(0);
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // The loupe ring and the marks draw themselves in. Each path carries
        // pathLength={1} + strokeDasharray={1}, so offset 1 -> 0 is a clean
        // draw with no premium plugin needed.
        gsap.fromTo(
          "[data-draw]",
          { strokeDashoffset: 1 },
          {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: "power2.inOut",
            stagger: 0.12,
            // Without this, the hidden "from" state is applied on creation and
            // the strokes stay undrawn forever if the trigger never fires.
            immediateRender: false,
            scrollTrigger: { trigger: root.current, start: "top 70%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  const current = hallmarkMarks[active]!;

  return (
    <Section
      as="section"
      id="hallmark"
      spacing="lg"
      tone="deep"
      className="relative overflow-hidden"
    >
      <div ref={root as React.RefObject<HTMLDivElement>}>
        <Container>
          <Reveal as="p" className="u-eyebrow mb-4">
            02 - The mark on the metal
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)] text-text-strong">
              Anyone can say <em className="italic">hallmarked</em>.
              <br />
              Here is how you check.
            </h2>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-20">
            {/* ── The loupe ── */}
            <Reveal variant="settle" className="mx-auto w-full max-w-md">
              <svg
                viewBox="0 0 400 400"
                className="h-auto w-full"
                role="img"
                aria-label="A BIS hallmark shown under a jeweller's loupe"
              >
                {/* loupe body */}
                <circle
                  data-draw
                  cx="200"
                  cy="196"
                  r="150"
                  fill="none"
                  stroke="var(--gold)"
                  strokeWidth="1"
                  opacity="0.5"
                  pathLength={1}
                  strokeDasharray={1}
                />
                <circle
                  cx="200"
                  cy="196"
                  r="138"
                  fill="color-mix(in srgb, var(--green) 55%, transparent)"
                  stroke="var(--gold)"
                  strokeWidth="0.5"
                  opacity="0.55"
                />
                {/* faint metal grain inside the loupe */}
                <g opacity="0.16" stroke="var(--gold-light)" strokeWidth="0.5">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <line key={i} x1="70" y1={110 + i * 13} x2="330" y2={104 + i * 13} />
                  ))}
                </g>

                {/* ── the three marks ── */}
                {/* 1 · BIS triangle */}
                <g
                  onMouseEnter={() => setActive(0)}
                  onFocus={() => setActive(0)}
                  onClick={() => setActive(0)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(0);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === 0}
                  aria-label={hallmarkMarks[0]!.label}
                  className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                  opacity={active === 0 ? 1 : 0.55}
                  style={{ transition: "opacity .45s var(--ease-lux)" }}
                >
                  <path
                    data-draw
                    d="M100 226 L126 178 L152 226 Z"
                    fill="none"
                    stroke="var(--gold-light)"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    pathLength={1}
                    strokeDasharray={1}
                  />
                  <circle cx="126" cy="210" r="8" fill="none" stroke="var(--gold-light)" strokeWidth="1.6" />
                </g>

                {/* 2 · purity 22K916 */}
                <g
                  onMouseEnter={() => setActive(1)}
                  onFocus={() => setActive(1)}
                  onClick={() => setActive(1)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(1);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === 1}
                  aria-label={hallmarkMarks[1]!.label}
                  className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                  opacity={active === 1 ? 1 : 0.55}
                  style={{ transition: "opacity .45s var(--ease-lux)" }}
                >
                  <text
                    x="200"
                    y="209"
                    textAnchor="middle"
                    className="font-body"
                    fontSize="26"
                    letterSpacing="1"
                    fill="var(--gold-light)"
                  >
                    916
                  </text>
                  <text
                    x="200"
                    y="228"
                    textAnchor="middle"
                    className="font-body"
                    fontSize="12"
                    letterSpacing="3"
                    fill="var(--gold)"
                  >
                    22K
                  </text>
                </g>

                {/* 3 · HUID */}
                <g
                  onMouseEnter={() => setActive(2)}
                  onFocus={() => setActive(2)}
                  onClick={() => setActive(2)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActive(2);
                    }
                  }}
                  tabIndex={0}
                  role="button"
                  aria-pressed={active === 2}
                  aria-label={hallmarkMarks[2]!.label}
                  className="cursor-pointer outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-light"
                  opacity={active === 2 ? 1 : 0.55}
                  style={{ transition: "opacity .45s var(--ease-lux)" }}
                >
                  <rect
                    data-draw
                    x="246"
                    y="186"
                    width="66"
                    height="30"
                    rx="3"
                    fill="none"
                    stroke="var(--gold-light)"
                    strokeWidth="1.6"
                    pathLength={1}
                    strokeDasharray={1}
                  />
                  <text
                    x="279"
                    y="206"
                    textAnchor="middle"
                    className="font-body"
                    fontSize="13"
                    letterSpacing="1.5"
                    fill="var(--gold-light)"
                  >
                    AZ4E9K
                  </text>
                </g>

                {/* loupe stem */}
                <path
                  d="M200 346 L200 380"
                  stroke="var(--gold)"
                  strokeWidth="1"
                  opacity="0.4"
                />
              </svg>
            </Reveal>

            {/* ── The reading ── */}
            <div>
              <ol className="flex flex-col">
                {hallmarkMarks.map((m, i) => (
                  <li key={m.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => setActive(i)}
                      aria-current={active === i}
                      className={cn(
                        "w-full border-t border-line py-6 text-left transition-colors duration-[var(--dur-base)]",
                        active === i ? "border-line-strong" : "hover:border-line-strong",
                      )}
                    >
                      <span className="flex items-baseline gap-4">
                        <span
                          className={cn(
                            "font-body text-[0.68rem] tracking-[0.2em] transition-colors",
                            active === i ? "text-gold-light" : "text-text-muted",
                          )}
                        >
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[length:var(--step-2)] font-light transition-colors",
                            active === i ? "text-text-strong" : "text-text-muted",
                          )}
                        >
                          {m.label}
                        </span>
                      </span>
                      <span
                        className={cn(
                          "grid transition-all duration-[var(--dur-base)] ease-[var(--ease-lux)]",
                          active === i
                            ? "mt-3 grid-rows-[1fr] opacity-100"
                            : "grid-rows-[0fr] opacity-0",
                        )}
                      >
                        <span className="overflow-hidden">
                          <span className="block max-w-md font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                            {m.body}
                          </span>
                        </span>
                      </span>
                    </button>
                  </li>
                ))}
              </ol>

              <p className="mt-8 border-t border-line pt-6 font-body text-[0.9rem] font-light leading-relaxed text-text-muted">
                The code is laser-marked on the piece itself - you will need a
                loupe, or a phone camera at full zoom, to read it. Type it into
                the Bureau of Indian Standards&rsquo; own{" "}
                <span className="text-gold-light">BIS Care</span> app and the
                piece&rsquo;s record comes back: article, purity, and the
                jeweller who registered it. Check ours. We would rather you did.
                <span className="sr-only"> Currently reading: {current.label}.</span>
              </p>
            </div>
          </div>
        </Container>
      </div>
    </Section>
  );
}
