# Homework 2 · Tekla Kilasonia (@kilasoniatekla777) · ANATE

## 1. Ship report

Live product: https://ieri-anate.vercel.app/ka/s/test-salon · Dashboard: [IERI north star](https://eu.posthog.com/shared/Gu8qn9_XVW-FpjLrmJnUEudpndTazQ)

| What I shipped | Story or rung | Commit link(s), from my account | Live at the production URL? | Walked or checked by |
|---|---|---|---|---|
| The Sprint 1 journey in `app/`, built from Anano's IERI repo: salon page, service choice, leave-by time, slots with finish times, booking route that refuses overlaps, salon's private list, seed, the five events | S1 to S5 (code) | [9c53157](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157) | Yes | AK, on her phone, 23 Nov |
| Deploy: my Supabase project with the tables in their own `ieri` schema, Vercel, PostHog EU, the `/ingest` fix in `proxy.ts` | S6, rungs 1 and 3 | [01392ec](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/01392ec) | Yes | AK opened it with mobile data; I read the events in Activity |
| Leave-by field fixed three times after AK's walks: time picker, then dropdown, then buttons, then a clearer question with "You leave at …" | S3, S3b | [01392ec](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/01392ec) | Yes | AK, five walks (IE-B1239E, IE-20D039, IE-1C90D0, IE-FEE0ED, IE-533895); the last check did not pass |
| Reconcile: PostHog 4 = database 4, same window, split by fits / does not fit | Rung 4 | [388ae4b](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/388ae4b) | n/a | Me; both numbers and the query are in the schema file |
| `?team=1` internal filter, three-tile dashboard, public link in the README | Rung 5 | [01392ec](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/01392ec), [388ae4b](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/388ae4b) | Yes | Opened the public link in a private window |
| Sprint 2 file and the gate line | Lab 7 | [388ae4b](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/388ae4b) | n/a | Written by me; AK and GT are named in it for their stories |

**The piece I am least sure works for a real person, and how I will know by Lab 8:** the leave-by screen. Anano was told "leave by 22:00", tapped 19:15 and booked a slot marked "ends too late". On Sunday I will look at the dashboard's first tile for real people only: if `customer_books_fitting_appointment` shows `finishes_before_deadline` false for most bookings again, the screen is still the problem, not the people.

**One thing I did that was not my assigned story:** the deploy. S6 was Anano's, but her Supabase project was paused and we were both at the free limit, so I put the app on my own project in a separate schema, after checking that my old tables were untouched. [01392ec](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/01392ec)

## 2. Pattern journal, Weeks 5 to 7

My Week 5 and 6 entries were saved only in my local copy of the repo and were lost before I committed them. I rewrote them after the Week 7 lab from the work that is on GitHub: the prototype and north star ([912061a](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/912061a)), the test sessions ([c42165d](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/c42165d)) and the MVP boundary and Sprint 1 ([9c53157](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157)).

### Week 5 · One metric that matters

I picked the north star: bookings that finish before the customer's own deadline. We rejected salon pages viewed: that number goes up even if the customer still has to message the salon to ask how long it takes, so her problem is the same size. Beyond my lane: I built prototype v1 as one HTML page instead of waiting for the design files. My hack: one fixed 14:30 deadline in the task, so every session tested the same thing.

### Week 6 · The smallest complete journey

The biggest cut was most of Anano's IERI repo: the API, both admin apps, SMS login, maps. It was real work, but the journey only needs five steps, and one Next.js app is one deploy instead of two. I wrote the cut list and the MVP boundary. Beyond my lane: I built the code for the whole journey in [9c53157](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157), although S1, S2 and S5 were Anano's and Guja's stories. My hack: I tested the booking route on a throwaway local database before we had Supabase, booking the same slot twice to see the refusal.

### Week 7 · Ship to learn

Anano's walk taught me more than all my testing on the laptop. On my screen the time field worked; on her phone it kept the current time, then the dropdown kept its first option, and when both were fixed she still tapped the wrong time. I had thought this was a bug to fix, but it is a question people read differently than we do. Beyond my lane: I did the deploy and the reconcile. My hack: `?team=1`, so our own clicks stop counting without logins.

## 3. My DECISIONS.md lines

> Wk5 · North star: booked complete-service appointments that finish before the customer's own deadline, per active customer per month; rejected salon pages viewed (presence, the customer's problem is the same size after it) and customer accounts created (presence, cumulative) · evidence: [event schema](../../03-build/analytics/event-schema.md), [01](../../01-discovery/interview-logs/01-nail-customer-tbilisi.md), [03](../../01-discovery/interview-logs/03-nail-customer-tbilisi.md), [07](../../01-discovery/interview-logs/07-nail-customer-tbilisi.md), [08](../../01-discovery/interview-logs/08-nail-customer-tbilisi.md) · owner: TK

The evidence is the event schema, where the north star is one event with `finishes_before_deadline`, and the logs where the full service time was the problem.

> Wk5 · Interviews: 8 real logs; 09 (pianist, referral from log 08) and 10 (new nail customer) are being recruited, target before the Week 7 lab · evidence: [interview logs](../../01-discovery/interview-logs/), [interview sprint plan](../../docs/interview-sprint-09-10.md) · owner: TK

Guja did logs 09 and 10 in late October, so the target was met; the people ended up the other way round (10 is the pianist), which this line does not show.

> Wk6 · MVP boundary: 5-step journey (customer opens salon link to slot blocked and salon sees booking); cut payments, reviews and portfolios, group booking, accounts, in-app chat, reminders · evidence: [MVP boundary](../../03-build/mvp-boundary.md), logs 01, 02, 03, 04, 05, 06, 07, 08, [sessions 1 to 3](../../02-design/user-testing/usability-findings.md) · owner: TK

The cut list in `mvp-boundary.md` gives the log or session behind each cut.

> Wk6 · Prototype track: A (prototype v1 and 3 test sessions before the Week 6 lab, all PASS); the next sessions run on the first deployed screens of the journey · evidence: [usability findings](../../02-design/user-testing/usability-findings.md), [Sprint 1](../../03-build/sprints/sprint-1.md) · owner: TK

The sessions are logged in `usability-findings.md`; the "next sessions on deployed screens" became Anano's walks this week.

> Wk7 · Gate passed: live at https://ieri-anate.vercel.app/ka/s/test-salon, north star event firing from production, PostHog 4 = database 4 · evidence: README links, [event schema](../../03-build/analytics/event-schema.md), [Sprint 2](../../03-build/sprints/sprint-2.md) · owner: TK

The two counts and the exact query are in the Gate reconcile block of the schema file.

## 4. My person this week

**The field-week person I am responsible for:** Customer-11, a nail customer and friend of my mother, from [log 11](../../01-discovery/interview-logs/11-nail-customer-tbilisi.md) (I asked, Anano logged, 23 Nov) · **how and when the link reaches them:** a WhatsApp message with the live link ending `?src=whatsapp`, on Wednesday 25 November. She already booked once on the live app right after the interview (IE-3F9648), but the time-picker bug saved her leave-by time wrong, so I want to see her book again with the fixed screen.
