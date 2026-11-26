# Sprint 1

Sprint 1 runs from the Week 6 lab to the Week 7 lab and ends at the gate: deployed at a public URL, north star event firing in PostHog. Everything here is sized to the hours we actually have.

## Definition of done

A story is done when it is merged to `main`, deployed at the public URL, walked on a phone by a teammate who did not build it, and its event shows in PostHog's Activity view.

## Real hours before the Week 7 lab

Order: AK deploys (S6) on Wednesday, with TK in the same session to review it; GT starts on Thursday against the deployed URL.

| Initials | Hours free | When, specifically |
|---|---|---|
| TK | 4 | Wed 18:00–20:00, Fri 18:00–20:00 |
| AK | 4 | Wed 18:00–20:00, Sat 14:00–16:00 |
| GT | 4 | Thu 18:00–20:00, Sun 13:00–15:00 |
| **Total** | **12** | |

## The board

Where it lives: GitHub Projects on the team repo (*link it here and in the README once created*). Four columns: next, doing, review, done. One card per story below. Merge to `main` every day anyone works.

## Stories

Total: 12 h, equal to the hours we have (TK 4, AK 4, GT 4). The first version of every journey screen is already in `app/` (built from IERI and tested on a local database), so story hours cover connecting it to Supabase, checking each criterion on a phone at the deployed URL, and fixing what fails. AK owns the deploy because she built the IERI skeleton and its Supabase project.

### S6 · Deploy and instrument · owner AK · reviewer TK · 3 h

Do this first, on the first evening, so every later story deploys the day it merges.
- Copy IERI's `apps/customer-web`, the shared `packages/ui` styles and the Prisma schema into `app/` as one standalone Next.js app (no Turborepo, no NestJS); it builds with `npm run build` on its own.
- Point `DATABASE_URL` at IERI's Supabase project (pooled connection string), run the Prisma migration, and seed one test salon with one specialist and three services (gel manicure 60 min, gel removal + gel manicure 75 min, classic manicure 45 min).
- Deploy on Vercel with root directory `app/`; wire PostHog from `Lab-6/setup/SHIP-STACK-SETUP.md`, Step 3 onwards.
- Public URL in the README's Live product row, every schema event visible in PostHog's Activity view, reconcile check written. The Week 7 lab adds the dashboard.

### S4 · Nino books a slot that fits (north star) · owner TK · reviewer GT · 2 h

**As** Nino, **I** book a slot I can see finishes before I have to leave **so that** I don't have to message the salon to ask how long it takes.

**Acceptance criteria:**
- Given a chosen service and a 14:30 deadline, when I tap a slot marked as fitting, enter a first name and one contact and tap Book, then I see "Booked" with the service, start and finish time
- And an `appointments` row exists with the service snapshots, `startsAt`, `endsAt`, status `CONFIRMED`, and a `users` row with the first name and phone
- And `customer_books_fitting_appointment` fires once with `customer_id`, `booking_id`, `service_id`, `duration_min`, `finishes_before_deadline` true and `minutes_spare`

**Smallest demo that proves it:** book removal + gel at 13:00 with a 14:30 deadline on a phone, show the row, show the event with `minutes_spare` 15.

### S1 · Nino opens the salon link · owner AK · reviewer TK · 1 h

**As** Nino, **I** open a salon's IERI link on my phone **so that** I can see what it offers without messaging anyone.

**Acceptance criteria:**
- Given `/ka/s/test-salon?src=instagram` on a phone browser, when it loads, then I see the salon name and its services, with no pinch-zoom needed
- And the services come from the `services` table (IERI schema), not hard-coded, with price and duration shown together
- And `customer_opens_salon_page` fires once per load with `customer_id`, `salon_id` and `source` = instagram

**Smallest demo that proves it:** open the link with `?src=instagram` on a phone, show the services, show the event.

### S2 · Nino chooses the full service · owner GT · reviewer AK · 2 h

**As** Nino, **I** choose a service and see what it includes, how long it takes and what it costs **so that** I know the full time before I pick a slot.

**Acceptance criteria:**
- Given the salon page, when I tap "Gel removal + gel manicure", then I see 1 h 15 min, its price, and that removal is included
- And "Gel manicure" says removal is not included
- And `customer_selects_service` fires with `service_id`, `includes_removal` true and `duration_min` 75

**Smallest demo that proves it:** tap both services on a phone, show the two events with different `includes_removal`.

### S3 · Nino sets her deadline and sees slots with finish times · owner TK · reviewer AK · 2 h

**As** Nino, **I** enter the time I have to leave and see when each slot would finish **so that** I can tell at a glance which ones fit.

**Acceptance criteria:**
- Given removal + gel (75 min) and a 14:30 deadline, when the slots show, then each one shows start and finish, 12:15–13:30 and 13:00–14:15 are marked as fitting, and 13:30–14:45 is marked as ending too late
- And times are shown in Tbilisi time on the deployed URL, not UTC
- And `customer_sets_deadline` fires with `deadline_time` 14:30, `slots_shown` and `slots_fitting`

**Smallest demo that proves it:** enter 14:30 on a phone, show the marked slots, show the event with `slots_fitting` 2.

### S5 · The slot is blocked and the salon sees the booking · owner GT · reviewer TK · 2 h

**As** the salon, **I** see each booking with its service, start and finish on my private link, and the slot closes **so that** nobody else can book the same time.

**Acceptance criteria:**
- Given a booking just made for 13:00, when I open `/s/test-salon/admin/TOKEN`, then I see the first name, service, 13:00 start and 14:15 finish
- And reloading the customer page shows 13:00 and any overlapping slot as taken; a second booking for 13:00 is refused
- And `system_blocks_slot` fires once with `salon_id`, `booking_id`, `slot_start`, `duration_min` and `ms_since_booking`

**Smallest demo that proves it:** book 13:00, open the salon link, try to book 13:00 again, show the refusal and the event.

## Slip rule

Written now, obeyed later. If S5 is not done by the evening before the Week 7 lab, the salon's private booking list moves to Sprint 2 (the salon is told about bookings by a teammate for the first pilot); blocking the slot and `system_blocks_slot` stay no matter what, because without them two people can book the same time and the booking can't be trusted.

## Prototype track

Track A: we had prototype v1 and three test sessions before this lab (`02-design/user-testing/usability-findings.md`, sessions 1 to 3).
