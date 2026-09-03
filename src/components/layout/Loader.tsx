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
 * ~5.5s end to end, skippable at any moment (click, tap or any key), once
 * per session, skipped entirely under
 * prefers-reduced-motion, and never gating content from crawlers (the page is
 * fully rendered beneath this fixed overlay).
 */
/**
 * Storage access is not merely possibly-undefined - it THROWS in Chrome with
 * site data blocked, in a sandboxed iframe, and in Firefox with dom.storage
 * disabled. An unguarded read here threw before the timeline was built, so the
 * loader never ran, never lifted, and left body scroll locked for the whole
 * visit. Both helpers fail closed: the intro simply plays again.
 */
function readSeen(): boolean {
  try {
    return sessionStorage.getItem(SEEN_KEY) === "1";
  } catch {
    return false;
  }
}

function writeSeen(): void {
  try {
    sessionStorage.setItem(SEEN_KEY, "1");
  } catch {
    /* storage blocked - the intro will simply play again next navigation */
  }
}

export function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const skipRef = useRef<(() => void) | null>(null);
  const mono = useRef<HTMLDivElement>(null);
  const bloom = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const seen =
        readSeen();
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      if (seen || reduce) {
        gsap.set(el, { display: "none" });
        if (reduce && !seen) writeSeen();
        return;
      }

      const mandala = el.querySelector<SVGGElement>(".cj-mandala");
      const core = el.querySelector<SVGGElement>(".cj-core");

      // Prevent scroll during the reveal. On <html>, not <body>: the nav's
      // own effect writes body.style.overflow on mount (to "" when its menu
      // is closed) and was silently erasing this lock, so the page could be
      // scrolled beneath the curtain.
      document.documentElement.style.overflow = "hidden";

      const finish = () => {
        writeSeen();
        document.documentElement.style.overflow = "";
        gsap.set(el, { display: "none" });
        // Anything timed that sits under the curtain needs to know the
        // curtain is gone. The hero carousel in particular was counting down
        // behind it, so its first slide could be most of the way through
        // before anyone had seen a frame of it.
        window.dispatchEvent(new CustomEvent("cj:intro-done"));
      };

      // Safety net: fires even if the GSAP ticker is throttled (e.g. the tab
      // opened in the background), so scroll never stays locked.
      const safety = window.setTimeout(finish, 5600);

      const tl = gsap.timeline({
        onComplete: () => {
          window.clearTimeout(safety);
          finish();
        },
      });

      // Skip. A returning visitor is never shown this, but a first-time
      // visitor should not be held for five and a half seconds with no way
      // out. Any click, tap or key runs the curtain out fast rather than
      // cutting, so leaving early still looks composed.
      const skip = () => {
        if (tl.progress() > 0.92) return;
        detachSkip();
        tl.kill();
        window.clearTimeout(safety);
        gsap
          .timeline({ onComplete: finish })
          .to(stage.current, { autoAlpha: 0, duration: 0.34, ease: "power2.in" }, 0)
          .to(el, { yPercent: -100, duration: 0.5, ease: "veil" }, 0.06);
      };
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Tab") return; // let a keyboard user reach the button itself
        skip();
      };
      const detachSkip = () => {
        el.removeEventListener("pointerdown", skip);
        window.removeEventListener("keydown", onKey);
      };
      skipRef.current = skip;
      el.addEventListener("pointerdown", skip);
      window.addEventListener("keydown", onKey);

      // ── The turn ────────────────────────────────────────────────────────
      // Scale and rotation share one duration and one curve, so the mark reads
      // as a single object arriving - not as a stack of separate tweens.
      // 2.4, not 3.6. "cinema" spends its distance in the first third, so at 3.6s
      // the mark was fully arrived by ~1.4s and then sat frozen for two seconds
      // before the curtain moved - a stall, not slow motion. At 2.4s the
      // visible travel fills the slot, and the exit below begins a beat BEFORE
      // the settle ends, so the piece never comes to a dead stop on screen.
      const SPIN = 2.4;

      tl.fromTo(
        mono.current,
        { scale: 0.24, autoAlpha: 0, filter: "blur(14px)" },
        {
          scale: 1,
          autoAlpha: 1,
          filter: "blur(0px)",
          duration: SPIN,
          ease: "cinema",
          /**
           * Hand the mark back to the renderer at full size.
           *
           * The mark is vector and should be perfectly sharp, but it arrives
           * by scaling 0.24 -> 1. A composited layer is rasterised ONCE at its
           * current size and the bitmap is then scaled by the transform, so
           * the mandala was being drawn at about a quarter size and blown up
           * four times - which is why it settled soft instead of crisp. The
           * blur filter forces the same thing.
           *
           * Clearing both at the end drops the element off its own layer and
           * the SVG repaints at its true size.
           */
          onComplete: () => {
            gsap.set(mono.current, { clearProps: "filter,willChange,scale" });
          },
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
        { autoAlpha: 1, scale: 1, duration: 1.3, ease: "power2.out" },
        SPIN - 1.3,
      ).to(
        bloom.current,
        { autoAlpha: 0.35, duration: 0.7, ease: "power2.inOut" },
        SPIN + 0.05,
      );

      // ── The lift ────────────────────────────────────────────────────────
      // A held breath after the lock, then the emerald curtain leaves. The
      // mark travels slower than the curtain, so it is still settling as the
      // hero arrives underneath - the two scenes overlap instead of cutting.
      const EXIT = SPIN - 0.15;
      tl.to(el, { yPercent: -100, duration: 1.25, ease: "veil" }, EXIT);
      tl.to(
        stage.current,
        { yPercent: -30, scale: 1.05, duration: 1.5, ease: "veil" },
        EXIT,
      );

      return () => {
        skipRef.current = null;
        detachSkip();
        window.clearTimeout(safety);
        document.documentElement.style.overflow = "";
      };
    },
    { scope: root },
  );

  return (
    <div
      ref={root}
      className="cj-loader fixed inset-0 z-[100] overflow-hidden bg-green-deep"
    >
      {/* The overlay itself is decorative, but the way out must not be: a real
          button, first in the tab order, for anyone who cannot click a
          backdrop or wait. */}
      <button
        type="button"
        onClick={() => skipRef.current?.()}
        className="absolute right-4 top-4 z-10 rounded-full border border-line px-4 py-2 font-body text-[0.62rem] uppercase tracking-[0.18em] text-beige/80 outline-none transition-colors hover:border-gold hover:text-text-strong focus-visible:ring-2 focus-visible:ring-gold-light md:right-6 md:top-6"
      >
        Skip
      </button>
      {/* soft emerald depth */}
      <div className="u-vignette pointer-events-none absolute inset-0 opacity-70" />

      <div
        ref={stage}
        // No standing hint here either: this is the mark's PARENT, and a
        // composited parent rasterises its whole subtree - which would put the
        // mandala straight back on a fixed-resolution layer. GSAP promotes it
        // for the curtain lift and lets it go afterwards.
        className="relative grid h-full place-items-center"
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

        {/* No permanent will-change here. A standing layer hint keeps the
            mark on a fixed-resolution layer for the whole intro, which is
            exactly what made a vector mandala look soft; GSAP promotes it for
            the duration of the tween on its own and releases it after. */}
        <div ref={mono} className="relative">
          <Monogram className="h-32 w-32 md:h-40 md:w-40" />
        </div>
      </div>
    </div>
  );
}
