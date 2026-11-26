import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * Button — DESIGN.md §23 "Buttons", §24 "Component states".
 *
 * Rules encoded here so callers cannot get them wrong:
 * - One PRIMARY per region. Book, Confirm booking, Pay deposit, Send code, Verify.
 * - Labels never wrap in Latin, but Georgian runs ~40% longer, so the button
 *   hugs its content with a min-width and wraps to two lines rather than
 *   truncating. Never `text-overflow: ellipsis` on a button label.
 * - An icon NEVER replaces a word on a primary action.
 * - `focus-visible` ring is never removed (base layer, styles.css).
 * - Loading swaps the label for a spinner and PRESERVES the width, so the
 *   layout does not jump mid-booking.
 */

export type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost" | "destructive";

export type ButtonSize = "sm" | "md" | "lg" | "xl";

const VARIANT_CLASSES: Record<ButtonVariant, string> = {
  primary: "bg-clay-600 text-on-clay hover:bg-clay-700",
  secondary: "bg-transparent text-clay-600 border border-clay-600 hover:border-clay-200",
  tertiary: "bg-transparent text-ink-600 border border-border-strong hover:border-clay-200",
  ghost: "bg-transparent text-ink-600 hover:bg-surface-2",
  destructive: "bg-transparent text-error-600 border border-error-600 hover:bg-error-tint",
};

const SIZE_CLASSES: Record<ButtonSize, string> = {
  sm: "h-(--size-button-sm) px-(--space-button-sm)",
  md: "h-(--size-button-md) px-(--space-button-md)",
  lg: "h-(--size-button-lg) px-(--space-button-lg)",
  xl: "h-(--size-button-xl) px-(--space-button-xl)",
};

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Swaps the label for a spinner, preserves width, locks the control. */
  isLoading?: boolean;
  /** Stretches to the container — used by the mobile sticky action bar. */
  isFullWidth?: boolean;
  children: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    isLoading = false,
    isFullWidth = false,
    disabled,
    className,
    children,
    ...props
  },
  ref,
) {
  const isLocked = disabled || isLoading;

  return (
    <button
      ref={ref}
      disabled={isLocked}
      aria-disabled={isLocked || undefined}
      aria-busy={isLoading || undefined}
      className={cn(
        "type-button press motion-fast",
        "relative inline-flex items-center justify-center gap-2",
        "rounded-pill transition-colors",
        // Georgian wraps to two lines rather than truncating — §21.
        "text-center text-balance whitespace-normal",
        "min-h-(--size-tap-min)",
        "disabled:pointer-events-none disabled:opacity-45",
        SIZE_CLASSES[size],
        VARIANT_CLASSES[variant],
        isFullWidth && "w-full",
        className,
      )}
      {...props}
    >
      {isLoading ? (
        <>
          <Spinner />
          {/* Keeps the intrinsic width while the label is hidden. */}
          <span className="invisible" aria-hidden="true">
            {children}
          </span>
        </>
      ) : (
        children
      )}
    </button>
  );
});

function Spinner() {
  return (
    <span
      role="status"
      aria-live="polite"
      className={cn(
        "absolute size-4 animate-spin rounded-pill",
        "border-2 border-current border-t-transparent",
      )}
    />
  );
}
