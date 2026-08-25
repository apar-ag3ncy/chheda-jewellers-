"use client";

import { createContext, useContext, useEffect, useRef, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

type LenisContextValue = {
  scrollTo: (target: string | number | HTMLElement, opts?: { offset?: number }) => void;
};

const LenisContext = createContext<LenisContextValue>({ scrollTo: () => {} });

export const useSmoothScroll = () => useContext(LenisContext);

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

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      ScrollTrigger.refresh();
      return () => window.removeEventListener("load", onLoad);
    }

    const lenis = new Lenis({
      // Lerp (not duration) gives a continuously-gliding feel: every frame eases
      // a fixed fraction toward the target, so fast flicks and slow nudges both
      // decelerate on the same curve instead of restarting a timed tween.
      lerp: 0.085,
      // Slightly damped wheel so a notch travels a touch less and rides longer.
      wheelMultiplier: 0.9,
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

  const scrollTo: LenisContextValue["scrollTo"] = (target, opts) => {
    const lenis = lenisRef.current;
    if (lenis) {
      lenis.scrollTo(target, { offset: opts?.offset ?? 0, duration: 1.4 });
      return;
    }
    // Reduced-motion / pre-init fallback - handle every target shape natively.
    if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    } else if (typeof target === "string") {
      document.querySelector(target)?.scrollIntoView({ behavior: "smooth" });
    } else {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return <LenisContext.Provider value={{ scrollTo }}>{children}</LenisContext.Provider>;
}
