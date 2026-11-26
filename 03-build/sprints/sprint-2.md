# Sprint 2: the field week

Sprint 2 runs from Lab 7 (Mon 23 Nov) to Lab 8 (Mon 30 Nov). Real people use the product this week, and Lab 8 opens by reading what they did.

## Sprint 1 review

Our definition of done (from `sprint-1.md`): merged to `main`, deployed at the public URL, walked on a phone by a teammate who did not build it, and its event shows in PostHog's Activity view.

| Story | Owner | Done by our definition? | If not: which clause is missing, and what happened |
|---|---|---|---|
| S6 Deploy and instrument | AK | Yes, but TK did it | The IERI Supabase project was paused and we were both at the free limit of 2 projects, so TK deployed on her own Supabase project (tables in a separate `ieri` schema) and her own Vercel account on 23 Nov. All five Sprint 1 events reach PostHog from production. |
| S1 Nino opens the salon link | AK | Yes | Opened on a phone with mobile data by AK; `customer_opens_salon_page` with `source` = link in Activity |
| S2 Nino chooses the full service | GT | Yes | `customer_selects_service` seen from the phone, `includes_removal` true and `duration_min` 75 for removal + gel |
| S3 Nino sets her deadline | TK | No, sent back three times | Walk 1: the phone's time picker kept the current time (IE-B1239E saved 18:04, not 23:00). Walk 2: the dropdown we put instead kept its first time (IE-20D039, IE-1C90D0). Walk 3: with time buttons, the walker tapped 18:45, the first one (IE-FEE0ED). So the field now saves what you tap, but the question "What time do you have to leave by?" is not clear enough. Moves to S3b. |
| S4 Nino books a slot that fits (north star) | TK | Partly | Booking works on a phone and `customer_books_fitting_appointment` fires (IE-FEE0ED). But only 1 of the 8 bookings on 23 Nov fits its deadline (IE-ECEA56), because of S3. One of the 8 is not ours: IE-3F9648 was Customer-11, booking on her own phone after interview 11, and the time-picker bug saved her leave-by as 12:00. |
| S5 Slot blocked, salon sees the booking | GT | Partly | Booked times disappear from the list on the phone and `system_blocks_slot` fires from the server. Nobody has walked the salon's private page or tried a double booking on a phone yet. |

**Slip rule:** did not fire. S5's private list is built; it only needs its walk (S5b).

## The gate

