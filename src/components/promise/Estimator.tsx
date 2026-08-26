"use client";

import { useEffect, useRef, useState } from "react";
import { ledger } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { formatNumberIN } from "@/lib/format";
import type { GoldRateResponse } from "@/lib/gold-rate";
import { FALLBACK_22K as FALLBACK_RATE, fetchGoldRate } from "@/lib/gold-rate-client";
import { gsap, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/cn";

/**
 * "WORK OUT YOUR OWN BILL" - the transparency promise made operable.
 *
 * The previous version of this section was a worked example: correct, but
 * something to read. The promise is "you can repeat this arithmetic at home",
 * so the section now lets the customer do exactly that - their own weight,
 * their own karat, their own making charge - priced off the LIVE 22K rate.
 *
 * Two deliberate design decisions:
 *
 *  · The stone line is pinned at ₹0 and cannot be edited. That is the whole
 *    point of the section: it is the deduction a bundled bill hides, and
 *    making it a fixed, visible row says more than a paragraph could.
 *
 *  · Every number is an ESTIMATE and says so in the interface, not only in the
 *    footnote. A jeweller's site that produces an authoritative-looking price
 *    is worse than one that produces none.
 *
 * Totals count rather than snap, on the cinema curve, so a change to a slider
 * reads as the bill being recalculated rather than replaced.
 */


/** Purity in parts per thousand - the number stamped next to the karat. */
const KARATS = [
  { id: "22K", fineness: 916, factor: 1 },
  { id: "18K", fineness: 750, factor: 750 / 916 },
  { id: "14K", fineness: 585, factor: 585 / 916 },
] as const;

type KaratId = (typeof KARATS)[number]["id"];

export function Estimator() {
  const [rate, setRate] = useState<number | null>(null);
  const [weight, setWeight] = useState(ledger.netWeight);
  const [karat, setKarat] = useState<KaratId>("22K");
  const [making, setMaking] = useState(ledger.makingPct);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetchGoldRate()
      .then((d: GoldRateResponse) => {
        const r22 = d.rates.find((x) => x.karat === "22K");
        if (active && r22) setRate(r22.pricePerGram);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const base = rate ?? FALLBACK_RATE;
  const k = KARATS.find((x) => x.id === karat)!;
  const perGram = Math.round(base * k.factor);
  const metal = Math.round(weight * perGram);
  const makingValue = Math.round(metal * (making / 100));
  const gst = Math.round((metal + makingValue) * (ledger.gstPct / 100));
  const total = metal + makingValue + gst;

  const isExample = weight === ledger.netWeight && karat === "22K" && making === ledger.makingPct;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-row]", {
          opacity: 0,
          y: 14,
          duration: 0.9,
          ease: "lux",
          stagger: 0.08,
          scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
        });
        gsap.fromTo(
          "[data-rule]",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.1,
            ease: "lux",
            scrollTrigger: { trigger: root.current, start: "top 74%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <Section id="estimate" spacing="lg" tone="light" className="u-on-light">
      <Container>
        <div ref={root}>
          <Reveal as="p" className="u-eyebrow mb-4">
            03 - What you actually pay for
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)] text-text-strong">
              A bill with nothing
              <br />
              <em className="italic">folded into it</em>
            </h2>
          </Reveal>
          <Reveal as="p" delay={0.08} className="mt-6 max-w-xl font-body text-[1rem] font-light leading-relaxed text-text-muted">
            Move the numbers. This is the same arithmetic we do at the counter,
            against today&rsquo;s live rate - do it for a piece you already own
            and see whether the bill you were given adds up.
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            {/* ── The controls ─────────────────────────────────────────── */}
            <div className="lg:col-span-5">
              <div className="rounded-[var(--radius-brand)] border border-line bg-white/45 p-6 md:p-8">
                <div className="flex items-baseline justify-between">
                  <p className="u-eyebrow text-[0.62rem]">Your piece</p>
                  {!isExample ? (
                    <button
                      type="button"
                      onClick={() => {
                        setWeight(ledger.netWeight);
                        setKarat("22K");
                        setMaking(ledger.makingPct);
                      }}
                      className="font-body text-[0.66rem] uppercase tracking-[0.14em] text-gold-deep underline underline-offset-4"
                    >
                      Reset
                    </button>
                  ) : null}
                </div>

                {/* Karat */}
                <fieldset className="mt-7 border-0 p-0">
                  <legend className="mb-3 font-body text-[0.72rem] font-light text-text-muted">
                    Purity
                  </legend>
                  <div className="flex flex-wrap gap-2">
                    {KARATS.map((opt) => (
                      <label key={opt.id} className="cursor-pointer">
                        <input
                          type="radio"
                          name="karat"
                          value={opt.id}
                          checked={karat === opt.id}
                          onChange={() => setKarat(opt.id)}
                          className="peer sr-only"
                        />
                        <span
                          className={cn(
                            "flex min-h-[44px] flex-col justify-center rounded-full border px-5 py-2 text-center transition-all duration-[420ms] ease-[var(--ease-lux)]",
                            "border-line text-text-muted hover:border-line-strong",
                            "peer-checked:border-gold-deep peer-checked:bg-gold-deep/10 peer-checked:text-gold-deep",
                            "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-deep",
                          )}
                        >
                          <span className="font-body text-[0.78rem] uppercase tracking-[0.12em]">
                            {opt.id}
                          </span>
                          <span className="font-body text-[0.62rem] tabular-nums opacity-70">
                            {opt.fineness}
                          </span>
                        </span>
                      </label>
                    ))}
                  </div>
                </fieldset>

                {/* Weight */}
                <div className="mt-8">
                  <label
                    htmlFor="weight"
                    className="mb-3 flex items-baseline justify-between font-body text-[0.72rem] font-light text-text-muted"
                  >
                    <span>Net gold weight</span>
                    <span className="font-body text-[0.95rem] tabular-nums text-text-strong">
                      {weight.toFixed(1)} g
                    </span>
                  </label>
                  <input
                    id="weight"
                    type="range"
                    min={1}
                    max={150}
                    step={0.5}
                    value={weight}
                    onChange={(e) => setWeight(Number(e.target.value))}
                    className="cj-range w-full"
                  />
                  <p className="mt-2 font-body text-[0.72rem] font-light text-text-muted">
                    Gold only. Stones, thread and lac are weighed out first.
                  </p>
                </div>

                {/* Making */}
                <div className="mt-8">
                  <label
                    htmlFor="making"
                    className="mb-3 flex items-baseline justify-between font-body text-[0.72rem] font-light text-text-muted"
                  >
                    <span>Making charge</span>
                    <span className="font-body text-[0.95rem] tabular-nums text-text-strong">
                      {making}%
                    </span>
                  </label>
                  <input
                    id="making"
                    type="range"
                    min={0}
                    max={35}
                    step={1}
                    value={making}
                    onChange={(e) => setMaking(Number(e.target.value))}
                    className="cj-range w-full"
                  />
                  <p className="mt-2 font-body text-[0.72rem] font-light text-text-muted">
                    Ours is quoted before you say yes. If a bill you are holding
                    does not show this line at all, that is the question to ask.
                  </p>
                </div>
              </div>

              <p className="mt-6 border-l border-line-strong pl-5 font-body text-[0.86rem] font-light leading-relaxed text-text-muted">
                {ledger.note}
              </p>
            </div>

            {/* ── The bill ─────────────────────────────────────────────── */}
            <div className="lg:col-span-7">
              <dl className="font-body">
                <Row
                  label="Net gold weight"
                  sub="The gold only - stones and thread weighed out"
                  value={`${weight.toFixed(3)} g`}
                />
                <Row
                  label={`Today's ${karat} rate`}
                  sub={
                    rate
                      ? karat === "22K"
                        ? "Live, per gram"
                        : `Live 22K rate scaled to ${k.fineness}/916`
                      : "Indicative, per gram"
                  }
                  value={`₹${formatNumberIN(perGram)}`}
                  accent
                />
                <Row
                  label="Metal value"
                  sub="Weight × rate"
                  value={`₹${formatNumberIN(metal)}`}
                />

                {/* The decisive line - fixed, and not adjustable on purpose. */}
                <div data-row className="border-t border-line py-5">
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="flex-1">
                      <span className="block text-[0.95rem] font-light text-text-strong">
                        Stone weight
                      </span>
                      <span className="mt-1 block text-[0.78rem] font-light leading-relaxed text-text-muted">
                        Weighed separately. Never billed at the gold rate - which
                        is why there is no slider on this line.
                      </span>
                    </dt>
                    <dd className="shrink-0 text-[1.05rem] font-light tabular-nums text-gold-deep">
                      ₹0
                    </dd>
                  </div>
                </div>

                <Row
                  label="Making charge"
                  sub={`${making}% of metal value - shown before you say yes`}
                  value={`₹${formatNumberIN(makingValue)}`}
                />
                <Row
                  label={`GST (${ledger.gstPct}%)`}
                  sub="Statutory, on metal and making"
                  value={`₹${formatNumberIN(gst)}`}
                />

                <div data-rule className="h-px w-full bg-line-strong" />
                <div className="flex items-baseline justify-between gap-6 pt-6">
                  <dt>
                    <span className="block font-display text-[length:var(--step-2)] font-light text-text-strong">
                      Estimated total
                    </span>
                    <span className="mt-1 block font-body text-[0.72rem] font-light text-text-muted">
                      An estimate, not a quotation
                    </span>
                  </dt>
                  <dd className="font-display text-[length:var(--step-3)] font-light tabular-nums text-gold-deep">
                    ₹<CountUp value={total} />
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}

