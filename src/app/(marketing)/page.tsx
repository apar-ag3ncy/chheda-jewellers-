import type { ComponentType } from "react";
import {
  Hero,
  ChhedaPromise,
  JewelleryTypes,
  Stories,
  Collections,
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
 * The order: the work styled (Collections), the house by object
 * (JewelleryTypes), the word (ChhedaPromise), the pieces themselves on glass
 * (Vitrine), the people they are made for (Stories), what 480 families say
 * (Testimonials), the newest collection (DiamondEdit), how it is paid for
 * (MonthlyPlan), hold one yourself (FilmRoom), the circle (CommunityStrip) -
 * and then the city itself: the full-screen map with both addresses closes
 * the scroll into the sign-off.
 *
 * NOTE: read the grounds off data-bg, not off "light vs dark" - there are
 * THREE painted grounds, and green/deep are two of them. The dark run here
 * (green, deep, deep, green, deep) alternates properly because ChhedaPromise
 * and MonthlyPlan sit on green while Vitrine, DiamondEdit and FilmRoom sit on
 * deep; treating them all as one "dark" reports collisions that are not there.
 *
 * Two pairs genuinely share an identical ground, both beige:
 *   Collections -> JewelleryTypes, and Stories -> Testimonials.
 * The owner asked for these exact positions, so the ordering takes precedence.
 * Do not "fix" either by moving a section - re-ground one instead.
 *
 * The painted grounds strictly alternate, cream first. Two of the same never
 * touch, which is the constraint the order is solved against as much as the
 * narrative - a run beginning cream only alternates on an even count, so
 * adding or removing a section means re-solving it, not just splicing.
 * The two long interactives (FilmRoom, Vitrine) are held apart by Stories.
 * The hero, the map and the sign-off photograph are full-bleed imagery and
 * take no part in the alternation.
  */
const SECTIONS: Record<HomepageSection, ComponentType> = {
  hero: Hero,
  "chheda-promise": ChhedaPromise,
  "jewellery-types": JewelleryTypes,
  stories: Stories,
  collections: Collections,
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
