"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { Monogram } from "@/components/ui/Monogram";

const SEEN_KEY = "cj_loader_seen";

/**
 * The loading page is the mark, and nothing else.
 *
 * No wordmark, no hairline, no progress bar - the whole performance is the
 * logo turning. The lotus mandala unwinds one and a half turns clockwise while
 * the interlocking CJ core counter-spins two and a half turns the other way;
 * both decelerate on the "cinema" curve, which spends most of its distance in
 * the first third and then drifts to a stop. The two rings therefore appear to
 * fall into alignment in slow motion rather than simply arriving.
 *
 * Everything else on screen is light, not geometry: the mark resolves out of a
 * blur, a warm bloom swells behind it as it locks, and the emerald curtain
 * lifts. Adding a second shape would make it a logo animation; keeping it to
 * light keeps it cinema.
 *
 * Fast by design: ~3.4s end to end, once per session, skipped entirely under
 * prefers-reduced-motion, and never gating content from crawlers (the page is
 * fully rendered beneath this fixed overlay).
 */
export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const mono = useRef<HTMLDivElement>(null);
  const bloom = useRef<HTMLDivElement>(null);

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
      const safety = window.setTimeout(finish, 6500);

      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      // ── The turn ────────────────────────────────────────────────────────
      // Scale and rotation share one duration and one curve, so the mark reads
      // as a single object arriving - not as a stack of separate tweens.
      const SPIN = 2.9;

      tl.fromTo(
        mono.current,
        { scale: 0.24, autoAlpha: 0, filter: "blur(14px)" },
        {
          scale: 1,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: SPIN,
          ease: "cinema",
        },
        0,
      );

      if (mandala) {
        tl.from(
          mandala,
          {
            rotation: 540, // one and a half turns, clockwise
            svgOrigin: "200 200",
            duration: SPIN,
            ease: "cinema",
          },
          0,
        );
      }
      if (core) {
        tl.from(
          core,
          {
            rotation: -900, // two and a half turns, the other way
            svgOrigin: "200 200",
            duration: SPIN,
            ease: "cinema",
          },
          0,
        );
      }

      // ── The lock ────────────────────────────────────────────────────────
      // A warm bloom swells behind the mark exactly as the rotation stops,
      // reading as the gold catching the light rather than as a new element.
      tl.fromTo(
        bloom.current,
        { autoAlpha: 0, scale: 0.55 },
        { autoAlpha: 1, scale: 1, duration: 1.5, ease: "power2.out" },
        SPIN - 1.5,
      ).to(
        bloom.current,
        { autoAlpha: 0.35, duration: 0.7, ease: "power2.inOut" },
        SPIN + 0.05,
      );

      // ── The lift ────────────────────────────────────────────────────────
      // A held breath after the lock, then the emerald curtain leaves. The
      // mark travels slower than the curtain, so it is still settling as the
      // hero arrives underneath - the two scenes overlap instead of cutting.
      const EXIT = SPIN + 0.34;
      tl.to(el, { yPercent: -100, duration: 1.15, ease: "veil" }, EXIT);
      tl.to(
        stage.current,
        { yPercent: -34, scale: 1.06, duration: 1.15, ease: "veil" },
        EXIT,
      );

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
        ref={stage}
        className="relative grid h-full place-items-center will-change-transform"
      >
        {/* Warm bloom - light, not geometry. Sits behind the mark and never
            intercepts a pointer. */}
        <div
          ref={bloom}
          aria-hidden
          className="pointer-events-none absolute h-[26rem] w-[26rem] rounded-full opacity-0 md:h-[34rem] md:w-[34rem]"
          style={{
            background:
              "radial-gradient(circle, color-mix(in srgb, var(--gold) 26%, transparent) 0%, color-mix(in srgb, var(--gold-deep) 10%, transparent) 38%, transparent 68%)",
          }}
        />

        <div ref={mono} className="relative will-change-transform">
          <Monogram className="h-28 w-28 md:h-36 md:w-36" />
        </div>
      </div>
    </div>
  );
}
