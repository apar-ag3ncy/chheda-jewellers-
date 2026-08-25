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
 * Homepage — the single-scroll cinematic journey, rendered FROM
 * `config/nav.ts` so the choreography is data, not JSX surgery.
 *
 * Three placements in that order are load-bearing rather than arbitrary:
 *   · EditsRail closes the scroll rather than opening it: by the time a
 *     visitor reaches it they have seen the house, so "or browse by
 *     occasion" reads as a second way back in rather than a second taxonomy
 *     to learn up front.
 *   · Atelier sits directly after Collections, because "campaigns, not
 *     catalogues" is precisely the line that provokes "but what if I want
 *     something that isn't in a campaign?" — and that is the bespoke pitch.
 *   · FilmRoom and then Vitrine sit directly before Testimonials — the
 *     visitor has just scrubbed the films and then held a cut-out piece in
 *     their hand, and the reviews land on the heels of that moment.
 *
 * Doors closes the scroll — a bento of the site's doorways, and the page's
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
