# Event Schema

Your metric is only as good as your instrumentation. Every row here becomes one `capture()` call in Week 7 and one dashboard tile. Names are copied from this file, never retyped.

**North star:** Booked complete-service appointments that finish before the customer's own deadline, per active customer per month.

**North star event:** `customer_books_fitting_appointment`

**How the north star is computed from events:** count of `customer_books_fitting_appointment` where `finishes_before_deadline` is true, per customer with at least one booking in the window, per calendar month.

## Events

| Step | Event (actor_verb_object) | Fired by | Properties (never a name, phone, email, or message text) | Owner |
|---|---|---|---|---|
| Acquisition | `customer_opens_salon_page` | customer | customer_id, salon_id, source (instagram, maps, link, other) | AK |
| Activation (precursor) | `customer_selects_service` | customer | customer_id, salon_id, service_id, includes_removal, duration_min | GT |
| Activation (north star) ★ | `customer_books_fitting_appointment` | customer | customer_id, booking_id, service_id, duration_min, finishes_before_deadline, minutes_spare | TK |
| Activation (precursor) | `customer_sets_deadline` | customer | customer_id, salon_id, deadline_time, slots_shown, slots_fitting | TK |
| Activation (system) | `system_blocks_slot` | system | salon_id, booking_id, slot_start, duration_min, ms_since_booking | GT |
| Activation (failure path) | `customer_messages_salon_before_booking` | customer | customer_id, salon_id, step (service, times, summary) | TK |
| Retention | `customer_books_repeat_appointment` | customer | customer_id, booking_id, days_since_last_booking | AK |

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
