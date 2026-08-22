"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/config/nav";
import { flags } from "@/config/flags";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/cn";
import { Monogram } from "@/components/ui/Monogram";
import { Wordmark } from "@/components/ui/Wordmark";
import { GoldRateTicker } from "@/components/ui/GoldRateTicker";

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" {...props}>
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.3" cy="6.7" r="0.6" fill="currentColor" stroke="none" />
  </svg>
);
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.47-2.4-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.44-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35M12.05 21.8h-.01a9.87 9.87 0 01-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 01-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88a9.82 9.82 0 016.99 2.9 9.83 9.83 0 012.89 6.99c0 5.45-4.44 9.88-9.89 9.88M20.46 3.49A11.82 11.82 0 0012.05 0C5.5 0 .16 5.34.16 11.9c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 005.69 1.45h.01c6.55 0 11.89-5.34 11.9-11.9a11.82 11.82 0 00-3.5-8.41" />
  </svg>
);

export function Nav() {
  const pathname = usePathname();
  const [atTop, setAtTop] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isHome = pathname === "/";
  // The green shell + its extras only exist at the very top of the home page.
  // Everywhere else (scrolled, or any other route) it disperses and the beige
  // capsule sticks on its own.
  const expanded = isHome && atTop && !mobileOpen;

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setAtTop(window.scrollY < 90);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
    };
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const handleEnter = (label: string, hasChildren: boolean) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    if (hasChildren) setOpenMenu(label);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
      {/* ── GREEN SHELL — frames the beige capsule at home-top, disperses on scroll ── */}
      <div
        onMouseLeave={handleLeave}
        className={cn(
          "pointer-events-auto relative z-50 flex max-w-[calc(100vw-2rem)] items-center rounded-full",
          "transition-all duration-[750ms] ease-[var(--ease-lux)]",
          expanded
            ? "gap-2 border border-line-strong/50 bg-[var(--green-glass)] p-2 shadow-[0_20px_54px_-26px_rgba(0,0,0,0.7)] backdrop-blur-xl md:gap-3"
            : "gap-0 border border-transparent bg-transparent p-0 shadow-none",
        )}
      >
        {/* Left extra — live gold rate (home-top only) */}
        {flags.navGoldRate ? (
          <div
            className={cn(
              "hidden overflow-hidden whitespace-nowrap transition-all duration-[750ms] ease-[var(--ease-lux)] xl:block",
              expanded ? "max-w-[240px] px-3 opacity-100" : "pointer-events-none max-w-0 px-0 opacity-0",
            )}
          >
            <Link href="/live-gold-rate" tabIndex={expanded ? 0 : -1}>
              <GoldRateTicker variant="compact" />
            </Link>
          </div>
        ) : null}

        {/* ── BEIGE CAPSULE — the persistent nav ── */}
        <nav
          aria-label="Primary"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpenMenu(null);
              setMobileOpen(false);
            }
          }}
          className="relative z-10 flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--maroon)_12%,transparent)] bg-beige px-3 py-1.5 shadow-[0_18px_46px_-24px_rgba(0,0,0,0.55)] md:gap-2 md:px-4 md:py-2"
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group flex shrink-0 items-center gap-3"
          >
            {/* Jeweller's-seal medallion — gold mandala on a gold-rimmed
                emerald disc, so the brand gold stays luminous on beige. */}
            <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-b from-green to-green-deep shadow-[inset_0_1px_1px_rgba(240,207,170,0.28),0_3px_10px_-3px_rgba(0,0,0,0.45)] ring-1 ring-gold/45 transition-all duration-500 ease-[var(--ease-lux)] group-hover:ring-gold md:h-11 md:w-11">
              <Monogram className="h-[66%] w-[66%] transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover:rotate-[72deg]" />
            </span>
            <Wordmark layout="stacked" tone="dark" className="hidden text-[15px] sm:flex" />
          </Link>

          {/* Desktop links */}
          <ul className="ml-2 hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => {
              const hasChildren = Boolean(item.children?.length);
              return (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => handleEnter(item.label, hasChildren)}
                >
                  <Link
                    href={item.href}
                    onFocus={() => handleEnter(item.label, hasChildren)}
                    aria-haspopup={hasChildren ? "true" : undefined}
                    aria-expanded={hasChildren ? openMenu === item.label : undefined}
                    className={cn(
                      "inline-flex items-center gap-1.5 px-3 py-2 font-body text-[0.7rem] uppercase tracking-[0.15em] transition-colors duration-300",
                      isActive(item.href)
                        ? "text-maroon"
                        : "text-[color-mix(in_srgb,var(--green)_78%,transparent)] hover:text-green",
                    )}
                  >
                    {item.label}
                    {hasChildren ? (
                      <span
                        aria-hidden
                        className={cn(
                          "text-[0.55rem] transition-transform duration-300",
                          openMenu === item.label && "rotate-180",
                        )}
                      >
                        ▾
                      </span>
                    ) : null}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="ml-1 flex shrink-0 items-center gap-2">
            <Link
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full bg-green-deep px-4 py-2 font-body text-[0.66rem] uppercase tracking-[0.14em] text-offwhite transition-colors duration-300 hover:bg-green md:inline-flex"
            >
              Book a Visit
            </Link>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span className={cn("absolute left-0 h-px w-6 bg-green-deep transition-all duration-300", mobileOpen ? "top-1.5 rotate-45" : "top-0")} />
                <span className={cn("absolute left-0 top-1.5 h-px w-6 bg-green-deep transition-opacity duration-300", mobileOpen && "opacity-0")} />
                <span className={cn("absolute left-0 h-px w-6 bg-green-deep transition-all duration-300", mobileOpen ? "top-1.5 -rotate-45" : "top-3")} />
              </span>
            </button>
          </div>

          {/* Mega dropdown (desktop) — hangs below the beige capsule */}
          {primaryNav.map((item) =>
            item.children?.length ? (
              <div
                key={item.label}
                onMouseEnter={() => handleEnter(item.label, true)}
                inert={openMenu !== item.label}
                className={cn(
                  "absolute left-1/2 top-[calc(100%+12px)] w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-[var(--green-glass)] p-2 backdrop-blur-2xl transition-all duration-300",
                  openMenu === item.label
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                <div className="grid grid-cols-1 gap-1 sm:grid-cols-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="group rounded-xl border border-transparent p-5 transition-colors duration-300 hover:border-line-strong hover:bg-white/5"
                    >
                      <span className="font-display text-2xl font-light text-text-strong">
                        {child.label}
                      </span>
                      {child.description ? (
                        <span className="mt-1.5 block font-body text-[0.75rem] leading-relaxed text-text-muted">
                          {child.description}
                        </span>
                      ) : null}
                    </Link>
                  ))}
                </div>
              </div>
            ) : null,
          )}
        </nav>

        {/* Right extra — socials (home-top only) */}
        <div
          className={cn(
            "hidden items-center overflow-hidden whitespace-nowrap transition-all duration-[750ms] ease-[var(--ease-lux)] md:flex",
            expanded ? "max-w-[140px] gap-1 px-2 opacity-100" : "pointer-events-none max-w-0 gap-0 px-0 opacity-0",
          )}
        >
          <a
            href={siteConfig.socials.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            tabIndex={expanded ? 0 : -1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:text-gold-light"
          >
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a
            href={siteConfig.contact.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp"
            tabIndex={expanded ? 0 : -1}
            className="flex h-9 w-9 items-center justify-center rounded-full text-text-muted transition-colors hover:text-gold-light"
          >
            <WhatsAppIcon className="h-4 w-4" />
          </a>
        </div>
      </div>

      {/* Mobile full-screen menu */}
      <MobileMenu open={mobileOpen} pathname={pathname} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function MobileMenu({
  open,
  pathname,
  onClose,
}: {
  open: boolean;
  pathname: string;
  onClose: () => void;
}) {
  return (
    <div
      className={cn("pointer-events-none fixed inset-0 z-40 lg:hidden", open ? "pointer-events-auto" : "")}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={cn("absolute inset-0 bg-green-deep transition-opacity duration-500", open ? "opacity-100" : "opacity-0")}
        onClick={onClose}
      />
      <div
        className={cn(
          "absolute inset-0 flex flex-col overflow-y-auto px-6 pb-10 pt-28 transition-all duration-500 ease-[var(--ease-lux)]",
          open ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0",
        )}
      >
        <ul className="flex flex-col divide-y divide-line">
          {primaryNav.map((item, i) => (
            <li key={item.label} className="py-1">
              <Link
                href={item.href}
                onClick={onClose}
                className={cn(
                  "block py-4 font-display text-[2rem] font-light leading-none transition-colors",
                  (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href))
                    ? "text-gold-light"
                    : "text-text-strong",
                )}
                style={{ transitionDelay: open ? `${120 + i * 55}ms` : "0ms" }}
              >
                {item.label}
              </Link>
              {item.children?.length ? (
                <div className="flex flex-wrap gap-x-5 gap-y-1 pb-4">
                  {item.children.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={onClose}
                      className="inline-flex min-h-[40px] items-center py-1 font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted"
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              ) : null}
            </li>
          ))}
        </ul>
        <div className="mt-auto pt-10">
          <GoldRateTicker variant="compact" />
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line-strong px-5 py-3 font-body text-[0.7rem] uppercase tracking-[0.14em] text-text-strong"
            >
              Book a Visit
            </Link>
            <Link
              href={siteConfig.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-line-strong px-5 py-3 font-body text-[0.7rem] uppercase tracking-[0.14em] text-text-strong"
            >
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
