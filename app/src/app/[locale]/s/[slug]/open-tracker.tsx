"use client";

import { useEffect } from "react";
import posthog from "posthog-js";

/** customer_opens_salon_page: the one event that fires on load (posthog-wiring.md). */
export function OpenTracker({ salonId, source }: { salonId: string; source: string }) {
  useEffect(() => {
    posthog.capture("customer_opens_salon_page", {
      customer_id: posthog.get_distinct_id?.(),
      salon_id: salonId,
      source,
    });
  }, [salonId, source]);
  return null;
}
