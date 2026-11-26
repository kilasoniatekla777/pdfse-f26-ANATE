# Homework 2 · Anano Kutchava (@xranano) · ANATE

## 1. Ship report

[Live IERI test salon](https://ieri-anate.vercel.app/ka/s/test-salon) · [Team dashboard and production links](https://github.com/kilasoniatekla777/pdfse-f26-ANATE)

| What I shipped or checked | Story or rung | Commit and evidence | Live? | Checked by |
| --- | --- | --- | --- | --- |
| Supplied IERI prototype and design evidence. Sprint 1 reused my monorepo’s customer app and design tokens. | Sprint 1 input | [My prototype evidence commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/5a6a7b5) · [Sprint 1 decision](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/DECISIONS.md) | The Sprint 1 adaptation is live | Tekla integrated and deployed it |
| Tested the leave-by flow on my phone over mobile data. Sent S3b back after a too-late booking went through. | S1, S3/S3b, gate rungs 1–2 | [My walkthrough commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/23fba0cd058d7a734801e36698173dc5a8d5425d) · [Tekla’s gate commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/388ae4b) | Yes | I walked it. Tekla checked production events. |
| Enforced the leave-by deadline in the picker and API. | S3b | [1b7d335](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/1b7d335) | Picker verified | I retested the picker. |
| Added repeat-booking tracking. | Sprint 2 retention | [f6c9275](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/f6c9275) | Yes | I verified the repeat-booking event in production PostHog. |
| Logged Customer-11’s interview while Tekla asked the questions. | Field evidence | [Interview log commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/ab2a9d0) · [Sprint 2 record](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/sprints/sprint-2.md) | Customer-11 later used the live app | Tekla and I |

Tekla took over deployment when our Supabase project was paused.

My first phone walkthrough exposed that a slot labeled too late could still be booked. I enforced the deadline in the picker and API, then retested the picker and confirmed that late slots could no longer be selected. The next check is whether the saved deadline matches the time each tester intended. [Fix and walkthrough](ship-week-review.md)

Outside build, I logged [Customer-11](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/ab2a9d0), then interviewed her referral [Customer-12](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/e7e7143) while Tekla logged. Customer-12 dropped strengthening so the appointment could fit her lunch break.

## 2. Pattern journal, Weeks 5–7

These entries are retrospective.

### Week 5 · One metric that matters

I read Guja’s two interviews alongside the north star metric. In log 07, finding a slot still meant changing evening plans once the full duration was known. In log 08, a clear finish time let the customer plan dinner after the appointment. That contrast gives me a prototype check: can a customer pick a fitting slot without asking the salon to confirm when the service ends? [Log 07](../../01-discovery/interview-logs/07-nail-customer-tbilisi.md) · [Log 08](../../01-discovery/interview-logs/08-nail-customer-tbilisi.md)

### Week 6 · The smallest complete journey

We had a broader IERI monorepo, so I had to decide which parts could help Sprint 1 right away. I backed using the customer Next.js app, design tokens, and database schema for a single deployment. That kept the walk from salon link to booking and slot blocking intact while leaving SMS login and separate admin applications for later. [MVP boundary](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/mvp-boundary.md) · [Decision log](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/DECISIONS.md)

### Week 7 · Ship to learn

I opened production on my phone over mobile data and walked the leave-by flow as a customer. The original time picker saved the wrong time, and after it was replaced I still misunderstood which time to tap. I also booked a slot displayed as ending too late. Walking a specific deadline on a real phone gave us a quick way to reproduce a problem we could miss by checking only whether the booking event fired. [Sprint 2](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/sprints/sprint-2.md)

## 3. My DECISIONS.md lines

> Wk6 · Build Sprint 1 from Anano's IERI monorepo: bring its Next.js customer app, design tokens and Prisma/Supabase schema into app/ as one deployable app; defer its NestJS API, provider and platform admin apps, SMS login, deposits, reviews and maps · evidence: architecture, MVP boundary, IERI repo · owner: AK

The MVP boundary lists the five steps the reused code had to support, and [the implementation commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157) shows what Tekla imported into the team app.

> Wk7 · Gate passed: live at https://ieri-anate.vercel.app/ka/s/test-salon, north star event firing from production, PostHog 4 = database 4 · evidence: README links, event schema, Sprint 2 · owner: TK

I contributed the mobile production walkthrough recorded under gate rungs 1–2 and S3b in [Sprint 2](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/sprints/sprint-2.md).

## 4. My person this week

Sprint 2 assigns the outbound customer messages to Tekla and Guja. I’m the reviewer for F1, and I logged Customer-11’s interview. Tekla was assigned the WhatsApp follow-up with the production link on Nov 25. I checked the midweek dashboard. Three testers opened the link and two booked fitting slots. Tekla confirmed the PostHog and database counts matched for that window. [Sprint 2 assignments](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/sprints/sprint-2.md)
