"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { siteConfig } from "@/config/site";
import { edits } from "@/lib/content/edits";
import {
  GUEST_OPTIONS,
  INTENTS,
  SLOTS,
  TIERS,
  buildEnquiry,
  earliestDate,
  enquiryUrl,
  latestDate,
  makeReference,
  validate,
  type AppointmentTier,
  type EnquiryDraft,
  type Intent,
} from "@/lib/enquiry";
import { Button } from "@/components/ui/Button";
import { AppointmentCard } from "./AppointmentCard";
import { cn } from "@/lib/cn";

const STEPS = ["Occasion", "Access", "When", "You"] as const;

/**
 * THE BOOKING FLOW.
 *
 * Four steps, each answering exactly one question, with the appointment card
 * assembling alongside so the customer can always see what they are about to
 * send. Nothing is submitted in the background: at the end they get the
 * composed message and choose to open WhatsApp, mail it, or copy it — see
 * `lib/enquiry` for why that seam exists and what replaces it later.
 *
 * On accessibility, this behaves like a form, not a toy: every choice is a
 * real radio inside a fieldset with a legend, so a screen reader announces the
 * group and the selection, and arrow keys move between options for free. The
 * chip look is CSS on `:checked` — no `div` pretending to be an input, no
 * keyboard handlers to get wrong. Step changes are announced politely, and
 * focus moves to each new step's heading.
 */
