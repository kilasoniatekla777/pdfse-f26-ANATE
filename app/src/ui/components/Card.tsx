import { forwardRef, type HTMLAttributes, type ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Card — DESIGN.md §22 "Shadows", §23.
 *
 * `grid` is the default and carries NO shadow: a 1px border only. Shadow means
 * elevation, never decoration, so only a card that genuinely floats above the
 * page (a map preview, a dropdown panel) uses `elevated`.
 *
 * Radius never exceeds 16px on a rectangular container, and a component never
 * mixes two radii — hence `card` (14px) or `container` (16px), nothing else.
 */

export type CardVariant = "grid" | "elevated" | "inset";

const VARIANT_CLASSES: Record<CardVariant, string> = {
  grid: "bg-surface-1 border border-border-strong rounded-card",
  elevated: "bg-surface-1 border border-border-strong rounded-container shadow-card",
  inset: "bg-surface-2 border border-border-soft rounded-card",
};

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  children: ReactNode;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { variant = "grid", className, children, ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "p-(--space-card-mobile) lg:p-(--space-card-desktop)",
        VARIANT_CLASSES[variant],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
});
