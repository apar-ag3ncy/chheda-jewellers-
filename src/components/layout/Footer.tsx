import Link from "next/link";
import Image from "next/image";
import { siteConfig } from "@/config/site";
import { reviewsSummary } from "@/lib/content/testimonials";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";

const columns = [
  {
    title: "Jewellery",
    links: [
      { label: "Gold", href: "/jewellery/gold" },
      { label: "Diamond", href: "/jewellery/diamond" },
      { label: "Polki", href: "/jewellery/polki" },
      { label: "All Jewellery", href: "/jewellery" },
    ],
  },
  {
    title: "The House",
    links: [
      { label: "Chheda Promise", href: "/chheda-promise" },
      { label: "Offers & Plans", href: "/offers-and-plans" },
      { label: "Investors", href: "/investors" },
      { label: "Live Gold Rate", href: "/live-gold-rate" },
      { label: "Journal", href: "/journal" },
    ],
  },
];

const stats = [
  { big: "22K", label: "Hallmarked gold" },
  { big: "02", label: "Mumbai boutiques" },
  { big: reviewsSummary.rating.toFixed(1), label: `Google · ${reviewsSummary.count}+ reviews` },
];

export function Footer() {
  const year = 2026; // build-time constant, refreshed each deploy

  return (
    <footer className="relative overflow-hidden bg-green-deep">
      {/* ============================================================
          Cinematic cover — diagonal image, oversized type, stat row
          ============================================================ */}
      <section
        aria-label={`Visit ${siteConfig.name}`}
        className="relative flex min-h-[92svh] w-full flex-col justify-center"
      >
        {/* Image panel — full-bleed on mobile, diagonal on desktop */}
        <div
          aria-hidden
          className="absolute inset-0 lg:left-auto lg:right-0 lg:w-[58%] lg:[clip-path:polygon(26%_0,100%_0,100%_100%,6%_100%)]"
        >
          <Image
            src="/media/categories/gold.jpg"
            alt=""
            fill
            sizes="(max-width: 1024px) 100vw, 58vw"
            className="object-cover"
            style={{ objectPosition: "50% 28%" }}
          />
          {/* Blend into emerald: strong wash on mobile, diagonal edge on desktop */}
          <div
            aria-hidden
            className="absolute inset-0 bg-green-deep/78 lg:hidden"
          />
          <div
            aria-hidden
            className="absolute inset-0 hidden lg:block"
            style={{
              background:
                "linear-gradient(108deg, var(--green-deep) 4%, color-mix(in srgb, var(--green-deep) 55%, transparent) 26%, transparent 46%)",
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
              <stop offset="0.5" stopColor="var(--gold-light)" stopOpacity="0.85" />
              <stop offset="1" stopColor="var(--gold)" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line
            x1="26"
            y1="0"
            x2="6"
            y2="100"
            stroke="url(#footer-diag)"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
          />
        </svg>

        {/* Oversized monogram watermark */}
        <Monogram
          aria-hidden
          className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 opacity-[0.05] md:h-[32rem] md:w-[32rem]"
        />

        {/* Content */}
        <Container className="relative z-10 w-full">
          <div className="flex max-w-2xl flex-col">
            <Link
              href="/"
              aria-label={`${siteConfig.name} — home`}
              className="mb-10 inline-flex items-center gap-3"
            >
              <Monogram className="h-10 w-10" />
              <Wordmark layout="stacked" className="text-[15px]" />
            </Link>

            <p className="u-eyebrow mb-6">Visit the house</p>
            <h2 className="font-display text-[clamp(2.8rem,8.5vw,7.5rem)] font-light leading-[0.92] text-text-strong">
              <span className="block">Come, find</span>
              <span className="block italic">your heirloom</span>
            </h2>
            <p className="mt-8 max-w-md font-body text-[1.02rem] font-light leading-relaxed text-text">
              Two boutiques in Mumbai — a cup of chai, no pressure, and the whole
              collection in your hands.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Button href={siteConfig.contact.whatsappHref} variant="primary" size="lg" withArrow>
                Book a Visit
              </Button>
              <Button href="#branches-footer" variant="ghost" size="lg">
                Find a boutique
              </Button>
            </div>
          </div>
        </Container>

        {/* Stat row */}
        <div className="relative z-10 mt-16 w-full border-t border-line/70 lg:mt-24">
          <Container>
            <dl className="grid grid-cols-3 gap-x-4 gap-y-8 py-8 md:py-9 lg:max-w-[56%]">
              {stats.map((s) => (
                <div key={s.label} className="flex flex-col">
                  <dt className="font-display text-3xl font-light tabular-nums text-gold-light md:text-4xl">
                    {s.big}
                  </dt>
                  <dd className="mt-1 font-body text-[0.68rem] uppercase tracking-[0.18em] text-text-muted">
                    {s.label}
                  </dd>
                </div>
              ))}
            </dl>
          </Container>
        </div>
      </section>

      {/* ============================================================
          Functional bar — links, branches, socials, legal
          ============================================================ */}
      <div className="relative border-t border-line bg-green-deep">
        <Container>
          <div className="grid grid-cols-2 gap-x-8 gap-y-12 py-16 md:grid-cols-12 md:gap-10">
            {columns.map((col) => (
              <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
                <h3 className="u-eyebrow mb-5 text-text-muted">{col.title}</h3>
                <ul className="flex flex-col gap-1">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link
                        href={l.href}
                        className="inline-block py-1 font-body text-[0.9rem] font-light text-text transition-colors duration-300 hover:text-gold-light"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}

            <div id="branches-footer" className="col-span-2 md:col-span-5">
              <h3 className="u-eyebrow mb-5 text-text-muted">Visit us</h3>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                {siteConfig.branches.map((b) => (
                  <li key={b.id}>
                    <p className="font-display text-xl font-light text-text-strong">{b.area}</p>
                    <p className="mt-1 font-body text-[0.85rem] font-light leading-relaxed text-text-muted">
                      {b.addressLines.join(", ")}
                      <br />
                      {b.city} {b.pincode}
                    </p>
                    <Link
                      href={b.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block font-body text-[0.72rem] uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
                    >
                      Get directions →
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-2 flex flex-col gap-4 md:col-span-3 md:items-end">
              <h3 className="u-eyebrow mb-1 text-text-muted md:text-right">Connect</h3>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <SocialLink href={siteConfig.socials.instagram} label="Instagram" />
                <SocialLink href={siteConfig.contact.whatsappHref} label="WhatsApp" />
                {siteConfig.socials.linkedin ? (
                  <SocialLink href={siteConfig.socials.linkedin} label="LinkedIn" />
                ) : null}
              </div>
            </div>
          </div>

          {/* Legal row */}
          <div className="flex flex-col gap-4 border-t border-line py-8 md:flex-row md:items-center md:justify-between">
            <p className="font-body text-[0.72rem] tracking-wide text-text-muted">
              © {year} {siteConfig.legalName}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
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
      className="inline-flex min-h-[40px] items-center rounded-full border border-line px-5 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-muted transition-colors duration-300 hover:border-gold hover:text-gold-light"
    >
      {label}
    </Link>
  );
}
