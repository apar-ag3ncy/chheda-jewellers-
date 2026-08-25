import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { GoldRateTicker } from "@/components/ui/GoldRateTicker";
import { siteConfig } from "@/config/site";

export const metadata = pageMetadata({
  title: "Live Gold Rate",
  description:
    "Today's indicative gold rate in Mumbai for 22K and 24K gold — updated through the day, with the arithmetic that turns a rate into a bill. For reference only; confirm in-store before any purchase.",
  path: "/live-gold-rate",
});

/** What actually moves the number, in the order a customer meets them. */
const notes = [
  {
    n: "01",
    title: "Why the rate moves",
    body: "Gold is a global commodity. The price shifts with international markets, the rupee and local duties — often several times in a single trading day.",
  },
  {
    n: "02",
    title: "22K against 24K",
    body: "24K is pure gold. 22K is 91.6% gold, stamped 916, and is the standard for Indian jewellery because pure gold is too soft to survive being worn.",
  },
  {
    n: "03",
    title: "Rate is not price",
    body: "The rate buys the metal. Your bill is that, plus making, plus statutory GST — and stones are weighed out and priced separately, never at the gold rate.",
  },
];

/** Reading the number honestly, including what it is not. */
const caveats = [
  {
    label: "Updated",
    value: "Through the trading day",
    note: "Refreshed on a schedule, not tick by tick.",
  },
  {
    label: "Applies to",
    value: "Mumbai counters",
    note: "Local duties and the rupee both move it.",
  },
  {
    label: "Status",
    value: "Indicative",
    note: "The rate at the moment you buy is the one that counts.",
  },
];

/**
 * /live-gold-rate — the number, and then the honesty about the number.
 *
 * The rate panel was previously a lone card on an empty page. The page now
 * does the job the rate implies: it shows the figure, states plainly what the
 * figure is *not*, explains what moves it, and then hands the visitor to the
 * estimator on the promise page — which is where a rate becomes a bill.
 */
export default function LiveGoldRatePage() {
  return (
    <>
      <PagePlate
        folio="IV"
        eyebrow="Live Gold Rate"
        title={"Today's gold rate"}
        intro="An indicative reference for 22K and 24K gold in Mumbai, refreshed through the day. Always confirm the applicable rate in-store before a purchase."
        plate={{
          src: "/media/pages/rate.jpg",
          alt: "A gold temple necklace and bangles worn against maroon and ochre silk",
          focus: "50% 30%",
        }}
      />

      {/* ── The number ────────────────────────────────────────────────── */}
      <Section spacing="md" tone="green">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-14">
            <Reveal className="lg:col-span-7">
              <GoldRateTicker variant="full" />
            </Reveal>

            {/* Reading rail — the caveats set as a spec sheet rather than
                buried in a footnote nobody reaches. */}
            <div className="lg:col-span-5">
              <p className="u-eyebrow mb-5">How to read it</p>
              <dl className="border-t border-line">
                {caveats.map((c, i) => (
                  <Reveal
                    key={c.label}
                    delay={i * 0.06}
                    variant="slide"
                    x={24}
                    className="border-b border-line py-5"
                  >
                    <dt className="font-body text-[0.58rem] uppercase tracking-[0.2em] text-text-muted">
                      {c.label}
                    </dt>
                    <dd className="mt-1.5 font-display text-[1.25rem] font-light text-text-strong">
                      {c.value}
                    </dd>
                    <dd className="mt-1 font-body text-[0.8rem] font-light leading-relaxed text-text-muted">
                      {c.note}
                    </dd>
                  </Reveal>
                ))}
              </dl>

              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/chheda-promise#estimate" variant="primary" withArrow>
                  Turn it into a bill
                </Button>
                <Button href={siteConfig.contact.whatsappHref} variant="ghost">
                  Ask us
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* ── What moves it ─────────────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
            eyebrow="The mechanics"
            title={"How to read the number"}
            size="md"
          />
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-3">
            {notes.map((n, i) => (
              <Reveal as="li" key={n.n} delay={i * 0.07} className="bg-cream p-8 md:p-10">
                <h2 className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                  {n.title}
                </h2>
                <p className="mt-4 font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {n.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Onward ────────────────────────────────────────────────────── */}
      <Section spacing="lg" tone="deep">
        <Container>
          <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
            <h2 className="max-w-xl font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)]">
              Rather buy at a rate you fixed months ago?
            </h2>
            <Button href="/offers-and-plans" variant="primary" size="lg" withArrow>
              The Monthly Plan
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
