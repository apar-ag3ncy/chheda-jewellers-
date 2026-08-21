"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";

const SEEN_KEY = "cj_loader_seen";

/**
 * On-brand loader — fast by design. Runs once per session, honours
 * prefers-reduced-motion, and never gates content from crawlers
 * (the page is fully rendered beneath this fixed overlay).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
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

      // Prevent scroll during the reveal.
      document.body.style.overflow = "hidden";

      const finish = () => {
        sessionStorage.setItem(SEEN_KEY, "1");
        document.body.style.overflow = "";
        gsap.set(el, { display: "none" });
      };

      // Safety net: a plain timer fires even if the GSAP ticker is paused
      // (e.g. the tab was opened in the background), so scroll never stays
      // locked and content is never trapped behind the overlay.
      const safety = window.setTimeout(finish, 4500);

      const tl = gsap.timeline({
        defaults: { ease: "lux" },
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      tl.from(mono.current, { scale: 0.82, rotate: -35, autoAlpha: 0, duration: 0.9 })
        .from(word.current, { yPercent: 40, autoAlpha: 0, duration: 0.6 }, "-=0.4")
        .fromTo(
          line.current,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.7, ease: "power2.inOut" },
          "-=0.4",
        )
        .to({}, { duration: 0.25 })
        .to(
          el,
          { yPercent: -100, duration: 0.9, ease: "power4.inOut" },
          "+=0.05",
        );

      // Always release scroll if the intro is interrupted before it completes.
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
      className="cj-loader fixed inset-0 z-[100] flex items-center justify-center bg-green-deep"
      aria-hidden
    >
      <div className="flex flex-col items-center">
        <div ref={mono}>
          <Monogram className="h-20 w-20 md:h-24 md:w-24" />
        </div>
        <div ref={word} className="mt-6">
          <Wordmark layout="stacked" className="text-[18px]" tone="gold" />
        </div>
        <span
          ref={line}
          className="mt-7 block h-px w-24 origin-left bg-line-strong"
        />
      </div>
    </div>
  );
}
