# Event Schema

Your metric is only as good as your instrumentation. Every row here becomes one `capture()` call in Week 7 and one dashboard tile. Names are copied from this file, never retyped.

**North star:** Booked complete-service appointments that finish before the customer's own deadline, per active customer per month.

**North star event:** `customer_books_fitting_appointment`

**How the north star is computed from events:** count of `customer_books_fitting_appointment` where `finishes_before_deadline` is true, per customer with at least one booking in the window, per calendar month.

## Events

| Step | Event (actor_verb_object) | Fired by | Properties (never a name, phone, email, or message text) | Owner | Live |
|---|---|---|---|---|---|
| Acquisition | `customer_opens_salon_page` | customer | customer_id, salon_id, source (instagram, maps, link, other) | AK | yes |
| Activation (precursor) | `customer_selects_service` | customer | customer_id, salon_id, service_id, includes_removal, duration_min | GT | yes |
| Activation (north star) ★ | `customer_books_fitting_appointment` | customer | customer_id, booking_id, service_id, duration_min, finishes_before_deadline, minutes_spare | TK | yes |
| Activation (precursor) | `customer_sets_deadline` | customer | customer_id, salon_id, deadline_time, slots_shown, slots_fitting | TK | yes |
| Activation (system) | `system_blocks_slot` | system | salon_id, booking_id, slot_start, duration_min, ms_since_booking | GT | yes |
| Activation (failure path) | `customer_messages_salon_before_booking` | customer | customer_id, salon_id, step (service, times, summary) | TK | no: there is no message button in Sprint 1; owner TK, Sprint 2 |
| Retention | `customer_books_repeat_appointment` | customer | customer_id, booking_id, days_since_last_booking | AK | no: not built yet; owner AK, Sprint 2 |

Referral and Revenue are empty on purpose. Nothing can be referred or paid for before the real product exists.

## Rules we are following

- One name per event, one spelling, lowercase with underscores.
- `customer_id` on every event. It is an id our app makes up. No names, phone numbers or message text anywhere in analytics.
- The north star event is fired by the customer, because the customer receives the value and is who our problem statement is about.
- `customer_messages_salon_before_booking` stays in the schema because it is our riskiest assumption failing: if customers still need to ask the salon how long it takes, this number goes up while the north star stays flat.

## Reconcile plan

Before we believe the dashboard, we count the north star event a second way.

**Event most likely to fail silently:** `customer_books_fitting_appointment`
**How it would fail:** `finishes_before_deadline` is calculated in the browser. A missing or wrong deadline, or a time-zone mix-up, marks bookings as fitting when they don't, so the count looks better than reality.
**The check that would catch it:** for the same week, take the booking rows in our own database, recompute finish time (start + service duration) against the deadline the customer entered, and compare with the event count.
**Who runs the check in Week 7:** TK

## Gate reconcile (Lab 7)

**Production URL walked:** https://ieri-anate.vercel.app/ka/s/test-salon?src=link · **walked by:** AK (did not build S3 or S4) · on a phone, mobile data: yes

| Source | Count | Window | Exactly how it was counted |
|---|---|---|---|
| PostHog | 4 (1 with `finishes_before_deadline` true, 3 false) | 23 Nov 2026, 12:00 to 18:15 Tbilisi (08:00 to 14:15 UTC) | Trends insight on the dashboard, total count of `customer_books_fitting_appointment`, broken down by `finishes_before_deadline`, internal filter on (none of these four carried `is_team` yet) |
| Database | 4 (1 where `endsAt <= customerDeadlineAt`, 3 not) | Same | `select count(*), sum(case when "endsAt" <= "customerDeadlineAt" then 1 else 0 end) from ieri.appointments where "createdAt" >= '2026-11-23 08:00' and "createdAt" < '2026-11-23 14:15';` |

**Match:** yes, first try, both in total and split by fits / does not fit. The four are IE-ECEA56, IE-544E38 and IE-B1239E (team walks) and IE-3F9648, which turned out to be Customer-11 booking on her own phone after interview 11. So one of the four was a real person, and her leave-by time was saved wrong (12:00) by the time-picker bug.

**If no, first:** not needed. Later the same evening we cancelled our walk bookings that did not fit to free the evening for the S3b check (status `CANCELLED_BY_PROVIDER`, rows kept), so this count does not change. One thing we learned while counting: PostHog showed the booking events 5 to 10 minutes after they happened on a new project, so we counted only after the dashboard had caught up.

**Found on the phone walk, before the count:** the leave-by field was `<input type="time">`. On the phone it kept the current time instead of the one chosen, so booking IE-B1239E was saved with a deadline of 18:04 instead of 23:00 and every slot showed "ends too late". Replaced with a dropdown of times every 15 minutes; on the phone the dropdown kept its first time instead (IE-20D039, IE-1C90D0, both 18:30). Replaced again with a grid of time buttons, redeployed the same evening; the two bookings with the wrong deadline were cancelled (status `CANCELLED_BY_PROVIDER`, rows kept). The next walk (IE-FEE0ED) saved 18:45, the first button, and the walker confirmed they tapped 18:45. The field now saves what is tapped; the question "What time do you have to leave by?" is not clear enough on its own, so the walker picked the earliest time instead of the time they had to leave.

**Silent failure we predicted in Lab 5:** "`finishes_before_deadline` is calculated in the browser. A missing or wrong deadline, or a time-zone mix-up, marks bookings as fitting when they don't." · **Did it happen?** Partly. `finishes_before_deadline` is computed on the server, and times are correct in Tbilisi time (a 15:00 removal + gel finishes 16:15, marked fitting for a 16:30 deadline). But a wrong deadline did happen, the other way round: the phone saved the wrong leave-by time, so bookings were counted as not fitting. 3 of the 4 bookings on 23 Nov have `finishes_before_deadline` false.

**Internal filter set in PostHog:** event property `is_team` is not set (a teammate opens the link once with `?team=1`; every later event from that browser carries `is_team = true`), and `$host` does not contain `localhost` · **our test record is:** the salon `test-salon` and the phone numbers starting `55500000`.

**Checked by:** TK · **events still not Live, with owner and by when:** `customer_messages_salon_before_booking`, TK, by Fri 27 Nov; `customer_books_repeat_appointment`, AK, by Sat 28 Nov.

