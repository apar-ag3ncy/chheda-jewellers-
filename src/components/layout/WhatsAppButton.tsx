"use client";

import { useEffect, useState } from "react";
import { siteConfig, contactIsReal } from "@/config/site";
import { cn } from "@/lib/cn";

/** Persistent floating WhatsApp / chat button. Appears after first scroll. */
export function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a
      href={contactIsReal() ? siteConfig.contact.whatsappHref : "/enquire"}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Chat with ${siteConfig.name} on WhatsApp`}
      // Hidden by opacity until the scroll threshold, so it must also leave
      // the tab order and the accessibility tree - otherwise a keyboard user
      // at the top of any page can focus and activate a control that is not
      // there. Nav.tsx already does exactly this for its menu items.
      tabIndex={visible ? 0 : -1}
      aria-hidden={!visible}
      className={cn(
        "group fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full border border-line-strong bg-[var(--green-glass)] px-3.5 py-3 backdrop-blur-xl transition-all duration-500 ease-[var(--ease-lux)] hover:border-gold md:bottom-7 md:right-7",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-gold-light" aria-hidden>
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.247-.694.247-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.002-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.994 2.9 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413" />
      </svg>
      <span className="hidden pr-1 font-body text-[0.72rem] uppercase tracking-[0.14em] text-text-strong sm:inline">
        Chat
      </span>
    </a>
  );
}
