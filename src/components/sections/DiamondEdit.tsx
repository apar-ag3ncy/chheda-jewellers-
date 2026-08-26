"use client";

import { categories } from "@/lib/content/categories";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import Link from "next/link";
import { useRef } from "react";
import { Monogram } from "@/components/ui/Monogram";
import { Button } from "@/components/ui/Button";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { gsap, useGSAP } from "@/lib/gsap";

/** One type - diamonds - presented as an editorial catalogue cover. */
/**
 * Sourced from the diamond room rather than re-declared. These four frames
 * already live in categories.ts with their own alt text, and the copies here
 * had drifted from it - two of the four described the same photograph
 * differently. Only the chapter names belong to this section.
 */
const CHAPTER_NAMES = ["Solitaire", "Brilliance", "Statement", "Eternity"] as const;
const pieces = CHAPTER_NAMES.map((chapterName, i) => {
  const frame = categories.diamond.gallery[i];
  return {
    src: frame?.src ?? "",
    alt: frame?.alt ?? "",
    focus: frame?.focus,
    name: chapterName,
  };
});

export function DiamondEdit() {
  const root = useRef<HTMLElement>(null);
  const arc = useRef<HTMLDivElement>(null);
  const rings = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // Elements already in view at mount animate immediately; the rest wait
        // for their own scroll trigger - so nothing can ever stay stuck hidden.
        const inView = (el: Element) =>
          el.getBoundingClientRect().top < window.innerHeight * 0.92;

        gsap.utils.toArray<HTMLElement>("[data-edit-line]").forEach((el, i) => {
          const base = { y: 26, opacity: 0, duration: 1.0, ease: "lux" };
          if (inView(el)) gsap.from(el, { ...base, delay: i * 0.08 });
          else
            gsap.from(el, {
              ...base,
              delay: i * 0.08,
              scrollTrigger: { trigger: root.current, start: "top 78%", once: true },
            });
        });

        gsap.utils.toArray<HTMLElement>("[data-edit-piece]").forEach((el, i) => {
          const base = { yPercent: 12, opacity: 0, duration: 1.3, ease: "lux" };
          if (inView(el)) gsap.from(el, { ...base, delay: i * 0.12 });
          else
            gsap.from(el, {
              ...base,
              scrollTrigger: { trigger: el, start: "top 90%", once: true },
            });
        });
        // Concentric arcs drift as the section scrolls - a subtle dial
        gsap.fromTo(
          rings.current,
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="diamond-edit"
      data-bg="deep"
      className="relative w-full overflow-hidden bg-green-deep py-20 md:py-28 lg:min-h-screen lg:py-0"
    >
      <div className="grid grid-cols-1 lg:min-h-screen lg:grid-cols-[42%_58%]">
        {/* ── Editorial left panel ── */}
        <div className="relative z-10 flex flex-col justify-center px-[var(--gutter)] py-4 lg:py-24">
          <div data-edit-line>
            <Monogram className="h-14 w-14 md:h-16 md:w-16" />
          </div>

          <p
            data-edit-line
            className="mt-10 font-display text-[clamp(3rem,7vw,5.5rem)] font-light leading-none text-text-strong"
            style={{ letterSpacing: "0.14em" }}
          >
            2026
          </p>

          <div data-edit-line className="mt-10">
            <span aria-hidden className="mb-6 block h-px w-10 bg-line-strong" />
            <h2
              className="font-display text-[clamp(1.6rem,3vw,2.3rem)] font-light uppercase text-text"
              style={{ letterSpacing: "0.22em" }}
            >
              Diamond Edit
            </h2>
            <span aria-hidden className="mt-6 block h-px w-10 bg-line-strong" />
          </div>

          <p
            data-edit-line
            className="mt-10 max-w-xs font-body text-[0.9rem] font-light leading-relaxed text-text-muted"
          >
            Certified, conflict-free diamonds - set for the boardroom, the
            black-tie, and every quiet day in between.
          </p>

          <div data-edit-line className="mt-9">
            <Button href="/jewellery/diamond" variant="outline" size="md" withArrow>
              View the collection
            </Button>
          </div>

          <div
            data-edit-line
            className="mt-10 font-body text-[0.72rem] uppercase leading-relaxed tracking-[0.18em] text-text-muted"
          >
            <p className="text-gold-light">By appointment</p>
            <p className="mt-2">{siteConfig.branches[0]?.area} · {siteConfig.branches[0]?.city}</p>
            <p className="mt-2 normal-case tracking-normal">{siteConfig.contact.email}</p>
          </div>
        </div>

        {/* ── Arc composition ── */}
        <div className="relative min-h-[70vh] overflow-hidden lg:min-h-screen">
          {/* Concentric gold arcs, centred near the arc's edge */}
          <div
            ref={rings}
            aria-hidden
            className="pointer-events-none absolute right-0 top-1/2 z-0 hidden -translate-y-1/2 translate-x-1/2 lg:block"
          >
            {[0, 1, 2].map((i) => {
              const size = 92 + i * 15; // vw
              return (
                <span
                  key={i}
                  className="absolute rounded-full border border-gold/20"
                  style={{
                    width: `${size}vw`,
                    height: `${size}vw`,
                    left: `${-size / 2}vw`,
                    top: `${-size / 2}vw`,
                  }}
                />
              );
            })}
          </div>

          {/* Image bands, clipped to a big convex arc on desktop */}
          <div
            ref={arc}
            className="group/arc relative z-10 flex h-full flex-col gap-1.5 p-4 lg:gap-[3px] lg:p-0 lg:[clip-path:circle(80%_at_104%_50%)]"
          >
            {pieces.map((p, i) => (
              <Link
                key={p.name}
                href="/jewellery/diamond"
                data-edit-piece
                aria-label={`${p.name} - view the diamond collection`}
                className={cn(
                  "group/piece relative block overflow-hidden opacity-100 transition-opacity duration-500",
                  "h-56 lg:h-auto lg:flex-1",
                  "lg:group-hover/arc:opacity-40 lg:hover:!opacity-100",
                )}
              >
                <Image
                  src={p.src}
                  alt={p.alt}
                  placeholder="blur" blurDataURL={EMERALD_LQIP} fill
                  sizes="(max-width: 1024px) 100vw, 58vw"
                  className="object-cover grayscale transition-all duration-[900ms] ease-[var(--ease-lux)] group-hover/piece:grayscale-0 group-hover/piece:scale-[1.04]"
                  style={{ objectPosition: i === 1 ? "50% 30%" : "50% 40%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-green-deep/20 transition-opacity duration-500 group-hover/piece:opacity-0"
                />
                {/* Piece label - slides up on hover */}
                <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-3 p-5 opacity-0 transition-all duration-500 ease-[var(--ease-lux)] group-hover/piece:translate-y-0 group-hover/piece:opacity-100">
                  <p className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-gold-light">
                    N° {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-1 font-display text-2xl font-light text-text-strong">
                    {p.name}
                    <span aria-hidden className="ml-2 text-gold">
                      →
                    </span>
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
