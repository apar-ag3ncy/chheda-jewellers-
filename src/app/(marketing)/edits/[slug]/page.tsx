import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { edits, editsBySlug } from "@/lib/content/edits";
import { categories } from "@/lib/content/categories";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading, emphasise } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Button } from "@/components/ui/Button";
import { EditGallery } from "@/components/edits/EditGallery";
import { MOODS } from "@/components/edits/EditMood";

export function generateStaticParams() {
  return edits.map((e) => ({ slug: e.slug }));
}

/**
 * The edits are a fixed, known set, so anything outside `generateStaticParams`
 * is a genuine 404. Without this, Next renders unknown slugs on demand and the
 * `notFound()` below lands AFTER the 200 status has already been streamed — a
 * soft 404 that search engines happily index. `false` makes them hard 404s.
 */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edit = editsBySlug[slug];
  if (!edit) return pageMetadata({ title: "The Edits", path: "/edits" });
  return pageMetadata({
    title: `${edit.name} — The Edits`,
    description: `${edit.hook} ${edit.intro}`.slice(0, 180),
    path: `/edits/${edit.slug}`,
  });
}

/**
 * One occasion edit.
 *
 * The page is deliberately NOT the metal-category layout with different
 * pictures. A category page answers "show me the gold"; an edit answers "I
 * have a thing on Saturday" — so the structure is a brief: the hook, three
 * pieces that define it, a ruled styling table you could screenshot, the
 * lookbook, and then the way out to the metal rooms it borrows from.
 */
