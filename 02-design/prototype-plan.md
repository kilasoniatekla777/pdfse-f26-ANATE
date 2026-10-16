# Prototype Plan

## 1. The riskiest assumption

> We assume that a customer who sees the full service and the time it will finish next to an offered slot will confirm it on the screen, instead of calling or messaging the salon to ask how long it takes and whether removal is included, the way she does now.

**Why this one is riskiest:** Every one of our six customers arranged their nails by contacting the salon directly (01 to 06). Maya called at lunch to get removal added and the total length (01). Nina used a booking page for a massage and still called to ask what it included (03). Elena prefers "talking to my nail salon when I have a special request" (05). If customers still pick up the phone even when the finishing time is shown, showing it is pointless. No log tests this yet, which is why the prototype must.

## 2. The one action

> A customer can choose her full service and confirm a time she can see will finish before she has to leave.

## 3. Fidelity

| Choice (paper / clickable / coded) | Why it is the cheapest thing that can kill the assumption in section 1 | Tool | Time we will spend |
|---|---|---|---|
| Clickable, phone-sized | The assumption is about whether she confirms on her phone or reaches for the call button. Paper can't show that reflex; code adds nothing the test needs. | Figma or an AI prototyping tool, shared as a link that opens on a phone | One evening |

## 4. Screens, each traced to evidence

| Screen | What the tester does on it | The log or problem-statement sentence that earns it |
|---|---|---|
| 1. Service | Picks a manicure and adds removal or a design | Removal was the missed question (01); the design had to fit the opening (02); extras weren't included (06) |
| 2. Times | Sees each slot as start and finish, e.g. "13:30 to 14:15" | Problem statement sentence 2; Nina had to leave by 14:30 (03) |
| 3. Summary | Sees total length and total price before confirming | Amara asked for "a total price for each person and the expected finishing times" (06); Maya was told to allow about an hour and fifteen (01) |
| 4. Confirmed | Sees the confirmation with the finish time and adds it to her calendar | Maya put it in her calendar (01); Elena's reminder showed the old time (05) |

**Will not appear, even if a tool generates it:**
- Technician portfolios, reviews or ratings. Trust is a real pattern (02, 04), but it isn't this problem statement.
- Group booking. Only one log (06).
- Online payment or deposits.
- Maps or "salons near you" discovery.
- A salon-side dashboard.
- An AI chat assistant.

No log asked for any of these.

## 5. The test that can fail

- **Task, read aloud to the tester, word for word:** "You're free this afternoon, but you have to leave by half past two to pick someone up. Your old gel needs to come off and you want a regular manicure. Book something you can actually make."
- **Success looks like:** she adds removal, picks a slot that finishes before 14:30, and confirms within 90 seconds without asking us anything.
- **Failure looks like:**
  - She says she would call or message the salon to check before confirming.
  - She picks a slot that finishes after 14:30.
  - She leaves out removal and doesn't notice.
  - She asks us "how long will this take?"
- **Decision rule:** if 3 or more of 5 testers fail, the assumption is weakened. We then test a version where the salon's message reply carries the full service and finishing time, keeping the conversation customers already trust, before building anything else.
- **Our prediction of the first thing a tester gets wrong:** she chooses by start time and ignores the finish time, picking a slot that ends too late.

## 6. Five testers

People who aren't in this course. Code names only. Nobody is booked yet; availability is still to be confirmed.

| Code name | From log, or new | Who on the team books them |
|---|---|---|
| Maya | log 01 | AK |
| Nina | log 03 | AK |
| Amara | log 06 | TK |
| New-1 | new, a nail customer who hasn't been interviewed | TK |
| New-2 | new, a nail customer who hasn't been interviewed | AK |

---

**Self-check before committing**

- [x] Section 1 is about behavior, not technology.
- [x] Section 5 has failure behaviors you could see with your own eyes.
- [x] Every screen in section 4 cites a log or a problem-statement sentence.
