import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { siteConfig } from "@/config/site";
import { footerColumns } from "@/config/nav";
import { reviewsSummary } from "@/lib/content/testimonials";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const stats = [
  { big: "22K", label: "Hallmarked" },
  { big: "02", label: "Boutiques" },
  {
    big: reviewsSummary.rating.toFixed(1),
    label: `${reviewsSummary.count}+ reviews`,
  },
];

/**
 * ONE SCREEN, NOT A SECOND PAGE.
 *
 * The footer is capped at 100svh from `md` up and lays itself out as three
 * bands inside that box — cover, link rail, legal — distributed with
 * `justify-between`. Nothing inside carries a fixed height; the display line
 * is sized in `svh` units so it shrinks with the viewport instead of pushing
 * the rail off the bottom on a short laptop.
 *
 * Why min-height and not height: at very large text-zoom the content must be
 * allowed to grow rather than clip, so the cap is expressed as `max-h` on the
 * cover band only. At normal settings the whole footer lands in one view.
 */
export function Footer() {
  const year = 2026; // build-time constant, refreshed each deploy

  return (
    <footer className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-green-deep md:h-[100svh]">
      {/* ── Image panel — full-bleed on mobile, diagonal on desktop ────── */}
      <div
        aria-hidden
        className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[52%] lg:[clip-path:polygon(24%_0,100%_0,100%_100%,4%_100%)]"
      >
        <Image
          src="/media/categories/gold.jpg"
          alt=""
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          sizes="(max-width: 1024px) 100vw, 52vw"
          className="object-cover"
          style={{ objectPosition: "50% 26%" }}
        />
        {/* Mobile: darken neutrally (keeps the gold warm) and fade to emerald
            at the edges — not a flat green wash over the photograph. */}
        <div
          aria-hidden
          className="absolute inset-0 lg:hidden"
          style={{
            background:
              "linear-gradient(to bottom, var(--green-deep) 0%, rgba(0,0,0,0.62) 22%, rgba(0,0,0,0.72) 58%, var(--green-deep) 92%)",
          }}
        />
        <div
          aria-hidden
          className="absolute inset-0 hidden lg:block"
          style={{
            background:
              "linear-gradient(108deg, var(--green-deep) 4%, color-mix(in srgb, var(--green-deep) 58%, transparent) 24%, transparent 44%)",
          }}
        />
      </div>

      {/* Diagonal gold hairline (desktop) */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
        preserveAspectRatio="none"
        viewBox="0 0 100 100"
      >
        <defs>
          <linearGradient id="footer-diag" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--gold)" stopOpacity="0" />
            <stop offset="0.5" stopColor="var(--gold-light)" stopOpacity="0.8" />
            <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
        <line
          x1="24"
          y1="0"
          x2="4"
          y2="100"
          stroke="url(#footer-diag)"
          strokeWidth="1"
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* Oversized monogram watermark */}
      <Monogram
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-20 h-72 w-72 opacity-[0.045] md:h-[28rem] md:w-[28rem]"
      />

      {/* ── Band 1 · the invitation ────────────────────────────────────── */}
      <Container className="relative z-10 w-full pt-[clamp(2.25rem,6svh,5rem)]">
        <div className="flex max-w-2xl flex-col">
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="mb-[clamp(0.9rem,2.4svh,2.25rem)] inline-flex items-center gap-3"
          >
            <Monogram className="h-9 w-9" />
            <Wordmark layout="stacked" className="text-[14px]" />
          </Link>

          <p className="u-eyebrow mb-[clamp(0.6rem,1.4svh,1.25rem)]">
            Visit the house
          </p>
          {/* Sized against viewport HEIGHT as well as width — this is what
              keeps the whole footer inside one screen on a short laptop. */}
          <h2 className="font-display font-light leading-[0.92] text-text-strong text-[clamp(2rem,min(7.5vw,9.5svh),5.6rem)]">
            <span className="block">Come, find</span>
            <span className="block italic">your heirloom</span>
          </h2>
          <p className="mt-[clamp(0.8rem,2svh,1.75rem)] max-w-md font-body text-[0.9rem] font-light leading-relaxed text-text sm:text-[0.95rem]">
            Two boutiques in Mumbai — a cup of chai, no pressure, and the whole
            collection in your hands.
          </p>
          <div className="mt-[clamp(1rem,2.4svh,2.25rem)] flex flex-wrap items-center gap-3">
            <Button href="/enquire" variant="primary" size="md" withArrow>
              Book an appointment
            </Button>
            <Button href="#footer-branches" variant="ghost" size="md">
              Find a boutique
            </Button>
          </div>

          {/* Stat strip — folded into the cover so it costs no extra band. */}
          <dl className="mt-[clamp(1rem,2.4svh,2.25rem)] hidden gap-8 border-t border-line/60 pt-[clamp(0.6rem,1.5svh,1.25rem)] sm:flex sm:gap-12">
            {stats.map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="font-display text-2xl font-light tabular-nums text-gold-light">
                  {s.big}
                </dt>
                <dd className="mt-0.5 font-body text-[0.6rem] uppercase tracking-[0.16em] text-text-muted">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Container>

      {/* ── Band 2 · the rail ──────────────────────────────────────────── */}
      <div className="relative z-10 w-full border-t border-line/70">
        <Container>
          <div className="grid grid-cols-3 gap-x-4 gap-y-[clamp(1rem,2.4svh,2rem)] py-[clamp(1rem,2.8svh,2.5rem)] md:grid-cols-12 md:gap-x-8">
            {footerColumns.map((col) => (
              <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
                <h3 className="u-eyebrow mb-3 text-[0.62rem] text-text-muted">
                  {col.title}
                </h3>
                <ul className="flex flex-col">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-[3px] font-body text-[0.78rem] font-light text-text transition-colors duration-300 hover:text-gold-light sm:text-[0.82rem]"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div id="footer-branches" className="col-span-3 md:col-span-5">
              <h3 className="u-eyebrow mb-3 text-[0.62rem] text-text-muted">
                Visit us
              </h3>
              <ul className="grid grid-cols-2 gap-4">
                {siteConfig.branches.map((b) => (
                  <li key={b.id}>
                    <p className="font-display text-lg font-light leading-tight text-text-strong">
                      {b.area}
                    </p>
                    <p className="mt-0.5 font-body text-[0.78rem] font-light leading-snug text-text-muted">
                      {b.addressLines[0]}, {b.city} {b.pincode}
                    </p>
                    <Link
                      href={b.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-1 inline-block font-body text-[0.66rem] uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
                    >
                      Directions →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>
        </Container>
      </div>

      {/* ── Band 3 · legal ─────────────────────────────────────────────── */}
      <div className="relative z-10 w-full border-t border-line/70">
        <Container>
          <div className="flex flex-wrap items-center justify-between gap-x-5 gap-y-2 py-[clamp(0.7rem,1.8svh,1.4rem)]">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <SocialLink href={siteConfig.socials.instagram} label="Instagram" />
              <SocialLink href={siteConfig.contact.whatsappHref} label="WhatsApp" />
              <p className="font-body text-[0.68rem] tracking-wide text-text-muted">
                © {year} {siteConfig.legalName}.
              </p>
            </div>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <Link href="/privacy" className="footer-legal">
                Privacy
              </Link>
              <Link href="/terms" className="footer-legal">
                Terms
              </Link>
              <Link href="/live-gold-rate" className="footer-legal">
                Gold rate is indicative
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}

function SocialLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex min-h-[36px] items-center rounded-full border border-line px-3.5 font-body text-[0.62rem] uppercase tracking-[0.14em] text-text-muted transition-colors duration-300 hover:border-gold hover:text-gold-light"
    >
      {label}
    </Link>
  );
}
