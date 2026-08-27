import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { siteConfig, houseLines, contactIsReal } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { Monogram } from "@/components/ui/Monogram";

/**
 * THE SIGN-OFF - the wordmark, then the practical detail.
 *
 * It used to be a single full-screen photograph with the name on it and
 * nothing else, which looked handsome and told a visitor nothing: no
 * address, no hours, no way to call. A jeweller's footer is where people
 * look for exactly those things, and every other page on the site now hands
 * forward to a shop visit, so the last thing on the page should be where the
 * shops are.
 *
 * Two bands, in the order someone actually needs them:
 *
 *   1. THE NAME, still full-bleed and still the picture. The brand moment
 *      survives - it just no longer has to carry duties it cannot.
 *   2. THE PARTICULARS. Both boutiques with their full address, hours and
 *      directions; how to reach the house; and the legal links, which had
 *      nowhere to live when the footer had no links at all.
 *
 * Contact affordances are gated on `contactIsReal()`, so while the numbers
 * are still TODO(client) placeholders nothing here offers to dial one.
 */
export function Footer() {
  const [houseName, houseSuffix] = houseLines();
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full bg-green-deep">
      {/* ── 1. The name ─────────────────────────────────────────────── */}
      <div className="relative h-[68svh] w-full overflow-hidden md:h-[76svh]">
        <Link
          href="/"
          aria-label={`${siteConfig.name} - home`}
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
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ background: "color-mix(in srgb, var(--green-deep) 34%, transparent)" }}
          />
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 36% at 50% 46%, color-mix(in srgb, var(--green-deep) 32%, transparent) 0%, transparent 76%), linear-gradient(to bottom, var(--green-deep) 0%, transparent 18%, transparent 74%, var(--green-deep) 100%)",
            }}
          />
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <Monogram className="h-[clamp(2rem,4.4vw,3.8rem)] w-[clamp(2rem,4.4vw,3.8rem)] transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-lux)] group-hover:opacity-90" />
            <span
              className="mt-[clamp(0.75rem,2.2vw,2rem)] block -mr-[0.26em] font-body font-light uppercase leading-[0.86] tracking-[0.26em] text-text-strong"
              style={{ fontSize: "clamp(2.6rem,15.2vw,15rem)" }}
            >
              {houseName}
            </span>
            <span
              className="mt-[clamp(0.5rem,1.4vw,1.1rem)] block -mr-[0.52em] font-body font-light uppercase text-beige/85"
              style={{ fontSize: "clamp(0.62rem,1.55vw,1.4rem)", letterSpacing: "0.52em" }}
            >
              {houseSuffix}
            </span>
          </div>
        </Link>
      </div>

      {/* ── 2. The particulars ──────────────────────────────────────── */}
      <div className="border-t border-line">
        <Container className="py-16 md:py-20">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-10">
            {/* The two shops, side by side - the reason anyone scrolls here */}
            {siteConfig.branches.map((b) => (
              <address key={b.id} className="not-italic md:col-span-4">
                <p className="u-eyebrow mb-4 text-gold-light">{b.area}</p>
                <p className="font-display text-[1.35rem] font-light leading-snug text-text-strong">
                  {b.addressLines[0]}
                </p>
                <p className="mt-1 font-body text-[0.86rem] font-light leading-relaxed text-text-muted">
                  {b.addressLines.slice(1).join(", ")}
                  {b.addressLines.length > 1 ? <br /> : null}
                  {b.city} {b.pincode}
                </p>
                <p className="mt-3 font-body text-[0.78rem] tracking-wide text-text-muted">
                  {b.hours}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  <Link
                    href={b.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-strong underline decoration-line-strong underline-offset-4 transition-colors hover:decoration-gold"
                  >
                    Directions
                  </Link>
                  {contactIsReal() ? (
                    <Link
                      href={`tel:${b.phone.replace(/\s+/g, "")}`}
                      className="inline-flex min-h-[44px] items-center font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-muted transition-colors hover:text-text-strong"
                    >
                      {b.phone}
                    </Link>
                  ) : null}
                </div>
              </address>
            ))}

            {/* Reaching the house, and the small print */}
            <div className="md:col-span-4">
              <p className="u-eyebrow mb-4 text-gold-light">Reach us</p>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    href={`mailto:${siteConfig.contact.email}`}
                    className="inline-flex min-h-[44px] items-center font-body text-[0.88rem] font-light text-text-muted transition-colors hover:text-text-strong"
                  >
                    {siteConfig.contact.email}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/enquire"
                    className="inline-flex min-h-[44px] items-center font-body text-[0.88rem] font-light text-text-muted transition-colors hover:text-text-strong"
                  >
                    Book a viewing
                  </Link>
                </li>
                <li>
                  <Link
                    href={siteConfig.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[44px] items-center font-body text-[0.88rem] font-light text-text-muted transition-colors hover:text-text-strong"
                  >
                    {siteConfig.socials.instagramHandle}
                  </Link>
                </li>
              </ul>
              {siteConfig.branches.some((b) => !b.verified) ? (
                <p className="mt-5 max-w-xs font-body text-[0.72rem] leading-relaxed text-text-muted">
                  Phone numbers and hours are being confirmed - book a viewing
                  and we will call you back.
                </p>
              ) : null}
            </div>
          </div>

          <div className="mt-14 flex flex-col items-start justify-between gap-4 border-t border-line pt-7 sm:flex-row sm:items-center">
            <p className="font-body text-[0.72rem] text-text-muted">
              &copy; {year} {siteConfig.name}. All rights reserved.
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <Link
                href="/privacy"
                className="inline-flex min-h-[44px] items-center font-body text-[0.72rem] text-text-muted transition-colors hover:text-text-strong"
              >
                Privacy
              </Link>
              <Link
                href="/terms"
                className="inline-flex min-h-[44px] items-center font-body text-[0.72rem] text-text-muted transition-colors hover:text-text-strong"
              >
                Terms
              </Link>
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
}
