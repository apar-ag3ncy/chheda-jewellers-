"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Monogram } from "@/components/ui/Monogram";

/**
 * Route-level error boundary.
 *
 * Without this, any runtime error inside a route drops the visitor onto
 * Next's unstyled default screen - the one moment the house looks least like
 * itself. This keeps them inside the brand and gives them two ways out.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // The digest is the only handle on the server-side stack in production.
    console.error("Route error", error.digest ?? "", error);
  }, [error]);

  return (
    <main className="flex min-h-[80svh] w-full items-center justify-center bg-green px-6 py-24">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <Monogram className="h-14 w-14" />
        <p className="u-eyebrow mt-10">Something went wrong</p>
        <h1 className="mt-5 font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] text-text-strong">
          That did not load
        </h1>
        <p className="mt-6 font-body text-[0.95rem] font-light leading-relaxed text-text-muted">
          A fault on our side, not yours. Try again, and if it keeps happening
          the boutiques are always open.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.16em] text-text-strong transition-colors hover:border-gold hover:bg-gold/10"
          >
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex min-h-[44px] items-center rounded-full border border-line px-6 py-3 font-body text-[0.7rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-text-strong"
          >
            Back to the house
          </Link>
        </div>
      </div>
    </main>
  );
}
