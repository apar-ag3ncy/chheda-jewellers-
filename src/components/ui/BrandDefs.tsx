/**
 * The single, canonical definition of the brand gold gradient.
 *
 * Mounted ONCE in the root layout. Every <Monogram /> references it by id, so
 * there is exactly one definition in the document instead of one per instance.
 *
 * Why this exists: SVG ids are global. When each Monogram carried its own
 * <defs id="cj-gold-gradient">, the browser resolved every reference to the
 * FIRST match in the DOM - which was the one inside the loader overlay. As soon
 * as the loader finished and was set to `display:none`, that definition stopped
 * resolving and every gold mark on the page rendered invisible.
 *
 * This host must never be `display:none` (that would reintroduce the bug), so
 * it is hidden by zero size + overflow instead.
 */
export function BrandDefs() {
  return (
    <svg
      aria-hidden
      focusable="false"
      style={{
        position: "absolute",
        width: 0,
        height: 0,
        overflow: "hidden",
        pointerEvents: "none",
      }}
    >
      <defs>
        <linearGradient id="cj-gold-gradient" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0" stopColor="#9a563a" />
          <stop offset="0.18" stopColor="#b37743" />
          <stop offset="0.34" stopColor="#f0c690" />
          <stop offset="0.48" stopColor="#f0cfaa" />
          <stop offset="0.67" stopColor="#b37743" />
          <stop offset="0.88" stopColor="#c9854d" />
          <stop offset="1" stopColor="#9b583b" />
        </linearGradient>
      </defs>
    </svg>
  );
}