/**
 * A number that travels to its new value instead of jumping. GSAP tweens a
 * plain object and writes the formatted string, so the DOM node updates
 * without React re-rendering sixty times a second. Snaps instantly under
 * reduced motion.
 */
function CountUp({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const shown = useRef(value);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      shown.current = value;
      el.textContent = formatNumberIN(value);
      return;
    }
    const proxy = { n: shown.current };
    const tween = gsap.to(proxy, {
      n: value,
      duration: 0.9,
      ease: "cinema",
      onUpdate: () => {
        el.textContent = formatNumberIN(Math.round(proxy.n));
      },
      onComplete: () => {
        shown.current = value;
      },
    });
    return () => {
      tween.kill();
      shown.current = proxy.n;
    };
  }, [value]);

  return (
    <span ref={ref} aria-live="off">
      {formatNumberIN(value)}
    </span>
  );
}

function Row({
  label,
  sub,
  value,
  accent,
}: {
  label: string;
  sub: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div data-row className="border-t border-line py-5">
      <div className="flex items-baseline justify-between gap-6">
        <dt className="flex-1">
          <span className="block text-[0.95rem] font-light text-text-strong">{label}</span>
          <span className="mt-1 block text-[0.78rem] font-light leading-relaxed text-text-muted">
            {sub}
          </span>
        </dt>
        <dd
          className={cn(
            "shrink-0 text-[1.05rem] font-light tabular-nums transition-colors duration-500",
            accent ? "text-gold-deep" : "text-text",
          )}
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
