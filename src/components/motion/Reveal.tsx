"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP, DUR } from "@/lib/gsap";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Rise distance in px. */
  y?: number;
  /** Fire once (default) or every entry. */
  once?: boolean;
  style?: React.CSSProperties;
};

/**
 * Scroll-reveal wrapper: fade + rise as it enters the viewport.
 * SSR renders the content normally (crawlable); motion is layered on the
 * client and fully skipped under prefers-reduced-motion via matchMedia.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 26,
  once = true,
  style,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // If the element is already in view at mount, animate it right away so
        // it can never be left stranded at opacity:0 by a scroll that never
        // happens. Only genuinely below-the-fold elements wait for scroll.
        const inView = el.getBoundingClientRect().top < window.innerHeight * 0.9;
        if (inView) {
          gsap.from(el, { opacity: 0, y, duration: DUR.slow, delay, ease: "lux" });
        } else {
          gsap.from(el, {
            opacity: 0,
            y,
            duration: DUR.slow,
            delay,
            ease: "lux",
            scrollTrigger: { trigger: el, start: "top 90%", once },
          });
        }
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className} style={style}>
      {children}
    </Tag>
  );
}
