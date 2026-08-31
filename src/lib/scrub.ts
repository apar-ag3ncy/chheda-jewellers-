/**
 * Pure playhead math for the ring turntable (useFrameScrub owns the DOM;
 * everything decision-shaped lives here so it can be unit-tested headlessly).
 */

export function clampFrame(value: number, count: number): number {
  return Math.max(0, Math.min(count - 1, value));
}

/**
 * Wrap a playhead onto [0, count) - for a sequence whose last frame runs back
 * into its first. Correct only for a CLOSED turn; see reflectFrame.
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

/**
 * Fold a playhead onto [0, count-1] by bouncing off both ends.
 *
 * The ring's sequence is not a closed turn - it covers roughly 280 degrees
 * and stops - so wrapping it snaps from the last frame to the first. Folding
 * instead means the playhead travels out and back and never crosses the gap,
 * which is seamless in the only sense available until the missing arc is
 * rendered: there is no discontinuity anywhere the eye can reach.
 *
 * Period is 2*(count-1): 0,1,2,1,0,1,2... for count = 3.
 */
export function reflectFrame(value: number, count: number): number {
  if (count <= 0) return 0;
  if (count === 1) return 0;
  const span = count - 1;
  const period = span * 2;
  let t = value % period;
  if (t < 0) t += period;
  return t <= span ? t : period - t;
}
