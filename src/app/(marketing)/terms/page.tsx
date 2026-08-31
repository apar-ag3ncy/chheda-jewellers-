import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Section, Container } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Terms of Use",
  description: `The terms that apply to the ${siteConfig.name} website.`,
  path: "/terms",
});

const sections = [
  {
    h: "About this site",
    p: `This website presents the collections and services of ${siteConfig.name}. It is an editorial showcase; it is not, at present, an online store.`,
  },
  {
    h: "Gold rate & pricing",
    p: "Any gold rate shown is indicative and for reference only - it is not a live quote or an offer to sell. Final pricing is confirmed in-store at the time of purchase.",
  },
  {
    h: "Plans & offers",
    p: "Details of savings plans and offers shown here are indicative. The full, binding terms are provided in-store before you enrol.",
  },
  {
    h: "Imagery & content",
    p: "Photography and content on this site are the property of the brand and its partners, and may not be reused without permission.",
  },
  {
    h: "Contact",
    p: `Questions about these terms? Write to ${siteConfig.contact.email}.`,
  },
];

export default function TermsPage() {
  return (
    <>
      <PagePlate
        folio="VIII"
        eyebrow="Legal"
        title={"Terms\nof use"}
        intro="What this website is, what the gold rate on it does and does not mean, and where the binding version of anything shown here lives."
        meta={[
          { label: "This site is", value: "An editorial showcase" },
          { label: "Rate shown", value: "Indicative only" },
          { label: "Binding terms", value: "Given in-store" },
        ]}
      />
      <Section spacing="md" tone="light" className="u-on-light">
        <Container>
          <div className="max-w-2xl">
            <p className="mb-10 rounded-[var(--radius-brand)] border border-line bg-green-soft/20 p-5 font-body text-[0.82rem] leading-relaxed text-text-muted">
              This is a plain-language template provided as a starting point and is
              pending review by legal counsel before launch.
            </p>
            <div className="flex flex-col gap-10">
              {sections.map((s) => (
                <section key={s.h}>
                  <h2 className="font-display text-2xl font-light text-text-strong">{s.h}</h2>
                  <p className="mt-3 font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
                    {s.p}
                  </p>
                </section>
              ))}
            </div>
          </div>
        </Container>
      </Section>
    </>
  );
}
