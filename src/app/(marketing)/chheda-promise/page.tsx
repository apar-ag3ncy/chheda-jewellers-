import { promiseIntro } from "@/lib/content/promise";
import { pageMetadata } from "@/lib/seo";
import { PageHeader } from "@/components/ui/PageHeader";
import { Chapters } from "@/components/promise/Chapters";
import { Hallmark } from "@/components/promise/Hallmark";
import { Ledger } from "@/components/promise/Ledger";
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
 * an index, chapters against a turning plate, then three proofs — how to audit
 * a hallmark, a bill with nothing folded into it, and the practices we refuse —
 * closing on a signature instead of a funnel.
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
      <Ledger />
      <Refusals />
      <Signature />
    </>
  );
}
