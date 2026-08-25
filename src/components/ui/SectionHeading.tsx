import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";
import { SplitLines } from "@/components/motion/SplitLines";

type Align = "left" | "center";

type SectionHeadingProps = {
  eyebrow?: string;
  /**
   * Supports "\n" for intentional line breaks, and *asterisks* to set a phrase
   * in Cormorant italic - the editorial roman/italic contrast.
   *   "Campaigns, not *catalogues*"
   */
  title: string;
  intro?: ReactNode;
  align?: Align;
  className?: string;
  as?: "h1" | "h2" | "h3";
  /** Display step - sm/md are workhorses, xl is reserved for tentpole moments. */
  size?: "sm" | "md" | "lg" | "xl";
};

const sizes = {
  sm: "text-[length:var(--step-3)] tracking-[var(--tracking-3)] leading-[var(--leading-3)]",
  md: "text-[length:var(--step-4)] tracking-[var(--tracking-4)] leading-[var(--leading-4)]",
  lg: "text-[length:var(--step-5)] tracking-[var(--tracking-5)] leading-[var(--leading-5)]",
  xl: "text-[length:var(--step-6)] tracking-[var(--tracking-6)] leading-[var(--leading-6)]",
} as const;

/** Renders *phrase* as Cormorant italic within a display line. */
export function emphasise(line: string): ReactNode {
  const parts = line.split(/\*([^*]+)\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <em key={i} className="font-display italic">
        {part}
      </em>
    ) : (
      part
    ),
  );
}

/** Eyebrow + Cormorant display heading + optional intro - the section header. */
export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = "left",
  className,
  as: Tag = "h2",
  size = "lg",
}: SectionHeadingProps) {
  const lines = title.split("\n");
  return (
    <div
      className={cn(
        "flex flex-col",
        align === "center" ? "items-center text-center" : "items-start text-left",
        className,
      )}
    >
      {eyebrow ? (
        <Reveal as="p" className="u-eyebrow mb-5">
          {eyebrow}
        </Reveal>
      ) : null}
      <SplitLines delay={0.05}>
        <Tag className={cn("font-display font-light", sizes[size])}>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {emphasise(line)}
            </span>
          ))}
        </Tag>
      </SplitLines>
      {intro ? (
        <Reveal
          delay={0.1}
          as="p"
          className={cn(
            "mt-6 max-w-xl font-body text-[length:var(--step-0)] font-light leading-relaxed text-text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
