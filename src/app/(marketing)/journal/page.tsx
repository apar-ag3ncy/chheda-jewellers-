import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Section, Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

export const metadata = pageMetadata({
  title: "Journal",
  description:
    "The Chheda Jewellers journal — stories of craft, collections and the families who wear us. Coming soon.",
  path: "/journal",
});

export default function JournalPage() {
  return (
    <>
      <PageHeader
        eyebrow="The Journal"
        title={"Stories, soon"}
        intro="We're putting together a journal of craft, collections and the moments our jewellery is made for. Until then, the story lives on Instagram."
        align="center"
      />
      <Section spacing="md" tone="green">
        <Container className="flex justify-center">
          <div className="flex flex-wrap justify-center gap-4">
            <Button href={siteConfig.socials.instagram} variant="primary" withArrow>
              Follow on Instagram
            </Button>
            <Button href="/" variant="ghost">
              Back to home
            </Button>
          </div>
        </Container>
      </Section>
    </>
  );
}
