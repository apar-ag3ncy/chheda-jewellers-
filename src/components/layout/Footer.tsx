import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";

/**
 * THE SIGN-OFF.
 *
 * One full-bleed landscape photograph with the house's name set across it at
 * poster scale - the mark, then CHHEDA edge to edge, then the small JEWELLERS
 * beneath. Nothing else: no link rail, no branches, no legal row, no CTA.
 *
 * Why this composes its own lockup instead of reusing <Wordmark>: that
 * component is the NAV lockup, where the second line sits at half the first
 * and ends up almost as wide. At this scale that reads as two big words rather
 * than a name and its qualifier, so the sign-off uses its own ratio - a
 * display first line and a genuinely small second one. The name itself still
 * comes from config and is never hard-typed (CLAUDE.md).
 *
 * Both lines carry a negative right margin equal to their tracking, because
 * letter-spacing is added AFTER the final glyph too and would otherwise push
 * the whole line off-centre by half of it.
 *
 * The panel is one link home, which keeps it navigable without adding any
 * visible chrome back.
 */
const [houseName, houseSuffix] = siteConfig.name.split(" ");

export function Footer() {
  return (
    <footer className="relative h-[100svh] w-full overflow-hidden bg-green-deep">
      <Link
        href="/"
        aria-label={`${siteConfig.name} - home`}
        // outline-none with no replacement made the last tab stop on every
        // page invisible to a keyboard user. An inset ring reads against the
        // photograph without needing an offset the full-bleed panel has no room for.
        className="group block h-full w-full outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gold-light"
      >
        <Image
          src="/media/footer/sign-off.jpg"
          alt=""
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition: "50% 46%" }}
        />

        {/* Scrim, in two parts and deliberately light: a thin overall wash so
            the photograph keeps its own colour, then a soft pool behind the
            name band for legibility and edge fades that blend the panel into
            the page. Heavier than this and the picture goes flat. */}
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ background: "color-mix(in srgb, var(--green-deep) 30%, transparent)" }}
        />
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(60% 36% at 50% 48%, color-mix(in srgb, var(--green-deep) 34%, transparent) 0%, transparent 76%), linear-gradient(to bottom, var(--green-deep) 0%, transparent 16%, transparent 82%, var(--green-deep) 100%)",
          }}
        />

        {/* ── The lockup, dead centre ──────────────────────────────────── */}
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
          <Monogram
            className="h-[clamp(2.25rem,5vw,4.5rem)] w-[clamp(2.25rem,5vw,4.5rem)] transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-lux)] group-hover:opacity-90"
          />

          <span
            className="mt-[clamp(0.75rem,2.2vw,2rem)] block -mr-[0.26em] font-body font-light uppercase leading-[0.86] tracking-[0.26em] text-text-strong"
            style={{ fontSize: "clamp(2.6rem,15.2vw,15rem)" }}
          >
            {houseName}
          </span>

          <span
            className="mt-[clamp(0.6rem,1.6vw,1.5rem)] block -mr-[0.52em] font-body font-medium uppercase leading-none tracking-[0.52em] text-beige/85"
            style={{ fontSize: "clamp(0.62rem,1.55vw,1.4rem)" }}
          >
            {houseSuffix}
          </span>
        </div>
      </Link>
    </footer>
  );
}
