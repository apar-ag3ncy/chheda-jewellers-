import Link from "next/link";
import { plans } from "@/lib/content/plans";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export const metadata = pageMetadata({
  title: "Offers & Plans",
  description:
    "The Chheda Monthly Plan and Bridal Advance - simple, transparent ways to save toward the jewellery you have been dreaming of.",
  path: "/offers-and-plans",
});

const steps = [
  { n: "01", title: "Choose your amount", body: "Pick a monthly instalment that suits you - starting from ₹2,000." },
  { n: "02", title: "Save each month", body: "Pay for eleven months; we keep every rupee accounted for." },
  { n: "03", title: "Redeem & receive", body: "On maturity we add our contribution - redeem at the day's rate." },
];

export default function OffersAndPlansPage() {
  return (
    <>
      <PagePlate
        folio="II"
        eyebrow="Offers & Plans"
        title={"Save toward\nsomething lasting"}
        intro="No jargon, no fine-print traps. Straightforward ways to plan for the piece that marks your milestone."
        plate={{
          src: "/media/pages/plans.jpg",
          alt: "A guest in mint green and polki, seated in warm light",
          focus: "50% 24%",
        }}
        meta={[
          { label: "From", value: "₹2,000 a month" },
          { label: "Term", value: "11 + 1 months" },
          { label: "Redeem at", value: "The day's rate" },
          { label: "Joining fee", value: "None" },
        ]}
      />

      {/* Plans */}
      <Section spacing="lg" tone="green">
        <Container>
          <div className="flex flex-col gap-8">
            {plans.map((plan) => (
              <Reveal key={plan.id}>
                <article
                  className={cn(
                    "grid grid-cols-1 gap-10 rounded-[var(--radius-brand)] border p-8 md:grid-cols-12 md:gap-12 md:p-12",
                    plan.flagship
                      ? "border-line-strong bg-green-soft/35"
                      : "border-line bg-green-soft/15",
                  )}
                >
                  <div className="md:col-span-6">
                    {plan.flagship ? (
                      <p className="u-eyebrow mb-4 text-gold-light">Flagship scheme</p>
                    ) : null}
                    <h2 className="font-display text-[clamp(2rem,4vw,3rem)] font-light leading-tight">
                      {plan.name}
                    </h2>
                    <p className="mt-4 max-w-md font-body text-[1rem] font-light leading-relaxed text-text-muted">
                      {plan.summary}
                    </p>
                    <ul className="mt-7 flex flex-col gap-3">
                      {plan.highlights.map((h) => (
                        <li key={h} className="flex items-start gap-3">
                          <span aria-hidden className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                          <span className="font-body text-[0.92rem] font-light text-text">{h}</span>
                        </li>
                      ))}
                    </ul>
                    {plan.cta ? (
                      <div className="mt-8">
                        <Button
                          href={plan.cta.href}
                          variant={plan.flagship ? "primary" : "outline"}
                          size="lg"
                          withArrow
                        >
                          {plan.cta.label}
                        </Button>
                      </div>
                    ) : null}
                  </div>

                  <div className="md:col-span-6">
                    <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-brand)] border border-line bg-line">
                      {plan.features.map((f) => (
                        <div key={f.label} className="bg-green-deep p-6">
                          <p className="u-eyebrow mb-2">{f.label}</p>
                          <p className="font-body text-lg font-light text-text-strong">{f.value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* How it works */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <Reveal as="p" className="u-eyebrow mb-10">
            How the Monthly Plan works
          </Reveal>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.07} className="border-t border-line pt-6">
                <span className="font-display text-3xl font-light text-gold">{s.n}</span>
                <h3 className="mt-3 font-display text-2xl font-light text-text-strong">{s.title}</h3>
                <p className="mt-2 font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {s.body}
                </p>
              </Reveal>
            ))}
          </div>

          <div id="enquire" className="mt-24 flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-display text-[clamp(1.7rem,3.4vw,2.6rem)] font-light leading-tight">
                Ready to begin? Let&rsquo;s talk.
              </h2>
              <p className="mt-3 max-w-md font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                Enquiries are personal. Come into either shop and an advisor
                will walk you through it line by line - the instalment, the
                maturity benefit, and what it buys at the day&rsquo;s rate.
              </p>
            </div>
            <div className="flex flex-wrap gap-4">
              <Button href="/live-gold-rate" variant="onLight" size="lg">
                Check today&rsquo;s rate
              </Button>
            </div>
          </div>

          <p className="mt-10 font-body text-[0.72rem] leading-relaxed text-text-muted">
            Plan terms shown are indicative and pending confirmation. Full{" "}
            <Link
              href="/terms"
              className="underline underline-offset-2 transition-colors hover:text-text"
            >
              terms &amp; conditions
            </Link>{" "}
            apply and will be shared in-store before enrolment.
          </p>
        </Container>
      </Section>
    </>
  );
}
