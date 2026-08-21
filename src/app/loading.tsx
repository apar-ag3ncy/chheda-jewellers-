import { Monogram } from "@/components/ui/Monogram";

/** Lightweight route-transition state (distinct from the first-load Loader). */
export default function Loading() {
  return (
    <div className="flex min-h-[70svh] w-full items-center justify-center bg-bg">
      <span style={{ animation: "goldpulse 2s var(--ease-soft) infinite" }}>
        <Monogram className="h-14 w-14" />
      </span>
      <span className="sr-only">Loading…</span>
    </div>
  );
}
