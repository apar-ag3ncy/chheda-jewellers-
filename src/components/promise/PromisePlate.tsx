"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import type { PromiseValue } from "@/types/content";

/**
 * The Chheda Promise - four numbered marks beside their undertakings.
 *
 * Each mark is a disc of liquid glass with a gold numeral: transparent to the
 * ground behind it, a white-lit top edge, and a soft interior so it reads as
 * a material rather than a badge. (An earlier pass drew these as punches
 * struck into a copper bar; the bar read as an odd fitting between the text
 * columns and is gone.)
 *
 * The strike survives as choreography: the numeral falls in on power4.in -
 * nearly all its travel in the last frames, which is what makes it feel
 * dropped rather than faded - the glass condenses beneath it, a gold ring
 * rings outward, and only then does the wording set. Everything animated is
 * transform/opacity; a strike costs no layout and no React render. Under
 * prefers-reduced-motion every element is simply present, unmoving.
 */

export function PromisePlate({ values }: { values: PromiseValue[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

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
            return;
          }

          const triggers: ScrollTrigger[] = [];

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
              // Impact: the glass condenses under the numeral in one beat.
              .fromTo(
                dent,
                { opacity: 0, scale: 1.25 },
                { opacity: 1, scale: 1, duration: 0.22, ease: "power3.out" },
                ">-0.02",
              )
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
                    className="cj-punch-ring absolute inset-0 block rounded-full"
                  />
                  {/* The depression, revealed on impact - it cannot exist
                        before the punch lands. */}
                  <span
                    data-dent
                    aria-hidden
                    className="cj-glass-chip absolute inset-0 block rounded-full"
                  />
                  <span
                    data-punch
                    aria-hidden
                    className="cj-glass-numeral font-display absolute inset-0 grid place-items-center text-[1.12rem] leading-none font-light tabular-nums md:text-[1.75rem]"
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
