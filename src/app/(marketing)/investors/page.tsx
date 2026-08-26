import { siteConfig } from "@/config/site";
import { reviewsSummary } from "@/lib/content/testimonials";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";

/**
 * ⚠️ SCOPE NOTE (build): "Investors" is intentionally scaffolded.
 * Per the build plan (Open Question 1), this needs a client decision:
 *   (a) corporate investor relations, or
 *   (b) a customer gold-investment scheme (which overlaps Offers & Plans).
 * Framed here as (a) - investor relations - to keep it distinct from the
 * Monthly Plan. Update the copy/CTA once the direction is confirmed.
 *
 * The page is written so the absence of a deck is not a dead end: the
 * position, the roadmap and the terms of engagement are all stated, and the
 * only thing missing is the numbers - which is honest, and reads far better
 * than "coming soon" on its own.
 */
export const metadata = pageMetadata({
  title: "Investors",
  description:
    "Investor relations at Chheda Jewellers - a heritage Mumbai jewellery house built on hallmarked, transparent dealing, preparing its next chapter.",
  path: "/investors",
});

const pillars = [
  {
    n: "01",
    title: "Heritage & trust",
    body: "A neighbourhood name built over years of transparent, hallmarked dealing - the compounding asset in this category, and the one that cannot be bought.",
    proof: "Every piece BIS hallmarked; making charges published, not negotiated.",
  },
  {
    n: "02",
    title: "A growing house",
    body: "Two boutiques today, with a considered roadmap toward a modern, omnichannel jewellery experience rather than a discount-led expansion.",
    proof: "Two Mumbai locations; a third channel in preparation.",
  },
  {
    n: "03",
    title: "Transparent by nature",
    body: "The same openness we offer customers - clear rates, clear making, a bill with nothing folded into it - is how we intend to engage every partner.",
    proof: "The pricing method is published in full on the Chheda Promise page.",
  },
];

/** ⚠️ TODO(client): confirm every figure before this page goes live. */
const position = [
  { label: "Founded", value: "Mumbai" },
  { label: "Boutiques", value: "Two" },
  // Every other surface honours reviewsSummary.verified; this one published
  // the rating as a hard fact to the audience least forgiving of an unaudited
  // number. Until the reviews are real it states the two shops instead.
  reviewsSummary.verified
    ? { label: "Customer rating", value: `${reviewsSummary.rating.toFixed(1)} / 5` }
    : { label: "Boutiques", value: `${siteConfig.branches.length} in Mumbai` },
  { label: "Categories", value: "Gold · Diamond · Polki" },
];

const roadmap = [
  {
    horizon: "Now",
    title: "The brand experience",
    body: "A single editorial destination for the house - collections, the promise, appointments and the atelier.",
  },
  {
    horizon: "Next",
    title: "Commerce",
    body: "Headless commerce behind the same experience, so the catalogue can be bought without the brand becoming a template.",
  },
  {
    horizon: "Then",
    title: "The third door",
    body: "A further boutique, and the systems - inventory, CRM, valuation - that let a third location behave like the first two.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <PagePlate
        folio="IV"
        eyebrow="Investor relations"
        title={"Partner with a house\nbuilt on trust"}
        intro="We are shaping the next chapter of Chheda Jewellers - the same business, run the same way, with the systems to do it at more than two counters."
        plate={{
          src: "/media/pages/investors.jpg",
          alt: "A portrait in a red anarkali and layered gold beneath a chandelier",
          focus: "50% 26%",
        }}
        meta={position}
      />

      {/* ── The position ──────────────────────────────────────────────── */}
      <Section spacing="lg" tone="green">
        <Container>
          <SectionHeading
            eyebrow="The position"
            title={"What compounds here"}
            size="md"
          />
          <ol className="mt-14 md:mt-20">
            {pillars.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 0.06}
                className="grid grid-cols-1 gap-5 border-t border-line py-9 last:border-b md:grid-cols-12 md:gap-10 md:py-12"
              >
                <div className="md:col-span-7">
                  <h2 className="font-display text-[length:var(--step-3)] font-light leading-[var(--leading-3)] text-text-strong">
                    {p.title}
                  </h2>
                  <p className="mt-4 max-w-lg font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                    {p.body}
                  </p>
                </div>
                <div className="md:col-span-5">
                  <p className="border-l border-line-strong pl-5 font-body text-[0.86rem] font-light leading-relaxed text-text">
                    <span className="u-eyebrow mb-1.5 block text-[0.55rem]">Checkable</span>
                    {p.proof}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── The roadmap ───────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
            eyebrow="The roadmap"
            title={"Now, next, then"}
            intro="Stated as sequence rather than as dates, because a jeweller that promises quarters it cannot control is telling you something about how it runs everything else."
            size="md"
          />
          <div className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-3">
            {roadmap.map((r, i) => (
              <Reveal key={r.horizon} delay={i * 0.07} className="bg-cream p-8 md:p-10">
                <p className="u-eyebrow mb-5">{r.horizon}</p>
                <h3 className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                  {r.title}
                </h3>
                <p className="mt-4 font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {r.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ── Register interest ─────────────────────────────────────────── */}
      <Section spacing="lg" tone="deep">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal variant="settle">
              <Monogram className="h-12 w-12" />
            </Reveal>
            <Reveal delay={0.06}>
              <h2 className="mt-9 font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)]">
                The numbers are the one thing not on this page.
              </h2>
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-5 max-w-lg font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
              Detailed investor materials are in preparation and are shared
              directly rather than published. Write to us and we will send them
              as they are ready.
            </Reveal>
            <Reveal delay={0.14} className="mt-10 flex flex-wrap justify-center gap-4">
              <Button
                href={`mailto:${siteConfig.contact.email}?subject=${encodeURIComponent("Investor enquiry")}`}
                variant="primary"
                size="lg"
                withArrow
              >
                Register your interest
              </Button>
              <Button href="/chheda-promise" variant="ghost" size="lg">
                How we run the counter
              </Button>
            </Reveal>
            <p className="mt-9 font-body text-[0.72rem] leading-relaxed text-text-muted">
              Nothing on this page is an offer of securities or an invitation to
              invest.
            </p>
          </div>
        </Container>
      </Section>
    </>
  );
}
