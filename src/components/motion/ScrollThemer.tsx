"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Seamless scroll-driven background: the colour behind the (transparent) page
 * sections eases between the brand tones as each `[data-bg]` section reaches
 * the viewport's middle band. Images are opaque and sit above it, so
 * photography is never tinted.
 *
 * The colour is tweened on the ROOT ELEMENT, not on a layer of our own. This
 * used to be a `fixed inset-0 -z-10` div - a full-viewport painted surface
 * with fifteen thousand pixels of transparent content sliding over it. The
 * root's background is painted as the canvas background instead, which the
 * compositor already treats as a base colour. `<html>` was carrying `--bg`
 * and `<body>` was transparent for exactly this reason, so the visual result
 * is identical (verified: all nine grounds match their tokens exactly) with
 * one fewer surface and one fewer element.
 *
 * Honesty about the perf claim: this was made while chasing a "scroll is not
 * smooth" report, and on the machine it was measured on it changed NOTHING -
 * median scroll frame was 50ms before and after. Do not cite it as an
 * optimisation. It is kept because it is simpler, not because it is faster.
 * What that investigation did establish, so nobody repeats it:
 *   - ScrollTrigger is not the cost. ScrollTrigger.update() measured 0.06ms
 *     at its worst, and the trigger count self-drops from 90 to 19 after one
 *     pass because the `once: true` ones kill themselves.
 *   - The cost is raster, and it scales with pixels: the same scroll measured
 *     50ms at 420x380 and 82ms at 1440x900 on the same machine.
 *   - Layer promotion (will-change/transform-gpu on the header, the parallax
 *     layers, this ground), content-visibility, contain:paint, and killing
 *     the parallax scrubs outright were each measured and each changed
 *     nothing. They were tried and reverted; do not re-add them speculatively.
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

  useGSAP(
    () => {
      const el = document.documentElement;
      const base = toneColor("green");
      const sections = gsap.utils.toArray<HTMLElement>("[data-bg]");
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      sections.forEach((sec) => {
        const color = toneColor(sec.dataset.bg);
        ScrollTrigger.create({
          trigger: sec,
          // Both edges at the SAME viewport line. They were 55%/45%, which
          // made the switch direction-dependent: scrolling down, a boundary
          // between two grounds recoloured the page when it crossed 55% of
          // the viewport; scrolling back up, the same boundary recoloured it
          // at 45% - a tenth of a screen apart. The colour appeared to change
          // "at the wrong place" whenever you reversed. One line for both
          // directions makes the crossfade land identically either way.
          start: "top 50%",
          end: "bottom 50%",
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

      // The root is shared with every other route, so hand it back on the way
      // out. Without this a client-side navigation away from the homepage
      // would strand whatever tone happened to be showing.
      return () => {
        gsap.killTweensOf(el);
        el.style.backgroundColor = base;
      };
    },
    { scope },
  );

  return <div ref={scope}>{children}</div>;
}
