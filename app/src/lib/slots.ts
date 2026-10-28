import { db } from "./db";
import { clock, dayOfWeek, todayIn, zonedTime } from "./time";

/** Statuses that hold a place on the calendar. */
export const BLOCKING_STATUSES = ["PENDING", "AWAITING_DEPOSIT", "CONFIRMED", "CHECKED_IN"] as const;

export type Slot = { start: string; startsAt: string };

/**
 * Today's free start times for one specialist, from the salon's working hours,
 * slot interval, lead time and existing appointments. Each start is free for the
 * longest active service, and the client works out the finish per service.
 */
export async function freeStartsToday(providerId: string, specialistId: string, now = new Date()) {
  const provider = await db.provider.findUniqueOrThrow({ where: { id: providerId } });
  const tz = provider.timezone;
  const date = todayIn(tz, now);

  const schedule = await db.workingSchedule.findFirst({
    where: {
      providerId,
      dayOfWeek: dayOfWeek(date),
      OR: [{ specialistId }, { specialistId: null }],
    },
    orderBy: { specialistId: { sort: "desc", nulls: "last" } },
  });
  if (!schedule) return { date, timeZone: tz, starts: [] as Slot[], closesAt: null as string | null, taken: [] as { from: string; to: string }[] };

  const opens = zonedTime(date, schedule.startTime, tz);
  const closes = zonedTime(date, schedule.endTime, tz);
  const earliest = new Date(now.getTime() + provider.bookingLeadTimeMinutes * 60000);

  const taken = await db.appointment.findMany({
    where: {
      specialistId,
      status: { in: [...BLOCKING_STATUSES] },
      blockStartsAt: { lt: closes },
      blockEndsAt: { gt: opens },
    },
    select: { blockStartsAt: true, blockEndsAt: true },
  });

  const starts: Slot[] = [];
  const step = provider.slotIntervalMinutes * 60000;
  for (let t = opens.getTime(); t < closes.getTime(); t += step) {
    if (t < earliest.getTime()) continue;
    const blockStart = t - provider.bufferBeforeMinutes * 60000;
    const isTaken = taken.some((a) => a.blockStartsAt.getTime() <= blockStart && a.blockEndsAt.getTime() > blockStart);
    if (!isTaken) starts.push({ start: clock(new Date(t), tz), startsAt: new Date(t).toISOString() });
  }
  return {
    date,
    timeZone: tz,
    starts,
    closesAt: closes.toISOString(),
    // Each appointment's block, so the client can hide starts that would run into the next booking.
    taken: taken.map((a) => ({ from: a.blockStartsAt.toISOString(), to: a.blockEndsAt.toISOString() })),
  };
}
