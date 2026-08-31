"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Scroll motion for the interior-page header, applied by PagePlate.
 *
 * Six pages share that header (jewellery, gallery, live-gold-rate,
 * investors, journal, offers-and-plans) and every one of them carried only
 * fade-in-on-enter - the type appeared, then the whole header sat perfectly
 * still while the page moved past it. Against a homepage where the hero, the
 * promise band and the footer all hand off on scroll, the interiors read as
 * a different, flatter site.
 *
 * Two scrubbed scenes, both the house's two-speed handoff:
 *
 *   THE PLATE breathes. Its image drifts against the page as the header
 *   scrolls, so the photograph has depth rather than being a pasted rectangle.
 *   The layer is over-scaled in PagePlate so the drift can never expose an
 *   edge.
 *
 *   THE TYPE leaves ahead of the page and dims, so the first section arrives
 *   underneath a header that is still moving - the same trick the hero uses
 *   on its way out, which is what makes a boundary read as continuous.
 *
 * Both are scrubbed rather than timed, so scrolling back reverses them
 * exactly, and both are absent under prefers-reduced-motion - the header
 * simply sits where it lands.
 */
export function PagePlateMotion({
  children,
  hasPlate,
}: {
  children: ReactNode;
  hasPlate: boolean;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tweens: gsap.core.Tween[] = [];

        const type = el.querySelector<HTMLElement>("[data-plate-type]");
        if (type) {
          tweens.push(
            gsap.to(type, {
              yPercent: -14,
              autoAlpha: 0.35,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "bottom 85%",
                end: "bottom top",
                scrub: 0.7,
              },
            }),
          );
        }

        const art = el.querySelector<HTMLElement>("[data-plate-art]");
        if (hasPlate && art) {
          tweens.push(
            gsap.fromTo(
              art,
              { yPercent: -5 },
              {
                yPercent: 5,
                ease: "none",
                scrollTrigger: {
                  trigger: el,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.8,
                },
              },
            ),
          );
        }

        return () => {
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
        };
      });
    },
    { scope: root, dependencies: [hasPlate] },
  );

  return <div ref={root}>{children}</div>;
}
