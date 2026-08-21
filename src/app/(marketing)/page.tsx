import {
  Hero,
  ChhedaPromise,
  JewelleryTypes,
  Stories,
  Collections,
  CommunityStrip,
  Testimonials,
  MonthlyPlan,
  Branches,
} from "@/components/sections";
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
    <>
      <Hero />
      <ChhedaPromise />
      <JewelleryTypes />
      <Stories />
      <Collections />
      {social}
      <MonthlyPlan />
      <Branches />
    </>
  );
}
