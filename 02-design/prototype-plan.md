# Prototype Plan

Built for our ICP (`00-foundation/icp.md`): Nino, a customer in Tbilisi who wants a nail appointment she can attend today, and who checks Instagram and messages or calls salons to find out whether a time is free.

## 1. The riskiest assumption

> We assume that a customer who needs a manicure today will book a slot shown as free on her phone, instead of calling or messaging several salons to check that the time is real, the way she does now.

**Why this one is riskiest:** Today Nino's only way to know a time is free is to hear it from the salon. Nina searched Maps, saw who was open, and still had to call three salons: "Search results told me who was open, but that didn't mean anyone had an appointment available." (03) Even with a booking page for a massage, she "still called to ask whether the appointment included consultation time" (03), and every one of our six customers arranged their nails by contacting the salon directly (01 to 06). Our Week 3 verdict weakened the waiting problem (only 1 of 6 raised it), so this test also decides whether the same-day customer is worth building for. If she won't trust a "free" slot on a screen, showing free slots is pointless.

## 2. The one action

> A customer who needs her nails done today can find a nearby salon with a free slot that fits her afternoon and book it.

## 3. Fidelity

| Choice (paper / clickable / coded) | Why it is the cheapest thing that can kill the assumption in section 1 | Tool | Time we will spend |
|---|---|---|---|
| Clickable, phone-sized | The assumption is about whether she taps "book" or reaches for the call button. Paper can't show that reflex; code adds nothing the test needs. | Figma or an AI prototyping tool, shared as a link that opens on a phone | One evening |

## 4. Screens, each traced to evidence

| Screen | What the tester does on it | The log or ICP line that earns it |
|---|---|---|
| 1. Free today, nearby | Sees salons near her with times still free today, not just "open now" | Maps showed who was open but not who had an appointment (03); ICP: she doesn't know a time is free until someone replies |
| 2. Slot details | Sees the service, how long it takes, and when it finishes | Nina had to leave by 14:30 and asked how long a basic manicure takes (03); Maya couldn't tell whether the slot covered removal (01) |
| 3. Book | Taps to book the slot | The one action, section 2 |
| 4. Confirmed | Sees the confirmed time, salon and finish time | Nina chose a confirmed slot over an uncertain walk-in (03) |

**Will not appear, even if a tool generates it:**
- Technician portfolios, reviews or ratings. Trust is a separate pattern (02, 04).
- Group booking. Only one log (06).
- Custom nail-art designs (02).
- Online payment or deposits.
- A salon-side dashboard.
- An AI chat assistant.

None of these is part of the same-day moment in our ICP.

## 5. The test that can fail

- **Task, read aloud to the tester, word for word:** "Your afternoon just became free, but you have to leave by half past two to pick someone up. You'd like a basic manicure today. Find one and book it."
- **Success looks like:** she books a slot that finishes before 14:30 within 90 seconds, without asking us anything.
- **Failure looks like:**
  - She says she would still call or message the salon to check the time is really free.
  - She asks us "is this actually free?" or "will they confirm?"
  - She books a slot that finishes after 14:30.
  - She says she would rather walk in and see.
- **Decision rule:** if 3 or more of 5 testers fail, the assumption is weakened. We then test a version where the salon confirms the slot by message within a few minutes, keeping the conversation customers already trust, before building anything else.
- **Our prediction of the first thing a tester gets wrong:** she won't believe the slot is real and will ask whether the salon has confirmed it.

## 6. Five testers

People who match the ICP: they wanted a nail appointment the same day or at short notice. People who aren't in this course. Code names only. Nobody is booked yet; availability is still to be confirmed.

| Code name | From log, or new | Who on the team books them |
|---|---|---|
| Nina | log 03, our clearest same-day match | AK |
| Maya | log 01, two days' notice | AK |
| Aunt | new, the original observation in `00-foundation/problem-pool.md` | TK |
| New-1 | new, a same-day nail customer who hasn't been interviewed | TK |
| New-2 | new, a same-day nail customer who hasn't been interviewed | AK |

---

**Self-check before committing**

- [x] Section 1 is about behavior, not technology.
- [x] Section 5 has failure behaviors you could see with your own eyes.
- [x] Every screen in section 4 cites a log or the ICP.
