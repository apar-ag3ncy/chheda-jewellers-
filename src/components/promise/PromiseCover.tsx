import { siteConfig } from "@/config/site";
import Link from "next/link";
import { promiseIntro, promiseIndex } from "@/lib/content/promise";
import { emphasise } from "@/components/ui/SectionHeading";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { ParallaxImage } from "@/components/motion/ParallaxImage";
import { Monogram } from "@/components/ui/Monogram";

/**
 * THE COVER - the promise page's opening spread.
 *
 * It replaces a bare PageHeader, which was a headline floating on empty
 * emerald - precisely the opening this codebase elsewhere calls "why the
 * interior pages read as an afterthought". A page whose whole argument is
 * "we are a document of record, come and check us" should open like a bound
 * document: title plate on the left, the portrait on the right sealed with
 * the house mark, and the table of contents ruled underneath.
 *
 * The contents are the load-bearing part. The same five rows used to render
 * further down the page as a list that linked nowhere - an index you cannot
 * use is scenery. Each row now anchors to its chapter (#house, #hallmark,
 * #estimate, #refusals, #checklist), with a dotted leader drawn between the
 * label and the note the way a printed contents page rules the eye across,
 * and the row's numeral swinging gold on hover. The list moved OUT of
 * Chapters and up here, so it is read before the scroll rather than during
 * it.
 *
 * The seal is the Monogram in a gold ring, tilted two degrees and overlapping
 * the portrait's corner - the one playful stroke on the page, and it earns
 * its place by being the house's actual mark in the position a notary's
 * stamp would occupy.
 */
export function PromiseCover() {
  return (
    <header className="relative overflow-hidden bg-bg pb-16 pt-32 md:pb-24 md:pt-44">
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* ── Title plate ─────────────────────────────────────────── */}
          <div className="flex flex-col justify-center md:col-span-7">
            <Reveal as="p" className="u-eyebrow mb-6">
              {promiseIntro.eyebrow}
            </Reveal>
            <SplitLines delay={0.05}>
              <h1 className="font-display text-[length:var(--step-5)] font-light leading-[var(--leading-5)] tracking-[var(--tracking-5)]">
                {promiseIntro.headline.split("\n").map((line, i) => (
                  <span key={i} className="block">
                    {emphasise(i === 1 ? "as good as *their word*" : line)}
                  </span>
                ))}
              </h1>
            </SplitLines>
            <Reveal delay={0.12}>
              <span aria-hidden className="mt-8 block h-px w-16 bg-gold/60" />
              <p className="mt-6 max-w-lg font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                {promiseIntro.body}
              </p>
            </Reveal>
          </div>

          {/* ── The sealed portrait ─────────────────────────────────── */}
          <div className="relative md:col-span-5">
            <ParallaxImage
              src="/media/promise/promise-01.jpg"
              alt="Model in red beside an emerald pillar, in fine gold jewellery"
              focus="50% 30%"
              className="aspect-[4/5] w-full"
              sizes="(max-width: 768px) 100vw, 40vw"
            />
            <Reveal
              variant="settle"
              delay={0.3}
              className="absolute -bottom-7 -left-5 md:-left-8"
            >
              <span
                className="flex h-24 w-24 items-center justify-center rounded-full border border-gold/60 bg-green-deep/95 shadow-[0_18px_40px_-16px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(240,207,170,0.35)] md:h-28 md:w-28"
                style={{ transform: "rotate(-4deg)" }}
              >
                <span className="flex flex-col items-center gap-1.5">
                  <Monogram className="h-9 w-9 md:h-10 md:w-10" />
                  <span className="font-body text-[0.5rem] uppercase tracking-[0.3em] text-gold-light/90">
                    Est. {siteConfig.foundedYear}
                  </span>
                </span>
              </span>
            </Reveal>
          </div>
        </div>

        {/* ── Contents, ruled and live ────────────────────────────────── */}
        <nav aria-label="Contents" className="mt-20 md:mt-28">
          <Reveal as="p" className="u-eyebrow mb-5">
            Contents
          </Reveal>
          <ol className="max-w-3xl">
            {promiseIndex.map((row, i) => (
              <Reveal as="li" key={row.n} delay={i * 0.05}>
                <Link
                  href={row.href}
                  className="group flex items-baseline gap-5 border-t border-line py-4 transition-colors last:border-b hover:bg-white/[0.03]"
                >
                  <span className="font-body text-[0.68rem] tracking-[0.2em] text-gold-light transition-transform duration-300 group-hover:-translate-y-0.5">
                    {row.n}
                  </span>
                  <span className="font-display text-[length:var(--step-1)] font-light text-text-strong transition-colors group-hover:text-gold-light">
                    {row.label}
                  </span>
                  {/* the dotted leader a printed contents page rules across */}
                  <span
                    aria-hidden
                    className="mx-1 flex-1 self-center border-b border-dotted border-line-strong/50"
                  />
                  <span className="hidden shrink-0 font-body text-[0.78rem] font-light text-text-muted sm:block">
                    {row.note}
                  </span>
                  <span
                    aria-hidden
                    className="text-[0.7rem] text-gold opacity-0 transition-all duration-300 group-hover:translate-y-0.5 group-hover:opacity-100"
                  >
                    ↓
                  </span>
                </Link>
              </Reveal>
            ))}
          </ol>
        </nav>
      </Container>
    </header>
  );
}
