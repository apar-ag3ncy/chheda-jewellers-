import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

/**
 * ⚠️ SCOPE NOTE (build): "Investors" is intentionally scaffolded.
 * Per the build plan (Open Question 1), this needs a client decision:
 *   (a) corporate investor relations, or
 *   (b) a customer gold-investment scheme (which overlaps Offers & Plans).
 * Framed here as (a) — investor relations — to keep it distinct from the
 * Monthly Plan. Update the copy/CTA once the direction is confirmed.
 */
export const metadata = pageMetadata({
  title: "Investors",
  description:
    "Investor relations at Chheda Jewellers — partner with a heritage jewellery house built on transparency and trust.",
  path: "/investors",
});

const pillars = [
  {
    title: "Heritage & trust",
    body: "A neighbourhood name built over years of transparent, hallmarked dealing — the foundation of every lasting jewellery business.",
  },
  {
    title: "A growing house",
    body: "Two branches today, with a considered roadmap toward a modern, omnichannel jewellery experience.",
  },
  {
    title: "Transparent by nature",
    body: "The same openness we offer customers — clear rates, clear making — is how we intend to engage every partner.",
  },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Investors"
        title={"Partner with a house\nbuilt on trust"}
        intro="We are shaping the next chapter of Chheda Jewellers. If you would like to explore a partnership, we would be glad to talk."
      />

      <Section spacing="lg" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.07} className="border-t border-line pt-6">
                <h2 className="font-display text-2xl font-light text-text-strong">{p.title}</h2>
                <p className="mt-3 font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-16 rounded-[var(--radius-brand)] border border-line-strong bg-green-soft/30 p-8 md:mt-24 md:p-12">
            <p className="u-eyebrow mb-4 text-gold-light">Register your interest</p>
            <h2 className="max-w-2xl font-display text-[clamp(1.8rem,3.6vw,2.8rem)] font-light leading-tight">
              Detailed investor information is being prepared.
            </h2>
            <p className="mt-4 max-w-xl font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
              In the meantime, reach out and we&rsquo;ll be in touch as materials become
              available.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button href={`mailto:${siteConfig.contact.email}`} variant="primary" size="lg" withArrow>
                Contact us
              </Button>
              <Button href={siteConfig.contact.whatsappHref} variant="ghost" size="lg">
                Message on WhatsApp
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
