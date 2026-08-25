import Link from "next/link";
import { Monogram } from "@/components/ui/Monogram";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[86svh] w-full items-center justify-center overflow-hidden bg-bg u-vignette px-6 text-center">
      <div className="flex flex-col items-center">
        <Monogram className="h-16 w-16 opacity-90" />
        <p className="u-eyebrow mt-8">Error 404</p>
        <h1 className="mt-4 font-display text-[clamp(2.6rem,7vw,5rem)] font-light leading-[0.98]">
          This page has
          <br />
          slipped away
        </h1>
        <p className="mt-5 max-w-md font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
          The piece you were looking for isn&rsquo;t here - but there is plenty more to
          discover in the house.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/" variant="primary" withArrow>
            Return home
          </Button>
          <Link
            href="/jewellery"
            className="inline-flex items-center px-6 py-3.5 font-body text-[0.72rem] uppercase tracking-[0.14em] text-text-strong transition-colors hover:text-gold-light"
          >
            Explore jewellery
          </Link>
        </div>
      </div>
    </section>
  );
}
