# IERI · Sprint 1 app

One journey, from `03-build/mvp-boundary.md`: open a salon's page → choose the full service → enter the time you have to leave by → see each slot's finish time → book one that fits. The salon sees today's bookings on a private link.

Built from Anano's IERI monorepo ([github.com/xranano/IERI](https://github.com/xranano/IERI)): its `customer-web` app (Next.js, Georgian/English), its design tokens (`src/ui`) and its Prisma schema (`prisma/schema.prisma`), with two Sprint 1 fields added: `Service.includesRemoval` and `Appointment.customerDeadlineAt`.

## Run it locally

```bash
cp .env.example .env.local     # then fill in DATABASE_URL (Supabase) and SALON_ADMIN_TOKEN
npm install
npm run db:push                # creates/updates the tables in Supabase
npm run db:seed                # adds the fictional test salon
npm run dev
```

- Customer page: http://localhost:3000/ka/s/test-salon?src=link (or `/en/...`)
- Salon page: http://localhost:3000/ka/s/test-salon/admin/<SALON_ADMIN_TOKEN>

PostHog keys are optional locally; without them no events are sent.

## Deploy (Sprint 1, story S6)

Vercel → import the team repo → Root Directory `app` → add every variable from `.env.example` → Deploy. Use Supabase's pooled connection string for `DATABASE_URL`. Full steps: `Lab-6/setup/SHIP-STACK-SETUP.md` in the course repo.

## Events (names copied from `03-build/analytics/event-schema.md`)

| Event | Where it fires |
|---|---|
| `customer_opens_salon_page` | browser, on page load (`open-tracker.tsx`) |
| `customer_selects_service` | browser, on tapping a service |
| `customer_sets_deadline` | browser, on "Show times" |
| `customer_books_fitting_appointment` ★ | browser, after `/api/bookings` returns OK |
| `system_blocks_slot` | server, after the booking is written (`api/bookings/route.ts`) |

Not wired yet: `customer_messages_salon_before_booking` (no "message the salon" button in Sprint 1) and `customer_books_repeat_appointment` (Sprint 2).
