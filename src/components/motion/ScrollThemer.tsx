"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Seamless scroll-driven background. A single fixed layer sits behind the
 * (transparent) page sections and its colour eases between the brand tones as
 * each `[data-bg]` section reaches the viewport's middle band. Images are
 * opaque and sit above this layer, so photography is never tinted.
 *
 * Fully static under prefers-reduced-motion (colour still tracks the section,
 * it just snaps instead of easing).
 */
const TONES: Record<string, string> = {
  green: "#0B3A2D", // A — primary brand
  deep: "#06241B", // deepened emerald
  maroon: "#440002", // B — secondary
  beige: "#E8DDC7", // C — warm light interlude (dark text sections only)
};

export function ScrollThemer({ children }: { children: ReactNode }) {
  const scope = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = canvas.current;
      if (!el) return;
      const sections = gsap.utils.toArray<HTMLElement>("[data-bg]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      sections.forEach((sec) => {
        const color = TONES[sec.dataset.bg ?? "green"] ?? TONES.green;
        ScrollTrigger.create({
          trigger: sec,
          start: "top 55%",
          end: "bottom 45%",
          onToggle: (self) => {
            if (!self.isActive) return;
            gsap.to(el, {
              backgroundColor: color,
              duration: reduce ? 0 : 1.1,
              ease: "power2.inOut",
              overwrite: "auto",
            });
          },
        });
      });
    },
    { scope },
  );

  return (
    <div ref={scope}>
      <div
        ref={canvas}
        aria-hidden
        className="fixed inset-0 -z-10"
        style={{ backgroundColor: TONES.green }}
      />
      {children}
    </div>
  );
}
