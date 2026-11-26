import { timingSafeEqual } from "node:crypto";
import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";

import { db } from "@/lib/db";
import { BLOCKING_STATUSES } from "@/lib/slots";
import { clock, todayIn, zonedTime } from "@/lib/time";
import { Card } from "@/ui";

export const dynamic = "force-dynamic";

function tokenMatches(token: string) {
  const expected = process.env.SALON_ADMIN_TOKEN;
  if (!expected || token.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(token), Buffer.from(expected));
}

/** Journey step 5: the salon's private list of today's bookings. No login; a long random token. */
export default async function SalonAdminPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string; token: string }>;
}) {
  const { locale, slug, token } = await params;
  if (!tokenMatches(token)) notFound();

  const provider = await db.provider.findUnique({ where: { slug } });
  if (!provider) notFound();
  const t = await getTranslations("admin");
  const tz = provider.timezone;
  const today = todayIn(tz);

  const appointments = await db.appointment.findMany({
    where: {
      providerId: provider.id,
      status: { in: [...BLOCKING_STATUSES] },
      startsAt: { gte: zonedTime(today, "00:00", tz), lt: zonedTime(today, "23:59", tz) },
    },
    include: { customer: { select: { name: true, phone: true } } },
    orderBy: { startsAt: "asc" },
  });
  const lang = locale === "en" ? "en" : "ka";

  return (
    <main className="mx-auto flex max-w-(--size-content-max) flex-col gap-4 px-(--space-page-mobile) py-(--space-section-mobile)">
      <h1 className="type-h1 text-ink-900">{t("title", { salon: provider.name })}</h1>
      <p className="type-caption text-ink-600">{t("today", { date: today })}</p>
      {appointments.length === 0 && <p className="type-body text-ink-700">{t("none")}</p>}
      {appointments.map((a) => {
        const name = a.serviceNameSnapshot as Record<string, string>;
        return (
          <Card key={a.id} className="flex flex-col gap-1 p-(--space-card-mobile)">
            <p className="type-body-l text-ink-900">
              {clock(a.startsAt, tz)} – {clock(a.endsAt, tz)} · {name[lang] ?? name.ka}
            </p>
            <p className="type-body-s text-ink-700">
              {a.customer.name} · {a.customer.phone}
            </p>
            <p className="type-caption text-ink-600">
              {a.reference}
              {a.customerDeadlineAt ? ` · ${t("leavesBy", { time: clock(a.customerDeadlineAt, tz) })}` : ""}
            </p>
          </Card>
        );
      })}
    </main>
  );
}
