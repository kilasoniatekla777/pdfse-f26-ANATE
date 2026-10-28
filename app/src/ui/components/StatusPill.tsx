import { type ReactNode } from "react";

import { cn } from "../lib/cn";

/**
 * StatusPill — DESIGN.md §22 "Semantic", §24, §28.
 *
 * The non-negotiable this component exists to enforce:
 * **status = colour + icon + word. Never colour alone.**
 *
 * `icon` and `children` (the word) are both REQUIRED. There is deliberately no
 * icon-only or colour-only variant — a colour-blind or screen-reader user must
 * get the same information as everyone else. Pass a Lucide outlined icon
 * (1.4px stroke at 16–20px) and a translated string, never a raw literal.
 */

export type StatusTone = "success" | "warning" | "error" | "info" | "neutral";

const TONE_CLASSES: Record<StatusTone, string> = {
  success: "bg-success-tint text-success-600",
  warning: "bg-warning-tint text-warning-600",
  error: "bg-error-tint text-error-600",
  info: "bg-info-tint text-info-600",
  neutral: "bg-surface-2 text-ink-600",
};

export interface StatusPillProps {
  tone: StatusTone;
  /** Required. Colour alone is never allowed to carry the meaning. */
  icon: ReactNode;
  /** Required. The word, from a translation key — never a hardcoded string. */
  children: ReactNode;
  className?: string;
}

export function StatusPill({ tone, icon, children, className }: StatusPillProps) {
  return (
    <span
      className={cn(
        "type-micro",
        "inline-flex items-center gap-1.5",
        "rounded-pill px-3 py-1.5",
        TONE_CLASSES[tone],
        className,
      )}
    >
      <span aria-hidden="true" className="inline-flex shrink-0">
        {icon}
      </span>
      {children}
    </span>
  );
}
