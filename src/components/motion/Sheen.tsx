"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * A specular that crosses a line of type once, as it arrives.
 *
 * The whole effect is one registered custom property being tweened. CSS can
 * only interpolate a gradient stop that sits inside calc() if the variable
 * driving it has been registered with a type - see @property --cj-sheen-pos -
 * so this is a case where the modern CSS and the animation library are doing
 * one job between them: CSS makes the value animatable, GSAP gives it a curve
 * and a trigger.
 *
 * Used sparingly on purpose. A highlight that crosses every heading is a
 * theme; one that crosses two is a detail someone notices.
 *
 * Degrades to plain type: the gradient's base colour IS the heading colour,
 * so with no JS, under prefers-reduced-motion, or on an engine without
 * @property, nothing moves and nothing is lost.
 */
export function Sheen({
  children,
  as: Tag = "span",
  className,
  /** Seconds before the sweep starts once the line is in view. */
  delay = 0.45,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          el,
          { "--cj-sheen-pos": "-40%" },
          {
            "--cj-sheen-pos": "140%",
            duration: 1.9,
            delay,
            ease: "lux",
            // Once. A highlight that re-runs every time the heading scrolls
            // back into view stops reading as light and starts reading as a
            // loading state.
            scrollTrigger: { trigger: el, start: "top 82%", once: true },
          },
        );
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={cn("cj-sheen-text", className)}>
      {children}
    </Tag>
  );
}
