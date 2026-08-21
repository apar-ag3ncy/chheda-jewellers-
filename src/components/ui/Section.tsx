import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  /** Vertical rhythm. */
  spacing?: "none" | "sm" | "md" | "lg";
  /** Surface tint. */
  tone?: "green" | "deep" | "surface";
  as?: ElementType;
  "aria-label"?: string;
};

const spacings: Record<NonNullable<SectionProps["spacing"]>, string> = {
  none: "",
  sm: "py-16 md:py-20",
  md: "py-24 md:py-32",
  lg: "py-28 md:py-44",
};

const tones: Record<NonNullable<SectionProps["tone"]>, string> = {
  green: "bg-bg",
  deep: "bg-green-deep",
  surface: "bg-surface",
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
