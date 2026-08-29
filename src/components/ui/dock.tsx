"use client";

import {
  motion,
  MotionValue,
  useMotionValue,
  useSpring,
  useTransform,
  type SpringOptions,
  AnimatePresence,
} from "framer-motion";
import Link from "next/link";
import {
  Children,
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A magnifying dock, adapted for this house from the 21st.dev original.
 *
 * What changed and why:
 * - `@/lib/utils` -> `@/lib/cn` (this codebase's classname helper);
 * - DockItem takes an `href` and renders a real <Link> filling the chip -
 *   the original was a role="button" div with a tabIndex and no action, which
 *   is a control that promises and does nothing;
 * - panel and chips speak the site's liquid-glass language (the same
 *   .cj-liquid-glass / .cj-glass-chip surfaces as the nav menu and the
 *   promise marks) instead of the original's gray-50/neutral-900;
 * - under prefers-reduced-motion the magnification is disabled outright and
 *   labels show on focus/hover without translation - the dock degrades to a
 *   row of even chips, which is all it ever is semantically.
 */

const DOCK_HEIGHT = 110;
const DEFAULT_MAGNIFICATION = 72;
const DEFAULT_DISTANCE = 140;
const DEFAULT_PANEL_HEIGHT = 60;

type DockProps = {
  children: React.ReactNode;
  className?: string;
  distance?: number;
  panelHeight?: number;
  magnification?: number;
  spring?: SpringOptions;
  "aria-label"?: string;
};
type DockItemProps = {
  className?: string;
  children: React.ReactNode;
  href: string;
  label: string;
};
type DockLabelProps = { className?: string; children: React.ReactNode };
type DockIconProps = { className?: string; children: React.ReactNode };

type DockContextType = {
  mouseX: MotionValue<number>;
  spring: SpringOptions;
  magnification: number;
  distance: number;
  reduced: boolean;
};

const DockContext = createContext<DockContextType | undefined>(undefined);

function useDock() {
  const context = useContext(DockContext);
  if (!context) throw new Error("useDock must be used within a Dock");
  return context;
}

export function Dock({
  children,
  className,
  spring = { mass: 0.1, stiffness: 150, damping: 12 },
  magnification = DEFAULT_MAGNIFICATION,
  distance = DEFAULT_DISTANCE,
  panelHeight = DEFAULT_PANEL_HEIGHT,
  "aria-label": ariaLabel,
}: DockProps) {
  const mouseX = useMotionValue(Infinity);
  const isHovered = useMotionValue(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    setReduced(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  const maxHeight = useMemo(
    () => Math.max(DOCK_HEIGHT, magnification + magnification / 2 + 4),
    [magnification],
  );

  const heightRow = useTransform(isHovered, [0, 1], [panelHeight, maxHeight]);
  const height = useSpring(heightRow, spring);

  return (
    <motion.div
      style={{ height: reduced ? panelHeight : height, scrollbarWidth: "none" }}
      className="mx-2 flex max-w-full items-end overflow-x-auto overflow-y-hidden"
    >
      <motion.div
        onMouseMove={({ pageX }) => {
          if (reduced) return;
          isHovered.set(1);
          mouseX.set(pageX);
        }}
        onMouseLeave={() => {
          isHovered.set(0);
          mouseX.set(Infinity);
        }}
        className={cn(
          "cj-liquid-glass mx-auto flex w-fit items-end gap-3 rounded-2xl px-4 pb-2.5",
          className,
        )}
        style={{ height: panelHeight }}
        role="navigation"
        aria-label={ariaLabel ?? "Quick links"}
      >
        <DockContext.Provider
          value={{ mouseX, spring, distance, magnification, reduced }}
        >
          {children}
        </DockContext.Provider>
      </motion.div>
    </motion.div>
  );
}

export function DockItem({ children, className, href, label }: DockItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { distance, magnification, mouseX, spring, reduced } = useDock();
  const isHovered = useMotionValue(0);

  const mouseDistance = useTransform(mouseX, (val) => {
    const domRect = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - domRect.x - domRect.width / 2;
  });

  const widthTransform = useTransform(
    mouseDistance,
    [-distance, 0, distance],
    [40, magnification, 40],
  );
  const width = useSpring(widthTransform, spring);
  const fixed = useMotionValue(44);

  return (
    <motion.div
      ref={ref}
      style={{ width: reduced ? fixed : width }}
      onHoverStart={() => isHovered.set(1)}
      onHoverEnd={() => isHovered.set(0)}
      className={cn(
        "cj-glass-chip relative inline-flex aspect-square items-center justify-center rounded-full",
        className,
      )}
    >
      {Children.map(children, (child) =>
        cloneElement(child as React.ReactElement<Record<string, unknown>>, {
          width: reduced ? fixed : width,
          isHovered,
        }),
      )}
      <Link
        href={href}
        aria-label={label}
        onFocus={() => isHovered.set(1)}
        onBlur={() => isHovered.set(0)}
        className="absolute inset-0 rounded-full outline-none ring-gold-light focus-visible:ring-2"
      />
    </motion.div>
  );
}

export function DockLabel({ children, className, ...rest }: DockLabelProps) {
  const restProps = rest as Record<string, unknown>;
  const isHovered = restProps["isHovered"] as MotionValue<number>;
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = isHovered.on("change", (latest) => {
      setIsVisible(latest === 1);
    });
    return () => unsubscribe();
  }, [isHovered]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 0 }}
          animate={{ opacity: 1, y: -10 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.2 }}
          className={cn(
            "absolute -top-7 left-1/2 w-fit whitespace-pre rounded-[4px] border border-gold-light/30 bg-[#04170f]/92 px-2.5 py-1 font-body text-[0.62rem] uppercase tracking-[0.14em] text-gold-light backdrop-blur-[3px]",
            className,
          )}
          role="tooltip"
          style={{ x: "-50%" }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function DockIcon({ children, className, ...rest }: DockIconProps) {
  const restProps = rest as Record<string, unknown>;
  const width = restProps["width"] as MotionValue<number>;
  const widthTransform = useTransform(width, (val) => val / 2);

  return (
    <motion.div
      style={{ width: widthTransform }}
      className={cn("flex items-center justify-center", className)}
    >
      {children}
    </motion.div>
  );
}
