import {
  Hero,
  ChhedaPromise,
  JewelleryTypes,
  Stories,
  Manifesto,
  Collections,
  DiamondEdit,
  CommunityStrip,
  Testimonials,
  MonthlyPlan,
  Branches,
} from "@/components/sections";
import { ScrollThemer } from "@/components/motion/ScrollThemer";
import { flags } from "@/config/flags";

/**
 * Homepage — the single-scroll cinematic journey.
 * Section order is data-driven; Community ⇄ Testimonials swap via a flag.
 */
export default function HomePage() {
  const social = flags.communityBeforeTestimonials ? (
    <>
      <CommunityStrip />
      <Testimonials />
    </>
  ) : (
    <>
      <Testimonials />
      <CommunityStrip />
    </>
  );

  return (
    <ScrollThemer>
      <Hero />
      <ChhedaPromise />
      <JewelleryTypes />
      <Stories />
      <Manifesto />
      <Collections />
      <DiamondEdit />
      {social}
      <MonthlyPlan />
      <Branches />
    </ScrollThemer>
  );
}
