import localFont from "next/font/local";

/**
 * Self-hosted brand fonts (no Google CDN, per CLAUDE.md).
 * Only two families are permitted across the entire product:
 *   • Cormorant Infant → display / editorial serif
 *   • Montserrat       → functional sans (nav, body, numbers)
 *
 * Exposed as CSS variables and consumed by globals.css @theme:
 *   --font-cormorant → --font-display
 *   --font-montserrat → --font-body
 */

export const cormorant = localFont({
  variable: "--font-cormorant",
  display: "swap",
  // Not preloaded: with `display: swap` the LCP headline paints instantly in
  // the metric-adjusted Georgia fallback, then swaps to Cormorant with minimal
  // shift - avoiding ~11 render-path font fetches competing with the hero image.
  preload: false,
  adjustFontFallback: "Times New Roman",
  fallback: ["Georgia", "Times New Roman", "serif"],
  src: [
    { path: "../../public/fonts/CormorantInfant-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/CormorantInfant-LightItalic.woff2", weight: "300", style: "italic" },
    { path: "../../public/fonts/CormorantInfant-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/CormorantInfant-Italic.woff2", weight: "400", style: "italic" },
    { path: "../../public/fonts/CormorantInfant-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/CormorantInfant-SemiBold.woff2", weight: "600", style: "normal" },
  ],
});

export const montserrat = localFont({
  variable: "--font-montserrat",
  display: "swap",
  preload: false,
  adjustFontFallback: "Arial",
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Arial", "sans-serif"],
  src: [
    { path: "../../public/fonts/Montserrat-Light.woff2", weight: "300", style: "normal" },
    { path: "../../public/fonts/Montserrat-Regular.woff2", weight: "400", style: "normal" },
    { path: "../../public/fonts/Montserrat-Medium.woff2", weight: "500", style: "normal" },
    { path: "../../public/fonts/Montserrat-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "../../public/fonts/Montserrat-Bold.woff2", weight: "700", style: "normal" },
  ],
});

/** Combined class list applied to <html> in the root layout. */
export const fontVariables = `${cormorant.variable} ${montserrat.variable}`;
