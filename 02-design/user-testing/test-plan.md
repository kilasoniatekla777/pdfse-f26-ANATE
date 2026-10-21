# Prototype Test Plan

The test itself was written in Lab 4 and is frozen. This file adds the people, the schedule, and who runs each session. Sessions are logged in `02-design/user-testing/usability-findings.md`, one block each, as we run them.

**Prototype v1 link:** https://raw.githack.com/kilasoniatekla777/pdfse-f26-ANATE/main/02-design/prototype/v1/index.html

**Riskiest assumption under test:** A nail customer with a fixed departure deadline will choose a suitable appointment from explicit included-service and finishing-time information, without needing another duration-clarification conversation.

## The frozen test (copied from `02-design/prototype-plan.md`, section 5, unchanged)

**Task, read aloud word for word:** "You need your existing gel removed and a new gel manicure today. You must leave the salon by 14:30. Use this prototype to choose an appointment you could attend. Tell us when you have decided."

**Success:** Within 90 seconds, unaided, selects a complete removal-plus-gel appointment finishing by 14:30; after selection correctly identifies included work and the finishing time.

**Failure behaviors:**
1. Selects a service without removal.
2. Selects a finish after 14:30.
3. Needs moderator help or another duration-clarification conversation.
4. Cannot choose within 90 seconds.

**Decision rule (out of 5):** At least 4/5 successes supports proceeding to a real-provider feasibility test; 2+ failures means revise service/duration presentation and retest before building a booking backend. Never interpret a prototype click as a real purchase.

**Predicted first mistake:** Treats start time as sufficient and misses removal or the finishing deadline.

## Five testers

All five from our ICP. None in this course. Code names only; real names and numbers stay in our team chat.

| # | Code name | Role (as in our ICP) | Why they fit the ICP | Session runner (asks) | Session logger (writes) | Target day | Status (messaged / booked / done) |
|---|---|---|---|---|---|---|---|
| 1 | Nina | Nail customer, short notice | Log 03. A few free hours, had to leave by 14:30 | AK | TK | 2026-10-21 | done (session 2, PASS) |
| 2 | Customer-07 | Nail customer, short notice | Log 07. Learned it took two hours only at confirmation; cancelled evening plans | GT | AK | 2026-10-21 | done (session 3, PASS) |
| 3 | Maya | Nail customer, fixed plan after | Log 01. Couldn't tell whether the slot included removal | TK | AK | 2026-10-21 | done (session 1, PASS) |
| 4 | New-A | Nail customer, recent limited booking window | New, not interviewed | GT | TK | | to recruit |
| 5 | New-B | Nail customer, recent limited booking window | New, not interviewed | AK | GT | | to recruit |

At least three rows must be "messaged" or "booked" before this file counts as done. Update the Status and Target day columns as soon as messages go out.

## Session protocol (same every time)

1. The tester opens the link on their own phone. Not ours.
2. The runner reads the task word for word, then says nothing.
3. The logger starts the timer on the last word of the task and writes: time to first tap, time to the one action, every unprompted sentence verbatim.
4. When the tester stops, or at 90 seconds, the runner asks one question only: "What were you expecting to happen?"
5. The logger writes the verdict against the rule before anyone discusses the session.
6. After the session, tap "Start again" on the last screen so the next tester starts clean.
