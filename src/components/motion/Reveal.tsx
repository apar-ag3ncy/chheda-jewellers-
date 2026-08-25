"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * Entry gestures. Assign by content ROLE so the page has a motion grammar
 * instead of one gesture repeated everywhere:
 *   rise  - the quiet default, for supporting copy
 *   mask  - a clip wipe upward, for framed content
 *   slide - travel from the side, for list rows and numerals
 *   settle - scale-settle, for marks, medallions and stats
 */
export type RevealVariant = "rise" | "mask" | "slide" | "settle";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Delay in seconds. */
  delay?: number;
  /** Rise distance in px (variant "rise"). */
  y?: number;
  /** Travel distance in px (variant "slide"); negative comes from the left. */
  x?: number;
  variant?: RevealVariant;
  /** Fire once (default) or every entry. */
  once?: boolean;
  style?: React.CSSProperties;
};

function fromVars(variant: RevealVariant, y: number, x: number): gsap.TweenVars {
  switch (variant) {
    case "mask":
      return { clipPath: "inset(0 0 100% 0)", y: 18, duration: 1.4, ease: "lux" };
    case "slide":
      return { x, opacity: 0, duration: 1.25, ease: "lux" };
    case "settle":
      return { scale: 0.9, opacity: 0, duration: 1.3, ease: "lux" };
    case "rise":
    default:
      return { opacity: 0, y, duration: 1.35, ease: "lux" };
  }
}

/**
 * Scroll-reveal wrapper. SSR renders content normally (crawlable); motion is
 * layered on the client and skipped entirely under prefers-reduced-motion.
 * Elements already in view at mount animate immediately, so nothing can ever
 * be stranded at opacity 0 by a scroll that never happens.
 */
export function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  y = 32,
  x = -36,
  variant = "rise",
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
        const vars = fromVars(variant, y, x);
        const inView = el.getBoundingClientRect().top < window.innerHeight * 0.9;
        if (inView) {
          gsap.from(el, { ...vars, delay });
        } else {
          gsap.from(el, {
            ...vars,
            delay,
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
