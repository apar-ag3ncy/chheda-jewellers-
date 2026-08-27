import type { ComponentType } from "react";
import {
  Hero,
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
 * The order: the word (ChhedaPromise), the work (Collections), hold one
 * piece (FilmRoom), the house by object (JewelleryTypes), the counter
 * (Vitrine), the people pieces are made for (Stories), the newest argument
 * (DiamondEdit), what 480 families say (Testimonials), the belief
 * (Manifesto), its answer (Atelier), the plan (MonthlyPlan), every door
 * (Doors), the circle (CommunityStrip) - and then the city itself: the
 * full-screen Mumbai map with the two addresses closes the scroll into the
 * sign-off footer, so the last thing a visitor holds is where to find us.
 *
 * The painted grounds strictly alternate, dark emerald first, cream on the
 * even beats - two darks never touch, which is also why Manifesto sits at
 * arm's length from DiamondEdit. The two long interactives (FilmRoom,
 * Vitrine) are separated by JewelleryTypes. Branches and the footer are
 * full-bleed imagery, outside the alternation, like the hero.
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
