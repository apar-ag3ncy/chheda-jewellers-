import Link from "next/link";
import { FooterGround } from "@/components/layout/FooterGround";
import { siteConfig, houseLines, contactIsReal } from "@/config/site";
import { Container } from "@/components/ui/Section";
import { Monogram } from "@/components/ui/Monogram";

/**
 * THE SIGN-OFF - one screen: the name, the two shops, the small print.
 *
 * This was two stacked bands - a 76svh photograph carrying the wordmark, then
 * a separate block of particulars underneath. Handsome, but it ran to nearly
 * two screens, so nobody ever saw the name and the addresses at the same time
 * and the shop details were permanently below the fold of the fold.
 *
 * Now it is a single screen: the photograph moves BEHIND the content and is
 * blurred past legibility, so it stops being a picture you read and becomes a
 * ground you read on. See FooterGround for the blur, the scrim and the seam
 * with the map above it.
 *
 * The three blocks are CENTRED, not spread. `justify-between` pushed the name
 * to the ceiling and the legal line to the floor and left two lakes of empty
 * green in between - on a 900px screen the gaps came out at ~125px each,
 * which read as three unrelated things rather than one sign-off. Centring
 * with a fixed gap keeps them as one block and puts the leftover height in
 * the margins, where it belongs.
 *
 * The padding is asymmetric on purpose: the top has to clear the floating
 * nav, the bottom only has to breathe, so matching them would push the block
 * visibly above centre. These two values put the sign-off optically centred
 * with the monogram still clear of the capsule.
 *
 * The top padding is nav clearance, not taste. The footer fills the viewport,
 * so when you reach the bottom of the page its first element sits directly
 * under the floating capsule - which ends 100px down on desktop and 92px on a
 * phone. Without this the monogram was behind the nav.
 *
 * `min-h`, not `h`: a fixed height would clip the stacked columns on a narrow
 * phone or leave a hole on a short desktop window.
 *
 * Contact affordances are gated on `contactIsReal()`, so while the numbers
 * are still TODO(client) placeholders nothing here offers to dial one.
 */
export function Footer() {
  const [houseName, houseSuffix] = houseLines();
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-green-deep">
      <FooterGround />

      <Container className="relative flex flex-1 flex-col justify-center gap-6 pt-[126px] pb-[44px] md:gap-11 md:pt-[120px] md:pb-[96px]">
        {/* ── The name ─────────────────────────────────────────────── */}
        <Link
          href="/"
          aria-label={`${siteConfig.name} - home`}
          className="group flex flex-col items-center outline-none focus-visible:ring-2 focus-visible:ring-gold-light"
        >
          <Monogram className="h-[clamp(1.7rem,3vw,2.6rem)] w-[clamp(1.7rem,3vw,2.6rem)] transition-opacity duration-[var(--dur-slow)] ease-[var(--ease-lux)] group-hover:opacity-90" />
          <span
            className="mt-[clamp(0.6rem,1.4vw,1.1rem)] block -mr-[0.26em] font-body font-light uppercase leading-[0.86] tracking-[0.26em] text-text-strong"
            style={{ fontSize: "clamp(1.9rem,9.4vw,7.4rem)" }}
          >
            {houseName}
          </span>
          <span
            className="mt-[clamp(0.4rem,0.9vw,0.8rem)] block -mr-[0.52em] font-body font-light uppercase text-beige/85"
            style={{ fontSize: "clamp(0.52rem,1.05vw,0.95rem)", letterSpacing: "0.52em" }}
          >
            {houseSuffix}
          </span>
        </Link>

        {/* ── The particulars ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-x-5 gap-y-5 md:grid-cols-12 md:gap-10">
          {siteConfig.branches.map((b) => (
            <address key={b.id} className="not-italic md:col-span-4">
              <p className="u-eyebrow mb-2 text-gold-light">{b.area}</p>
              <p className="font-display text-[1.2rem] font-light leading-snug text-text-strong md:text-[1.3rem]">
                {b.addressLines[0]}
              </p>
              <p className="mt-1 font-body text-[0.84rem] font-light leading-relaxed text-text-muted">
                {b.addressLines.slice(1).join(", ")}
                {b.addressLines.length > 1 ? <br /> : null}
                {b.city} {b.pincode}
              </p>
              <p className="mt-1.5 font-body text-[0.76rem] tracking-wide text-text-muted">
                {b.hours}
              </p>
              <div className="mt-2 flex flex-wrap gap-x-5">
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

          <div className="col-span-2 md:col-span-4">
            <p className="u-eyebrow mb-3 text-gold-light">Reach us</p>
            <ul className="flex flex-col">
              <li>
                <Link
                  href={`mailto:${siteConfig.contact.email}`}
                  className="inline-flex min-h-[44px] items-center font-body text-[0.86rem] font-light text-text-muted transition-colors hover:text-text-strong"
                >
                  {siteConfig.contact.email}
                </Link>
              </li>
              <li>
                <Link
                  href={siteConfig.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[44px] items-center font-body text-[0.86rem] font-light text-text-muted transition-colors hover:text-text-strong"
                >
                  {siteConfig.socials.instagramHandle}
                </Link>
              </li>
            </ul>
            {siteConfig.branches.some((b) => !b.verified) ? (
              <p className="mt-1 max-w-xs font-body text-[0.72rem] leading-relaxed text-text-muted">
                Phone numbers and hours are being confirmed. Email us in the
                meantime, or come into either shop.
              </p>
            ) : null}
          </div>
        </div>

        {/* ── The small print ──────────────────────────────────────── */}
        <div className="flex flex-col items-start justify-between gap-3 border-t border-line pt-5 sm:flex-row sm:items-center">
          <p className="font-body text-[0.72rem] text-text-muted">
            &copy; {year} {siteConfig.name}. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6">
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
    </footer>
  );
}
