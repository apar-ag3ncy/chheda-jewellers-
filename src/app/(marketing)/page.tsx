import type { ComponentType } from "react";
import {
  Hero,
  Doors,
  ChhedaPromise,
  JewelleryTypes,
  EditsRail,
  Stories,
  Manifesto,
  Collections,
  Atelier,
  DiamondEdit,
  FilmRoom,
  Vitrine,
  CommunityStrip,
  Testimonials,
  MonthlyPlan,
  Branches,
} from "@/components/sections";
import { homepageSections, type HomepageSection } from "@/config/nav";
import { ScrollThemer } from "@/components/motion/ScrollThemer";

/**
 * Homepage - the single-scroll cinematic journey, rendered FROM
 * `config/nav.ts` so the choreography is data, not JSX surgery.
 *
 * The order spends the first half on what walks a stranger into a shop and
 * the second half on what rewards someone who has already decided. Four
 * placements are load-bearing rather than arbitrary:
 *   · Collections opens before ChhedaPromise. Nine campaign frames answer
 *     "who are these people" faster than a paragraph can, so the promise
 *     then reads as an answer rather than as an opening claim.
 *   · JewelleryTypes and EditsRail are adjacent: the site's two ways in,
 *     by object and by occasion, standing together as one index instead of
 *     ten sections apart.
 *   · Testimonials, MonthlyPlan and Branches sit at 6, 7 and 8 - the proof
 *     and the address arrive before the scroll gets expensive. FilmRoom
 *     alone costs 260svh; it and Vitrine are the back half's reward, paid
 *     for only by visitors who already have the map.
 *   · Manifesto follows DiamondEdit and precedes Atelier. After a section
 *     of certified stones and numbered chapters, "we do not sell ornaments"
 *     lands as a rebuttal rather than a rest - and the piece that does not
 *     exist yet is the natural answer to it.
 *
 * Stories sits between FilmRoom and Vitrine on purpose: two long, slow,
 * dark interactives back to back had no relief between them, and three
 * human voices are a better break than a spacer.
 *
 * Doors closes the scroll - a bento of the site's doorways, and the page's
 * last working navigation before the link-less sign-off footer.
 */
const SECTIONS: Record<HomepageSection, ComponentType> = {
  hero: Hero,
  "chheda-promise": ChhedaPromise,
  "jewellery-types": JewelleryTypes,
  edits: EditsRail,
  stories: Stories,
  manifesto: Manifesto,
  collections: Collections,
  atelier: Atelier,
  "diamond-edit": DiamondEdit,
  "film-room": FilmRoom,
  vitrine: Vitrine,
  testimonials: Testimonials,
  "monthly-plan": MonthlyPlan,
  branches: Branches,
  community: CommunityStrip,
  doors: Doors,
};

export default function HomePage() {
  return (
    <ScrollThemer>
      {homepageSections.map((id) => {
        const Section = SECTIONS[id];
        return <Section key={id} />;
      })}
    </ScrollThemer>
  );
}
