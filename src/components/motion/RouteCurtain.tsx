"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP, ScrollTrigger } from "@/lib/gsap";
import { Monogram } from "@/components/ui/Monogram";

/**
 * Route transition - an emerald curtain lifts away as each page arrives,
 * reusing the Loader's exact curve so the site speaks one motion language.
 *
 * Mounted from `(marketing)/template.tsx`, which Next re-mounts on every
 * navigation (unlike layout.tsx), so this plays per route change without any
 * router plumbing. Reduced motion collapses it to an instant swap.
 */
export function RouteCurtain({ children }: { children: ReactNode }) {
  const curtain = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const panel = curtain.current;
    const main = content.current;
    if (!panel || !main) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      gsap.set(panel, { display: "none" });
      gsap.set(main, { clearProps: "all" });
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(panel, { display: "none" });
        ScrollTrigger.refresh();
      },
    });

    // Curtain lifts; the incoming page trails slightly for depth.
    tl.to(panel, { yPercent: -100, duration: 0.9, ease: "power4.inOut" }, 0.05)
      // clearProps is REQUIRED: GSAP otherwise leaves transform:matrix(1,0,0,1,0,0)
      // on this wrapper, and ANY transform - even identity - makes it a
      // containing block, which breaks position:fixed for every descendant and
      // silently disables all ScrollTrigger pins inside the page.
      .from(main, {
        y: 26,
        autoAlpha: 0,
        duration: 0.8,
        ease: "lux",
        clearProps: "transform,opacity,visibility",
      }, 0.25)
      .to(panel.querySelector("[data-curtain-mark]"), { autoAlpha: 0, duration: 0.3 }, 0);
  }, []);

  return (
    <>
      <div
        ref={curtain}
        aria-hidden
        className="cj-curtain pointer-events-none fixed inset-0 z-[90] flex items-center justify-center bg-green-deep"
      >
        <span data-curtain-mark>
          <Monogram className="h-16 w-16 opacity-90" />
        </span>
      </div>
      <div ref={content}>{children}</div>
    </>
  );
}
