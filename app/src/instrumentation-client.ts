import posthog from "posthog-js";

// Client init from Lab-6/setup/SHIP-STACK-SETUP.md step 3.4. Skipped when no key is set.
if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://eu.posthog.com",
    defaults: "2026-08-30",
    capture_pageview: true,
  });
}
