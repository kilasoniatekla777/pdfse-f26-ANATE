import posthog from "posthog-js";

// Client init from Lab-6/setup/SHIP-STACK-SETUP.md step 3.4. Skipped when no key is set.
if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    ui_host: "https://eu.posthog.com",
    defaults: "2026-08-30",
    capture_pageview: true,
  });

  // Internal filter (Lab 7): a teammate opens the link once with ?team=1 and every later event
  // from that browser carries is_team = true, which the dashboard filters out. ?team=0 undoes it.
  const team = new URLSearchParams(window.location.search).get("team");
  if (team === "1") posthog.register({ is_team: true });
  if (team === "0") posthog.unregister("is_team");
}
