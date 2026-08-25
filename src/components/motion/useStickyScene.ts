"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * The site's one sticky-scene primitive.
 *
 * A "sticky scene" is a tall section with two columns: a stage that holds
 * still (CSS `position: sticky`) while a column of steps scrolls past it, the
 * stage changing to match whichever step is being read. It is the shape behind
 * the promise chapters, the bespoke atelier and the edit gallery.
 *
 * Why CSS sticky and NOT ScrollTrigger's `pin: true`: pinning injects a
 * wrapper element and pin-spacing into the layout. This codebase already has
 * one hard-won rule about transforms on wrappers (see RouteCurtain - any
 * transform, even identity, makes an element a containing block and silently
 * breaks `position: fixed` for everything inside it). Combining that with
 * Lenis and a per-route curtain that remounts is exactly how pins end up
 * mis-measured. `position: sticky` costs nothing, never reflows the document,
 * and survives a route transition without a refresh.
 *
 * ScrollTrigger is therefore used only to READ progress, never to move layout.
 * React state updates once per step change - not per frame - so a long scene
 * costs a handful of renders rather than hundreds.
 *
 * Reduced motion needs no branch here, and that is deliberate: this hook does
 * not animate anything. It reports which step is being read; the stage swaps
 * with a CSS transition, which the global `prefers-reduced-motion` floor in
 * globals.css already collapses to instant. So under reduced motion the stage
 * still tracks the step - it just changes without a dissolve, which is the
 * correct behaviour. Do not add a guard that disables the tracking.
 *
 * @param count  number of steps in the scene
 * @param opts.query  media query gating the scene (default: md and up, since
 *                    a sticky stage has nowhere to stick on a phone)
 */
export function useStickyScene(
  count: number,
  opts: { query?: string; start?: string; end?: string } = {},
) {
  const {
    query = "(min-width: 768px)",
    start = "top 62%",
    end = "bottom 62%",
  } = opts;

  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useGSAP(
    () => {
      const root = rootRef.current;
      if (!root) return;

      const mm = gsap.matchMedia();
      mm.add(query, () => {
        const steps = gsap.utils.toArray<HTMLElement>("[data-scene-step]", root);
        const triggers = steps.slice(0, count).map((el, i) =>
          ScrollTrigger.create({
            trigger: el,
            start,
            end,
            onToggle: (self) => {
              if (self.isActive) setActive(i);
            },
          }),
        );
        return () => triggers.forEach((t) => t.kill());
      });

      // Below the query the stage is not sticky, so the scene collapses to a
      // plain stack and the first step stays selected.
      return () => setActive(0);
    },
    { scope: rootRef, dependencies: [count, query, start, end] },
  );

  return { rootRef, active };
}
