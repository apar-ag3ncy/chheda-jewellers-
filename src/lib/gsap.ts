"use client";

/**
 * Central GSAP setup — the ONLY place plugins are registered.
 * Import { gsap, ScrollTrigger, SplitText, useGSAP } from here.
 * Never call registerPlugin() elsewhere (per CLAUDE.md motion rules).
 */
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

let registered = false;

if (!registered) {
  gsap.registerPlugin(useGSAP, ScrollTrigger, CustomEase, SplitText);

  // Signature brand ease — mirrors --ease-lux in tokens.css.
  if (!CustomEase.get?.("lux")) {
    CustomEase.create("lux", "0.22, 1, 0.36, 1");
  }

  // Sensible global defaults so every tween feels consistent.
  gsap.defaults({ ease: "lux", duration: 0.9 });

  registered = true;
}

/** Motion tokens for JS animations — mirror tokens.css. */
export const EASE = {
  lux: "lux",
  inOut: "power4.inOut",
  soft: "power2.out",
} as const;

export const DUR = {
  fast: 0.4,
  base: 0.7,
  slow: 1.1,
  slower: 1.6,
} as const;

export { gsap, ScrollTrigger, CustomEase, SplitText, useGSAP };
