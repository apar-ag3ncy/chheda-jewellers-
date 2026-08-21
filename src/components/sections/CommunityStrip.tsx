import Link from "next/link";
import Image from "next/image";
import { community } from "@/lib/content/community";
import { Section, Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { Button } from "@/components/ui/Button";

export function CommunityStrip() {
  return (
    <Section id="community" spacing="lg" tone="deep">
      <Container>
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Copy + CTAs */}
          <div className="lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal as="p" className="u-eyebrow mb-5">
              {community.eyebrow}
            </Reveal>
            <Reveal>
              <h2 className="font-display text-[clamp(2.2rem,4.8vw,3.6rem)] font-light leading-[1.02]">
                {community.headline.split("\n").map((l, i) => (
                  <span key={i} className="block">
                    {l}
                  </span>
                ))}
              </h2>
            </Reveal>

            <div className="mt-10 flex flex-col gap-8">
              <Reveal className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-light text-text-strong">
                  {community.whatsapp.title}
                </h3>
                <p className="mt-2 max-w-sm font-body text-[0.9rem] font-light leading-relaxed text-text-muted">
                  {community.whatsapp.description}
                </p>
                <div className="mt-4">
                  <Button href={community.whatsapp.cta.href} variant="outline" size="sm" withArrow>
                    {community.whatsapp.cta.label}
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={0.05} className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-light text-text-strong">
                  {community.instagram.title}
                </h3>
                <p className="mt-2 max-w-sm font-body text-[0.9rem] font-light leading-relaxed text-text-muted">
                  {community.instagram.description}
                </p>
                <div className="mt-4">
                  <Button href={community.instagram.cta.href} variant="ghost" size="sm" withArrow>
                    {community.instagram.handle}
                  </Button>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Gallery mosaic */}
          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4">
              {community.gallery.map((img, i) => (
                <Reveal
                  key={img.src}
                  delay={(i % 3) * 0.06}
                  className={i === 0 ? "col-span-2 sm:col-span-2 sm:row-span-2" : ""}
                >
                  <Link
                    href={community.instagram.cta.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative block h-full w-full overflow-hidden bg-green-soft"
                  >
                    <div className={i === 0 ? "aspect-square sm:aspect-auto sm:h-full" : "aspect-square"}>
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-[900ms] ease-[var(--ease-lux)] group-hover:scale-105"
                      />
                    </div>
                    <div
                      aria-hidden
                      className="absolute inset-0 flex items-center justify-center bg-green-deep/0 opacity-0 transition-all duration-500 group-hover:bg-green-deep/40 group-hover:opacity-100"
                    >
                      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-none stroke-offwhite" strokeWidth={1.4} aria-hidden>
                        <rect x="3" y="3" width="18" height="18" rx="5" />
                        <circle cx="12" cy="12" r="4" />
                        <circle cx="17.5" cy="6.5" r="1" className="fill-offwhite" />
                      </svg>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
