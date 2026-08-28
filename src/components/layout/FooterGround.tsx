"use client";

import Image from "next/image";
import { useRef } from "react";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * The footer's ground: the sign-off photograph, blurred, and the two washes
 * that sit over it.
 *
 * It is a client component only so the arrival can be scroll-linked. The
 * footer itself stays server-rendered - the addresses and the legal links
 * have no business shipping JavaScript.
 *
 * THE SEAM. Before this, the map section and the footer were two full-screen
 * dark bands butted together, and the join read as a cut: the map feathers
 * its own edges into --green-deep, while the footer's top shows a third of a
 * warm photograph through the scrim. Two different darks meeting on a hard
 * line. The `seam` layer is --green-deep at full strength at the very top,
 * falling to nothing a third of the way down - so the footer begins in
 * exactly the colour the map ended in and only then becomes itself.
 *
 * THE ARRIVAL. The seam is not static: it is scrubbed against the footer's
 * own scroll, so the green lifts as you come down into it and the blurred
 * photograph resolves underneath. The image drifts up a little at the same
 * time, slower than the page - the same two-speed handoff the hero uses on
 * its way out, which is what makes a boundary read as continuous instead of
 * as the next thing starting.
 */
export function FooterGround() {
  const root = useRef<HTMLDivElement>(null);
  const art = useRef<HTMLDivElement>(null);
  const seam = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      const layer = art.current;
      const veil = seam.current;
      if (!el || !layer || !veil) return;

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduced: "(prefers-reduced-motion: reduce)",
        },
        (ctx) => {
          const { reduced } = ctx.conditions as { reduced: boolean };
          if (reduced) {
            gsap.set(layer, { yPercent: 0 });
            gsap.set(veil, { opacity: 0.35 });
            return;
          }

          const scrub = {
            trigger: el,
            start: "top bottom",
            end: "top top",
            scrub: 0.9,
          } as const;

          // The green the map ended in, lifting away.
          const a = gsap.fromTo(veil, { opacity: 1 }, { opacity: 0.28, ease: "none", scrollTrigger: scrub });
          // The photograph, arriving slower than the page.
          const b = gsap.fromTo(layer, { yPercent: -6 }, { yPercent: 0, ease: "none", scrollTrigger: scrub });

          return () => {
            a.scrollTrigger?.kill(); a.kill();
            b.scrollTrigger?.kill(); b.kill();
          };
        },
      );
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden className="absolute inset-0">
      {/* scale-110: a blur samples beyond the element's own edge, so an
          unscaled image feathers away to nothing at all four sides. */}
      <div ref={art} className="absolute inset-0 scale-110">
        <Image
          src="/media/footer/sign-off.jpg"
          alt=""
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          sizes="100vw"
          className="object-cover blur-[22px]"
          style={{ objectPosition: "50% 46%" }}
        />
      </div>

      {/* The scrim is a gradient, not a flat wash, and it gets HEAVIER going
          down. Contrast was measured against the lightest 0.1% of the blurred
          photograph - the harshest patch any text can land on - where
          --text-muted needs 4.5:1. 62% clears it by +0.28, 68% by +0.55, 76%
          by +0.9. The light end sits at the top where the only type is the
          wordmark, already at 9:1; the heavy end sits over the addresses and
          the legal line, the smallest text on the page. Lighter and the small
          print fails AA; heavier and the photograph stops showing at all. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, color-mix(in srgb, var(--green-deep) 62%, transparent) 0%, color-mix(in srgb, var(--green-deep) 68%, transparent) 46%, color-mix(in srgb, var(--green-deep) 76%, transparent) 100%)",
        }}
      />

      {/* The seam with the map above. Scrubbed - see the note up top. */}
      <div
        ref={seam}
        className="absolute inset-x-0 top-0 h-[42svh]"
        style={{
          background:
            "linear-gradient(to bottom, var(--green-deep) 0%, color-mix(in srgb, var(--green-deep) 70%, transparent) 42%, transparent 100%)",
        }}
      />
    </div>
  );
}
