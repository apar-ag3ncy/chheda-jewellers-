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

export function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const lastY = useRef(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Auto-hide on scroll-down, reveal on scroll-up.
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setScrolled(y > 32);
        if (y > lastY.current && y > 160 && !mobileOpen) setHidden(true);
        else setHidden(false);
        lastY.current = y;
        ticking = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [mobileOpen]);

  // Lock body scroll when the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close menus on route change.
  useEffect(() => {
    setMobileOpen(false);
    setOpenMenu(null);
  }, [pathname]);

  // Clear any pending close-timer on unmount.
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
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center",
        "px-4 pt-4 transition-transform duration-[var(--dur-base)] ease-[var(--ease-lux)] md:px-6 md:pt-5",
        hidden ? "-translate-y-[160%]" : "translate-y-0",
      )}
    >
      <nav
        aria-label="Primary"
        onMouseLeave={handleLeave}
        onKeyDown={(e) => {
          if (e.key === "Escape") {
            setOpenMenu(null);
            setMobileOpen(false);
          }
        }}
        className={cn(
          // z-50 keeps the pill (logo + close button) above the z-40 mobile menu.
          "pointer-events-auto relative z-50 w-full max-w-6xl",
          "rounded-[26px] border transition-colors duration-500",
          scrolled
            ? "border-line-strong/70 bg-[var(--green-glass)] shadow-[0_18px_50px_-24px_rgba(0,0,0,0.7)] backdrop-blur-xl"
            : "border-transparent bg-[color-mix(in_srgb,var(--green)_28%,transparent)] backdrop-blur-md",
        )}
      >
        <div className="flex items-center justify-between gap-4 px-4 py-2.5 md:px-5 md:py-3">
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} — home`}
            className="group flex shrink-0 items-center gap-3"
          >
            <Monogram className="h-9 w-9 transition-transform duration-700 ease-[var(--ease-lux)] group-hover:rotate-[45deg] md:h-10 md:w-10" />
            <Wordmark
              layout="stacked"
              className="hidden text-[15px] sm:flex"
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden items-center gap-1 lg:flex">
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
                      "inline-flex items-center gap-1.5 px-3.5 py-2 font-body text-[0.72rem] uppercase tracking-[0.16em] transition-colors duration-300",
                      isActive(item.href)
                        ? "text-gold-light"
                        : "text-text-muted hover:text-text-strong",
                    )}
                  >
                    {item.label}
                    {hasChildren ? (
                      <span
                        aria-hidden
                        className={cn(
                          "text-[0.6rem] transition-transform duration-300",
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

          {/* Right cluster */}
          <div className="flex shrink-0 items-center gap-3 md:gap-4">
            {flags.navGoldRate ? (
              <Link href="/live-gold-rate" className="hidden xl:inline-flex">
                <GoldRateTicker variant="compact" />
              </Link>
            ) : null}
            <Link
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden rounded-full border border-line-strong px-4 py-2 font-body text-[0.68rem] uppercase tracking-[0.14em] text-text-strong transition-colors duration-300 hover:border-gold hover:bg-gold/10 md:inline-flex"
            >
              Book a Visit
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
            >
              <span className="relative block h-3 w-6">
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-text-strong transition-all duration-300",
                    mobileOpen ? "top-1.5 rotate-45" : "top-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 top-1.5 h-px w-6 bg-text-strong transition-opacity duration-300",
                    mobileOpen && "opacity-0",
                  )}
                />
                <span
                  className={cn(
                    "absolute left-0 h-px w-6 bg-text-strong transition-all duration-300",
                    mobileOpen ? "top-1.5 -rotate-45" : "top-3",
                  )}
                />
              </span>
            </button>
          </div>
        </div>

        {/* Mega dropdown (desktop) */}
        {primaryNav.map((item) =>
          item.children?.length ? (
            <div
              key={item.label}
              onMouseEnter={() => handleEnter(item.label, true)}
              inert={openMenu !== item.label}
              className={cn(
                "absolute left-1/2 top-[calc(100%+10px)] w-[min(92vw,640px)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line-strong bg-[var(--green-glass)] p-2 backdrop-blur-2xl transition-all duration-300",
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

      {/* Mobile full-screen menu */}
      <MobileMenu
        open={mobileOpen}
        pathname={pathname}
        onClose={() => setMobileOpen(false)}
      />
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
      className={cn(
        "pointer-events-none fixed inset-0 z-40 lg:hidden",
        open ? "pointer-events-auto" : "",
      )}
      aria-hidden={!open}
      inert={!open}
    >
      <div
        className={cn(
          "absolute inset-0 bg-green-deep transition-opacity duration-500",
          open ? "opacity-100" : "opacity-0",
        )}
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
                style={{
                  transitionDelay: open ? `${120 + i * 55}ms` : "0ms",
                }}
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
