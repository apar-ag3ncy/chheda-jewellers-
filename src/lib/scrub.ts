/**
 * Pure playhead math for the ring turntable (useFrameScrub owns the DOM;
 * everything decision-shaped lives here so it can be unit-tested headlessly).
 */

export function clampFrame(value: number, count: number): number {
  return Math.max(0, Math.min(count - 1, value));
}

/**
 * Wrap a playhead onto [0, count). The turntable is a closed loop, so
 * dragging or scrolling past either end simply keeps rotating.
 */
export function wrapFrame(value: number, count: number): number {
  if (count <= 0) return 0;
  return ((value % count) + count) % count;
}

/**
 * Frames load out of order, so the scrubber snaps to the nearest frame that
 * has actually arrived. Returns 0 when nothing is loaded yet.
 */
export function nearestLoaded(
  loaded: ArrayLike<unknown | null>,
  target: number,
): number {
  const n = loaded.length;
  if (n === 0) return 0;
  const t = clampFrame(Math.round(target), n);
  if (loaded[t]) return t;
  for (let d = 1; d < n; d += 1) {
    if (t - d >= 0 && loaded[t - d]) return t - d;
    if (t + d < n && loaded[t + d]) return t + d;
  }
  return 0;
}

/**
 * Keyboard vocabulary of the turntable. Returns a DELTA in frames, or null
 * for keys it does not own. Deltas (not absolute targets) because the
 * playhead is a sum of scroll position and the visitor's own rotation.
 */
export function keyDelta(key: string, count: number): number | null {
  const steps: Record<string, number> = {
    ArrowLeft: -1,
    ArrowRight: 1,
    PageUp: -Math.round(count / 8),
    PageDown: Math.round(count / 8),
  };
  return key in steps ? steps[key]! : null;
}
