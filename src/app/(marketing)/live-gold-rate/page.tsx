import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GoldRateTicker } from "@/components/ui/GoldRateTicker";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Live Gold Rate",
  description:
    "Today's indicative gold rate in Mumbai for 22K and 24K gold — updated regularly. For reference only; confirm in-store before any purchase.",
  path: "/live-gold-rate",
});

const notes = [
  {
    title: "Why the rate moves",
    body: "Gold is a global commodity. The price you see shifts with international markets, the rupee, and local duties — often several times a day.",
  },
  {
    title: "22K vs 24K",
    body: "24K is pure gold; 22K is 91.6% gold, the standard for most Indian jewellery because it is more durable to wear.",
  },
  {
    title: "What you actually pay",
    body: "Your final price is the gold value plus transparent making charges and applicable GST — we show every part of it.",
  },
];

export default function LiveGoldRatePage() {
  return (
    <>
      <PageHeader
        eyebrow="Live Gold Rate"
        title={"Today's gold rate\nin Mumbai"}
        intro="An indicative reference for 22K and 24K gold, refreshed through the day. Always confirm the applicable rate in-store before a purchase."
      />

      <Section spacing="md" tone="green">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <GoldRateTicker variant="full" />
          </Reveal>

          <div className="mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-4">
            <Button href="/offers-and-plans" variant="primary" withArrow>
              Save with the Monthly Plan
            </Button>
            <Button href={siteConfig.contact.whatsappHref} variant="ghost">
              Ask us on WhatsApp
            </Button>
          </div>
        </Container>
      </Section>

      <Section spacing="lg" tone="deep">
        <Container>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-10">
            {notes.map((n, i) => (
              <Reveal key={n.title} delay={i * 0.07} className="border-t border-line pt-6">
                <h2 className="font-display text-2xl font-light text-text-strong">{n.title}</h2>
                <p className="mt-3 font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
                  {n.body}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
