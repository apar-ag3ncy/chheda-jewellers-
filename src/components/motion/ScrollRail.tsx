"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * A hairline that draws itself as its section scrolls past.
 *
 * The metal rooms are a long single column of pieces with no other structure,
 * so the eye has nothing telling it how far through it is. This rail runs
 * beside them and fills from nothing to full across the section's scroll,
 * with the count keeping pace - a reading progress mark that belongs to the
 * page rather than a browser chrome scrollbar.
 *
 * Scrubbed, not tweened: it is tied to scroll position, so dragging the
 * scrollbar backwards un-draws it. `scrub: 0.6` lets it lag a fraction of a
 * second behind the pointer, which is what stops it feeling mechanical.
 *
 * Nothing here moves layout - the rail is absolutely positioned and the
 * count's text is set from a ref, so a scrub costs no React renders at all.
 * Under reduced motion the rail is simply drawn full and the count shows the
 * total; the information survives, the motion does not.
 */
export function ScrollRail({
  count,
  className,
}: {
  count: number;
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const bar = line.current;
      const tag = label.current;
      if (!el || !bar || !tag) return;

      const pad = (n: number) => String(n).padStart(2, "0");
      const section = el.parentElement ?? el;

      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };

          if (reduced) {
            gsap.set(bar, { scaleY: 1 });
            tag.textContent = `${pad(count)} / ${pad(count)}`;
            return;
          }

          gsap.set(bar, { scaleY: 0, transformOrigin: "top" });

          const st = ScrollTrigger.create({
            trigger: section,
            start: "top 62%",
            end: "bottom 78%",
            scrub: 0.6,
            onUpdate: (self) => {
              gsap.set(bar, { scaleY: self.progress });
              // Ceil, so the first piece reads 01 the moment it is in view
              // rather than 00 - a count of nothing is never true here.
              const n = Math.min(count, Math.max(1, Math.ceil(self.progress * count)));
              const next = `${pad(n)} / ${pad(count)}`;
              if (tag.textContent !== next) tag.textContent = next;
            },
          });

          return () => st.kill();
        },
      );
    },
    { scope: root, dependencies: [count] },
  );

  return (
    <div ref={root} aria-hidden className={className}>
      <span className="relative block h-full w-px overflow-hidden bg-line">
        <span ref={line} className="absolute inset-0 block bg-gold origin-top" />
      </span>
      <span
        ref={label}
        className="mt-3 block font-body text-[0.58rem] tracking-[0.22em] text-text-muted tabular-nums"
      >
        01 / {String(count).padStart(2, "0")}
      </span>
    </div>
  );
}
