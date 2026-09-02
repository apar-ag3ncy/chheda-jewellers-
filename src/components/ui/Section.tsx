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
  // Tighter on phones (avoid huge empty bands between sections); generous on
  // desktop - but not cavernous. lg used to be py-44 (176px) a side, and with
  // 27 of the site's 34 sections on lg every boundary was 352px of nothing;
  // scrolling read as empty green between exhibits. Cut twice at the owner's request - worst boundary now 160px, typical 128. Keeps the
  // editorial air while the next section is always announcing itself.
  sm: "py-8 md:py-12",
  md: "py-10 md:py-16",
  lg: "py-12 md:py-20",
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
