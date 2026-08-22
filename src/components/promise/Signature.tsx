import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Monogram } from "@/components/ui/Monogram";
import { Button } from "@/components/ui/Button";

/**
 * The page closes the way a promise should — signed, not funnelled.
 * The house mark stamped as a seal, the name set as a signature, and only
 * then an invitation.
 */
export function Signature() {
  return (
    <Section spacing="lg" tone="deep">
      <Container>
        <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
          <Reveal variant="settle">
            <Monogram className="h-16 w-16" />
          </Reveal>

          <Reveal delay={0.06} className="mt-10 w-full">
            <span aria-hidden className="mx-auto block h-px w-24 bg-line-strong" />
          </Reveal>

          <Reveal delay={0.08}>
            <p className="mt-10 font-display text-[length:var(--step-2)] font-light italic leading-snug text-text">
              Everything above is checkable at our counter.
              <br />
              Come and check it.
            </p>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-10 font-display text-[length:var(--step-3)] font-light text-text-strong">
              {siteConfig.name}
            </p>
            <p className="mt-3 font-body text-[0.68rem] uppercase tracking-[0.24em] text-text-muted">
              {siteConfig.branches[0]?.area} · {siteConfig.branches[0]?.city}
            </p>
          </Reveal>

          <Reveal delay={0.16} className="mt-12 flex flex-wrap justify-center gap-4">
            <Button href={siteConfig.contact.whatsappHref} variant="primary" size="lg" withArrow>
              Book a visit
            </Button>
            <Button href="/jewellery" variant="ghost" size="lg">
              Explore the jewellery
            </Button>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}
