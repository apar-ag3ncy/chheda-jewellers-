"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { promiseIntro, promiseValues } from "@/lib/content/promise";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Dock, DockIcon, DockItem, DockLabel } from "@/components/ui/dock";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * The promise section's working half: the band, the dock, and the ledger
 * line beneath them - one client component because they share state.
 *
 * THE PANEL UNDER THE DOCK is the reason this is interactive at all. Resting,
 * it carries the section's own intro line; hover (or focus) a mark and it
 * turns into that mark's three proofs. Three, not a paragraph: the section's
 * job is to make the claim quickly, and three short lines under a picture is
 * the most anyone reads standing up. The area is height-reserved so the swap
 * never moves the page, and each swap replays the site's fadeRise rather
 * than a bespoke animation.
 *
 * THE CHIPS CARRY FRAMES, not numerals, and the mapping is meant to be read:
 * 22K gold up close for purity, the priced diamond pendant for transparent
 * pricing, the karigar's hands mid-fitting for craft, the heirloom choker
 * for the lifetime. Numerals said "there are four"; the frames say what the
 * four are before a single label is read.
 *
 * THE EXIT is scroll-linked, the same two-speed handoff the hero and footer
 * use: as the section scrolls out, this block drifts up slightly faster than
 * the page and dims a shade, so the next section arrives underneath it
 * rather than after it. Scrubbed - reversing the scroll reverses it exactly.
 */
export function PromiseDock() {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const shown = active === null ? null : promiseValues[active];

  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tween = gsap.to(el, {
          yPercent: -5,
          autoAlpha: 0.72,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "bottom 55%",
            end: "bottom top",
            scrub: 0.7,
          },
        });
        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });
    },
    { scope: root },
  );

  return (
    <div ref={root}>
      {/* ── The metal, wide ─────────────────────────────────────────── */}
      <div className="relative mt-10 md:mt-14">
        <ParallaxImage
          src="/media/promise/promise-band.jpg"
          alt="A diamond chain carrying a diamond-set emerald pendant"
          focus="50% 45%"
          intensity={0.07}
          className="aspect-[21/9] w-full md:aspect-[3/1]"
          sizes="(max-width: 768px) 100vw, 92vw"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5"
          style={{
            background:
              "linear-gradient(to top, color-mix(in srgb, var(--green) 78%, transparent) 0%, transparent 100%)",
          }}
        />
        <div className="absolute inset-x-0 -bottom-7 md:-bottom-8">
          <Dock aria-label="The four marks of the promise">
            {promiseValues.map((v, i) => (
              <div
                key={v.id}
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocusCapture={() => setActive(i)}
                onBlurCapture={() => setActive(null)}
                className="contents"
              >
                <DockItem href={`/chheda-promise#${v.id === "purity" ? "hallmark" : v.id === "transparency" ? "estimate" : v.id === "craft" ? "house" : "checklist"}`} label={v.title}>
                  <DockLabel>{v.title}</DockLabel>
                  <DockIcon className="overflow-hidden rounded-full">
                    {v.image ? (
                      <Image
                        src={v.image.src}
                        alt=""
                        width={96}
                        height={96}
                        className="h-full w-full rounded-full object-cover"
                        style={{ objectPosition: v.image.focus ?? "50% 50%" }}
                      />
                    ) : null}
                  </DockIcon>
                </DockItem>
              </div>
            ))}
          </Dock>
        </div>
      </div>

      {/* room for the overhanging dock */}
      <div aria-hidden className="h-10 md:h-12" />

      {/* ── The ledger line: intro at rest, proofs on hover ─────────── */}
      <div
        aria-live="polite"
        className="mx-auto mt-4 flex min-h-[7.5rem] max-w-2xl items-start justify-center md:min-h-[6.75rem]"
      >
        {shown ? (
          <ul key={shown.id} className="flex flex-col gap-2.5">
            {(shown.points ?? []).slice(0, 3).map((point, i) => (
              <li
                key={point}
                className="flex items-baseline gap-3.5"
                style={{
                  animation: "fadeRise 0.5s var(--ease-lux) both",
                  animationDelay: `${i * 0.06}s`,
                }}
              >
                <span aria-hidden className="text-[0.6rem] text-gold">◆</span>
                <span className="font-display text-[1.15rem] font-light leading-snug text-text-strong md:text-[1.3rem]">
                  {point}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p
            key="intro"
            className={cn("max-w-xl text-center font-body text-[0.98rem] font-light leading-relaxed text-text-muted")}
            style={{ animation: "fadeRise 0.5s var(--ease-lux) both" }}
          >
            {promiseIntro.body}
          </p>
        )}
      </div>
    </div>
  );
}