| Rung | Reached? | Evidence: a link or a number | If not: owner, and by when |
|---|---|---|---|
| 1 Production URL loads on a phone | Yes | Live product row in README, opened on a phone with mobile data on 23 Nov | |
| 2 Journey completes there | Yes | IE-FEE0ED, booked on a phone with mobile data on 23 Nov at 18:34, all five events fired (the slot did not fit, see S3) | |
| 3 North star event in Activity, from production | Yes | `customer_books_fitting_appointment` from ieri-anate.vercel.app, library `web` | |
| 4 Counts reconcile | Yes | PostHog 4 = database 4 (23 Nov, 12:00 to 18:15), see `03-build/analytics/event-schema.md` | |
| 5 Dashboard, linked in README | Yes | [IERI north star](https://eu.posthog.com/shared/Gu8qn9_XVW-FpjLrmJnUEudpndTazQ), three tiles, opens without a login | |

## Real hours before Lab 8

| Initials | Hours free | When, specifically |
|---|---|---|
| TK | 4 | Mon 23 Nov 19:00–21:00, Fri 27 Nov 18:00–20:00 |
| AK | 4 | Mon 23 Nov 19:00–21:00, Sat 28 Nov 14:00–16:00 |
| GT | 4 | Thu 26 Nov 18:00–20:00, Sun 29 Nov 13:00–15:00 |
| **Total** | **12** | |

## Stories this week

### S3b · Nino picks the time she really has to leave · owner TK · reviewer AK · 2 h

Slipped from Sprint 1, so it goes first: tonight, Mon 23 Nov.

- Given the leave-by screen, nothing is picked until she taps, and the question says what we mean: "When do you have to be out of the salon?"
- After she taps, the screen repeats it in big type ("You leave at 21:00") before Show times
- Check on a phone: AK is told "you must leave by 22:00", books without help, and the booking has `finishes_before_deadline` true. `customer_sets_deadline` shows `deadline_time` 22:00.

**First check, Mon 23 Nov 18:45 (AK, her phone):** not passed. The new question and the "You leave at" line are live, but AK tapped 19:15 instead of 22:00 and then booked 19:30–20:15, which was marked "ends too late" (IE-533895). So two things go wrong, not one: people tap a time that is not their real deadline, and a slot marked "ends too late" still gets booked. Next try (TK, Fri 27 Nov): ask AK what she thought the times meant, and show a warning before booking a slot that ends after the deadline. GT does the next check on Sun 29 Nov, as he has not seen the screen yet.

### S5b · The salon's walk · owner GT · reviewer TK · 1 h

Slipped from Sprint 1 (Thu 26 Nov). TK gives GT the private link in person, not in the repo or a group chat. On his phone GT sees today's bookings with first name, service, start and finish, then tries to book a time that is already taken and gets refused.

### F1 · The link reaches our people · owner GT, TK · reviewer AK · 2 h

GT sends to Customer-07, 08 and 10 on Thursday (1 h). TK sends to Customer-11 on Wednesday (1 h). Each link ends in `?src=` the channel it went on (`whatsapp` or `link`). Done when everyone in the table below has the link and the Opened column is filled.

### R4 · Recount before Lab 8 · owner TK · reviewer AK · 1 h

Fri 27 Nov, then again Sun 29 Nov: count `customer_books_fitting_appointment` in PostHog with the internal filter on, count the matching rows in `ieri.appointments`, same window (Tue 24 Nov 00:00 to the time of the count), write both in the schema file.

### Mid-week look · owner AK · 1 h

Sum: 7 of 12 hours. We keep 5 free because real people will find things our walks did not.

## Field week: who uses it

Real people from our logs, not classmates. Code names only. Each gets the production link, never a preview link.

| Code name and role | Log or session they come from | How the link reaches them | Sent by, and by when | Opened? (fill in during the week) |
|---|---|---|---|---|
| Customer-07, booked a repair and a fresh set at short notice | Log 07 (agreed to be contacted again) | WhatsApp message, `?src=whatsapp` | GT, Thu 26 Nov | |
| Customer-08, pianist, same technician as 07 | Log 08 (referral from 07) | WhatsApp message, `?src=whatsapp` | GT, Thu 26 Nov | |
| Customer-10, pianist who films her hands | Log 10 | Phone call, then the link on WhatsApp, `?src=whatsapp` | GT, Thu 26 Nov | |
| Customer-11, nail customer, friend of TK's mother | Log 11 (23 Nov; booked IE-3F9648 on the live app after the interview) | WhatsApp message with the live link, `?src=whatsapp` | TK, Wed 25 Nov | |

We left out Customer-09: she has not said yes to her log being used yet (see log 09).

**What we tell them:** "Hi, this is the booking page from our uni project we talked about. Can you try booking a nail appointment that ends before you have to leave somewhere? It's a test salon, so nobody will be waiting for you. We only count visits and bookings, never names."

## Prediction

Written in the lab on 23 Nov, before the week starts. Not edited afterwards.

**By Lab 8:** 2 `customer_books_fitting_appointment` events from real people, not our team, with `finishes_before_deadline` true. Also: 3 of our 4 people open the link (`customer_opens_salon_page`).

**We are wrong if:** 0 real people book a slot that fits. Then the fix in S3b did not work, or seeing the finish time is not enough to make people book.

**Mid-week look:** AK opens the dashboard on Thursday 26 Nov in the evening and writes one line here: the counts, and one thing we change because of them, or nothing.

## The DECISIONS.md line

See the bottom of `DECISIONS.md`.
