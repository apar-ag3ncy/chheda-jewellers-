"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";

const SEEN_KEY = "cj_loader_seen";

/**
 * On-brand loader — nothing but the mark. The lotus-mandala and the
 * interlocking CJ core counter-rotate through a full turn and settle into
 * alignment, then the emerald curtain lifts into the hero. No glows, no
 * splashes: the magic is the rotation itself.
 *
 * Fast by design: runs once per session, honours prefers-reduced-motion, and
 * never gates content from crawlers (the page is fully rendered beneath this
 * fixed overlay).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const mono = useRef<HTMLDivElement>(null);
  const word = useRef<HTMLDivElement>(null);
  const line = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const seen =
        typeof sessionStorage !== "undefined" && sessionStorage.getItem(SEEN_KEY);
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (seen || reduce) {
        gsap.set(el, { display: "none" });
        if (reduce && !seen) sessionStorage.setItem(SEEN_KEY, "1");
        return;
      }

      const mandala = el.querySelector<SVGGElement>(".cj-mandala");
      const core = el.querySelector<SVGGElement>(".cj-core");

      // Prevent scroll during the reveal.
      document.body.style.overflow = "hidden";


      const finish = () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        document.body.style.overflow = "";
        gsap.set(el, { display: "none" });
      };

      // Safety net: fires even if the GSAP ticker is throttled (e.g. the tab
      // opened in the background), so scroll never stays locked.
      const safety = window.setTimeout(finish, 6000);

      const tl = gsap.timeline({
        defaults: { ease: "lux" },
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      // The mark emerges from nothing and grows into place.
      tl.fromTo(
        mono.current,
        { scale: 0.42, autoAlpha: 0 },
        { scale: 1, autoAlpha: 1, duration: 2.1, ease: "power2.out" },
        0,
      );
      // A full counter-turn: the petals unwind one way, the CJ core the other,
      // decelerating into perfect alignment. This is the whole trick.
      if (mandala)
        tl.from(
          mandala,
          { rotation: -360, svgOrigin: "200 200", duration: 2.4, ease: "power3.out" },
          0,
        );
      if (core)
        tl.from(
          core,
          { rotation: 300, svgOrigin: "200 200", duration: 2.4, ease: "power3.out" },
          0,
        );
      // Wordmark + hairline settle once the mark has found its centre.
      tl.from(word.current, { yPercent: 70, autoAlpha: 0, duration: 0.8 }, 1.5);
      tl.fromTo(
        line.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 0.8, ease: "power2.inOut" },
        1.7,
      );
      // A held breath, then the emerald curtain lifts (content trails for depth)
      const EXIT = 2.75;
      tl.to(el, { yPercent: -100, duration: 1, ease: "power4.inOut" }, EXIT + 0.05);
      tl.to(content.current, { yPercent: -28, duration: 1, ease: "power4.inOut" }, EXIT + 0.05);

      return () => {
        window.clearTimeout(safety);
        document.body.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="cj-loader fixed inset-0 z-[100] overflow-hidden bg-green-deep"
      aria-hidden
    >
      {/* soft emerald depth */}
      <div className="u-vignette pointer-events-none absolute inset-0 opacity-70" />

      <div
        ref={content}
        className="relative flex h-full flex-col items-center justify-center"
      >
        <div className="relative grid place-items-center">
          {/* the mark */}
          <div ref={mono} className="relative">
            <Monogram className="h-24 w-24 md:h-28 md:w-28" />
          </div>
        </div>

        <div ref={word} className="mt-8">
          <Wordmark layout="stacked" className="text-[18px]" tone="gold" />
        </div>
        <span
          ref={line}
          className="mt-7 block h-px w-24 origin-center bg-line-strong"
        />
      </div>
    </div>
  );
}
