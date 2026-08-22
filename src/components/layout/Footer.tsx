import Link from "next/link";
import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";
import { Container } from "@/components/ui/Section";
import { GoldRateTicker } from "@/components/ui/GoldRateTicker";

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

export function Footer() {
  const year = 2026; // build-time constant; refreshed on each deploy

  return (
    <footer className="relative overflow-hidden bg-green-deep pt-20 md:pt-28">
      <div aria-hidden className="u-hairline absolute inset-x-0 top-0 opacity-60" />
      <Container>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
          {/* Brand + gold rate */}
          <div className="md:col-span-4">
            <Link href="/" aria-label={`${siteConfig.name} — home`} className="inline-flex items-center gap-3">
              <Monogram className="h-11 w-11" />
              <Wordmark layout="stacked" className="text-[16px]" />
            </Link>
            <p className="mt-6 max-w-xs font-body text-[0.85rem] font-light leading-relaxed text-text-muted">
              {siteConfig.description}
            </p>
            <div className="mt-8 max-w-xs">
              <GoldRateTicker variant="compact" />
            </div>
          </div>

          {/* Link columns */}
          {columns.map((col) => (
            <nav key={col.title} className="md:col-span-2" aria-label={col.title}>
              <h3 className="u-eyebrow mb-5 text-text-muted">{col.title}</h3>
              <ul className="flex flex-col gap-3">
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

          {/* Visit */}
          <div className="md:col-span-4">
            <h3 className="u-eyebrow mb-5 text-text-muted">Visit us</h3>
            <ul className="flex flex-col gap-6">
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
                    className="mt-1.5 inline-block font-body text-[0.72rem] uppercase tracking-[0.14em] text-gold transition-colors hover:text-gold-light"
                  >
                    Get directions →
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <SocialLink href={siteConfig.socials.instagram} label="Instagram" />
              <SocialLink href={siteConfig.contact.whatsappHref} label="WhatsApp" />
              {siteConfig.socials.linkedin ? (
                <SocialLink href={siteConfig.socials.linkedin} label="LinkedIn" />
              ) : null}
            </div>
          </div>
        </div>

        {/* Legal row */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line py-8 md:mt-24 md:flex-row md:items-center md:justify-between">
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
