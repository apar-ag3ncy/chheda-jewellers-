import Link from "next/link";
import Image from "next/image";
import { EMERALD_LQIP } from "@/lib/image-blur";
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
 * Now it is a single screen. The photograph stays, but it moves BEHIND the
 * content and is blurred out of legibility on purpose: at that strength it
 * stops being a picture you read and becomes a ground you read on - colour,
 * depth and a little grain, with no detail competing with the addresses.
 * That is the only way one screen can carry both the brand moment and the
 * practical detail without either one shouting.
 *
 * `min-h`, not `h`: the three columns stack on a phone, and a fixed height
 * would either clip them or leave a hole. It fills the screen and grows only
 * if the content genuinely needs it.
 *
 * Two details that matter for the blur:
 *   - the image is over-scaled, because a CSS blur samples past the element's
 *     edge and would otherwise feather the frame to transparent at all four
 *     sides;
 *   - the blur is on the IMAGE, not a backdrop-filter on the content. A
 *     backdrop-filter recomputes while the page scrolls; a filter on a static
 *     image rasterises once. On the hardware this site was profiled on, that
 *     distinction is the difference between a smooth scroll and a stuttering
 *     one.
 *
 * Contact affordances are gated on `contactIsReal()`, so while the numbers
 * are still TODO(client) placeholders nothing here offers to dial one.
 */
export function Footer() {
  const [houseName, houseSuffix] = houseLines();
  const year = new Date().getFullYear();

  return (
    <footer className="relative flex min-h-[100svh] w-full flex-col overflow-hidden bg-green-deep">
      {/* ── The ground: the sign-off photograph, blurred past reading ── */}
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/media/footer/sign-off.jpg"
          alt=""
          placeholder="blur"
          blurDataURL={EMERALD_LQIP}
          fill
          sizes="100vw"
          /* scale-110: a blur samples beyond the element's own edge, so an
             unscaled image feathers away to nothing at all four sides. */
          className="scale-110 object-cover blur-[22px]"
          style={{ objectPosition: "50% 46%" }}
        />
        {/* The scrim is a gradient, not a flat wash, and it gets HEAVIER going
            down. Contrast was measured against the lightest 0.1% of the
            blurred photograph - the harshest patch any text can land on - and
            --text-muted needs 4.5:1 there. 62% clears it by +0.28, 68% by
            +0.55, 76% by +0.9. The light end sits at the top where the only
            type is the wordmark, which is enormous and already at 9:1; the
            heavy end sits over the addresses and the legal line, which are
            the smallest text on the page. Lighter than this and the small
            print fails AA; heavier and the photograph stops showing at all,
            which defeats the point of putting it there. */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, color-mix(in srgb, var(--green-deep) 62%, transparent) 0%, color-mix(in srgb, var(--green-deep) 68%, transparent) 46%, color-mix(in srgb, var(--green-deep) 76%, transparent) 100%)",
          }}
        />
      </div>

      <Container className="relative flex flex-1 flex-col justify-between gap-7 py-9 md:gap-12 md:py-16">
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
        <div className="grid grid-cols-2 gap-x-5 gap-y-7 md:grid-cols-12 md:gap-10">
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
              <p className="mt-2 max-w-xs font-body text-[0.72rem] leading-relaxed text-text-muted">
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
