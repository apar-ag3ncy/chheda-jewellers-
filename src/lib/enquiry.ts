import { siteConfig, contactIsReal } from "@/config/site";

/**
 * THE ENQUIRY SEAM.
 *
 * Everything the appointment form knows how to do lives here, so the UI never
 * talks to a channel directly. Today a booking is delivered by opening a
 * pre-composed WhatsApp message (or an email) that the customer sends
 * themselves - which is how an Indian jeweller's bookings actually arrive, and
 * needs no server, no third-party scheduler and no customer data at rest.
 *
 * When there is a CRM or an inbox to post to, `buildEnquiry` stays exactly as
 * it is and only `deliver()` changes: one function, one file. That is the
 * whole reason this module exists rather than the string being assembled
 * inside the component.
 *
 * ⚠️ Nothing here transmits anything on its own. The caller receives a URL and
 * the customer chooses to open it - the details are never sent in the
 * background, and nothing is stored.
 */

export type AppointmentTier = "counter" | "private" | "after-hours";
export type Intent = "bridal" | "gift" | "bespoke" | "plans" | "browse";

export interface EnquiryDraft {
  intent: Intent;
  tier: AppointmentTier;
  branchId: string;
  /** ISO date string, yyyy-mm-dd. */
  date: string;
  slot: string;
  guests: string;
  name: string;
  phone: string;
  email?: string;
  notes?: string;
  /** Human-readable booking reference, generated client-side. */
  reference: string;
}

export const INTENTS: { id: Intent; label: string; note: string }[] = [
  { id: "bridal", label: "Bridal", note: "A wedding, and everything around it" },
  { id: "gift", label: "A gift", note: "A milestone, or someone else's" },
  { id: "bespoke", label: "Bespoke", note: "Made new, or your own gold remade" },
  { id: "plans", label: "Savings plan", note: "The monthly plan or bridal advance" },
  { id: "browse", label: "Just looking", note: "No occasion. Also completely fine" },
];

export const TIERS: {
  id: AppointmentTier;
  label: string;
  duration: string;
  note: string;
  perks: string[];
}[] = [
  {
    id: "counter",
    label: "Counter visit",
    duration: "30 min",
    note: "Walk in whenever - this just tells us you're coming.",
    perks: ["A named advisor waiting", "Pieces pulled before you arrive"],
  },
  {
    id: "private",
    label: "Private viewing",
    duration: "60 min",
    note: "The viewing room to yourselves, with the collection brought to you.",
    perks: [
      "The private room, door closed",
      "A curated tray to your brief",
      "Chai, and no one else in the room",
    ],
  },
  {
    id: "after-hours",
    label: "After hours",
    duration: "90 min",
    note: "The boutique opened for you alone, outside trading hours.",
    perks: [
      "The whole boutique, after closing",
      "Your advisor and our designer, both",
      "Bring whoever needs to be there",
    ],
  },
];

export const SLOTS = [
  "11:30 AM",
  "12:30 PM",
  "2:00 PM",
  "3:30 PM",
  "5:00 PM",
  "6:30 PM",
  "7:30 PM",
] as const;

export const GUEST_OPTIONS = ["Just me", "Two of us", "3-4", "5 or more"] as const;

/**
 * A short, speakable booking reference. Generated on the client only (never
 * during render) so server and client markup can never disagree.
 */
export function makeReference(): string {
  const alphabet = "ACDEFHJKLMNPRTUVWXY349";
  let out = "";
  for (let i = 0; i < 4; i += 1) {
    out += alphabet[Math.floor(Math.random() * alphabet.length)];
  }
  return `CJ-${out}`;
}

/** The earliest bookable day - tomorrow, in the browser's own timezone. */
export function earliestDate(from: Date): string {
  const d = new Date(from);
  d.setDate(d.getDate() + 1);
  return toISODate(d);
}

export function latestDate(from: Date): string {
  const d = new Date(from);
  d.setDate(d.getDate() + 120);
  return toISODate(d);
}

function toISODate(d: Date): string {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${m}-${day}`;
}

/** Pretty-print an ISO date without pulling in a date library. */
export function formatDate(iso: string): string {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  const date = new Date(y, m - 1, d);
  return date.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "long",
  });
}

export function branchName(branchId: string): string {
  return (
    siteConfig.branches.find((b) => b.id === branchId)?.area ??
    siteConfig.branches[0]!.area
  );
}

export function tierLabel(tier: AppointmentTier): string {
  return TIERS.find((t) => t.id === tier)?.label ?? tier;
}

export function intentLabel(intent: Intent): string {
  return INTENTS.find((i) => i.id === intent)?.label ?? intent;
}

/**
 * The message itself - plain text, structured so whoever reads it at the
 * boutique can act on it without asking a follow-up question.
 */
export function buildEnquiry(d: EnquiryDraft): string {
  const lines = [
    `${siteConfig.name} - appointment request`,
    `Ref ${d.reference}`,
    "",
    `Name: ${d.name}`,
    `Phone: ${d.phone}`,
    d.email ? `Email: ${d.email}` : null,
    "",
    `Type: ${tierLabel(d.tier)}`,
    `Boutique: ${branchName(d.branchId)}`,
    `Date: ${formatDate(d.date)} at ${d.slot}`,
    `Party: ${d.guests}`,
    `Looking for: ${intentLabel(d.intent)}`,
    d.notes ? "" : null,
    d.notes ? `Notes: ${d.notes}` : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

/** Where the composed message should be opened. */
export type Channel = "whatsapp" | "email";

export function enquiryUrl(d: EnquiryDraft, channel: Channel): string {
  const body = buildEnquiry(d);
  if (channel === "email") {
    const subject = `Appointment request ${d.reference} - ${tierLabel(d.tier)}`;
    return `mailto:${siteConfig.contact.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }
  // Until a real WhatsApp number is published, sending to wa.me would post the
  // whole appointment into a number that does not exist and tell the customer
  // it went through. Fall back to the mail channel, which reaches a real inbox.
  if (!contactIsReal()) return enquiryUrl(d, "email");
  // wa.me expects the number without punctuation.
  const number = siteConfig.contact.whatsappHref.replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(body)}`;
}

/** Fields that must be present before a draft can be sent. */
export function validate(d: Partial<EnquiryDraft>): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!d.name?.trim()) errors.name = "We need a name to put on the appointment.";
  const digits = (d.phone ?? "").replace(/\D/g, "");
  if (digits.length < 10) errors.phone = "A 10-digit mobile number, so we can confirm.";
  if (d.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email))
    errors.email = "That email address doesn't look right.";
  if (!d.date) errors.date = "Pick a day.";
  if (!d.slot) errors.slot = "Pick a time.";
  return errors;
}
