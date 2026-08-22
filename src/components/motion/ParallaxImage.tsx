"use client";

import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

type ParallaxImageProps = {
  src: string;
  alt: string;
  /** object-position, e.g. "50% 30%". */
  focus?: string;
  className?: string;
  /** next/image sizes hint. */
  sizes?: string;
  priority?: boolean;
  /** Parallax travel as a fraction of height (0 disables). */
  intensity?: number;
  /** Reveal the frame with an upward clip wipe on enter. */
  reveal?: boolean;
  rounded?: boolean;
};

/**
 * Editorial image frame with a subtle scroll parallax and an optional
 * clip-wipe reveal. The inner layer is over-sized so parallax never
 * exposes an edge. Fully static under prefers-reduced-motion.
 */
export function ParallaxImage({
  src,
  alt,
  focus = "50% 50%",
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
  priority = false,
  intensity = 0.12,
  reveal = true,
  rounded = false,
}: ParallaxImageProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const frame = frameRef.current;
      const layer = layerRef.current;
      if (!frame || !layer) return;

      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        if (reveal) {
          gsap.fromTo(
            frame,
            { clipPath: "inset(14% 0% 14% 0%)", opacity: 0.55 },
            {
              clipPath: "inset(0% 0% 0% 0%)",
              opacity: 1,
              duration: 1.3,
              ease: "lux",
              scrollTrigger: { trigger: frame, start: "top 85%", once: true },
            },
          );
        }
        if (intensity > 0) {
          const travel = intensity * 100;
          gsap.fromTo(
            layer,
            { yPercent: -travel / 2 },
            {
              yPercent: travel / 2,
              ease: "none",
              scrollTrigger: {
                trigger: frame,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        }
      });
    },
    { scope: frameRef },
  );

  return (
    <div
      ref={frameRef}
      className={cn(
        "relative overflow-hidden bg-green-deep",
        rounded && "rounded-[var(--radius-brand)]",
        className,
      )}
    >
      <div ref={layerRef} className="absolute inset-0 scale-[1.18]">
        <Image
          src={src}
          alt={alt}
          placeholder="blur" blurDataURL={EMERALD_LQIP} fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          style={{ objectPosition: focus }}
        />
      </div>
    </div>
  );
}