export default async function EditPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const edit = editsBySlug[slug];
  if (!edit) notFound();

  const mood = MOODS[edit.mood];
  const others = edits.filter((e) => e.slug !== edit.slug);
  const index = edits.findIndex((e) => e.slug === edit.slug);

  return (
    <>
      {/* ── Cover ─────────────────────────────────────────────────────── */}
      <section className="relative flex min-h-[92svh] w-full items-end overflow-hidden bg-green-deep">
        <Image
          src={edit.hero.src}
          alt={edit.hero.alt}
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{
            objectPosition: edit.hero.focus ?? "50% 35%",
            animation: "heroZoom 22s ease-out infinite alternate",
          }}
        />
        {/* Mood scrim — anchored under the copy, so the top of the frame
            stays a photograph rather than a tinted panel. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background: `linear-gradient(to top, ${mood.scrim} 0%, ${mood.scrim} 12%, color-mix(in srgb, ${mood.scrim} 62%, transparent) 38%, transparent 68%)`,
          }}
        />

        <Container className="relative pb-16 pt-32 md:pb-24">
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center gap-2 font-body text-[0.68rem] uppercase tracking-[0.16em] text-text-muted">
              <li>
                <Link href="/edits" className="inline-block py-2 hover:text-text-strong">
                  The Edits
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li style={{ color: mood.accent }}>{edit.name}</li>
            </ol>
          </nav>

          <p className="u-eyebrow mb-5">{edit.eyebrow}</p>
          <SplitLines delay={0.05}>
            <h1 className="max-w-4xl font-display text-[clamp(2.6rem,7.6vw,5.8rem)] font-light leading-[0.96]">
              {edit.title.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {emphasise(l)}
                </span>
              ))}
            </h1>
          </SplitLines>
          <p className="mt-7 max-w-lg font-body text-[1.02rem] font-light leading-relaxed text-text">
            {edit.hook}
          </p>

          {/* The scroll of edits, as a rule of chips — you can jump sideways
              without going back to the index. */}
          <ul className="mt-10 flex flex-wrap gap-2">
            {edits.map((e) => (
              <li key={e.slug}>
                <Link
                  href={`/edits/${e.slug}`}
                  aria-current={e.slug === edit.slug ? "page" : undefined}
                  className={
                    e.slug === edit.slug
                      ? "inline-flex min-h-[38px] items-center rounded-full border border-gold-light bg-gold-light/15 px-4 font-body text-[0.64rem] uppercase tracking-[0.14em] text-gold-light"
                      : "inline-flex min-h-[38px] items-center rounded-full border border-line px-4 font-body text-[0.64rem] uppercase tracking-[0.14em] text-text-muted transition-colors duration-300 hover:border-gold hover:text-gold-light"
                  }
                >
                  {e.name}
                </Link>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* ── The brief ─────────────────────────────────────────────────── */}
      <Section spacing="lg" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-7">
              <Reveal as="p" className="u-eyebrow mb-6">
                The brief
              </Reveal>
              <SplitLines>
                <p className="max-w-2xl font-display text-[length:var(--step-3)] font-light leading-[1.28] text-text-strong">
                  {edit.intro}
                </p>
              </SplitLines>

              <div className="mt-12 flex flex-wrap gap-4">
                <Button href={`/enquire?edit=${edit.slug}`} variant="primary" withArrow>
                  Book an appointment
                </Button>
                <Button href="/bespoke" variant="ghost">
                  Have it made instead
                </Button>
              </div>
            </div>

            {/* The styling table — a ruled document, not a card. This is the
                bit a customer screenshots and sends to a friend. */}
            <aside className="md:col-span-5">
              <p className="u-eyebrow mb-5">How to wear it</p>
              <dl className="border-t border-line">
                {edit.notes.map((n, i) => (
                  <Reveal
                    key={n.label}
                    delay={i * 0.05}
                    variant="slide"
                    x={24}
                    className="flex items-baseline gap-5 border-b border-line py-4"
                  >
                    <dt className="w-[38%] shrink-0 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-muted">
                      {n.label}
                    </dt>
                    <dd className="flex-1 font-body text-[0.92rem] font-light leading-relaxed text-text">
                      {n.value}
                    </dd>
                  </Reveal>
                ))}
              </dl>
              <p className="mt-5 font-body text-[0.72rem] font-light leading-relaxed text-text-muted">
                Drawn from{" "}
                {edit.drawsFrom.map((m, i) => (
                  <span key={m}>
                    {i > 0 ? " and " : ""}
                    <Link
                      href={`/jewellery/${m}`}
                      className="underline decoration-line-strong underline-offset-4 transition-colors hover:text-gold-light"
                    >
                      {categories[m].name.toLowerCase()}
                    </Link>
                  </span>
                ))}
                .
              </p>
            </aside>
          </div>
        </Container>
      </Section>

      {/* ── The three ─────────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
            eyebrow="Three pieces"
            title={"Three pieces to start"}
            intro="Every edit reduces to three decisions. Get these right and the rest is styling."
            size="md"
          />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-3">
            {edit.picks.map((p, i) => (
              <Reveal
                key={p.id}
                delay={i * 0.07}
                className="flex flex-col bg-cream p-8 md:p-10"
              >
                <h3 className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                  {p.title}
                </h3>
                <p className="mt-4 font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {p.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── The lookbook ──────────────────────────────────────────────── */}
      <EditGallery edit={edit} />

      {/* ── Onward ────────────────────────────────────────────────────── */}
      <Section spacing="md" tone="green">
        <Container>
          <div className="flex items-baseline justify-between border-b border-line pb-5">
            <p className="u-eyebrow">Next edit</p>
            <p className="font-body text-[0.68rem] tracking-[0.18em] text-text-muted">
              {String(index + 1).padStart(2, "0")} of{" "}
              {String(edits.length).padStart(2, "0")}
            </p>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((e) => (
              <Link
                key={e.slug}
                href={`/edits/${e.slug}`}
                className="group relative block aspect-[4/5] overflow-hidden bg-green-deep"
              >
                <Image
                  src={e.hero.src}
                  alt={e.hero.alt}
                  placeholder="blur"
                  blurDataURL={EMERALD_LQIP}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-[1600ms] ease-[var(--ease-cinema)] group-hover:scale-[1.06]"
                  style={{ objectPosition: e.hero.focus ?? "50% 34%" }}
                />
                <div
                  aria-hidden
                  className="absolute inset-0 bg-gradient-to-t from-green-deep/92 via-green-deep/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="u-eyebrow mb-1.5 text-[0.6rem]">{e.eyebrow}</p>
                  <h3 className="font-display text-2xl font-light text-text-strong">
                    {e.name}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
