import Link from "next/link";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "The Chheda Jewellers journal - craft, collections and the families who wear us. The first pieces are in preparation; the contents are published here first.",
  path: "/journal",
});

/**
 * /journal - an empty section, published as a table of contents.
 *
 * A "coming soon" page with two buttons on it wastes the visit. A contents
 * page does not: it says what the journal will be, it is genuinely
 * interesting to read on its own, and it turns the absence into an
 * announcement. Nothing here is presented as published - every row is marked
 * "in preparation", so it reads as an editorial plan rather than as articles
 * that lead nowhere.
 *
 * ⚠️ TODO(client): these are the commissioned subjects. Replace each row with
 * a real link as the piece is written; the shape of the page does not change.
 */
const contents = [
  {
    n: "01",
    kicker: "Craft",
    title: "What a karigar can tell from the weight alone",
    body: "A morning in the workshop, and the tests a maker runs by hand before any instrument comes out.",
  },
  {
    n: "02",
    kicker: "Method",
    title: "Jadau, kundan, polki - what the words actually mean",
    body: "Three terms used interchangeably in shop windows across India, and the very different work behind each of them.",
  },
  {
    n: "03",
    kicker: "The house",
    title: "Why we weigh your old gold in front of you",
    body: "The single practice that generates more trust than any certificate we could print, and how it came to be a rule here.",
  },
  {
    n: "04",
    kicker: "Wearing it",
    title: "The set that gets worn twice, and the set that gets worn always",
    body: "On buying for the wedding and for the forty years after it - usually a different piece than the one people arrive asking for.",
  },
  {
    n: "05",
    kicker: "Families",
    title: "Four brides, one necklace",
    body: "A rani-haar that has been remade three times in one family, photographed at each stage of its life.",
  },
];

export default function JournalPage() {
  return (
    <>
      <PagePlate
        folio="VI"
        eyebrow="The Journal"
        title={"The contents,\nbefore the issue"}
        intro="A journal of craft, method and the families who wear us. The first pieces are being written and photographed - until they land, here is exactly what is coming."
        plate={{
          src: "/media/pages/journal.jpg",
          alt: "A portrait in ochre and maroon silk beside a carved wooden door",
          focus: "50% 26%",
        }}
        meta={[
          { label: "Status", value: "In preparation" },
          { label: "Pieces commissioned", value: String(contents.length) },
          { label: "Published", value: "None yet" },
          { label: "In the meantime", value: siteConfig.socials.instagramHandle },
        ]}
      />

      {/* ── The contents ──────────────────────────────────────────────── */}
      <Section spacing="lg" tone="green">
        <Container>
          <SectionHeading
            eyebrow="Issue one"
            title={"Five pieces,\nin preparation"}
            size="md"
          />

          <ol className="mt-14 md:mt-20">
            {contents.map((c, i) => (
              <Reveal
                as="li"
                key={c.n}
                delay={i * 0.05}
                variant="slide"
                x={-28}
                className="grid grid-cols-1 items-baseline gap-3 border-t border-line py-8 last:border-b md:grid-cols-12 md:gap-8 md:py-10"
              >
                <div className="flex items-baseline gap-4 md:col-span-3">
                  <span className="font-body text-[0.68rem] tracking-[0.2em] text-gold">
                    {c.n}
                  </span>
                  <span className="u-eyebrow text-[0.6rem]">{c.kicker}</span>
                </div>
                <div className="md:col-span-6">
                  <h2 className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                    {c.title}
                  </h2>
                  <p className="mt-2.5 max-w-lg font-body text-[0.9rem] font-light leading-relaxed text-text-muted">
                    {c.body}
                  </p>
                </div>
                <div className="md:col-span-3 md:text-right">
                  <span className="inline-flex items-center rounded-full border border-line px-3 py-1 font-body text-[0.6rem] uppercase tracking-[0.16em] text-text-muted">
                    In preparation
                  </span>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Until then ────────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-16">
            <div className="md:col-span-6">
              <h2 className="max-w-md font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)]">
                Until the first piece lands, the story is on Instagram.
              </h2>
              <p className="mt-5 max-w-md font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                Campaigns, the workshop, and the brides who let us photograph
                them. It is the same journal, published a frame at a time.
              </p>
              <div className="mt-9 flex flex-wrap gap-4">
                <Button href={siteConfig.socials.instagram} variant="onLight" withArrow>
                  Follow {siteConfig.socials.instagramHandle}
                </Button>
                <Button href="/chheda-promise" variant="onLight">
                  Read the promise instead
                </Button>
              </div>
            </div>

            <div className="md:col-span-6">
              <p className="u-eyebrow mb-5">Elsewhere on the site</p>
              <ul className="border-t border-line">
                {[
                  { href: "/bespoke", label: "The atelier", note: "How a commission works, step by step" },
                  { href: "/edits", label: "The Edits", note: "Five occasions, five rooms" },
                  { href: "/chheda-promise", label: "The Chheda Promise", note: "A bill you can rebuild yourself" },
                ].map((l) => (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group flex items-baseline justify-between gap-5 border-b border-line py-5 transition-colors duration-300"
                    >
                      <span>
                        <span className="block font-display text-[length:var(--step-2)] font-light text-text-strong">
                          {l.label}
                        </span>
                        <span className="mt-1 block font-body text-[0.84rem] font-light text-text-muted">
                          {l.note}
                        </span>
                      </span>
                      <span
                        aria-hidden
                        className="shrink-0 text-gold transition-transform duration-300 group-hover:translate-x-1"
                      >
                        &rarr;
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
