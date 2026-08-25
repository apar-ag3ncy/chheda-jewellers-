import type { ComponentType } from "react";
import {
  Hero,
  Doors,
  ChhedaPromise,
  JewelleryTypes,
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
 * The order is one continuous hand-off - each section answers the question
 * the one above it raises, so the scroll reads as a single story instead of
 * a stack of modules:
 *
 *   the work (Collections) - "who are these people?" answered in pictures -
 *   then the word (ChhedaPromise), then the house by object
 *   (JewelleryTypes), then "stop browsing, hold one" (FilmRoom), the people pieces are made for (Stories), the
 *   counter (Vitrine), what 480 families say about that counter
 *   (Testimonials), the house's newest argument (DiamondEdit), the silence
 *   that answers it (Manifesto: "we do not sell ornaments"), the piece that
 *   doesn't exist yet (Atelier), how it becomes affordable (MonthlyPlan),
 *   where we are (Branches), and how to stay close (CommunityStrip).
 *
 * Three adjacencies are load-bearing: Stories between the two long
 * interactives so they never run back to back; Manifesto directly after
 * DiamondEdit so the silence lands as a rebuttal; Atelier directly under the
 * manifesto it answers. The ask corridor - plan, map, community - is
 * unbroken at the end: nothing after the address pulls the visitor back
 * into browsing.
 *
 * Doors closes the scroll - a bento of the site's doorways, and the page's
 * last working navigation before the link-less sign-off footer.
 */
const SECTIONS: Record<HomepageSection, ComponentType> = {
  hero: Hero,
  "chheda-promise": ChhedaPromise,
  "jewellery-types": JewelleryTypes,
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
