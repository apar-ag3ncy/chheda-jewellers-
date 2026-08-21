import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";

export const metadata = pageMetadata({
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your information.`,
  path: "/privacy",
});

const sections = [
  {
    h: "Information we collect",
    p: "When you contact us — by form, WhatsApp, email or phone — we collect the details you choose to share, such as your name and contact information, so we can respond and help you.",
  },
  {
    h: "How we use it",
    p: "We use your information only to respond to enquiries, arrange appointments, and, with your consent, to keep you updated about collections and offers. We do not sell your data.",
  },
  {
    h: "Analytics & cookies",
    p: "If enabled, we use privacy-respecting analytics to understand how our site is used. You can decline non-essential cookies at any time.",
  },
  {
    h: "Your rights",
    p: "You may ask us to access, correct or delete the information we hold about you. Simply get in touch and we will act on your request.",
  },
  {
    h: "Contact",
    p: `For any privacy question, write to ${siteConfig.contact.email}.`,
  },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHeader eyebrow="Legal" title="Privacy Policy" />
      <Section spacing="md" tone="green">
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
