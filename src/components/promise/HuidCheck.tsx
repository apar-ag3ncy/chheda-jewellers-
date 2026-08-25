"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";

/** A HUID is six alphanumeric characters, laser-marked on the piece. */
const HUID = /^[A-Z0-9]{6}$/;

/**
 * THE HUID FIELD - an honest verifier, and honest about its limits.
 *
 * It checks the FORMAT of a code and then hands the customer off to the Bureau
 * of Indian Standards' own tools, which are the only thing that can confirm a
 * real piece. It deliberately does not claim to look anything up: inventing a
 * "verified ✓" for a code we cannot check would be exactly the sort of theatre
 * the rest of this page exists to argue against.
 *
 * What it is genuinely good for: most people have never looked closely enough
 * at a piece to find the code, and typing it out is what makes them go and
 * look. That is the whole intervention.
 */
export function HuidCheck() {
  const [value, setValue] = useState("");
  const cleaned = value.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 6);
  const complete = cleaned.length === 6;
  const valid = HUID.test(cleaned);

  return (
    <div className="rounded-[var(--radius-brand)] border border-line bg-green-soft/20 p-6 md:p-7">
      <label htmlFor="huid" className="u-eyebrow mb-2 block text-[0.62rem]">
        Try it on a piece you own
      </label>
      <p className="mb-5 font-body text-[0.85rem] font-light leading-relaxed text-text-muted">
        Find the six-character code on the piece - you will need a loupe or a
        phone camera at full zoom. Type it in and we will point you at the
        Bureau&rsquo;s own record for it.
      </p>

      <div className="flex flex-wrap items-center gap-3">
        <input
          id="huid"
          value={cleaned}
          onChange={(e) => setValue(e.target.value)}
          placeholder="AZ4E9K"
          inputMode="text"
          autoComplete="off"
          spellCheck={false}
          maxLength={6}
          aria-describedby="huid-note"
          className="w-40 rounded-[var(--radius-brand)] border border-line bg-green-deep/45 px-4 py-3 font-body text-[1rem] uppercase tracking-[0.28em] text-text-strong placeholder:tracking-[0.28em] placeholder:text-text-muted/45 focus:border-gold focus:outline-none"
        />

        {/* Six ticks, one per character - the field tells you how far you are
            without needing a message. */}
        <span aria-hidden className="flex gap-1.5">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className={cn(
                "block h-px w-4 transition-colors duration-300",
                i < cleaned.length ? "bg-gold-light" : "bg-line",
              )}
            />
          ))}
        </span>
      </div>

      <p
        id="huid-note"
        aria-live="polite"
        className="mt-4 font-body text-[0.8rem] font-light leading-relaxed text-text-muted"
      >
        {!cleaned
          ? "Six characters, letters and numbers."
          : !complete
            ? `${6 - cleaned.length} character${6 - cleaned.length === 1 ? "" : "s"} to go.`
            : valid
              ? "That is the right shape for a HUID. Only the Bureau can confirm the piece itself - open BIS Care and enter it there."
              : "That does not look like a HUID. Six letters and numbers, no spaces."}
      </p>

      {complete && valid ? (
        <a
          href="https://www.bis.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[44px] items-center rounded-full border border-line-strong px-5 font-body text-[0.68rem] uppercase tracking-[0.14em] text-gold-light transition-colors hover:bg-gold/10"
        >
          Verify at bis.gov.in &rarr;
        </a>
      ) : null}

      <p className="mt-5 border-t border-line pt-4 font-body text-[0.7rem] font-light leading-relaxed text-text-muted/80">
        This field checks the format only. We do not look your code up, store
        it, or send it anywhere - a jeweller confirming its own hallmarks would
        prove nothing.
      </p>
    </div>
  );
}
