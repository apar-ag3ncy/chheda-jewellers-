/**
 * Tiny className combiner - merges truthy class fragments.
 * Kept dependency-free (no clsx/tailwind-merge) to stay lean.
 */
export type ClassValue = string | number | false | null | undefined;

export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(" ");
}
