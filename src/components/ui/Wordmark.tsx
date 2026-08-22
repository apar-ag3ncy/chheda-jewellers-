import { cn } from "@/lib/cn";
import { siteConfig } from "@/config/site";

type WordmarkProps = {
  className?: string;
  /** Stacked = two lines (CHHEDA / JEWELLERS); inline = one line. */
  layout?: "stacked" | "inline";
  /** "dark" = deep green, for use on light (beige) surfaces. */
  tone?: "beige" | "gold" | "dark";
};

/**
 * Text wordmark rendered in Montserrat with wide tracking — mirrors the
 * official logo letterform. Uses the brand name from config (never typed).
 */
export function Wordmark({
  className,
  layout = "stacked",
  tone = "beige",
}: WordmarkProps) {
  const [first, second] = siteConfig.name.split(" ");
  const toneClass =
    tone === "gold" ? "u-gold-text" : tone === "dark" ? "text-green" : "text-text-strong";

  if (layout === "inline") {
    return (
      <span
        className={cn(
          "font-body font-light uppercase leading-none",
          toneClass,
          className,
        )}
        style={{ letterSpacing: "0.22em" }}
      >
        {siteConfig.name}
      </span>
    );
  }

  return (
    <span
      className={cn("flex flex-col items-center leading-none", className)}
      aria-label={siteConfig.name}
    >
      <span
        className={cn("font-body font-light uppercase", toneClass)}
        style={{ letterSpacing: "0.3em", fontSize: "1em" }}
      >
        {first}
      </span>
      <span
        className={cn("mt-[0.35em] font-body font-medium uppercase", toneClass)}
        style={{ letterSpacing: "0.42em", fontSize: "0.5em", opacity: 0.92 }}
      >
        {second}
      </span>
    </span>
  );
}
