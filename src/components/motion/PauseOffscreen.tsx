"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pauses a subtree's looping CSS animations while it is off-screen.
 *
 * Seven animations on the site run forever - the gold strip's travelling
 * sheen, the map's light-trace and pin rings, the hero's Ken Burns zoom. A
 * looping animation costs the same whether or not anyone can see it: the
 * strip repaints its full-width gradient every frame while you are reading
 * the footer, and the hero keeps re-blending a full-screen image layer while
 * you are three screens below it. On a page that scrolls through fifteen
 * thousand pixels that is a permanent tax on every frame of every scroll.
 *
 * This wrapper watches its own box and flips `data-offscreen`; the CSS in
 * globals.css does the rest with `animation-play-state`, so nothing here
 * knows or cares which animations live inside. The margin resumes them a
 * little before they enter, so nothing arrives frozen.
 *
 * It renders as a real block, not `display: contents` - an element with no
 * box never intersects anything. Starts as "false" so server-rendered
 * content animates until the observer has actually looked.
 */
export function PauseOffscreen({
  children,
  margin = "240px",
}: {
  children: ReactNode;
  /** rootMargin: how far outside the viewport still counts as "on". */
  margin?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        el.dataset.offscreen = entry?.isIntersecting ? "false" : "true";
      },
      { rootMargin: margin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [margin]);

  return (
    <div ref={ref} data-offscreen="false">
      {children}
    </div>
  );
}
