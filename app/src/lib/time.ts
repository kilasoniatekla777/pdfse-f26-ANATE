// Wall-clock helpers for the salon's time zone. Vercel and Postgres run in UTC;
// every comparison with the customer's deadline happens in the salon's zone.

/** Minutes the zone is ahead of UTC at a given instant (Tbilisi: 240). */
function offsetMinutes(timeZone: string, at: Date): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(at)
      .map((p) => [p.type, p.value]),
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return Math.round((asUtc - at.getTime()) / 60000);
}

/** Today's date in the zone, as YYYY-MM-DD. */
export function todayIn(timeZone: string, now = new Date()): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone }).format(now);
}

/** Day of week (0 = Sunday) of a YYYY-MM-DD date. */
export function dayOfWeek(date: string): number {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d)).getUTCDay();
}

/** The UTC instant for a wall-clock "HH:mm" on a YYYY-MM-DD date in the zone. */
export function zonedTime(date: string, hhmm: string, timeZone: string): Date {
  const [y, m, d] = date.split("-").map(Number);
  const [h, min] = hhmm.split(":").map(Number);
  const guess = new Date(Date.UTC(y, m - 1, d, h, min));
  return new Date(guess.getTime() - offsetMinutes(timeZone, guess) * 60000);
}

/** "HH:mm" for an instant, in the zone. */
export function clock(at: Date, timeZone: string): string {
  return new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(at);
}

export function isClock(value: unknown): value is string {
  return typeof value === "string" && /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
}
