import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "outline" | "ghost" | "link";
type Size = "sm" | "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2.5 font-body font-medium uppercase transition-all duration-[var(--dur-fast)] ease-[var(--ease-lux)] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  // Solid warm gold — primary action
  primary:
    "bg-gold text-green-deep hover:bg-gold-light tracking-[0.14em] rounded-[var(--radius-brand)]",
  // Hairline gold outline on green — the editorial default
  outline:
    "border border-line-strong text-text-strong hover:border-gold hover:bg-gold/10 tracking-[0.14em] rounded-[var(--radius-brand)]",
  // Bare, spaced label
  ghost:
    "text-text-strong hover:text-gold-light tracking-[0.14em]",
  // Underlined text link with animated rule
  link: "text-text-strong hover:text-gold-light tracking-[0.14em] relative",
};

const sizes: Record<Size, string> = {
  sm: "text-[0.68rem] px-4 py-2.5",
  md: "text-[0.72rem] px-6 py-3.5",
  lg: "text-[0.78rem] px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
};

type AsLink = CommonProps & { href: string } & Omit<
    ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >;
type AsButton = CommonProps & { href?: undefined } & Omit<
    ComponentProps<"button">,
    "className" | "children"
  >;

const Arrow = () => (
  <span
    aria-hidden
    className="inline-block translate-x-0 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-lux)] group-hover:translate-x-1"
  >
    &rarr;
  </span>
);

export function Button(props: AsLink | AsButton) {
  const { variant = "outline", size = "md", children, className, withArrow, ...rest } =
    props;
  const classes = cn(base, sizes[size], variants[variant], className);

  if (props.href !== undefined) {
    const { href: _href, ...linkRest } = rest as AsLink;
    const external = /^https?:\/\//.test(props.href);
    return (
      <Link
        href={props.href}
        className={classes}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        {...linkRest}
      >
        {children}
        {withArrow ? <Arrow /> : null}
      </Link>
    );
  }

  const { href: _omit, ...buttonRest } = rest as AsButton & { href?: undefined };
  return (
    <button className={classes} {...buttonRest}>
      {children}
      {withArrow ? <Arrow /> : null}
    </button>
  );
}
