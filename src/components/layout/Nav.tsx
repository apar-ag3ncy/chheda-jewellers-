"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { primaryNav } from "@/config/nav";
import { flags } from "@/config/flags";
import { siteConfig, contactIsReal } from "@/config/site";
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
    // Moving to a sibling item must CLOSE the open panel, not leave it
    // hanging: this only ever set a new label, so arriving on an item with no
    // children left the previous 780px panel covering the page until the
    // pointer left the whole nav shell.
    setOpenMenu(hasChildren ? label : null);
  };
  const handleLeave = () => {
    closeTimer.current = setTimeout(() => setOpenMenu(null), 120);
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
      {/* ── GREEN SHELL - frames the beige capsule at home-top, disperses on scroll ── */}
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
        {/* Left extra - live gold rate (home-top only) */}
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

        {/* ── BEIGE CAPSULE - the persistent nav ── */}
        <nav
          aria-label="Primary"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpenMenu(null);
              setMobileOpen(false);
            }
          }}
          className="relative z-10 flex items-center gap-1 rounded-full border border-[color-mix(in_srgb,var(--maroon)_26%,transparent)] bg-cream px-3 py-2 shadow-[0_18px_46px_-22px_rgba(0,0,0,0.6)] md:gap-2 md:px-5 md:py-2.5"
        >
          {/* Brand */}
          <Link
            href="/"
            aria-label={`${siteConfig.name} - home`}
            className="group flex shrink-0 items-center gap-3"
          >
            {/* Jeweller's-seal medallion - gold mandala on a gold-rimmed
                emerald disc, so the brand gold stays luminous on beige. */}
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-b from-green to-green-deep shadow-[inset_0_1px_1px_rgba(240,207,170,0.28),0_3px_10px_-3px_rgba(0,0,0,0.45)] ring-1 ring-gold/45 transition-all duration-500 ease-[var(--ease-lux)] group-hover:ring-gold md:h-[3.25rem] md:w-[3.25rem]">
              {/* 74%, not 66%: at 44px the mandala's inner rings dissolved and
                  the seal read as a dark dot. Bigger disc, bigger mark. */}
              <Monogram tone="bright" className="h-[74%] w-[74%]" weight={4} />
            </span>
            <Wordmark layout="stacked" tone="dark" weight="semibold" className="hidden text-[18px] sm:flex" />
          </Link>

          {/* Desktop links */}
          <ul className="ml-2 hidden items-center gap-0.5 lg:flex">
            {primaryNav.map((item) => {
              const hasChildren = Boolean(item.groups?.length);
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
                      "inline-flex items-center gap-1.5 px-3 py-2 font-body text-[0.76rem] font-medium uppercase tracking-[0.13em] transition-colors duration-300",
                      isActive(item.href)
                        ? "text-maroon"
                        : "text-green hover:text-maroon",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* CTA + mobile toggle */}
          <div className="ml-1 flex shrink-0 items-center gap-2">
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

          {/* Mega dropdown (desktop) - hangs below the beige capsule.
              A horizontal row of frames: one photograph per category, the
              name set on the frame. It used to be a vertical list where each
              line carried a description ("22K heritage gold, handcrafted"),
              which is the wrong instrument - a jeweller's categories are told
              apart by eye long before they are told apart by a sentence, and
              the descriptions were competing with the only thing that
              actually distinguishes them. */}
          {primaryNav.map((item) => {
            const groups = item.groups;
            if (!groups?.length) return null;
            return (
              <div
                key={item.label}
                onMouseEnter={() => handleEnter(item.label, true)}
                onMouseMove={(e) => {
                  // Two CSS variable writes, no React state and no layout -
                  // the specular follows the pointer without re-rendering the
                  // menu on every mousemove.
                  const el = e.currentTarget;
                  const r = el.getBoundingClientRect();
                  el.style.setProperty("--gx", `${((e.clientX - r.left) / r.width) * 100}%`);
                  el.style.setProperty("--gy", `${((e.clientY - r.top) / r.height) * 100}%`);
                }}
                inert={openMenu !== item.label}
                className={cn(
                  "cj-liquid-glass absolute left-1/2 top-[calc(100%+12px)] w-[min(94vw,860px)] -translate-x-1/2 overflow-hidden rounded-[1.4rem] p-5 transition-all duration-[420ms] ease-[var(--ease-lux)]",
                  openMenu === item.label
                    ? "pointer-events-auto translate-y-0 opacity-100"
                    : "pointer-events-none translate-y-2 opacity-0",
                )}
              >
                {groups.map((group) => (
                  <div key={group.title}>
                    <div className="mb-4 flex items-baseline justify-between border-b border-line pb-2">
                      {group.href ? (
                        <Link
                          href={group.href}
                          className="u-eyebrow text-[0.62rem] transition-colors hover:text-gold"
                        >
                          {group.title} <span aria-hidden>&rarr;</span>
                        </Link>
                      ) : (
                        <span className="u-eyebrow text-[0.62rem]">{group.title}</span>
                      )}
                    </div>

                    {/* A row of frames, not a list of sentences. Four columns
                        on any width the capsule itself survives, so the row
                        never reflows into a ragged second line. */}
                    <ul className="grid grid-cols-4 gap-3">
                      {group.items.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            tabIndex={openMenu === item.label ? 0 : -1}
                            className="group/card block overflow-hidden rounded-xl outline-none ring-gold-light transition-colors focus-visible:ring-2"
                          >
                            {child.image ? (
                              <span className="relative block aspect-[3/4] overflow-hidden rounded-xl bg-green-deep">
                                <Image
                                  src={child.image.src}
                                  alt=""
                                  fill
                                  sizes="(max-width: 900px) 24vw, 200px"
                                  className="object-cover transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover/card:scale-[1.06]"
                                  style={{ objectPosition: child.image.focus ?? "50% 45%" }}
                                />
                                {/* Just enough foot to carry the name. The
                                    label sits ON the frame rather than under
                                    it so all four read as one row of pictures
                                    instead of four captioned blocks. */}
                                <span
                                  aria-hidden
                                  className="absolute inset-x-0 bottom-0 h-2/5"
                                  style={{
                                    background:
                                      "linear-gradient(to top, color-mix(in srgb, var(--green-deep) 92%, transparent) 0%, transparent 100%)",
                                  }}
                                />
                                <span className="absolute inset-x-0 bottom-0 flex flex-col items-center pb-3">
                                  <span className="font-display text-[1.05rem] font-light leading-none text-text-strong">
                                    {child.label}
                                  </span>
                                  <span
                                    aria-hidden
                                    className="mt-1.5 block h-px w-0 bg-gold-light transition-all duration-500 ease-[var(--ease-lux)] group-hover/card:w-7"
                                  />
                                </span>
                              </span>
                            ) : (
                              <span className="block rounded-xl px-2 py-2 font-display text-[1.05rem] font-light text-text-strong">
                                {child.label}
                              </span>
                            )}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            );
          })}
        </nav>

        {/* Right extra - socials (home-top only) */}
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
          {/* Only while there is a real number. It used to fall back to the
              booking form while still labelled "WhatsApp" and still opening in
              a new tab, so the icon promised one thing and did another. That
              form is gone now, which leaves hiding it as the only honest
              option until the number is published. */}
          {contactIsReal() ? (
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
          ) : null}
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
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  /**
   * The menu is an opaque full-screen overlay, so while it is open it must
   * behave like a modal dialog. `inert` below already seals it when CLOSED;
   * this handles the open state, where focus could previously tab straight
   * out of the last link and into the page hidden behind it, and where Escape
   * did nothing because the nav's own key handler is on an element this panel
   * is rendered outside of.
   */
  useEffect(() => {
    if (!open) {
      restoreRef.current?.focus?.();
      restoreRef.current = null;
      return;
    }
    restoreRef.current = document.activeElement as HTMLElement | null;
    const panel = panelRef.current;
    const focusables = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      ).filter((el) => el.offsetParent !== null);

    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal={open}
      aria-label="Menu"
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
              {item.groups?.length ? (
                <div className="flex flex-wrap gap-x-5 gap-y-1 pb-4">
                  {item.groups
                    .flatMap((g) =>
                      g.href ? [{ label: g.title, href: g.href }, ...g.items] : g.items,
                    )
                    .map((c) => (
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
