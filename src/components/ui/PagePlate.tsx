import type { ReactNode } from "react";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { emphasise } from "@/components/ui/SectionHeading";
import type { ImageAsset } from "@/types/content";
import { cn } from "@/lib/cn";
import { PagePlateMotion } from "@/components/ui/PagePlateMotion";

type MetaRow = { label: string; value: string };

/** Desktop column count for the meta rail, keyed by how many entries it holds. */
const RAIL_COLUMNS = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
} as const;

type PagePlateProps = {
  /** Archive-style index, e.g. "III". Purely typographic. */
  folio?: string;
  eyebrow: string;
  /** "\n" breaks lines, *phrases* set in Cormorant italic. */
  title: string;
  intro?: ReactNode;
  /** The tall plate on the right. Omit for a text-only header. */
  plate?: ImageAsset;
  /** Structured key/value rail under the header - the "spec sheet" line. */
  meta?: MetaRow[];
  children?: ReactNode;
  className?: string;
};

/**
 * THE INTERIOR HEADER.
 *
 * The site had exactly two page openings: a full-bleed cinematic cover (home,
 * categories, edits) and a bare left-aligned `PageHeader` (everything else).
 * That second one is why the interior pages read as an afterthought - a
 * headline floating on empty emerald.
 *
 * This is the third: an asymmetric editorial spread. Display type on the left
 * against a tall plate on the right, split by a gold rule, closing on a ruled
 * meta rail. It is deliberately NOT a smaller version of the cinematic cover -
 * a cover fills the screen and says "look"; a plate fits above the fold and
 * says "here is what this page contains", which is the right register for an
 * interior page.
 *
 * The meta rail is the load-bearing part: it gives every interior page the
 * same structured, scannable line of facts, so the section reads as one
 * publication rather than five pages that happen to share a palette.
 */
export function PagePlate({
  folio,
  eyebrow,
  title,
  intro,
  plate,
  meta,
  children,
  className,
}: PagePlateProps) {
  return (
    <header className={cn("relative overflow-hidden bg-bg pt-32 md:pt-40", className)}>
      <PagePlateMotion hasPlate={Boolean(plate)}>
      <Container>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          {/* ── Type column ───────────────────────────────────────────── */}
          <div
            data-plate-type
            className={cn("flex flex-col", plate ? "md:col-span-7" : "md:col-span-9")}
          >
            <div className="flex items-baseline gap-5">
              {folio ? (
                <Reveal
                  as="span"
                  variant="settle"
                  className="font-display text-[length:var(--step-2)] font-light leading-none text-gold/70"
                >
                  {folio}
                </Reveal>
              ) : null}
              <Reveal as="p" className="u-eyebrow">
                {eyebrow}
              </Reveal>
            </div>

            <SplitLines delay={0.05} className="mt-7">
              <h1 className="font-display text-[clamp(2.4rem,6vw,4.6rem)] font-light leading-[0.98] tracking-[var(--tracking-5)]">
                {title.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {emphasise(l)}
                  </span>
                ))}
              </h1>
            </SplitLines>

            {intro ? (
              <Reveal
                as="p"
                delay={0.1}
                className="mt-7 max-w-lg font-body text-[1.02rem] font-light leading-relaxed text-text-muted"
              >
                {intro}
              </Reveal>
            ) : null}

            {children ? <div className="mt-8">{children}</div> : null}
          </div>

          {/* ── Plate column ──────────────────────────────────────────── */}
          {plate ? (
            <div className="md:col-span-5">
              <Reveal variant="mask" delay={0.08}>
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-green-deep md:aspect-[3/4]">
                  <div data-plate-art className="absolute inset-0 scale-[1.12]">
                  <Image
                    src={plate.src}
                    alt={plate.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    priority
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                    style={{ objectPosition: plate.focus ?? "50% 28%" }}
                  />
                  </div>
                  {/* Outside the drifting layer: the hairline marks the frame,
                      not the photograph, so it must not travel with it. */}
                  <span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-px"
                    style={{ background: "var(--grad-gold)", opacity: 0.55 }}
                  />
                </div>
              </Reveal>
            </div>
          ) : null}
        </div>

        {/* ── Meta rail ───────────────────────────────────────────────── */}
        {meta?.length ? (
          <dl
            className={cn(
              "mt-12 grid grid-cols-1 gap-x-6 gap-y-6 border-t border-line pt-7 sm:grid-cols-2 md:mt-16",
              // The rail takes as many columns as it has entries, so a short
              // rail fills its width instead of leaving dead cells on the
              // right. Written as whole class names for Tailwind's scanner.
              RAIL_COLUMNS[Math.min(meta.length, 4) as 1 | 2 | 3 | 4],
            )}
          >
            {meta.map((m, i) => (
              <Reveal key={m.label} delay={i * 0.05} variant="slide" x={-22}>
                <dt className="font-body text-[0.58rem] uppercase tracking-[0.2em] text-text-muted">
                  {m.label}
                </dt>
                <dd className="mt-2 font-display text-[1.15rem] font-light leading-snug text-text-strong">
                  {m.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        ) : null}
      </Container>
      </PagePlateMotion>
    </header>
  );
}
