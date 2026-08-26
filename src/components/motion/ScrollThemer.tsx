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
/**
 * Each ground names the token that defines it rather than repeating its hex.
 * The colours used to be duplicated here, which meant warming the cream in
 * tokens.css left this layer painting the old one - the section would flip
 * shade at whatever scroll position this trigger fired.
 */
const TONE_VARS: Record<string, string> = {
  green: "--bg",
  deep: "--bg-deep",
  // The warm light interlude. Sections on it scope themselves .u-on-light so
  // every nested token flips dark; photography sits in framed plates on it.
  beige: "--cream",
};

function toneColor(name: string | undefined): string {
  const root = getComputedStyle(document.documentElement);
  const read = (v: string) => root.getPropertyValue(v).trim();
  return read(TONE_VARS[name ?? "green"] ?? TONE_VARS.green!) || read("--bg");
}

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
        const color = toneColor(sec.dataset.bg);
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
        className="fixed inset-0 -z-10 bg-bg"
      />
      {children}
    </div>
  );
}
