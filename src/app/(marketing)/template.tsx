import type { ReactNode } from "react";
import { RouteCurtain } from "@/components/motion/RouteCurtain";

/**
 * Next re-mounts template.tsx on every navigation (unlike layout.tsx), which
 * is exactly the hook the route transition needs.
 */
export default function MarketingTemplate({ children }: { children: ReactNode }) {
  return <RouteCurtain>{children}</RouteCurtain>;
}
