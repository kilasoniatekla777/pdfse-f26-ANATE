"use client";

import { useMemo, useState } from "react";
import { CircleCheck, Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import posthog from "posthog-js";

import { Button, Card, StatusPill, cn } from "@/ui";

export type FlowService = {
  id: string;
  name: string;
  description: string;
  durationMinutes: number;
  price: number;
  includesRemoval: boolean;
};

type Slot = { start: string; startsAt: string };
type Booked = { reference: string; start: string; finish: string; serviceName: string };

const fmtClock = (iso: string | number, timeZone: string) =>
  new Intl.DateTimeFormat("en-GB", { timeZone, hour: "2-digit", minute: "2-digit", hourCycle: "h23" }).format(
    new Date(iso),
  );
const minutesOf = (hhmm: string) => {
  const [h, m] = hhmm.split(":").map(Number);
  return h * 60 + m;
};

/** Journey steps 2 to 4, following prototype v1 (02-design/prototype/v1). */
export function BookingFlow(props: {
  slug: string;
  salonId: string;
  timeZone: string;
  services: FlowService[];
  starts: Slot[];
  closesAt: string | null;
  taken: { from: string; to: string }[];
  bufferAfterMinutes: number;
}) {
  const t = useTranslations("flow");
  const [step, setStep] = useState<"service" | "deadline" | "times" | "details" | "done">("service");
  const [service, setService] = useState<FlowService | null>(null);
  const [deadline, setDeadline] = useState("");
  const [slot, setSlot] = useState<Slot | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deadlineExceeded, setDeadlineExceeded] = useState(false);
  const [booked, setBooked] = useState<Booked | null>(null);

  const customerId = () => posthog.get_distinct_id?.();
  const duration = (m: number) =>
    m < 60 ? t("minutes", { m }) : m % 60 ? t("hoursMinutes", { h: Math.floor(m / 60), m: m % 60 }) : t("hours", { h: m / 60 });
  const price = (tetri: number) => `${(tetri / 100).toFixed(0)} ₾`;

  // Starts where the whole service (plus buffer) fits before closing and before the next booking.
  const options = useMemo(() => {
    if (!service) return [];
    const ms = (service.durationMinutes + props.bufferAfterMinutes) * 60000;
    const closes = props.closesAt ? new Date(props.closesAt).getTime() : Infinity;
    return props.starts
      .filter((s) => {
        const start = new Date(s.startsAt).getTime();
        if (start + ms > closes) return false;
        return !props.taken.some((b) => new Date(b.from).getTime() < start + ms && new Date(b.to).getTime() > start);
      })
      .map((s) => {
        const finishMs = new Date(s.startsAt).getTime() + service.durationMinutes * 60000;
        const finish = fmtClock(finishMs, props.timeZone);
        return { ...s, finish, fits: deadline ? minutesOf(finish) <= minutesOf(deadline) : true };
      });
  }, [service, props.starts, props.closesAt, props.taken, props.bufferAfterMinutes, props.timeZone, deadline]);

  // Leave-by choices every 15 minutes, from the next quarter hour (salon time) to 23:45.
  const deadlineChoices = useMemo(() => {
    const now = minutesOf(fmtClock(Date.now(), props.timeZone));
    const out: string[] = [];
    for (let m = Math.ceil((now + 1) / 15) * 15; m < 24 * 60; m += 15) {
      out.push(`${String(Math.floor(m / 60)).padStart(2, "0")}:${String(m % 60).padStart(2, "0")}`);
    }
    return out;
  }, [props.timeZone]);

  function chooseService(s: FlowService) {
    setService(s);
    setSlot(null);
    posthog.capture("customer_selects_service", {
      customer_id: customerId(),
      salon_id: props.salonId,
      service_id: s.id,
      includes_removal: s.includesRemoval,
      duration_min: s.durationMinutes,
    });
  }

  function showTimes() {
    setStep("times");
    posthog.capture("customer_sets_deadline", {
      customer_id: customerId(),
      salon_id: props.salonId,
      deadline_time: deadline,
      slots_shown: options.length,
      slots_fitting: options.filter((o) => o.fits).length,
    });
  }

  async function book() {
    if (!service || !slot) return;
    setBusy(true);
    setError(null);
    setDeadlineExceeded(false);
    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ slug: props.slug, serviceId: service.id, startsAt: slot.startsAt, deadline, name, phone }),
    });
    setBusy(false);
    if (!res.ok) {
      const { error: code } = (await res.json().catch(() => ({}))) as { error?: string };
      setDeadlineExceeded(code === "deadline_exceeded");
      setError(
        code === "deadline_exceeded" ? t("errorDeadline") : code === "missing_details" ? t("errorDetails") : t("errorTaken"),
      );
      return;
    }
    const data = await res.json();
    // A person's event fires in the browser after the server said yes (posthog-wiring.md, rule 2).
    posthog.identify(data.customer_id);
    posthog.capture("customer_books_fitting_appointment", {
      customer_id: data.customer_id,
      booking_id: data.booking_id,
      service_id: data.service_id,
      duration_min: data.duration_min,
      finishes_before_deadline: data.finishes_before_deadline,
      minutes_spare: data.minutes_spare,
    });
    setBooked({ reference: data.reference, start: data.start, finish: data.finish, serviceName: service.name });
    setStep("done");
  }

  const back = (to: typeof step) => (
    <button type="button" onClick={() => setStep(to)} className="type-nav self-start text-ink-600">
      ‹ {t("back")}
    </button>
  );

  if (step === "service") {
    return (
      <section className="flex flex-col gap-3">
        <h2 className="type-h3 text-ink-900">{t("chooseService")}</h2>
        {props.services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => chooseService(s)}
            className={cn(
              "flex flex-col gap-1 rounded-card border bg-surface-1 p-(--space-card-mobile) text-left motion-fast transition-colors",
              service?.id === s.id ? "border-clay-600 bg-clay-50" : "border-border-strong",
            )}
          >
            <span className="flex justify-between gap-3">
              <span className="type-body-l text-ink-900">{s.name}</span>
              <span className="type-price-inline text-ink-900">{price(s.price)}</span>
            </span>
            <span className="type-body-s text-ink-600">{t("takes", { duration: duration(s.durationMinutes) })}</span>
            <span className="type-caption text-ink-600">
              {s.includesRemoval ? t("removalIncluded") : t("removalNotIncluded")}
              {s.description ? ` ${s.description}` : ""}
            </span>
          </button>
        ))}
        <Button variant="primary" size="lg" isFullWidth disabled={!service} onClick={() => setStep("deadline")}>
          {t("next")}
        </Button>
      </section>
    );
  }

  if (step === "deadline" && service) {
    return (
      <section className="flex flex-col gap-4">
        {back("service")}
        <h2 className="type-h3 text-ink-900">{t("leaveBy")}</h2>
        <p className="type-body-s text-ink-600">{t("leaveByHint")}</p>
        {/* Buttons, not <input type="time"> or <select>: in the Week 7 phone walk the phone's time
            picker kept the current time (IE-B1239E) and its dropdown kept the first option
            (IE-20D039, IE-1C90D0), so every slot showed "ends too late". A tap always registers. */}
        <div className="grid grid-cols-4 gap-2">
          {deadlineChoices.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setDeadline(c)}
              aria-pressed={deadline === c}
              className={cn(
                "type-body-l rounded-input border px-2 py-3 text-center motion-fast transition-colors",
                deadline === c ? "border-clay-600 bg-clay-50 text-ink-900" : "border-border-strong bg-surface-1 text-ink-900",
              )}
            >
              {c}
            </button>
          ))}
        </div>
        {deadline && <p className="type-h3 text-center text-ink-900">{t("youLeaveAt", { time: deadline })}</p>}
        <Button variant="primary" size="lg" isFullWidth disabled={!deadline} onClick={showTimes}>
          {t("showTimes")}
        </Button>
      </section>
    );
  }

  if (step === "times" && service) {
    return (
      <section className="flex flex-col gap-3">
        {back("deadline")}
        <h2 className="type-h3 text-ink-900">{t("pickTime")}</h2>
        <p className="type-body-s text-ink-600">
          {service.name} · {duration(service.durationMinutes)} · {t("leaveAt", { time: deadline })}
        </p>
        {!options.some((o) => o.fits) && (
          <div className="flex flex-col gap-2">
            <p className="type-body text-ink-700">{t(options.length === 0 ? "noTimes" : "noTimesBeforeDeadline")}</p>
            <Button variant="secondary" size="lg" isFullWidth onClick={() => setStep("deadline")}>
              {t("changeDeadline")}
            </Button>
            <Button variant="secondary" size="lg" isFullWidth onClick={() => setStep("service")}>
              {t("changeService")}
            </Button>
          </div>
        )}
        {options.map((o) => (
          <button
            key={o.startsAt}
            type="button"
            disabled={!o.fits}
            aria-disabled={!o.fits}
            onClick={() => {
              if (!o.fits) return;
              setSlot(o);
              setError(null);
              setStep("details");
            }}
            className="flex items-center justify-between gap-3 rounded-card border border-border-strong bg-surface-1 p-(--space-card-mobile) text-left disabled:cursor-not-allowed disabled:opacity-60"
          >
            <span className="flex flex-col">
              <span className="type-body-l text-ink-900">
                {o.start} – {o.finish}
              </span>
              <span className="type-caption text-ink-600">{t("youFinishAt", { time: o.finish })}</span>
            </span>
            <StatusPill tone={o.fits ? "success" : "warning"} icon={o.fits ? <CircleCheck size={16} /> : <Clock size={16} />}>{o.fits ? t("fits") : t("tooLate")}</StatusPill>
          </button>
        ))}
      </section>
    );
  }

  if (step === "details" && service && slot) {
    const finish = fmtClock(new Date(slot.startsAt).getTime() + service.durationMinutes * 60000, props.timeZone);
    return (
      <section className="flex flex-col gap-4">
        {back("times")}
        <h2 className="type-h3 text-ink-900">{t("checkTitle")}</h2>
        <Card className="flex flex-col gap-2 p-(--space-card-mobile)">
          <Row label={t("service")} value={service.name} />
          <Row label={t("included")} value={service.includesRemoval ? t("removalIncluded") : t("removalNotIncluded")} />
          <Row label={t("starts")} value={slot.start} />
          <Row label={t("finishes")} value={finish} />
          <Row label={t("totalTime")} value={duration(service.durationMinutes)} />
          <Row label={t("price")} value={price(service.price)} />
        </Card>
        <label className="flex flex-col gap-1">
          <span className="type-caption text-ink-600">{t("firstName")}</span>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="given-name"
            className="type-body rounded-input border border-border-strong bg-surface-1 px-4 py-3 text-ink-900"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="type-caption text-ink-600">{t("phone")}</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
            placeholder="+995 5__ __ __ __"
            className="type-body rounded-input border border-border-strong bg-surface-1 px-4 py-3 text-ink-900"
          />
        </label>
        {error && <p className="type-body-s text-error-600">{error}</p>}
        {deadlineExceeded && (
          <Button variant="secondary" size="lg" isFullWidth onClick={() => setStep("times")}>
            {t("backToTimes")}
          </Button>
        )}
        <Button variant="primary" size="lg" isFullWidth isLoading={busy} disabled={!name || !phone} onClick={book}>
          {t("book")}
        </Button>
      </section>
    );
  }

  if (step === "done" && booked) {
    return (
      <section className="flex flex-col items-center gap-3 text-center">
        <StatusPill tone="success" icon={<CircleCheck size={16} />}>
          {t("booked")}
        </StatusPill>
        <h2 className="type-h2 text-ink-900">
          {booked.start} – {booked.finish}
        </h2>
        <p className="type-body text-ink-700">{booked.serviceName}</p>
        <p className="type-caption text-ink-600">{t("reference", { ref: booked.reference })}</p>
      </section>
    );
  }

  return null;
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4 border-b border-border-soft py-2 last:border-b-0">
      <span className="type-body-s text-ink-600">{label}</span>
      <span className="type-body-s text-right text-ink-900">{value}</span>
    </div>
  );
}
