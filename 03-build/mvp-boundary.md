# MVP Boundary

The smallest complete user journey that tests whether the product creates value. Complete: the person gets the value, start to finish. Smallest: nothing that is not on that path is in Sprint 1.

**Value hypothesis under test:** A nail customer who sees the full service and the time it will finish before she books will choose an appointment that fits before her fixed plan, without another round of messages or calls to the salon (problem statement, sentences 2 and 5; logs 01, 03, 07, 08; prototype sessions 1 to 3).

**Built from:** the customer app and database schema in Anano's IERI repo ([github.com/xranano/IERI](https://github.com/xranano/IERI)), cut down to this journey.

**The one person walking this journey:** Nino, from our ICP: a customer in Tbilisi who wants a nail appointment she can attend today, with a time she has to leave by, and who today checks Instagram and messages salons to find out what's free.

## The journey

1. Nino opens a salon's IERI link (from its Instagram bio or a shared link).
2. Nino chooses the full service she needs, including removal, and sees its total time and price.
3. Nino enters the time she has to leave by and sees today's free slots, each with its finish time; slots that end too late are marked.
4. Nino books a slot that finishes before her deadline, leaving a first name and one contact.
5. The slot is blocked so nobody else can book it, and the salon sees the booking (service, start, finish) on its private link.

**Why this is complete:** after step 5 Nino has a booked appointment she knows will finish before she has to leave, and it exists in one place the salon can see, without asking anyone how long it takes.

**Why this is smallest:** we considered removing step 3 (entering a deadline) and only showing finish times. Without it we can't tell whether a booking actually fits her plan, so the north star can't be counted, and the prototype test was built around a fixed 14:30 deadline (sessions 1 to 3).

## Cut list

| Feature | Reason (cite the log, session, or hypothesis) | Comes back when |
|---|---|---|
| Online payment and deposits | The hypothesis is about fitting the service into her time, not paying; no log asked to pay online | After a pricing test shows customers or salons will pay through IERI |
| Technician portfolios, reviews, ratings | Trust in a new salon is a separate pattern (P2, logs 02, 04); sessions 1 to 3 chose correctly without it | When we test the trust pattern on its own |
| Group booking | One log only (06) | If more logs show group bookings |
| Salon discovery list and map | Every session used one salon; customers already find salons on Instagram and Maps (02, 03) | When three or more salons are live on IERI |
| Customer accounts and passwords | Sessions 1 to 3 booked in under 90 seconds without any account; first name and one contact are enough | If repeat customers ask to see past bookings |
| In-app chat with the salon | "Message the salon" was tapped 0 times in 3 sessions; customers already message salons on Instagram and WhatsApp (01, 02, 05) | Never, unless sessions show people stuck without it |
| SMS, WhatsApp or email reminders | Confirmation on screen tests the hypothesis; the conflicting reminder is one log (05) | Sprint 2, if customers ask for a reminder |
| Salon-side calendar sync with other channels | We have only interviewed customers; no salon has asked for it | After we interview salons |
| Nail-art design picker | One log (02); designs change the duration in ways one salon can set by hand | When a salon offers designs through IERI |
| AI assistant | No log or session asked for one | Never, until someone asks |
| IERI's specialist selection | Customers chose a salon, not a person, in sessions 1 to 3; one specialist per salon is enough to test the hypothesis | When a pilot salon has more than one nail technician |
| IERI's SMS login | Sessions 1 to 3 booked without any account; a first name and phone are stored on the booking | When customers need to manage their own bookings |
| IERI's reschedule and cancel | Not on the path to the value; the salon can change a booking by phone as it does today (05) | Sprint 2 |
| IERI's provider dashboard (`provider-admin`) and staff tools (`platform-admin`) | One salon's private list (step 5) is all the journey needs | When more than one salon is live |
| IERI's NestJS API | One Next.js app with server routes covers five steps and is one deploy instead of two | When a second client (provider app) needs the same data |

## Step to event

| Step | Event (actor_verb_object) | In the schema? |
|---|---|---|
| 1 | `customer_opens_salon_page` | yes |
| 2 | `customer_selects_service` | yes |
| 3 | `customer_sets_deadline` | added today (customer; customer_id, salon_id, deadline_time, slots_shown, slots_fitting; owner TK) |
| 4 | `customer_books_fitting_appointment` | yes |
| 5 | `system_blocks_slot` | added today (system; salon_id, booking_id, slot_start, duration_min, ms_since_booking; owner GT) |

**North star step:** 4
