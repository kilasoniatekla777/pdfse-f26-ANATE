import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Locale-aware navigation. Import `Link`, `redirect`, `useRouter` and
 * `usePathname` from here rather than from `next/link` / `next/navigation`, so
 * the active locale is carried automatically.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing);
