"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { PromiseValue } from "@/types/content";

/**
 * The Chheda Promise, rendered the way a jeweller actually makes a promise:
 * struck into metal.
 *
 * A hallmark is the one claim in this trade that cannot be talked away - it is
 * a punch driven into gold under pressure, and it either survives inspection
 * or it does not. So rather than set four values as a bulleted list, the
 * section is a blank gold plate and each value is a mark struck into it: the
 * punch falls, the metal takes it, the plate rings, and only then does the
 * wording set beside it.
 *
 * What is struck is the NUMERAL, not a pictogram. An earlier pass put a small
 * icon in each punch face and it fought the section: four line drawings in a
 * column pulled the eye away from the wording they were meant to introduce,
 * and no icon set survives being shrunk to 30px on a phone without turning
 * into decoration. A number struck into metal is what a real mark looks like
 * anyway, and it reads at any size.
 *
 * The marks are a DEVICE, not a literal description of our stamping - the
 * ledger header says "what it binds us to" precisely so nothing here reads as
 * a claim about a physical punch we apply. The one real hallmark claim on this
 * site lives on /chheda-promise, where it is explained and made checkable.
 *
 * Motion notes:
 * - The strike is `power4.in` - almost all the travel happens in the last few
 *   frames. That acceleration is the whole illusion; an ease-out punch reads
 *   as a fade-in and the metal stops feeling hard.
 * - The recoil moves the PLATE, not the mark. A struck object kicks; the thing
 *   striking it stops dead. Reversing those two is what makes fake impacts
 *   look fake.
 * - Every animated property is transform/opacity, so a strike costs no layout
 *   and no React render - the sheen is a CSS custom property written straight
 *   to the node.
 */

export function PromisePlate({ values }: { values: PromiseValue[] }) {
  const root = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const plate = bar.current;
      if (!el || !plate) return;

      const rows = gsap.utils.toArray<HTMLElement>(el.querySelectorAll("[data-row]"));
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          // Reduced motion: the plate arrives already struck. Every mark, every
          // line of copy, the dents and the sheen - all present, none of it moves.
          if (reduced) {
            // Queried off `el`, not by bare selector text: useGSAP's scope
            // does not reach inside a matchMedia context, so a string here
            // would search the whole document.
            gsap.set(el.querySelectorAll("[data-punch], [data-copy]"), {
              opacity: 1,
              y: 0,
              scale: 1,
            });
            gsap.set(el.querySelectorAll("[data-dent]"), { opacity: 1 });
            gsap.set(el.querySelectorAll("[data-ring]"), { opacity: 0 });
            plate.style.setProperty("--sheen", "50%");
            return;
          }

          const triggers: ScrollTrigger[] = [];

          // The light travelling down polished metal as the section passes.
          triggers.push(
            ScrollTrigger.create({
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.8,
              onUpdate: (self) => {
                plate.style.setProperty(
                  "--sheen",
                  `${(self.progress * 128 - 14).toFixed(1)}%`,
                );
              },
            }),
          );

          rows.forEach((row) => {
            const punch = row.querySelector<HTMLElement>("[data-punch]");
            const ring = row.querySelector<HTMLElement>("[data-ring]");
            const dent = row.querySelector<HTMLElement>("[data-dent]");
            const copy = gsap.utils.toArray<HTMLElement>("[data-copy]", row);
            if (!punch || !ring || !dent) return;

            gsap.set(punch, { opacity: 0, y: -30, scale: 1.6 });
            gsap.set(ring, { opacity: 0, scale: 0.35 });
            gsap.set(dent, { opacity: 0 });
            gsap.set(copy, { opacity: 0, y: 16 });

            const tl = gsap.timeline({
              paused: true,
              defaults: { overwrite: "auto" },
            });

            // The fall. Slow off the mark, then almost all of it in the last
            // three frames - the acceleration IS the weight.
            tl.to(punch, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power4.in",
            })
              // Impact: the depression appears under the mark in a single frame.
              .to(dent, { opacity: 1, duration: 0.01 }, ">")
              // The plate takes the blow and settles - 2px, four beats, done
              // inside a fifth of a second.
              .to(
                plate,
                { y: 2.5, duration: 0.05, repeat: 3, yoyo: true, ease: "none" },
                "<",
              )
              .set(plate, { y: 0 })
              // Metal ringing outward.
              .to(ring, { opacity: 0.5, scale: 1, duration: 0.06, ease: "none" }, "<")
              .to(
                ring,
                { opacity: 0, scale: 2.6, duration: 0.85, ease: "power3.out" },
                ">",
              )
              // Only once it has landed does the wording set.
              .to(
                copy,
                { opacity: 1, y: 0, duration: 0.75, stagger: 0.07, ease: "lux" },
                "<0.02",
              );

            triggers.push(
              ScrollTrigger.create({
                trigger: row,
                start: "top 82%",
                once: true,
                onEnter: () => tl.play(),
              }),
            );
          });

          return () => triggers.forEach((t) => t.kill());
        },
      );
    },
    { scope: root, dependencies: [values.length] },
  );

  return (
    <div ref={root} className="relative">
      {/* Ledger header - frames the four as a document of record, and says in
          as many words that these are undertakings, not stamping claims. */}
      <div className="grid grid-cols-[60px_1fr] gap-4 md:grid-cols-[112px_1fr] md:gap-10">
        <p className="font-body text-text-muted/70 text-center text-[0.55rem] tracking-[0.2em] uppercase">
          Mark
        </p>
        <p className="font-body text-text-muted/70 text-[0.55rem] tracking-[0.2em] uppercase">
          What it binds us to
        </p>
      </div>

      <div className="relative mt-4">
        {/* The blank. Drawn gold, chamfered at the corners like a cut ingot. */}
        <div
          ref={bar}
          aria-hidden
          className="cj-plate-bar absolute inset-y-0 left-0 w-[60px] md:w-[112px]"
        />

        <ul className="relative py-6 md:py-8">
          {values.map((value, i) => (
            <li
              key={value.id}
              data-row
              className="grid grid-cols-[60px_1fr] gap-4 md:grid-cols-[112px_1fr] md:gap-10"
            >
              <div className="flex justify-center pt-[1.2rem] md:pt-6">
                <span className="relative block h-[46px] w-[46px] md:h-[72px] md:w-[72px]">
                  {/* The ring the metal gives off when it is hit. */}
                  <span
                    data-ring
                    aria-hidden
                    className="cj-punch-ring absolute inset-0 block"
                  />
                  {/* The depression, revealed on impact - it cannot exist
                        before the punch lands. */}
                  <span
                    data-dent
                    aria-hidden
                    className="cj-punch-dent absolute inset-0 block"
                  />
                  <span
                    data-punch
                    aria-hidden
                    className="cj-punch font-display absolute inset-0 grid place-items-center text-[1.12rem] leading-none font-light tabular-nums md:text-[1.75rem]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              </div>

              <div
                className={
                  "border-line/45 border-t pt-7 pb-1 md:pt-9 " +
                  (i === 0 ? "border-t-0 md:pt-9" : "")
                }
              >
                <h3
                  data-copy
                  className="font-display text-text-strong text-[length:var(--step-3)] leading-[1.05] font-light"
                >
                  {value.title}
                </h3>
                <p
                  data-copy
                  className="font-body text-text-muted mt-3 max-w-md text-[0.92rem] leading-relaxed font-light"
                >
                  {value.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
