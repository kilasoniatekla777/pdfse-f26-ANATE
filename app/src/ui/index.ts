/**
 * @ieri/ui — design tokens and token-only primitives.
 *
 * This package has NO domain knowledge and does NO data fetching. Anything
 * that knows what a booking is belongs to the application that owns it
 * (DESIGN.md §34, §35).
 *
 * Only a handful of primitives are scaffolded so far — enough to prove the
 * token pipeline. The full component list to build out is DESIGN.md §23.
 */

export { Button } from "./components/Button";
export type { ButtonProps, ButtonSize, ButtonVariant } from "./components/Button";

export { Card } from "./components/Card";
export type { CardProps, CardVariant } from "./components/Card";

export { StatusPill } from "./components/StatusPill";
export type { StatusPillProps, StatusTone } from "./components/StatusPill";

export { cn } from "./lib/cn";
