import Link from "next/link";
import Image from "next/image";
import { Suspense } from "react";
import { EMERALD_LQIP } from "@/lib/image-blur";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";
import { Monogram } from "@/components/ui/Monogram";
import { BookingFlow } from "@/components/enquire/BookingFlow";

export const metadata = pageMetadata({
  title: "Book an Appointment",
  description:
    "Book a private appointment at Chheda Jewellers - the viewing room to yourselves, a curated tray to your brief, and an advisor who knows your name before you arrive.",
  path: "/enquire",
});

/** What "priority" actually means here, said in specifics rather than adjectives. */
const priority = [
  {
    n: "01",
    title: "Your advisor is briefed",
    body: "The same person from first visit to collection. They read your notes before you walk in, so you never start the story again.",
  },
  {
    n: "02",
    title: "The tray is already pulled",
    body: "Pieces are selected against what you told us and laid out before you sit down. No waiting while a cabinet is unlocked.",
  },
  {
    n: "03",
    title: "The room is yours",
    body: "A private viewing means the door closes. Try on the full set, take the photographs, argue about it in peace.",
  },
  {
    n: "04",
    title: "You are on the list, quietly",
    body: "Appointment guests hear about a new collection before it reaches the window. No marketing, just a message from your advisor.",
  },
];

/**
 * /enquire - the appointment desk.
 *
 * The brief was "priority service and personal prestige, professional, a bit
 * gen-z but classy". The way those reconcile: the *interaction* is modern -
 * chips, a live card assembling as you answer, four short steps instead of one
 * long form - while the *language* is a jeweller's. No emoji, no exclamation
 * marks, no "let's do this". Prestige comes from specifics ("the door closes",
 * "the tray is already pulled"), which is also the only kind of prestige a
 * customer can actually check.
 */
export default function EnquirePage() {
  return (
    <>
      {/* ── Header ────────────────────────────────────────────────────── */}
      <header className="relative overflow-hidden bg-bg pb-12 pt-36 md:pb-20 md:pt-44">
        {/* Portrait sits behind the header on wide screens - atmosphere, kept
            well clear of the type. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-[38%] lg:block"
        >
          <Image
            src="/media/enquire/salon.jpg"
            alt=""
            placeholder="blur"
            blurDataURL={EMERALD_LQIP}
            fill
            sizes="38vw"
            className="object-cover"
            style={{ objectPosition: "50% 26%" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, var(--bg) 0%, color-mix(in srgb, var(--bg) 55%, transparent) 42%, transparent 100%)",
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, var(--bg) 0%, transparent 24%, transparent 76%, var(--bg) 100%)",
            }}
          />
        </div>

        <Container className="relative">
          <div className="max-w-2xl">
            <Reveal as="p" className="u-eyebrow mb-6">
              Private appointments
            </Reveal>
            <SplitLines delay={0.05}>
              <h1 className="font-display text-[clamp(2.6rem,6.8vw,5.2rem)] font-light leading-[0.98]">
                <span className="block">Come in as</span>
                <span className="block">someone expected</span>
              </h1>
            </SplitLines>
            <Reveal
              as="p"
              delay={0.1}
              className="mt-7 max-w-lg font-body text-[1.02rem] font-light leading-relaxed text-text"
            >
              A jewellery counter is a public place, and some conversations are
              not. Book ahead and the room, the advisor and the tray are yours -
              at no cost, and with no obligation to buy anything at all.
            </Reveal>
            <Reveal
              as="p"
              delay={0.14}
              className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 font-body text-[0.72rem] uppercase tracking-[0.16em] text-text-muted"
            >
              <span>Free</span>
              <span aria-hidden>·</span>
              <span>Confirmed by a person</span>
              <span aria-hidden>·</span>
              <span>Two Mumbai boutiques</span>
            </Reveal>
          </div>
        </Container>
      </header>

      {/* ── The flow ──────────────────────────────────────────────────── */}
      <Section spacing="sm" tone="green">
        <Container>
          <Suspense
            fallback={
              <p className="font-body text-[0.9rem] font-light text-text-muted">
                Loading the appointment desk…
              </p>
            }
          >
            <BookingFlow />
          </Suspense>
        </Container>
      </Section>

      {/* ── What priority means ───────────────────────────────────────── */}
      <Section spacing="lg" tone="light" className="u-on-light">
        <Container>
          <SectionHeading
            eyebrow="What you actually get"
            title={"What booking changes"}
            intro="Every jeweller claims personal service. These are the four things that are different when you book, stated plainly enough that you can hold us to them."
            size="md"
          />
          <ol className="mt-14 grid grid-cols-1 gap-px overflow-hidden border border-line bg-line md:mt-20 md:grid-cols-2">
            {priority.map((p, i) => (
              <Reveal
                as="li"
                key={p.n}
                delay={i * 0.06}
                className="bg-cream p-8 md:p-10"
              >
                <h3 className="font-display text-[length:var(--step-2)] font-light leading-snug text-text-strong">
                  {p.title}
                </h3>
                <p className="mt-3 max-w-sm font-body text-[0.92rem] font-light leading-relaxed text-text-muted">
                  {p.body}
                </p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* ── Sign-off ──────────────────────────────────────────────────── */}
      <Section spacing="lg" tone="deep">
        <Container>
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <Reveal variant="settle">
              <Monogram className="h-14 w-14" />
            </Reveal>
            <Reveal delay={0.08}>
              <p className="mt-10 font-display text-[length:var(--step-2)] font-light italic leading-snug text-text">
                No deposit, no dress code, no obligation.
                <br />
                Bring whoever needs to say yes.
              </p>
            </Reveal>
            <Reveal delay={0.12}>
              <p className="mt-9 font-body text-[0.68rem] uppercase tracking-[0.24em] text-text-muted">
                {siteConfig.branches.map((b) => b.area).join(" · ")}
              </p>
            </Reveal>
            {/* Server-rendered on purpose: the page that collects a name and
                phone number is where the privacy note must be reachable -
                the booking flow's own link only exists after interaction. */}
            <Reveal delay={0.16}>
              <p className="mt-6 font-body text-[0.7rem] font-light leading-relaxed text-text-muted/80">
                Your details go only toward this appointment - see the{" "}
                <Link
                  href="/privacy"
                  className="underline underline-offset-2 transition-colors hover:text-text"
                >
                  privacy note
                </Link>
                .
              </p>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
