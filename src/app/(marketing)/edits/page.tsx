import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { edits, editsIntro } from "@/lib/content/edits";
import { categoryList } from "@/lib/content/categories";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { EditsIndex } from "@/components/edits/EditsIndex";

export const metadata = pageMetadata({
  title: "The Edits",
  description:
    "Five occasions, five edits - bridal, office wear, outings, festive vibes and catching flights. The House of Chheda sorted by where you are wearing it, not what it is made of.",
  path: "/edits",
});

/**
 * /edits - the index of the occasion axis.
 *
 * Opens with the two axes stated plainly (metal ⇄ occasion), because the whole
 * value of this section is that a visitor understands there are two ways in.
 * Then the departures board, then the way back across to the metal rooms.
 */
export default function EditsPage() {
  return (
    <>
      <header className="relative bg-bg pb-10 pt-36 md:pb-16 md:pt-44">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-14">
            <div className="md:col-span-7">
              <SectionHeading
                as="h1"
                eyebrow={editsIntro.eyebrow}
                title={editsIntro.title}
                intro={editsIntro.body}
                size="lg"
              />
            </div>

            {/* The two axes, drawn. A visitor who reads only this understands
                the whole information architecture of the site. */}
            <Reveal
              variant="mask"
              className="self-end md:col-span-5"
            >
              <div className="border border-line p-6 md:p-8">
                <p className="u-eyebrow mb-5">Two ways in</p>
                <dl className="flex flex-col gap-5">
                  <div className="flex items-baseline gap-4 border-b border-line pb-5">
                    <dt className="w-24 shrink-0 font-body text-[0.66rem] uppercase tracking-[0.16em] text-gold-light">
                      By metal
                    </dt>
                    <dd className="flex flex-wrap gap-x-3 gap-y-1">
                      {categoryList.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/jewellery/${c.slug}`}
                          className="font-display text-lg font-light text-text-strong underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                        >
                          {c.name}
                        </Link>
                      ))}
                    </dd>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <dt className="w-24 shrink-0 font-body text-[0.66rem] uppercase tracking-[0.16em] text-gold-light">
                      By occasion
                    </dt>
                    <dd className="flex flex-wrap gap-x-3 gap-y-1">
                      {edits.map((e) => (
                        <Link
                          key={e.slug}
                          href={`/edits/${e.slug}`}
                          className="font-display text-lg font-light text-text-strong underline decoration-transparent underline-offset-4 transition-colors hover:decoration-gold"
                        >
                          {e.name}
                        </Link>
                      ))}
                    </dd>
                  </div>
                </dl>
              </div>
            </Reveal>
          </div>
        </Container>
      </header>

      <EditsIndex />

      {/* Cross-back to the metal rooms - an edit borrows from them, so the
          index has to point both ways or the two axes stop being equal. */}
      <Section spacing="md" tone="green">
        <Container>
          <div className="flex flex-col items-start justify-between gap-6 border-b border-line pb-6 md:flex-row md:items-end">
            <h2 className="max-w-lg font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)]">
              Every edit borrows from the same three rooms.
            </h2>
            <Button href="/jewellery" variant="ghost" withArrow>
              All jewellery
            </Button>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            {categoryList.map((c, i) => (
              <Reveal key={c.slug} delay={i * 0.07}>
                <Link
                  href={`/jewellery/${c.slug}`}
                  className="group relative block aspect-[16/10] overflow-hidden bg-green-deep"
                >
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    placeholder="blur"
                    blurDataURL={EMERALD_LQIP}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-cinema)] group-hover:scale-[1.06]"
                    style={{ objectPosition: c.hero.focus ?? "50% 34%" }}
                  />
                  <div
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-t from-green-deep/90 to-transparent"
                  />
                  <span className="absolute bottom-5 left-5 font-display text-3xl font-light text-text-strong">
                    {c.name}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
