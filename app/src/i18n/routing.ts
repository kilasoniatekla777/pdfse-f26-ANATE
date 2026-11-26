import { defineRouting } from "next-intl/routing";

/**
 * Georgian and English are equal — DESIGN.md §21. Georgian is the default
 * locale because the market is Tbilisi and `ka` is the review language for
 * every screen.
 *
 * Russian is explicitly NOT part of MVP. Do not add a third locale, a language
 * flag row, or RU strings.
 */
export const routing = defineRouting({
  locales: ["ka", "en"] as const,
  defaultLocale: "ka",
  localePrefix: "always",
});

export type AppLocale = (typeof routing.locales)[number];
