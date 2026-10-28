import { notFound } from "next/navigation";

import { db } from "@/lib/db";
import { freeStartsToday } from "@/lib/slots";

import { BookingFlow, type FlowService } from "./booking-flow";
import { OpenTracker } from "./open-tracker";

export const dynamic = "force-dynamic";

const SOURCES = ["instagram", "maps", "link", "other"] as const;

/** Journey step 1: a salon's public IERI page. */
export default async function SalonPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string; slug: string }>;
  searchParams: Promise<{ src?: string }>;
}) {
  const { locale, slug } = await params;
  const { src } = await searchParams;

  const provider = await db.provider.findFirst({
    where: { slug, status: "PUBLISHED" },
    include: {
      services: { where: { isActive: true }, orderBy: { durationMinutes: "asc" } },
      specialists: { where: { isActive: true }, take: 1 },
    },
  });
  const specialist = provider?.specialists[0];
  if (!provider || !specialist) notFound();

  const today = await freeStartsToday(provider.id, specialist.id);
  const lang = locale === "en" ? "en" : "ka";
  const services: FlowService[] = provider.services.map((s) => {
    const name = s.name as Record<string, string>;
    const description = (s.description ?? {}) as Record<string, string>;
    return {
      id: s.id,
      name: name[lang] ?? name.ka,
      description: description[lang] ?? description.ka ?? "",
      durationMinutes: s.durationMinutes,
      price: s.price,
      includesRemoval: s.includesRemoval,
    };
  });
  const source = SOURCES.find((s) => s === src) ?? "other";

  return (
    <main className="mx-auto flex max-w-(--size-content-max) flex-col gap-6 px-(--space-page-mobile) py-(--space-section-mobile)">
      <OpenTracker salonId={provider.id} source={source} />
      <header className="flex flex-col gap-1">
        <h1 className="type-h1 text-ink-900">{provider.name}</h1>
        <p className="type-caption text-ink-600">
          {[provider.district, provider.address].filter(Boolean).join(" · ")}
        </p>
      </header>
      <BookingFlow
        slug={provider.slug}
        salonId={provider.id}
        timeZone={today.timeZone}
        services={services}
        starts={today.starts}
        closesAt={today.closesAt}
        taken={today.taken}
        bufferAfterMinutes={provider.bufferAfterMinutes}
      />
    </main>
  );
}
