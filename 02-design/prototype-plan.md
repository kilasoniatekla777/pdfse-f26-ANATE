# Prototype Plan · complete service inside a fixed time window

Prepared October 18, 2026 for Lab 4 / the Lab 5 build. This replaces the deleted October 16 plan, using the current problem statement and logs 07–08. It is a proposed observed task test, not a completed task test or a real reservation service. Anano reports an earlier simple frontend shown informally to friends/family; its [HTML sources are now attached](prototype/README.md), with missing runtime dependencies documented (see [personal record](../members/xranano/personal-work-record.md)). Reuse that frontend if it can isolate the flow; otherwise use a small clickable mockup.

## 1. The riskiest assumption

> A nail customer with a fixed departure deadline will choose a suitable appointment from explicit included-service and finishing-time information, without needing another duration-clarification conversation.

**Why risky:** Maya needed removal clarified ([01-Q3](../01-discovery/interview-logs/01-nail-customer-tbilisi.md)); Nina had to leave by 14:30 ([03-Q5](../01-discovery/interview-logs/03-nail-customer-tbilisi.md)); Customer-07 changed plans after learning the two-hour duration, while 08 planned dinner from a known finishing time ([07-Q5](../01-discovery/interview-logs/07-nail-customer-tbilisi.md), [08-Q5](../01-discovery/interview-logs/08-nail-customer-tbilisi.md)). No participant has yet demonstrated this action on our prototype.

## 2. The one action

> A nail customer can **select** one complete-service appointment that finishes before their departure deadline.

A successful selection tests comprehension and usability; it does not establish willingness to pay, real calendar accuracy or completed bookings.

## 3. Fidelity

| Choice | Why cheapest | Tool | Build budget |
|---|---|---|---|
| Clickable, phone-sized | Can observe selection and service/finish-time comprehension without a booking backend | Figma in Lab 5; no Figma file created yet | Three hours; cut visual polish before adding functionality |

## 4. Evidence-earned screens

| Screen | Tester action | Evidence |
|---|---|---|
| 1. Complete service | Check removal plus gel and the full appointment duration | 01-Q3/Q5, 02-Q4/Q5 |
| 2. Appointment choices | Compare start and finish times against a 14:30 departure | 03-Q5, 07-Q5, 08-Q5 |
| 3. Selection summary | Select one option and explain included work and finishing time | Problem-statement sentences 2–4; 01-Q3, 03-Q5 |

Use labelled fictional test providers and sample slots, not real availability. Example: removal plus gel, 75 minutes; 13:00–14:15 fits, 13:45–15:00 does not. Hold provider and service information constant across options so the test is about fit rather than portfolios.

**Excluded:** Real booking, accounts, payment, ratings, portfolios, maps, group appointments, provider dashboard and AI assistant. The prototype explicitly says no real appointment is created.

## 5. The test that can fail · freeze before the first session

- **Read verbatim:** “You need your existing gel removed and a new gel manicure today. You must leave the salon by 14:30. Use this prototype to choose an appointment you could attend. Tell us when you have decided.”
- **Success:** Within 90 seconds, unaided, selects a complete removal-plus-gel appointment finishing by 14:30; after selection correctly identifies included work and the finishing time.
- **Failure:** Selects a service without removal; selects a finish after 14:30; needs moderator help or another duration-clarification conversation; or cannot choose within 90 seconds.
- **Decision rule:** At least 4/5 successes supports proceeding to a real-provider feasibility test; 2+ failures means revise service/duration presentation and retest before building a booking backend. Never interpret a prototype click as a real purchase.
- **Predicted first error:** Treats start time as sufficient and misses removal or the finishing deadline.
- **Capture:** Selection, elapsed time, assistance, spoken clarification and post-selection explanation. Do not coach; ask what caused failure afterward. Keep the original rule and append results separately.

## 6. Five testers · recruitment plan, none booked

| Code / target | Prior interview or new | Proposed booking owner |
|---|---|---|
| Nina | 03; confirm current relevant booking context | AK |
| Customer-07 | 07; short-notice case | GT |
| Maya | 01; adjacent deadline/duration case, confirm fit | TK |
| New-A | New customer with a recent limited booking window; identity not secured | GT |
| New-B | New customer with a recent limited booking window; identity not secured | AK |

All must be outside this course; at least two must not have been interviewed before. New-A/B are recruitment targets, not invented participants. Confirm fit and actual appointment times before running the test. Proposed assignments require team agreement.

- [x] Behavioral assumption, observable failure, evidence for every screen.
- [ ] Five eligible testers booked, including two genuinely new people.
- [ ] Prototype built and task timings piloted without changing the frozen rule after data collection.
