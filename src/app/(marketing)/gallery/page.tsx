import { pageMetadata } from "@/lib/seo";
import { PagePlate } from "@/components/ui/PagePlate";
import { Collections } from "@/components/sections/Collections";
import { NextStep } from "@/components/ui/NextStep";
import { campaignWall } from "@/lib/content/collections";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "The Chheda Jewellers gallery - frames from the house archive. Necklaces, rings, kundan, maangtika, chandbalis and the full bridal set, photographed as they are worn.",
  path: "/gallery",
});

/**
 * /gallery - the campaign wall, given a room of its own.
 *
 * The wall used to be the homepage's second section, where it was doing the
 * wrong job: nine large frames arriving that early made the scroll a lookbook
 * before the house had said anything, and the bento's own rule - no headline,
 * no intro, no buttons - meant it passed the visitor straight through without
 * a word. As a destination that silence becomes the point. Someone who has
 * chosen "Gallery" has already asked to be shown rather than told, so the
 * page states what they are looking at once, at the top, and then gets out
 * of the way.
 *
 * The wall component is used AS-IS, not forked. It is the same nine frames
 * with the same spans and the same cream ground; only its surroundings have
 * changed. A copy here would drift from the original within a release.
 */
export default function GalleryPage() {
  const framed = campaignWall.length;

  return (
    <>
      <PagePlate
        folio="VI"
        eyebrow="Gallery"
        title={"Frames from\nthe archive"}
        intro="Nine pictures from the house archive - necklaces, rings, kundan, maangtika, chandbalis and the full bridal set, photographed as they are actually worn rather than laid flat on velvet. No prices, no buttons. Look first."
        meta={[
          { label: "Frames", value: String(framed).padStart(2, "0") },
          { label: "Subjects", value: "Six named" },
          { label: "Shown as", value: "Worn, not laid flat" },
          { label: "Prices", value: "None on this page" },
        ]}
      />

      {/* The wall itself, exactly as it renders anywhere else. */}
      <Collections />

      <NextStep
        eyebrow="Next"
        title={"Seen something?\nThe counter is the next step"}
        primary={{ href: "/jewellery", label: "See it by metal" }}
        secondary={{ href: "/chheda-promise", label: "How we price it" }}
        tone="deep"
      />
    </>
  );
}
