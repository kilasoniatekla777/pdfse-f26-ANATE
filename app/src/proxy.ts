import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

/**
 * Locale negotiation and redirects.
 *
 * Next 16 renamed the `middleware` file convention to `proxy`; next-intl still
 * exports the handler factory under its original name.
 */
export default createMiddleware(routing);

export const config = {
  // Skip API routes, Next internals and anything with a file extension.
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
};
