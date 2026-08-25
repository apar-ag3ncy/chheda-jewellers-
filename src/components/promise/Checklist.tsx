"use client";

import { useMemo, useState } from "react";
import { counterChecks } from "@/lib/content/promise";
import { siteConfig } from "@/config/site";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";
import { Monogram } from "@/components/ui/Monogram";
import { cn } from "@/lib/cn";

/**
 * "TAKE THIS TO ANY JEWELLER" - the page's most useful object.
 *
 * Every other section here asks the customer to trust a claim. This one hands
 * them a tool that works against *us* as readily as against anyone else: seven
 * questions, each with the answer they should get, tickable as they stand at a
 * counter on a phone.
 *
 * That is why it is genuinely creative rather than decorative - a jeweller
 * publishing the questions that expose a bad jeweller is making a claim they
 * cannot walk back, and the customer leaves with something they can use today.
 *
 * State is deliberately in memory only: nothing is stored, nothing is tracked,
 * and the copy-out button hands the list to the customer rather than to us.
 */
export function Checklist() {
  const [ticked, setTicked] = useState<Set<string>>(new Set());
  const [copied, setCopied] = useState(false);

  const toggle = (id: string) =>
    setTicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const score = ticked.size;
  const pct = Math.round((score / counterChecks.length) * 100);

  const verdict = useMemo(() => {
    if (score === 0) return "Start ticking as you get answers.";
    if (score <= 2) return "Early days. Keep asking.";
    if (score < counterChecks.length) return "Promising. Finish the list before you pay.";
    return "That is a jeweller worth buying from - whoever it is.";
  }, [score]);

  const copy = async () => {
    const text = [
      `${siteConfig.name} - questions to ask any jeweller`,
      "",
      ...counterChecks.map((c, i) => `${i + 1}. ${c.ask}\n   Expect: ${c.expect}`),
      "",
      `${siteConfig.url}/chheda-promise`,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <Section spacing="lg" tone="green">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* ── The pitch ────────────────────────────────────────────── */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Reveal as="p" className="u-eyebrow mb-4">
                05 - Take this with you
              </Reveal>
              <Reveal delay={0.05}>
                <h2 className="max-w-md font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)] text-text-strong">
                  Seven questions.
                  <br />
                  Ask us first.
                </h2>
              </Reveal>
              <Reveal as="p" delay={0.08} className="mt-6 max-w-sm font-body text-[1rem] font-light leading-relaxed text-text-muted">
                This list works on any counter in India, including ours. Tick
                them off as you get answers - if a shop cannot clear all seven,
                you already know everything you need to.
              </Reveal>

              {/* Score dial - a gold arc rather than a percentage badge. */}
              <div className="mt-10 flex items-center gap-6">
                <div className="relative h-24 w-24 shrink-0">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="var(--line)"
                      strokeWidth="1.5"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="44"
                      fill="none"
                      stroke="var(--gold-light)"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      pathLength={1}
                      strokeDasharray={1}
                      strokeDashoffset={1 - score / counterChecks.length}
                      style={{
                        transition:
                          "stroke-dashoffset 900ms var(--ease-cinema)",
                      }}
                    />
                  </svg>
                  <span className="absolute inset-0 grid place-items-center">
                    <Monogram
                      className={cn(
                        "h-8 w-8 transition-opacity duration-[900ms]",
                        score === counterChecks.length ? "opacity-100" : "opacity-30",
                      )}
                    />
                  </span>
                </div>
                <div>
                  <p className="font-display text-3xl font-light tabular-nums text-text-strong">
                    {score}
                    <span className="text-text-muted">/{counterChecks.length}</span>
                  </p>
                  <p
                    className="mt-1 max-w-[16rem] font-body text-[0.82rem] font-light leading-relaxed text-text-muted"
                    aria-live="polite"
                  >
                    {verdict}
                  </p>
                  <span className="sr-only">{pct} per cent complete.</span>
                </div>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Button onClick={copy} variant="ghost" type="button">
                  {copied ? "Copied ✓" : "Copy the list"}
                </Button>
                {score > 0 ? (
                  <button
                    type="button"
                    onClick={() => setTicked(new Set())}
                    className="font-body text-[0.7rem] uppercase tracking-[0.16em] text-text-muted underline underline-offset-4 transition-colors hover:text-text-strong"
                  >
                    Clear
                  </button>
                ) : null}
              </div>
            </div>
          </div>

          {/* ── The list ─────────────────────────────────────────────── */}
          <ul className="lg:col-span-7">
            {counterChecks.map((c, i) => {
              const on = ticked.has(c.id);
              return (
                <Reveal as="li" key={c.id} delay={i * 0.04} variant="slide" x={26}>
                  <label
                    className={cn(
                      "group flex cursor-pointer gap-5 border-t border-line py-6 transition-colors duration-500 last:border-b",
                      on && "border-line-strong",
                    )}
                  >
                    <input
                      type="checkbox"
                      checked={on}
                      onChange={() => toggle(c.id)}
                      className="peer sr-only"
                    />

                    {/* The tick - a drawn gold check, not an emoji. */}
                    <span
                      aria-hidden
                      className={cn(
                        "mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border transition-all duration-[600ms] ease-[var(--ease-cinema)]",
                        on
                          ? "border-gold-light bg-gold-light/15"
                          : "border-line group-hover:border-line-strong",
                        "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light",
                      )}
                    >
                      <svg viewBox="0 0 24 24" className="h-3.5 w-3.5">
                        <path
                          d="M5 12.5 L10 17.5 L19 7"
                          fill="none"
                          stroke="var(--gold-light)"
                          strokeWidth="2.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          pathLength={1}
                          strokeDasharray={1}
                          strokeDashoffset={on ? 0 : 1}
                          style={{
                            transition: "stroke-dashoffset 520ms var(--ease-cinema)",
                          }}
                        />
                      </svg>
                    </span>

                    <span className="flex-1">
                      <span className="flex items-baseline gap-3">
                        <span className="font-body text-[0.66rem] tracking-[0.2em] text-gold">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "font-display text-[length:var(--step-2)] font-light leading-snug transition-colors duration-500",
                            on ? "text-text-strong" : "text-text",
                          )}
                        >
                          {c.ask}
                        </span>
                      </span>
                      <span className="mt-2.5 flex items-start gap-3 pl-[calc(0.66rem+1.2em)]">
                        <span className="u-eyebrow shrink-0 pt-[0.25em] text-[0.55rem]">
                          Expect
                        </span>
                        <span className="font-body text-[0.88rem] font-light leading-relaxed text-text-muted">
                          {c.expect}
                        </span>
                      </span>
                    </span>
                  </label>
                </Reveal>
              );
            })}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
