import { randomBytes } from "node:crypto";
import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";

import { db } from "@/lib/db";
import { posthog } from "@/lib/posthog";
import { BLOCKING_STATUSES } from "@/lib/slots";
import { clock, dayOfWeek, isClock, todayIn, zonedTime } from "@/lib/time";

type Body = {
  slug?: unknown;
  serviceId?: unknown;
  startsAt?: unknown;
  deadline?: unknown;
  name?: unknown;
  phone?: unknown;
};

class SlotTaken extends Error {}

const reference = () => "IE-" + randomBytes(4).toString("hex").slice(0, 6).toUpperCase();

/**
 * Step 4 and 5 of the journey: book one appointment and block its slot.
 * The customer's event (customer_books_fitting_appointment) fires in the browser
 * after this returns OK; the system event (system_blocks_slot) fires here, after
 * the write commits (Lab-6/setup/posthog-wiring.md, rule 2).
 */
export async function POST(req: Request) {
  const t0 = Date.now();
  const body = (await req.json().catch(() => ({}))) as Body;

  const name = typeof body.name === "string" ? body.name.trim().slice(0, 60) : "";
  const phone = typeof body.phone === "string" ? body.phone.replace(/[^\d+]/g, "") : "";
  if (typeof body.slug !== "string" || typeof body.serviceId !== "string" || typeof body.startsAt !== "string") {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (!isClock(body.deadline) || !name || phone.replace(/\D/g, "").length < 9) {
    return NextResponse.json({ error: "missing_details" }, { status: 400 });
  }

  const provider = await db.provider.findFirst({ where: { slug: body.slug, status: "PUBLISHED" } });
  const service = provider
    ? await db.service.findFirst({ where: { id: body.serviceId, providerId: provider.id, isActive: true } })
    : null;
  const specialist = provider
    ? await db.specialist.findFirst({
        where: { providerId: provider.id, isActive: true, services: { some: { serviceId: service?.id } } },
      })
    : null;
  if (!provider || !service || !specialist) return NextResponse.json({ error: "not_found" }, { status: 404 });

  const tz = provider.timezone;
  const startsAt = new Date(body.startsAt);
  if (Number.isNaN(startsAt.getTime())) return NextResponse.json({ error: "bad_request" }, { status: 400 });
  const endsAt = new Date(startsAt.getTime() + service.durationMinutes * 60000);
  const blockStartsAt = new Date(startsAt.getTime() - provider.bufferBeforeMinutes * 60000);
  const blockEndsAt = new Date(endsAt.getTime() + provider.bufferAfterMinutes * 60000);

  const today = todayIn(tz);
  const earliest = Date.now() + provider.bookingLeadTimeMinutes * 60000;
  const schedule = await db.workingSchedule.findFirst({
    where: {
      providerId: provider.id,
      dayOfWeek: dayOfWeek(today),
      OR: [{ specialistId: specialist.id }, { specialistId: null }],
    },
    orderBy: { specialistId: { sort: "desc", nulls: "last" } },
  });
  const opens = schedule ? zonedTime(today, schedule.startTime, tz) : null;
  const closes = schedule ? zonedTime(today, schedule.endTime, tz) : null;
  if (
    !opens ||
    !closes ||
    todayIn(tz, startsAt) !== today ||
    startsAt.getTime() < earliest ||
    startsAt < opens ||
    blockEndsAt > closes
  ) {
    return NextResponse.json({ error: "slot_unavailable" }, { status: 409 });
  }

  const deadlineAt = zonedTime(today, body.deadline, tz);
  const minutesSpare = Math.round((deadlineAt.getTime() - endsAt.getTime()) / 60000);

  let appointment;
  try {
    appointment = await db.$transaction(
      async (tx) => {
        // Step 5: refuse anything that overlaps an appointment already holding this time.
        const clash = await tx.appointment.findFirst({
          where: {
            specialistId: specialist.id,
            status: { in: [...BLOCKING_STATUSES] },
            blockStartsAt: { lt: blockEndsAt },
            blockEndsAt: { gt: blockStartsAt },
          },
          select: { id: true },
        });
        if (clash) throw new SlotTaken();

        const customer = await tx.user.upsert({
          where: { phone },
          update: { name },
          create: { phone, name, role: "CUSTOMER" },
        });

        return tx.appointment.create({
          data: {
            reference: reference(),
            customerId: customer.id,
            providerId: provider.id,
            specialistId: specialist.id,
            serviceId: service.id,
            serviceNameSnapshot: service.name as Prisma.InputJsonValue,
            priceSnapshot: service.price,
            durationSnapshotMinutes: service.durationMinutes,
            depositModeSnapshot: service.depositMode,
            depositAmountSnapshot: service.depositAmount,
            startsAt,
            endsAt,
            blockStartsAt,
            blockEndsAt,
            customerDeadlineAt: deadlineAt,
            status: "CONFIRMED",
            source: "MARKETPLACE",
          },
        });
      },
      { isolationLevel: Prisma.TransactionIsolationLevel.Serializable },
    );
  } catch (err) {
    const serialization = err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2034";
    if (err instanceof SlotTaken || serialization) {
      return NextResponse.json({ error: "slot_taken" }, { status: 409 });
    }
    throw err;
  }

  if (posthog) {
    posthog.capture({
      distinctId: provider.id,
      event: "system_blocks_slot",
      properties: {
        salon_id: provider.id,
        booking_id: appointment.id,
        slot_start: clock(startsAt, tz),
        duration_min: service.durationMinutes,
        ms_since_booking: Date.now() - t0,
      },
    });
    await posthog.flush();
  }

  return NextResponse.json({
    customer_id: appointment.customerId,
    booking_id: appointment.id,
    reference: appointment.reference,
    service_id: service.id,
    duration_min: service.durationMinutes,
    start: clock(startsAt, tz),
    finish: clock(endsAt, tz),
    finishes_before_deadline: minutesSpare >= 0,
    minutes_spare: minutesSpare,
  });
}
