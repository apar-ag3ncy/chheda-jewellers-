import { siteConfig } from "@/config/site";
import { Monogram } from "@/components/ui/Monogram";
import {
  branchName,
  formatDate,
  intentLabel,
  tierLabel,
  type AppointmentTier,
  type Intent,
} from "@/lib/enquiry";
import { cn } from "@/lib/cn";

type Props = {
  reference: string;
  tier: AppointmentTier;
  intent: Intent;
  branchId: string;
  date: string;
  slot: string;
  guests: string;
  name: string;
  className?: string;
};

/**
 * THE CARD — the thing the booking is actually for.
 *
 * A private appointment is a small piece of theatre, so the form's output is
 * an object rather than a receipt: a gold-ruled card that assembles itself
 * line by line as the customer answers, with the house mark, a reference and a
 * perforated stub. It is the "prestige" half of the brief, and it is also the
 * honest half — everything printed on it is exactly what gets sent.
 *
 * Deliberately NOT a boarding pass pastiche: the perforation and the
 * monospaced reference are the only borrowings, and the rest is set in the
 * house's own type. A jeweller's invitation, not an airline's.
 */
export function AppointmentCard({
  reference,
  tier,
  intent,
  branchId,
  date,
  slot,
  guests,
  name,
  className,
}: Props) {
  const rows: { label: string; value: string; muted?: boolean }[] = [
    { label: "Guest", value: name.trim() || "—", muted: !name.trim() },
    { label: "Boutique", value: branchName(branchId) },
    { label: "Date", value: date ? formatDate(date) : "—", muted: !date },
    { label: "Time", value: slot || "—", muted: !slot },
    { label: "Party", value: guests },
    { label: "Looking for", value: intentLabel(intent) },
  ];

  return (
    <figure
      className={cn(
        "relative overflow-hidden rounded-[var(--radius-brand)] border border-line-strong bg-green-deep",
        className,
      )}
    >
      {/* Gold rule along the top edge — the card's "foil". */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 h-px"
        style={{ background: "var(--grad-gold)" }}
      />

      <div className="flex items-start justify-between gap-4 p-6 pb-5 md:p-8 md:pb-6">
        <div className="flex items-center gap-3">
          <Monogram className="h-9 w-9" />
          <div>
            <p className="font-body text-[0.62rem] uppercase tracking-[0.24em] text-gold-light">
              {tierLabel(tier)}
            </p>
            <p className="mt-0.5 font-display text-lg font-light leading-none text-text-strong">
              {siteConfig.name}
            </p>
          </div>
        </div>
        <p className="shrink-0 text-right">
          <span className="block font-body text-[0.56rem] uppercase tracking-[0.2em] text-text-muted">
            Reference
          </span>
          <span className="mt-1 block font-body text-[0.82rem] tracking-[0.14em] text-text-strong tabular-nums">
            {reference}
          </span>
        </p>
      </div>

      {/* Perforation */}
      <div aria-hidden className="relative h-px w-full bg-line">
        <span className="absolute -left-2 -top-2 h-4 w-4 rounded-full bg-bg" />
        <span className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-bg" />
      </div>

      <dl className="grid grid-cols-2 gap-x-6 gap-y-5 p-6 md:p-8">
        {rows.map((r) => (
          <div key={r.label}>
            <dt className="font-body text-[0.56rem] uppercase tracking-[0.2em] text-text-muted">
              {r.label}
            </dt>
            <dd
              className={cn(
                "mt-1.5 font-display text-[1.1rem] font-light leading-tight transition-colors duration-500",
                r.muted ? "text-text-muted/50" : "text-text-strong",
              )}
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>

      <p className="border-t border-line px-6 py-4 font-body text-[0.66rem] font-light leading-relaxed text-text-muted md:px-8">
        Held for you for 24 hours. We confirm every appointment by hand — you
        will hear from a person, not an autoresponder.
      </p>
    </figure>
  );
}
