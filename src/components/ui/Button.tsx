import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Brand button — a liquid-glass surface (see .glass-button in globals.css)
 * with centred, wide-tracked Montserrat labels. Every CTA on the site routes
 * through here, so the glass treatment is applied everywhere consistently.
 *
 * Variants:
 *   primary → warm gold glass (dark label) — the main action
 *   outline → neutral frosted glass with a gold rim
 *   ghost   → the same frosted glass, lower emphasis
 *   onLight → dark frosted glass for use on beige/light surfaces
 *   link    → plain underlined text link (not a glass button)
 */
type Variant = "primary" | "outline" | "ghost" | "onLight" | "link";
type Size = "sm" | "md" | "lg";

const textSize: Record<Size, string> = {
  sm: "min-h-[42px] px-4 py-2.5 text-[0.68rem]",
  md: "px-6 py-3.5 text-[0.72rem]",
  lg: "px-8 py-4 text-[0.78rem]",
};

const glassTint: Record<Exclude<Variant, "link">, string> = {
  primary: "glass-gold",
  outline: "",
  ghost: "glass-ghost",
  onLight: "glass-on-light",
};

const glassText =
  "glass-button-text font-body font-medium uppercase tracking-[0.14em]";

const linkText =
  "inline-flex items-center justify-center gap-2 font-body font-medium uppercase tracking-[0.14em] text-text-strong underline-offset-4 transition-colors duration-[var(--dur-fast)] hover:text-gold-light hover:underline";

type CommonProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  className?: string;
  withArrow?: boolean;
  /** Extra classes on the inner label span. */
  contentClassName?: string;
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
    className="ml-0.5 inline-block translate-x-0 transition-transform duration-[var(--dur-fast)] ease-[var(--ease-lux)] group-hover:translate-x-1"
  >
    &rarr;
  </span>
);

export function Button(props: AsLink | AsButton) {
  const {
    variant = "outline",
    size = "md",
    children,
    className,
    withArrow,
    contentClassName,
    ...rest
  } = props;

  const isExternal =
    props.href !== undefined && /^https?:\/\//.test(props.href);
  const externalAttrs = isExternal
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};

  // Plain text-link variant — not a glass surface.
  if (variant === "link") {
    const classes = cn("group", linkText, className);
    const label = (
      <>
        {children}
        {withArrow ? <Arrow /> : null}
      </>
    );
    if (props.href !== undefined) {
      const { href: _href, ...linkRest } = rest as AsLink;
      return (
        <Link href={props.href} className={classes} {...externalAttrs} {...linkRest}>
          {label}
        </Link>
      );
    }
    const { href: _omit, ...buttonRest } = rest as AsButton & { href?: undefined };
    return (
      <button className={classes} {...buttonRest}>
        {label}
      </button>
    );
  }

  // Glass surface. Backdrop frost via Tailwind utilities (survives the build).
  const surface = cn(
    "glass-button group backdrop-blur-[14px] backdrop-saturate-[1.35]",
    glassTint[variant],
  );
  const label = (
    <span className={cn(glassText, textSize[size], contentClassName)}>
      {children}
      {withArrow ? <Arrow /> : null}
    </span>
  );

  return (
    <div className={cn("glass-button-wrap", className)}>
      {props.href !== undefined ? (
        (() => {
          const { href: _href, ...linkRest } = rest as AsLink;
          return (
            <Link href={props.href} className={surface} {...externalAttrs} {...linkRest}>
              {label}
            </Link>
          );
        })()
      ) : (
        (() => {
          const { href: _omit, ...buttonRest } = rest as AsButton & {
            href?: undefined;
          };
          return (
            <button className={surface} {...buttonRest}>
              {label}
            </button>
          );
        })()
      )}
      <div aria-hidden className="glass-button-shadow" />
    </div>
  );
}
