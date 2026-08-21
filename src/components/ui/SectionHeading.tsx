import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Reveal } from "@/components/motion/Reveal";

type Align = "left" | "center";

type SectionHeadingProps = {
  eyebrow?: string;
  /** Supports "\n" for intentional line breaks in the display heading. */
  title: string;
  intro?: ReactNode;
  align?: Align;
  className?: string;
  as?: "h1" | "h2" | "h3";
  size?: "md" | "lg" | "xl";
};

const sizes = {
  md: "text-[clamp(1.9rem,4vw,3rem)]",
  lg: "text-[clamp(2.3rem,5.2vw,4rem)]",
  xl: "text-[clamp(2.8rem,6.5vw,5.5rem)]",
} as const;

/** Eyebrow + Cormorant display heading + optional intro — the section header. */
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
      <Reveal delay={0.05}>
        <Tag className={cn("font-display font-light", sizes[size])}>
          {lines.map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </Tag>
      </Reveal>
      {intro ? (
        <Reveal
          delay={0.1}
          as="p"
          className={cn(
            "mt-6 max-w-xl font-body text-[0.98rem] font-light leading-relaxed text-text-muted",
            align === "center" && "mx-auto",
          )}
        >
          {intro}
        </Reveal>
      ) : null}
    </div>
  );
}
