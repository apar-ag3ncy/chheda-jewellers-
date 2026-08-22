"use client";

import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { useEffect, useState } from "react";
import { heroSlides } from "@/lib/content";
import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

const SLIDE_MS = 6400;

/**
 * Hero A — stable cinematic slides. Crossfade + a slow, continuous Ken Burns
 * are pure CSS (deterministic, no per-slide GSAP revert), so slides never
 * hard-stop and reduced motion is honoured automatically via the global floor
 * (crossfade + zoom collapse to instant). Headlines rise from a mask on change.
 */
export function Hero() {
  const [active, setActive] = useState(0);
  const [reduce, setReduce] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    setReduce(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  // Autoplay. Disabled under reduced motion or when paused; `active` in the
  // deps restarts the timer on every change so a manually-selected slide gets
  // a full interval before advancing (WCAG 2.2.2 pause control below).
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(
      () => setActive((a) => (a + 1) % heroSlides.length),
      SLIDE_MS,
    );
    return () => clearInterval(id);
  }, [reduce, paused, active]);

  const slide = heroSlides[active]!;

  return (
    <section
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-green-deep"
      aria-roledescription="carousel"
      aria-label={`${siteConfig.name} featured`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slide layers — CSS crossfade */}
      {heroSlides.map((s, i) => (
        <div
          key={s.id}
          className={cn(
            "absolute inset-0 transition-opacity duration-[1300ms] ease-[var(--ease-lux)]",
            i === active ? "opacity-100" : "opacity-0",
          )}
          aria-hidden={i !== active}
        >
          <Image
            src={s.image.src}
            alt={s.image.alt}
            placeholder="blur" blurDataURL={EMERALD_LQIP} fill
            priority={i === 0}
            sizes="100vw"
            className="object-cover"
            style={{
              objectPosition: s.image.focus ?? "50% 40%",
              animation: "heroZoom 16s ease-out infinite alternate",
            }}
          />
        </div>
      ))}

      {/* Text-anchored scrim — darkens only the lower-left where the copy sits,
          so the headline + body stay legible on bright frames while the top of
          the image reads clean (no edge vignette). */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, color-mix(in srgb, var(--green-deep) 64%, transparent) 0%, color-mix(in srgb, var(--green-deep) 24%, transparent) 32%, transparent 52%), radial-gradient(130% 115% at 8% 94%, color-mix(in srgb, var(--green-deep) 48%, transparent) 0%, transparent 60%)",
        }}
      />

      {/* Content — keyed by slide so the reveal replays on change (CSS-driven,
          deterministic, and reduced-motion-safe via the global floor). */}
      <div className="u-container relative flex h-full flex-col justify-end pb-24 md:justify-center md:pb-0 md:pt-16">
        <div key={active} className="max-w-2xl">
          <p
            className="u-eyebrow mb-6"
            style={{ animation: "fadeRise 0.8s var(--ease-lux) both", animationDelay: "0.1s" }}
          >
            {slide.eyebrow}
          </p>
          <h1 className="font-display text-[clamp(2.4rem,8.5vw,6.6rem)] font-light leading-[0.98]">
            {slide.headline.split("\n").map((line, i) => (
              <span key={i} className="block overflow-hidden py-[0.02em]">
                <span
                  className="block"
                  style={{
                    animation: "heroLineRise var(--dur-slow) var(--ease-lux) both",
                    animationDelay: `${0.22 + i * 0.09}s`,
                  }}
                >
                  {line}
                </span>
              </span>
            ))}
          </h1>
          <p
            className="mt-7 max-w-md font-body text-[1rem] font-light leading-relaxed text-text"
            style={{ animation: "fadeRise 0.8s var(--ease-lux) both", animationDelay: "0.55s" }}
          >
            {slide.sub}
          </p>
          {slide.cta ? (
            <div
              className="mt-9"
              style={{ animation: "fadeRise 0.8s var(--ease-lux) both", animationDelay: "0.7s" }}
            >
              <Button href={slide.cta.href} variant="outline" size="lg" withArrow>
                {slide.cta.label}
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {/* Slide dots + pause control */}
      <div className="u-container pointer-events-none absolute inset-x-0 bottom-8 md:bottom-10">
        <div className="pointer-events-auto flex items-center gap-3">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Show slide ${i + 1}`}
              aria-current={i === active}
              onClick={() => setActive(i)}
              className="group flex h-10 items-center"
            >
              <span
                className={cn(
                  "block h-px rounded-full transition-all duration-500 ease-[var(--ease-lux)]",
                  i === active
                    ? "w-12 bg-gold-light"
                    : "w-6 bg-line-strong group-hover:bg-text-muted",
                )}
              />
            </button>
          ))}
          {!reduce ? (
            <button
              type="button"
              onClick={() => setPaused((p) => !p)}
              aria-label={paused ? "Play slideshow" : "Pause slideshow"}
              className="ml-2 flex h-10 w-10 items-center justify-center text-text-muted transition-colors hover:text-gold-light"
            >
              {paused ? (
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                  <path d="M8 5v14l11-7z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-3 w-3 fill-current" aria-hidden>
                  <path d="M6 5h4v14H6zM14 5h4v14h-4z" />
                </svg>
              )}
            </button>
          ) : null}
        </div>
      </div>

      {/* Scroll hint */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
      >
        <span className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-text-muted">
          Scroll
        </span>
        <span className="relative block h-9 w-px bg-line-strong">
          <span
            className="absolute left-0 top-0 block h-3 w-px bg-gold-light"
            style={{ animation: "scroll-hint 2.2s var(--ease-soft) infinite" }}
          />
        </span>
      </div>
    </section>
  );
}
