import {
  IntroScene,
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

/**
 * Homepage — the single-scroll cinematic journey.
 * CommunityStrip anchors the very end, handing off into the footer.
 */
export default function HomePage() {
  return (
    <ScrollThemer>
      <IntroScene />
      <Hero />
      <ChhedaPromise />
      <JewelleryTypes />
      <Stories />
      <Manifesto />
      <Collections />
      <DiamondEdit />
      <Testimonials />
      <MonthlyPlan />
      <Branches />
      <CommunityStrip />
    </ScrollThemer>
  );
}
