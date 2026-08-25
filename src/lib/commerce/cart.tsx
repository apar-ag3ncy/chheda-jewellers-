"use client";

/**
 * FUTURE COMMERCE - cart context stub (Phase 5).
 * Not mounted anywhere yet. It defines the shape of cart state so the
 * transition to a real cart is "wire it up," not "design it from scratch."
 */
import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export interface CartLine {
  variantId: string;
  quantity: number;
}

interface CartState {
  lines: CartLine[];
  add: (line: CartLine) => void;
  remove: (variantId: string) => void;
  clear: () => void;
  count: number;
}

const CartContext = createContext<CartState | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);

  const value = useMemo<CartState>(
    () => ({
      lines,
      add: (line) =>
        setLines((prev) => {
          const existing = prev.find((l) => l.variantId === line.variantId);
          if (existing) {
            return prev.map((l) =>
              l.variantId === line.variantId
                ? { ...l, quantity: l.quantity + line.quantity }
                : l,
            );
          }
          return [...prev, line];
        }),
      remove: (variantId) => setLines((prev) => prev.filter((l) => l.variantId !== variantId)),
      clear: () => setLines([]),
      count: lines.reduce((n, l) => n + l.quantity, 0),
    }),
    [lines],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartState {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
