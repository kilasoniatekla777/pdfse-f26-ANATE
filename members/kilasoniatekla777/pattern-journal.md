# Pattern journal · Tekla Kilasonia (@kilasoniatekla777)

**Written retrospectively:** October 7, 2026. This is an assistant-prepared contribution record based on existing artifacts and supplied interview assignments. It is a draft for Tekla Kilasonia's review, not an invented first-person reflection or a record of an independent writing exercise.

## Week 1 · Act like an owner, not a role

The original problem pool attributes three observations to Tekla: school-study organization, university exam-resource organization and an aunt’s urgent nail-booking attempt. Tekla’s account committed the team foundation and subsequent pool/tracker updates on October 3. The contract assigns discovery and delivery accountability to Tekla.

Evidence: [original pool](../../00-foundation/problem-pool.md), [contract](../../00-foundation/team-contract.md), [original foundation commit](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/2f7d257), [pool update](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/4b5a82b).

## Week 2 · Evidence over opinion

The supplied interview document assigns Tekla as note-taker for Maya, Leila and Nina. Their answers contain distinct difficulties: complete-service duration, technician confidence and a same-day time window. The assistant organized the supplied material into logs; this is not a claim that Tekla authored that organization or personally selected a pattern.

The interviews challenge a broad explanation: [Maya](../../01-discovery/interview-logs/01-nail-customer-tbilisi.md) needed certainty about removal and appointment length; [Leila](../../01-discovery/interview-logs/02-nail-customer-tbilisi.md) needed confidence in the specific artist; [Nina](../../01-discovery/interview-logs/03-nail-customer-tbilisi.md) needed a confirmed appointment inside a limited afternoon. The narrow short-notice investigation is grounded most directly in Nina’s case, not equally in all three.

Decision under review: [initial customer nail-booking choice](../../DECISIONS.md). Work record: [Lab 2 publication](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/c328c30), [AI usage](../../docs/ai-usage-log.md).

**Personal reflection still needed:** Tekla should add one concrete example of agency beyond discovery/delivery and explain in her own words what surprised her while taking notes. She should commit her own completed journal from her own account.

## Week 3 · Kill your favorite idea

I asked in interviews 04, 05 and 06. None of the three raised waiting for a free time as their difficulty. They raised trust in a new salon, a conflicting reminder, and unclear extras on a group booking. Those answers are half the evidence behind our "weakened" verdict on the waiting-for-availability prediction. [04](../../01-discovery/interview-logs/04-nail-customer-tbilisi.md), [05](../../01-discovery/interview-logs/05-nail-customer-tbilisi.md), [06](../../01-discovery/interview-logs/06-nail-customer-tbilisi.md), [patterns analysis](../../01-discovery/synthesis/patterns-analysis.md), `DECISIONS.md` line 2 Switching from note-taker to asker meant I heard the counterexamples to our prediction first-hand instead of reading them afterwards.

## Week 4 · The prototype is the conversation

My delivery role this week is getting Milestone 1 tagged and our submissions in. So far I have put my homework file into the repo ([786c9fc](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/786c9fc)) and restored our pattern journals, which had been deleted by accident before anyone committed. Our problem statement and prototype plan are still to be written. Our strongest pattern (P1, logs 01, 02, 03 and 06) points the prototype at the moment a customer learns what is included and when the whole service will finish, not at finding a free slot. [patterns analysis](../../01-discovery/synthesis/patterns-analysis.md)

My Week 5 and 6 entries were saved only in my local copy of the repo and were lost before I committed them. I rewrote them after the Week 7 lab from the work that is on GitHub: the prototype and north star ([912061a](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/912061a)), the test sessions ([c42165d](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/c42165d)) and the MVP boundary and Sprint 1 ([9c53157](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157)).

## Week 5 · One metric that matters

I picked the north star: bookings that finish before the customer's own deadline. We rejected salon pages viewed: that number goes up even if the customer still has to message the salon to ask how long it takes, so her problem is the same size. Beyond my lane: I built prototype v1 as one HTML page instead of waiting for the design files. My hack: one fixed 14:30 deadline in the task, so every session tested the same thing.

## Week 6 · The smallest complete journey

The biggest cut was most of Anano's IERI repo: the API, both admin apps, SMS login, maps. It was real work, but the journey only needs five steps, and one Next.js app is one deploy instead of two. I wrote the cut list and the MVP boundary. Beyond my lane: I built the code for the whole journey in [9c53157](https://github.com/kilasoniatekla777/pdfse-f26-ANATE/commit/9c53157), although S1, S2 and S5 were Anano's and Guja's stories. My hack: I tested the booking route on a throwaway local database before we had Supabase, booking the same slot twice to see the refusal.

## Week 7 · Ship to learn

Anano's walk taught me more than all my testing on the laptop. On my screen the time field worked; on her phone it kept the current time, then the dropdown kept its first option, and when both were fixed she still tapped the wrong time. I had thought this was a bug to fix, but it is a question people read differently than we do. Beyond my lane: I did the deploy and the reconcile. My hack: `?team=1`, so our own clicks stop counting without logins.