export function BookingFlow() {
  const params = useSearchParams();
  const [step, setStep] = useState(0);
  const [reference, setReference] = useState("CJ-••••");
  const [dateBounds, setDateBounds] = useState({ min: "", max: "" });
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const headingRef = useRef<HTMLHeadingElement>(null);
  const startedRef = useRef(false);

  const editSlug = params.get("edit") ?? undefined;
  const intentParam = params.get("intent");

  const [draft, setDraft] = useState({
    intent: "browse" as Intent,
    tier: "private" as AppointmentTier,
    // `siteConfig` is `as const`, so this would otherwise narrow to the
    // first branch's literal id and reject the second one.
    branchId: siteConfig.branches[0]!.id as string,
    date: "",
    slot: "",
    guests: GUEST_OPTIONS[1] as string,
    name: "",
    phone: "",
    email: "",
    notes: "",
  });

  const set = <K extends keyof typeof draft>(key: K, value: (typeof draft)[K]) =>
    setDraft((d) => ({ ...d, [key]: value }));

  // Reference and date bounds depend on the current time, so they are
  // generated after mount — never during render, which would desync SSR.
  useEffect(() => {
    setReference(makeReference());
    const now = new Date();
    setDateBounds({ min: earliestDate(now), max: latestDate(now) });
    setDraft((d) => (d.date ? d : { ...d, date: earliestDate(now) }));
  }, []);

  // Deep links: an edit page sends `?edit=bridal`, the atelier sends
  // `?intent=bespoke`. Both pre-answer step one so the customer starts at the
  // question they have not been asked yet.
  useEffect(() => {
    if (startedRef.current) return;
    startedRef.current = true;
    const known = INTENTS.map((i) => i.id) as string[];
    if (intentParam && known.includes(intentParam)) {
      setDraft((d) => ({ ...d, intent: intentParam as Intent }));
      setStep(1);
    } else if (editSlug && edits.some((e) => e.slug === editSlug)) {
      setDraft((d) => ({
        ...d,
        intent: editSlug === "bridal" ? "bridal" : "browse",
      }));
      setStep(1);
    }
  }, [intentParam, editSlug]);

  // Move focus to the new step's heading so keyboard and screen-reader users
  // land where the content changed rather than at the top of the document.
  useEffect(() => {
    if (startedRef.current) headingRef.current?.focus();
  }, [step]);

  const full: EnquiryDraft = useMemo(
    () => ({ ...draft, editSlug, reference }),
    [draft, editSlug, reference],
  );

  const message = useMemo(() => buildEnquiry(full), [full]);
  const done = step === STEPS.length;

  const advance = () => {
    if (step === 2) {
      const e = validate({ date: draft.date, slot: draft.slot, name: "x", phone: "0123456789" });
      const scoped = Object.fromEntries(
        Object.entries(e).filter(([k]) => k === "date" || k === "slot"),
      );
      setErrors(scoped);
      if (Object.keys(scoped).length) return;
    }
    setErrors({});
    setStep((s) => Math.min(s + 1, STEPS.length));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = validate(full);
    setErrors(found);
    if (Object.keys(found).length) return;
    setStep(STEPS.length);
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2600);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
      {/* ── The form ──────────────────────────────────────────────────── */}
      <div className="lg:col-span-7">
        {/* Progress rail */}
        <ol className="mb-10 flex items-center gap-2" aria-label="Booking progress">
          {STEPS.map((label, i) => {
            const state = done || i < step ? "done" : i === step ? "current" : "todo";
            return (
              <li key={label} className="flex flex-1 flex-col gap-2">
                <span
                  aria-hidden
                  className={cn(
                    "block h-px w-full origin-left transition-all duration-[900ms] ease-[var(--ease-cinema)]",
                    state === "todo" ? "bg-line" : "bg-gold-light",
                  )}
                />
                <span
                  className={cn(
                    "font-body text-[0.6rem] uppercase tracking-[0.16em] transition-colors duration-500",
                    state === "current"
                      ? "text-gold-light"
                      : state === "done"
                        ? "text-text"
                        : "text-text-muted",
                  )}
                >
                  {i + 1}. {label}
                  {state === "current" ? (
                    <span className="sr-only"> (current step)</span>
                  ) : null}
                </span>
              </li>
            );
          })}
        </ol>

        <p aria-live="polite" className="sr-only">
          {done
            ? "Appointment ready to send."
            : `Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
        </p>

        <form onSubmit={submit} noValidate>
          {/* ── 1 · Occasion ──────────────────────────────────────────── */}
          {step === 0 ? (
            <StepShell
              headingRef={headingRef}
              kicker="First, the easy one"
              title="What brings you in?"
              note="It only decides what we have ready on the tray when you arrive."
            >
              <ChipGroup
                legend="What brings you in?"
                name="intent"
                value={draft.intent}
                onChange={(v) => set("intent", v as Intent)}
                options={INTENTS.map((i) => ({
                  value: i.id,
                  label: i.label,
                  note: i.note,
                }))}
              />
              <Nav onNext={advance} nextLabel="Choose your access" />
            </StepShell>
          ) : null}

          {/* ── 2 · Access ────────────────────────────────────────────── */}
          {step === 1 ? (
            <StepShell
              headingRef={headingRef}
              kicker="How private"
              title="Choose your access"
              note="All three are free. The difference is how much of the boutique is yours."
            >
              <fieldset className="border-0 p-0">
                <legend className="sr-only">Appointment type</legend>
                <div className="flex flex-col gap-3">
                  {TIERS.map((t) => (
                    <label
                      key={t.id}
                      className={cn(
                        "group relative flex cursor-pointer flex-col rounded-[var(--radius-brand)] border p-5 transition-all duration-500 ease-[var(--ease-lux)] md:p-6",
                        draft.tier === t.id
                          ? "border-line-strong bg-green-soft/35"
                          : "border-line bg-green-soft/10 hover:border-line-strong",
                      )}
                    >
                      <input
                        type="radio"
                        name="tier"
                        value={t.id}
                        checked={draft.tier === t.id}
                        onChange={() => set("tier", t.id)}
                        className="peer sr-only"
                      />
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="font-display text-[length:var(--step-2)] font-light text-text-strong">
                          {t.label}
                        </span>
                        <span className="shrink-0 font-body text-[0.66rem] uppercase tracking-[0.16em] text-gold-light">
                          {t.duration}
                        </span>
                      </span>
                      <span className="mt-2 block font-body text-[0.88rem] font-light leading-relaxed text-text-muted">
                        {t.note}
                      </span>
                      <span
                        className={cn(
                          "mt-0 grid grid-rows-[0fr] overflow-hidden transition-all duration-[700ms] ease-[var(--ease-lux)]",
                          draft.tier === t.id && "mt-4 grid-rows-[1fr]",
                        )}
                      >
                        <span className="min-h-0">
                          <span className="flex flex-col gap-1.5 border-t border-line pt-4">
                            {t.perks.map((p) => (
                              <span
                                key={p}
                                className="flex items-start gap-2.5 font-body text-[0.82rem] font-light text-text"
                              >
                                <span
                                  aria-hidden
                                  className="mt-[0.55em] h-1 w-1 shrink-0 rounded-full bg-gold"
                                />
                                {p}
                              </span>
                            ))}
                          </span>
                        </span>
                      </span>
                      {/* Focus ring lives on the label, driven by the input. */}
                      <span
                        aria-hidden
                        className="pointer-events-none absolute inset-0 rounded-[var(--radius-brand)] ring-gold-light peer-focus-visible:ring-2 peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-bg"
                      />
                    </label>
                  ))}
                </div>
              </fieldset>
              <Nav onBack={() => setStep(0)} onNext={advance} nextLabel="Pick a time" />
            </StepShell>
          ) : null}

          {/* ── 3 · When ──────────────────────────────────────────────── */}
          {step === 2 ? (
            <StepShell
              headingRef={headingRef}
              kicker="The diary"
              title="When suits you?"
              note="Same-day is usually possible too — call us and we will make it work."
            >
              <ChipGroup
                legend="Which boutique"
                name="branch"
                value={draft.branchId}
                onChange={(v) => set("branchId", v)}
                options={siteConfig.branches.map((b) => ({
                  value: b.id,
                  label: b.area,
                  note: b.hours,
                }))}
              />

              <div className="mt-8">
                <label
                  htmlFor="date"
                  className="u-eyebrow mb-3 block text-[0.62rem]"
                >
                  Date
                </label>
                <input
                  id="date"
                  type="date"
                  name="date"
                  value={draft.date}
                  min={dateBounds.min || undefined}
                  max={dateBounds.max || undefined}
                  onChange={(e) => set("date", e.target.value)}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className="w-full max-w-xs rounded-[var(--radius-brand)] border border-line bg-green-soft/20 px-4 py-3 font-body text-[0.95rem] font-light text-text-strong transition-colors focus:border-gold focus:outline-none [color-scheme:dark]"
                />
                {errors.date ? <FieldError id="date-error">{errors.date}</FieldError> : null}
              </div>

              <div className="mt-8">
                <ChipGroup
                  legend="Time"
                  name="slot"
                  value={draft.slot}
                  onChange={(v) => set("slot", v)}
                  options={SLOTS.map((s) => ({ value: s, label: s }))}
                  compact
                />
                {errors.slot ? <FieldError id="slot-error">{errors.slot}</FieldError> : null}
              </div>

              <div className="mt-8">
                <ChipGroup
                  legend="How many of you"
                  name="guests"
                  value={draft.guests}
                  onChange={(v) => set("guests", v)}
                  options={GUEST_OPTIONS.map((g) => ({ value: g, label: g }))}
                  compact
                />
              </div>

              <Nav onBack={() => setStep(1)} onNext={advance} nextLabel="Almost there" />
            </StepShell>
          ) : null}

          {/* ── 4 · You ───────────────────────────────────────────────── */}
          {step === 3 ? (
            <StepShell
              headingRef={headingRef}
              kicker="Last one"
              title="Who should we expect?"
              note="Used to confirm the appointment and nothing else. No lists, ever."
            >
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Field
                  id="name"
                  label="Name"
                  value={draft.name}
                  onChange={(v) => set("name", v)}
                  autoComplete="name"
                  error={errors.name}
                  required
                />
                <Field
                  id="phone"
                  label="Mobile"
                  type="tel"
                  inputMode="tel"
                  value={draft.phone}
                  onChange={(v) => set("phone", v)}
                  autoComplete="tel"
                  error={errors.phone}
                  required
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  value={draft.email}
                  onChange={(v) => set("email", v)}
                  autoComplete="email"
                  error={errors.email}
                  optional
                  className="sm:col-span-2"
                />
                <div className="sm:col-span-2">
                  <label htmlFor="notes" className="u-eyebrow mb-3 block text-[0.62rem]">
                    Anything we should know{" "}
                    <span className="normal-case tracking-normal text-text-muted">
                      (optional)
                    </span>
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    value={draft.notes}
                    onChange={(e) => set("notes", e.target.value)}
                    placeholder="A budget, a deadline, a photograph you want to show us…"
                    className="w-full resize-y rounded-[var(--radius-brand)] border border-line bg-green-soft/20 px-4 py-3 font-body text-[0.95rem] font-light text-text-strong placeholder:text-text-muted/60 focus:border-gold focus:outline-none"
                  />
                </div>
              </div>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-text-strong"
                >
                  ← Back
                </button>
                <Button type="submit" variant="primary" size="lg" withArrow>
                  Review appointment
                </Button>
              </div>
            </StepShell>
          ) : null}
        </form>

        {/* ── Confirmation ────────────────────────────────────────────── */}
        {done ? (
          <div>
            <h2
              ref={headingRef}
              tabIndex={-1}
              className="font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] outline-none"
            >
              Ready when you are.
            </h2>
            <p className="mt-5 max-w-lg font-body text-[0.98rem] font-light leading-relaxed text-text-muted">
              Nothing has been sent yet. Below is exactly what we will receive —
              send it however you prefer, and a person will confirm within the
              day.
            </p>

            <pre className="mt-8 max-h-64 overflow-auto whitespace-pre-wrap rounded-[var(--radius-brand)] border border-line bg-green-soft/20 p-5 font-body text-[0.82rem] font-light leading-relaxed text-text">
              {message}
            </pre>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button
                href={enquiryUrl(full, "whatsapp")}
                variant="primary"
                size="lg"
                withArrow
              >
                Send on WhatsApp
              </Button>
              <Button href={enquiryUrl(full, "email")} variant="outline" size="lg">
                Send by email
              </Button>
              <button
                type="button"
                onClick={copy}
                className="font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-gold-light"
              >
                {copied ? "Copied ✓" : "Copy the details"}
              </button>
            </div>

            <button
              type="button"
              onClick={() => setStep(0)}
              className="mt-8 font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted underline underline-offset-4 transition-colors hover:text-text-strong"
            >
              Change something
            </button>

            <p className="mt-8 font-body text-[0.72rem] leading-relaxed text-text-muted/75">
              Contact details are used to confirm this appointment and are not
              added to any mailing list. Nothing is stored on this website.
            </p>
          </div>
        ) : null}
      </div>

      {/* ── The card ──────────────────────────────────────────────────── */}
      <aside className="lg:col-span-5">
        <div className="lg:sticky lg:top-28">
          <p className="u-eyebrow mb-4">Your appointment</p>
          <AppointmentCard
            reference={reference}
            tier={draft.tier}
            intent={draft.intent}
            branchId={draft.branchId}
            date={draft.date}
            slot={draft.slot}
            guests={draft.guests}
            name={draft.name}
          />
          <p className="mt-5 font-body text-[0.76rem] font-light leading-relaxed text-text-muted">
            Prefer to speak to someone?{" "}
            <a
              href={siteConfig.contact.phoneHref}
              className="text-gold-light underline underline-offset-4"
            >
              {siteConfig.contact.phone}
            </a>
            {" · "}
            <a
              href={siteConfig.contact.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-light underline underline-offset-4"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </aside>
    </div>
  );
}

/* ============================================================
   Small pieces
   ============================================================ */

function StepShell({
  headingRef,
  kicker,
  title,
  note,
  children,
}: {
  headingRef: React.RefObject<HTMLHeadingElement | null>;
  kicker: string;
  title: string;
  note: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ animation: "fadeRise 0.7s var(--ease-lux) both" }}>
      <p className="u-eyebrow mb-3">{kicker}</p>
      <h2
        ref={headingRef}
        tabIndex={-1}
        className="font-display text-[length:var(--step-4)] font-light leading-[var(--leading-4)] outline-none"
      >
        {title}
      </h2>
      <p className="mt-4 max-w-md font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
        {note}
      </p>
      <div className="mt-8">{children}</div>
    </div>
  );
}

function Nav({
  onBack,
  onNext,
  nextLabel,
}: {
  onBack?: () => void;
  onNext: () => void;
  nextLabel: string;
}) {
  return (
    <div className="mt-9 flex flex-wrap items-center gap-4">
      {onBack ? (
        <button
          type="button"
          onClick={onBack}
          className="font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted transition-colors hover:text-text-strong"
        >
          ← Back
        </button>
      ) : null}
      <Button onClick={onNext} variant="primary" size="lg" withArrow type="button">
        {nextLabel}
      </Button>
    </div>
  );
}

/**
 * Chips that are really radios. The `peer` + `:checked` styling means the
 * selection state, keyboard behaviour and screen-reader announcement all come
 * from the native input — nothing here re-implements a control.
 */
function ChipGroup({
  legend,
  name,
  value,
  onChange,
  options,
  compact = false,
}: {
  legend: string;
  name: string;
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string; note?: string }[];
  compact?: boolean;
}) {
  return (
    <fieldset className="border-0 p-0">
      <legend className="u-eyebrow mb-4 text-[0.62rem]">{legend}</legend>
      <div className="flex flex-wrap gap-2.5">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type="radio"
              name={name}
              value={o.value}
              checked={value === o.value}
              onChange={() => onChange(o.value)}
              className="peer sr-only"
            />
            <span
              className={cn(
                "flex flex-col rounded-full border transition-all duration-[450ms] ease-[var(--ease-lux)]",
                "border-line bg-green-soft/10 text-text-muted",
                "hover:border-line-strong hover:text-text",
                "peer-checked:border-gold-light peer-checked:bg-gold-light/12 peer-checked:text-gold-light",
                "peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gold-light",
                compact
                  ? "min-h-[42px] justify-center px-4 py-2.5"
                  : "min-h-[44px] justify-center px-5 py-3",
              )}
            >
              <span className="font-body text-[0.76rem] uppercase tracking-[0.12em]">
                {o.label}
              </span>
              {o.note && !compact ? (
                <span className="mt-0.5 font-body text-[0.68rem] normal-case tracking-normal opacity-70">
                  {o.note}
                </span>
              ) : null}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  inputMode,
  autoComplete,
  error,
  required,
  optional,
  className,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  inputMode?: "tel" | "email" | "text";
  autoComplete?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="u-eyebrow mb-3 block text-[0.62rem]">
        {label}{" "}
        {optional ? (
          <span className="normal-case tracking-normal text-text-muted">
            (optional)
          </span>
        ) : null}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        inputMode={inputMode}
        autoComplete={autoComplete}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(
          "w-full rounded-[var(--radius-brand)] border bg-green-soft/20 px-4 py-3 font-body text-[0.95rem] font-light text-text-strong transition-colors focus:outline-none",
          error ? "border-maroon-soft focus:border-maroon-soft" : "border-line focus:border-gold",
        )}
      />
      {error ? <FieldError id={`${id}-error`}>{error}</FieldError> : null}
    </div>
  );
}

function FieldError({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <p
      id={id}
      role="alert"
      className="mt-2 font-body text-[0.76rem] font-light leading-relaxed text-gold-light"
    >
      {children}
    </p>
  );
}
