"use client";

import { useRef, type ElementType, type ReactNode, type Ref } from "react";
import { gsap, useGSAP, SplitText } from "@/lib/gsap";

type SplitLinesProps = {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  /** Seconds before the first line moves. */
  delay?: number;
  /** Seconds between consecutive lines. */
  stagger?: number;
  /** Play once on enter (default) or every time it re-enters. */
  once?: boolean;
  /** ScrollTrigger start; ignored when the element is already in view. */
  start?: string;
};

/**
 * Masked line reveal - the signature editorial headline gesture.
 * Each line is clipped by its own overflow-hidden wrapper and rises into
 * place, so display type resolves line-by-line instead of fading as a block.
 *
 * SSR renders the text normally (crawlable, and the exact final layout), the
 * split happens on the client, and the split is always reverted on cleanup.
 * Fully skipped under prefers-reduced-motion.
 */
export function SplitLines({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = 0.09,
  once = true,
  start = "top 88%",
}: SplitLinesProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Wait for fonts so lines are split at their final measured widths.
        let split: SplitText | null = null;
        let tween: gsap.core.Tween | null = null;

        const run = () => {
          split = new SplitText(el, {
            type: "lines",
            linesClass: "cj-line",
            // Each line gets a mask wrapper so it can rise out of nothing.
            mask: "lines",
          });

          const inView = el.getBoundingClientRect().top < window.innerHeight * 0.92;

          tween = gsap.from(split.lines, {
            yPercent: 115,
            duration: 1.15,
            ease: "lux",
            delay,
            stagger,
            ...(inView
              ? {}
              : { scrollTrigger: { trigger: el, start, once } }),
          });
        };

        if (document.fonts?.status === "loaded") run();
        else document.fonts?.ready.then(run).catch(run);

        return () => {
          tween?.kill();
          split?.revert();
        };
      });
    },
    { scope: ref },
  );

  return (
    <Tag ref={ref as Ref<HTMLElement>} className={className}>
      {children}
    </Tag>
  );
}
