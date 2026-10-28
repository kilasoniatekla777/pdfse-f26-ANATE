import { PostHog } from "posthog-node";

// Server-side PostHog for system events, fired after the database write commits
// (Lab-6/setup/posthog-wiring.md). Null when no key is set, so local dev works without PostHog.
export const posthog = process.env.POSTHOG_KEY
  ? new PostHog(process.env.POSTHOG_KEY, {
      host: process.env.POSTHOG_HOST,
      flushAt: 1,
      flushInterval: 0,
    })
  : null;
