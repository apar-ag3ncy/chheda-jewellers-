"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { collections } from "@/lib/content/collections";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function Collections() {
  const [active, setActive] = useState(0);
  const current = collections[active]!;

  return (
    <Section id="collections" spacing="lg" tone="transparent" data-bg="green">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title={"Campaigns, not\ncatalogues"}
          size="lg"
        />

        {/* Interactive showcase — hover-driven, so gated to lg+ (pointer devices);
            touch tablets fall through to the tappable stacked cards below. */}
        <div className="mt-14 hidden gap-12 lg:grid lg:grid-cols-12 lg:gap-14">
          {/* Feature image */}
          <Reveal className="lg:col-span-7">
            <div className="relative aspect-[5/6] w-full overflow-hidden bg-green-deep">
              {collections.map((c, i) => (
                <Image
                  key={c.id}
                  src={c.image.src}
                  alt={c.image.alt}
                  fill
                  sizes="58vw"
                  className={cn(
                    "object-cover transition-opacity duration-[900ms] ease-[var(--ease-lux)]",
                    i === active ? "opacity-100" : "opacity-0",
                  )}
                  style={{ objectPosition: c.image.focus ?? "50% 40%" }}
                />
              ))}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-green-deep/66 via-transparent to-transparent"
              />
              <div key={active} className="absolute inset-x-0 bottom-0 p-8" style={{ animation: "fadeRise .6s var(--ease-lux) both" }}>
                <p className="u-eyebrow mb-3 text-gold-light">{current.tagline}</p>
                <h3 className="font-display text-[clamp(2.4rem,5vw,4rem)] font-light leading-none text-text-strong">
                  {current.name}
                </h3>
              </div>
            </div>
          </Reveal>

          {/* Index list */}
          <div className="lg:col-span-5 lg:pl-4">
            <ul className="flex flex-col">
              {collections.map((c, i) => (
                <li key={c.id}>
                  <Link
                    href={c.href}
                    onMouseEnter={() => setActive(i)}
                    onFocus={() => setActive(i)}
                    className={cn(
                      "group flex items-baseline gap-5 border-t border-line py-6 transition-colors duration-300",
                      i === active ? "text-text-strong" : "text-text-muted",
                    )}
                  >
                    <span className="font-body text-[0.7rem] tracking-[0.16em] text-gold-light">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="flex-1">
                      <span className="font-display text-3xl font-light">{c.name}</span>
                      <span
                        className={cn(
                          "mt-1 block max-w-xs font-body text-[0.86rem] font-light leading-relaxed transition-all duration-500",
                          i === active
                            ? "max-h-24 opacity-100"
                            : "max-h-0 overflow-hidden opacity-0",
                        )}
                      >
                        {c.description}
                      </span>
                    </span>
                    <span
                      aria-hidden
                      className={cn(
                        "translate-x-0 text-gold transition-all duration-300",
                        i === active ? "opacity-100" : "opacity-0",
                      )}
                    >
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stacked, tappable cards — phones and touch tablets (< lg) */}
        <div className="mt-12 flex flex-col gap-6 lg:hidden">
          {collections.map((c) => (
            <Link key={c.id} href={c.href} className="group relative block aspect-[4/5] overflow-hidden bg-green-deep">
              <Image
                src={c.image.src}
                alt={c.image.alt}
                fill
                sizes="100vw"
                className="object-cover"
                style={{ objectPosition: c.image.focus ?? "50% 40%" }}
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-green-deep/76 via-green-deep/5 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="u-eyebrow mb-2 text-gold-light">{c.tagline}</p>
                <h3 className="font-display text-3xl font-light text-text-strong">{c.name}</h3>
                <p className="mt-2 font-body text-[0.85rem] font-light leading-relaxed text-text-muted">
                  {c.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <Reveal className="mt-14">
          <Button href="/jewellery" variant="outline" size="lg" withArrow>
            View all jewellery
          </Button>
        </Reveal>
      </Container>
    </Section>
  );
}
