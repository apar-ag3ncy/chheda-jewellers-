import { promiseIntro } from "@/lib/content/promise";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Chapters } from "@/components/promise/Chapters";
import { Hallmark } from "@/components/promise/Hallmark";
import { Estimator } from "@/components/promise/Estimator";
import { Checklist } from "@/components/promise/Checklist";
import { Refusals } from "@/components/promise/Refusals";
import { Signature } from "@/components/promise/Signature";

export const metadata = pageMetadata({
  title: "The Chheda Promise",
  description:
    "How to read a hallmark, what a jewellery bill is actually made of, and the things we refuse to do. The Chheda Jewellers promise, in checkable detail.",
  path: "/chheda-promise",
});

/**
 * The promise page, built as a DOCUMENT OF RECORD rather than an About Us:
 * an index, chapters against a turning plate, then the proofs - how to audit a
 * hallmark (with a HUID field that sends you to look at your own jewellery), a
 * bill you can rebuild yourself against the live rate, and the practices we
 * refuse - closing on a checklist the customer takes away and a signature
 * rather than a funnel.
 *
 * The rule the page is written to: every claim on it is one a customer can go
 * and check, and the two interactive pieces (the estimator, the checklist)
 * work against us exactly as well as they work against anybody else. That is
 * what makes them worth publishing rather than merely engaging.
 */
export default function ChhedaPromisePage() {
  return (
    <>
      <PageHeader
        eyebrow={promiseIntro.eyebrow}
        title={promiseIntro.headline}
        intro={promiseIntro.body}
      />
      <Chapters />
      <Hallmark />
      <Estimator />
      <Refusals />
      <Checklist />
      <Signature />
    </>
  );
}
