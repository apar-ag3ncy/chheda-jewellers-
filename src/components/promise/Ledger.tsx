"use client";

import { useEffect, useRef, useState } from "react";
import { ledger } from "@/lib/content/promise";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { formatNumberIN } from "@/lib/format";
import type { GoldRateResponse } from "@/lib/gold-rate";
import { gsap, useGSAP } from "@/lib/gsap";

/**
 * "What you actually pay for" — the transparent-pricing promise, proved.
 *
 * A worked bill that builds line by line, priced off the LIVE 22K rate. The
 * decisive line is the stone weight charged at zero: the deduction a bundled
 * bill hides. Weights and the making charge are illustrative and labelled as
 * such — this is a demonstration of method, never a quotation.
 */

/** Illustrative fallback so the section is complete before the rate lands. */
const FALLBACK_RATE = 7740;

export function Ledger() {
  const [rate, setRate] = useState<number | null>(null);
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let active = true;
    fetch("/api/gold-rate")
      .then((r) => (r.ok ? r.json() : Promise.reject(new Error("rate"))))
      .then((d: GoldRateResponse) => {
        const r22 = d.rates.find((x) => x.karat === "22K");
        if (active && r22) setRate(r22.pricePerGram);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const perGram = rate ?? FALLBACK_RATE;
  const metal = Math.round(ledger.netWeight * perGram);
  const making = Math.round(metal * (ledger.makingPct / 100));
  const gst = Math.round((metal + making) * (ledger.gstPct / 100));
  const total = metal + making + gst;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from("[data-row]", {
          opacity: 0,
          y: 14,
          duration: 0.9,
          ease: "lux",
          stagger: 0.1,
          scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
        });
        gsap.fromTo(
          "[data-rule]",
          { scaleX: 0 },
          {
            scaleX: 1,
            transformOrigin: "left",
            duration: 1.1,
            ease: "lux",
            stagger: 0.1,
            scrollTrigger: { trigger: root.current, start: "top 72%", once: true },
          },
        );
      });
    },
    { scope: root },
  );

  return (
    <Section spacing="lg" tone="light" className="u-on-light">
      <Container>
        <div ref={root}>
          <Reveal as="p" className="u-eyebrow mb-4">
            03 — What you actually pay for
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="max-w-3xl font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] tracking-[var(--tracking-4)] text-text-strong">
              A bill with nothing
              <br />
              <em className="italic">folded into it</em>
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <p className="max-w-sm font-body text-[1rem] font-light leading-relaxed text-text-muted">
                Most bills give you one number. Ours gives you four, and every one
                of them is arithmetic you can repeat at home with the day&rsquo;s
                rate and a kitchen scale.
              </p>
              <p className="mt-6 max-w-sm border-l border-line-strong pl-5 font-body text-[0.88rem] font-light leading-relaxed text-text-muted">
                {ledger.note}
              </p>
            </div>

            {/* ── The bill ── */}
            <div className="lg:col-span-7">
              <dl className="font-body">
                <Row
                  label="Net gold weight"
                  sub="The gold only — stones and thread weighed out"
                  value={`${ledger.netWeight.toFixed(3)} g`}
                />
                <Row
                  label="Today's 22K rate"
                  sub={rate ? "Live, per gram" : "Indicative, per gram"}
                  value={`₹${formatNumberIN(perGram)}`}
                  accent
                />
                <Row label="Metal value" sub="Weight × rate" value={`₹${formatNumberIN(metal)}`} />

                {/* the decisive line */}
                <div data-row className="border-t border-line py-5">
                  <div className="flex items-baseline justify-between gap-6">
                    <dt className="flex-1">
                      <span className="block text-[0.95rem] font-light text-text-strong">
                        Stone weight
                      </span>
                      <span className="mt-1 block text-[0.78rem] font-light leading-relaxed text-text-muted">
                        Weighed separately. Never billed at the gold rate.
                      </span>
                    </dt>
                    <dd className="shrink-0 text-[1.05rem] font-light tabular-nums text-gold-light">
                      ₹0
                    </dd>
                  </div>
                </div>

                <Row
                  label="Making charge"
                  sub={`${ledger.makingPct}% — shown before you say yes (illustrative)`}
                  value={`₹${formatNumberIN(making)}`}
                />
                <Row
                  label={`GST (${ledger.gstPct}%)`}
                  sub="Statutory, on metal and making"
                  value={`₹${formatNumberIN(gst)}`}
                />

                <div data-rule className="h-px w-full bg-line-strong" />
                <div
                  data-row
                  className="flex items-baseline justify-between gap-6 pt-6"
                >
                  <dt className="font-display text-[length:var(--step-2)] font-light text-text-strong">
                    Total
                  </dt>
                  <dd className="font-display text-[length:var(--step-3)] font-light tabular-nums text-gold-light">
                    ₹{formatNumberIN(total)}
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
          className={
            "shrink-0 text-[1.05rem] font-light tabular-nums " +
            (accent ? "text-gold-light" : "text-text")
          }
        >
          {value}
        </dd>
      </div>
    </div>
  );
}
