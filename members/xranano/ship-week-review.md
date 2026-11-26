# Week 7 production walkthrough and review · Anano Kutchava

Retrospective record for HW2. Walkthroughs took place on Nov 23 and are documented in [Sprint 2](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/sprints/sprint-2.md), [the gate reconciliation](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/03-build/analytics/event-schema.md) and [Tekla’s HW2](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/blob/main/members/kilasoniatekla777/hw2.md).

| Check | Expected | Observed | Verdict |
| --- | --- | --- | --- |
| S1 / gate rung 1 | Production salon loads on a phone over mobile data. | The test salon page opened and the production page-open event appeared in Activity. | Pass |
| S3, native time picker | The chosen leave-by time is saved. | The app saved 18:04 when the intended selection was 23:00. | Fail |
| S3, dropdown | The selected time is saved. | The dropdown retained its first time in two checks. | Fail |
| S3b, revised time buttons and confirmation | Given 22:00, a tester selects 22:00 and completes a fitting booking without help. | I selected 19:15 and completed a 19:30–20:15 booking marked too late. | Fail. Return S3b for another iteration. |
| Customer-11 interview follow-up | Hear how a nail customer handles booking, then compare any observed use with the app data. | I logged while Tekla asked. The customer booked on her phone, and the original picker saved an incorrect deadline. | One external instance of the deadline issue. |

The phone walk shows that a completed booking and an event in PostHog can coexist with an incorrect deadline. For the next check, capture the task’s intended deadline, the value confirmed on-screen, the value stored by the app, and whether the confirmed slot fits it. Record the next result only after the test runs.

[Customer-11 log commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/ab2a9d0) · [Booking follow-up](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/097de89)


## Follow-up phone test

Anano selected an 18:30 leave-by time and saw “You leave at 18:30.” The slots screen labeled appointments ending at 20:15 or later as “Ends too late.” A fitting test appointment from 15:30 to 16:30 booked successfully. This walkthrough confirms the displayed deadline, late-slot labels, and fitting-slot booking. Anano also reported that the app confirmed a booking when she submitted a slot marked “Ends too late.” The late booking reference and persisted deadline have not been verified.

## Retest after the fix

Anano confirmed that the slot picker no longer lets her click slots labeled “Ends too late.” Her screenshot shows a slot ending at 19:00 marked as fitting and slots ending at 19:15 or later disabled. [The deadline fix](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/1b7d335) also rejects late bookings in the API. The live interaction check covered the slot picker.
