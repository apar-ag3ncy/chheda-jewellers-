import { testimonials, reviewsSummary } from "@/lib/content/testimonials";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    // role="img" is what makes the aria-label count: on a bare span the
    // label is not reliably exposed and the rating can announce as nothing.
    <span className={className} role="img" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          viewBox="0 0 24 24"
          className="inline-block h-3.5 w-3.5"
          fill={i < Math.round(rating) ? "var(--gold)" : "none"}
          stroke="var(--gold)"
          strokeWidth={1.2}
          aria-hidden
        >
          <path d="M12 2l2.9 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 7.1-1.01L12 2z" />
        </svg>
      ))}
    </span>
  );
}

export function Testimonials() {
  return (
    <Section id="testimonials" spacing="lg" tone="transparent" data-bg="beige" className="u-on-light">
      <Container>
        <p className="u-eyebrow text-center">What customers say</p>

        {/* The aggregate is shown ONLY when it is real.
            It used to print "4.9" and "480+ Google reviews" in large type with
            a small note underneath admitting the reviews were illustrative -
            but a rating and a review count ARE the claim, and a footnote does
            not unmake a number a visitor has already read. On a site whose
            own promise page is built on "every claim here is checkable", an
            invented 4.9 is the one thing that undoes it. While `verified` is
            false the figures stay off entirely and the quotes are labelled
            for what they are; set it true with real Places data and the badge
            returns unchanged. */}
        {reviewsSummary.verified ? (
          <Reveal className="mx-auto mt-6 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-line-strong bg-white/55 px-5 py-3 sm:px-6">
            <span className="font-body text-lg font-semibold tabular-nums text-text-strong">
              {reviewsSummary.rating.toFixed(1)}
            </span>
            <Stars rating={reviewsSummary.rating} />
            <span className="font-body text-[0.78rem] tracking-wide text-text-muted">
              {reviewsSummary.count}+ {reviewsSummary.platform} reviews
            </span>
          </Reveal>
        ) : (
          <Reveal
            as="p"
            className="mx-auto mt-5 max-w-lg text-center font-body text-[0.8rem] leading-relaxed text-text-muted"
          >
            In their own words - a selection of what families tell us at the
            counter. Our verified Google reviews will appear here once connected.
          </Reveal>
        )}

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.id}
              delay={(i % 2) * 0.06}
              as="figure"
              className="flex h-full flex-col justify-between rounded-[var(--radius-brand)] border border-line bg-white/45 p-8 md:p-10"
            >
              <blockquote className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] font-light italic leading-snug text-text-strong">
                <span aria-hidden className="text-gold">“</span>
                {t.quote}
                <span aria-hidden className="text-gold">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm font-medium text-text-strong">{t.author}</p>
                  <p className="mt-0.5 font-body text-[0.78rem] text-text-muted">{t.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Stars rating={t.rating} />
                  <span className="font-body text-[0.66rem] uppercase tracking-[0.16em] text-text-muted">
                    via {t.source}
                  </span>
                </div>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </Container>
    </Section>
  );
}
