import { testimonials, reviewsSummary } from "@/lib/content/testimonials";
import { Section, Container } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/motion/Reveal";

function Stars({ rating, className }: { rating: number; className?: string }) {
  return (
    <span className={className} aria-label={`${rating} out of 5 stars`}>
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
    <Section id="testimonials" spacing="lg" tone="transparent" data-bg="maroon">
      <Container>
        <SectionHeading
          eyebrow="Kind words"
          title={"Trusted, one\nfamily at a time"}
          align="center"
          size="lg"
          className="mx-auto items-center text-center"
        />

        <Reveal className="mx-auto mt-8 flex w-fit max-w-full flex-wrap items-center justify-center gap-x-4 gap-y-2 rounded-full border border-line-strong bg-green-soft/40 px-5 py-3 sm:px-6">
          <span className="font-body text-lg font-semibold tabular-nums text-text-strong">
            {reviewsSummary.rating.toFixed(1)}
          </span>
          <Stars rating={reviewsSummary.rating} />
          <span className="font-body text-[0.78rem] tracking-wide text-text-muted">
            {reviewsSummary.count}+ {reviewsSummary.platform} reviews
          </span>
        </Reveal>

        {!reviewsSummary.verified ? (
          <Reveal
            as="p"
            className="mx-auto mt-4 max-w-md text-center font-body text-[0.72rem] leading-relaxed text-text-muted"
          >
            Reviews shown are illustrative — verified Google reviews will appear here
            once connected.
          </Reveal>
        ) : null}

        <div className="mt-14 grid grid-cols-1 gap-5 md:mt-20 md:grid-cols-2 md:gap-6">
          {testimonials.map((t, i) => (
            <Reveal
              key={t.id}
              delay={(i % 2) * 0.06}
              as="figure"
              className="flex h-full flex-col justify-between rounded-[var(--radius-brand)] border border-maroon/15 bg-beige p-8 shadow-[0_20px_60px_-30px_rgba(0,0,0,0.6)] md:p-10"
            >
              <blockquote className="font-display text-[clamp(1.3rem,2.2vw,1.7rem)] font-light italic leading-snug text-green">
                <span aria-hidden className="text-maroon">“</span>
                {t.quote}
                <span aria-hidden className="text-maroon">”</span>
              </blockquote>
              <figcaption className="mt-8 flex items-center justify-between gap-4">
                <div>
                  <p className="font-body text-sm font-medium text-green">{t.author}</p>
                  <p className="mt-0.5 font-body text-[0.78rem] text-green/60">{t.location}</p>
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Stars rating={t.rating} />
                  <span className="font-body text-[0.66rem] uppercase tracking-[0.16em] text-green/55">
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
