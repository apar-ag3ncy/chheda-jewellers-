import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Surface tint. "transparent" lets a morphing background layer show through. */
  tone?: "green" | "deep" | "surface" | "transparent" | "light";
  as?: ElementType;
  "data-bg"?: string;
  "aria-label"?: string;
};

const spacings: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  // Tighter on phones (avoid huge empty bands between sections); generous on desktop.
  sm: "py-12 md:py-20",
  md: "py-16 md:py-32",
  lg: "py-20 md:py-44",
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  green: "bg-bg",
  deep: "bg-green-deep",
  surface: "bg-surface",
  transparent: "bg-transparent",
  /** Warm paper band. Pairs with .u-on-light so nested type inverts. */
  light: "bg-cream",
};

/** Full-bleed section band with tone + vertical rhythm. */
export function Section({
  id,
  children,
  className,
  spacing = "md",
  tone = "green",
  as: Tag = "section",
  ...rest
}: SectionProps) {
  return (
    <Tag
      id={id}
      className={cn("relative w-full", tones[tone], spacings[spacing], className)}
      {...rest}
    >
      {children}
    </Tag>
  );
}

/** Max-width, guttered content container. */
export function Container({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={cn("u-container", className)}>{children}</div>;
}
