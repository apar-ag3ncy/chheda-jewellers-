"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * Lenis smooth-scroll provider, wired into the GSAP ticker + ScrollTrigger.
 * Disabled entirely under prefers-reduced-motion (native scroll takes over).
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  // Recompute ScrollTrigger positions after client-side navigations so a new
  // page's reveals are never stranded by post-mount layout shift.
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  useEffect(() => {
    // Recompute trigger positions once fonts/images settle so no reveal can be
    // left stranded by a mis-measured start position.
    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener("load", onLoad);

    // Fonts are self-hosted and swap in after first paint. A display face is
    // much taller than the fallback, so every sticky scene's step positions
    // move the moment it lands - triggers measured before that fire early for
    // the rest of the session. Re-measure once the real faces are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    // Mobile browsers resize the viewport as the URL bar hides and shows.
    // Without this every one of those counts as a resize and refreshes every
    // trigger mid-scroll, which is felt as a stutter on exactly the gesture
    // that caused it.
    ScrollTrigger.config({ ignoreMobileResize: true });

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ScrollTrigger.refresh();
      return () => window.removeEventListener("load", onLoad);
    }

    const lenis = new Lenis({
      // Lerp (not duration) gives a continuously-gliding feel: every frame eases
      // a fixed fraction toward the target, so fast flicks and slow nudges both
      // decelerate on the same curve instead of restarting a timed tween.
      lerp: 0.075,
      // Slightly damped wheel so a notch travels a touch less and rides longer.
      wheelMultiplier: 0.85,
      smoothWheel: true,
      // Native momentum on touch - smoothing it fights the OS and feels laggy.
      syncTouch: false,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("load", onLoad);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  return <>{children}</>;
}
