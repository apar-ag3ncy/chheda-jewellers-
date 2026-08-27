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
 * (Vitrine), the people they are made for (Stories), hold one yourself
 * (FilmRoom), what 480 families say (Testimonials), the newest collection
 * (DiamondEdit), how it is paid for (MonthlyPlan), the circle
 * (CommunityStrip) - and then the city itself: the full-screen map with both
 * addresses closes the scroll into the sign-off.
 *
 * NOTE: three pairs of neighbours currently share a ground - Collections into
 * JewelleryTypes, ChhedaPromise into Vitrine, and DiamondEdit into
 * MonthlyPlan. The owner asked for these exact positions, so the ordering
 * takes precedence over the cream/dark alternation here. Do not "fix" it by
 * moving sections; if it needs solving, re-ground one section instead.
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
