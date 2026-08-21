import type { ReactNode } from "react";
import { Container } from "@/components/ui/Section";
import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  intro?: ReactNode;
  align?: "left" | "center";
  className?: string;
};

/** Interior-page header. Adds top padding to clear the fixed nav. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
}: PageHeaderProps) {
  return (
    <header className={cn("relative bg-bg pb-4 pt-36 md:pt-44", className)}>
      <Container>
        <div
          className={cn(
            "flex max-w-3xl flex-col",
            align === "center" && "mx-auto max-w-4xl items-center text-center",
          )}
        >
          {eyebrow ? (
            <Reveal as="p" className="u-eyebrow mb-6">
              {eyebrow}
            </Reveal>
          ) : null}
          <Reveal delay={0.05}>
            <h1 className="font-display text-[clamp(2.6rem,6.5vw,5rem)] font-light leading-[0.98]">
              {title.split("\n").map((l, i) => (
                <span key={i} className="block">
                  {l}
                </span>
              ))}
            </h1>
          </Reveal>
          {intro ? (
            <Reveal
              as="p"
              delay={0.1}
              className={cn(
                "mt-7 max-w-xl font-body text-[1.02rem] font-light leading-relaxed text-text-muted",
                align === "center" && "mx-auto",
              )}
            >
              {intro}
            </Reveal>
          ) : null}
        </div>
      </Container>
    </header>
  );
}
