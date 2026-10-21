# Week 5 to-do kit · what's left before the Week 6 lab

Everything here needs a real person. Nothing in this file counts as a test session or an interview.

| # | Task | Who | Done? |
|---|---|---|---|
| 1 | Message 3+ testers, then update Status in `02-design/user-testing/test-plan.md` | runners in the test plan | [ ] |
| 2 | Run 3+ sessions, log each in `02-design/user-testing/usability-findings.md` | runner + logger | [ ] |
| 3 | After 3 sessions, apply the decision rule (2+ fails → `DECISIONS.md` line) | team | [ ] |
| 4 | Interviews 09 and 10 (plan: `docs/interview-sprint-09-10.md`) | GT (09), AK/TK (10) | [ ] |
| 5 | Agree runner/logger per tester in team chat | team | [ ] |

## 1. Message to a prototype tester

Fill in the name, send it yourself, then change the tester's Status to "messaged".

**Georgian**

> გამარჯობა [სახელი]! უნივერსიტეტის პროექტისთვის ფრჩხილების ჯავშნის მარტივ პროტოტიპს ვამოწმებთ. ხომ ვერ დაგვითმობდი 10 წუთს ამ კვირაში? შენს ტელეფონზე ერთ ბმულს გახსნი და ერთ პატარა დავალებას შეასრულებ. არაფერს ვყიდით და რეალური ჯავშანი არ კეთდება. როდის მოგიხერხდება?

**English**

> Hi [name]! For a university project we're testing a simple prototype for booking nails. Could you give us 10 minutes this week? You'd open one link on your phone and do one small task. We're not selling anything and no real booking is made. When would suit you?

**Asking a past interviewee for a new tester (for New-A / New-B)**

> Do you know someone who booked nails recently and had to fit it around a plan straight after, like work, picking up a child, or dinner? We'd love 10 minutes with them.

## 2. Message for interview 10

> გამარჯობა [სახელი]! უნივერსიტეტის პროექტზე ვმუშაობ იმაზე, თუ როგორ ჯავშნიან ადამიანები ფრჩხილების ვიზიტს. არაფერს ვყიდი. შეგიძლია 20 წუთით მომიყვე შენი ბოლო ჯავშნის შესახებ ამ კვირაში? ძალიან დამეხმარები.

> Hi [name], I'm doing a university project about how people book nail appointments. I'm not selling anything. Could you tell me about your last booking for 20 minutes this week? It would really help.

Use `01-discovery/interview-script-v2.md` and `docs/interview-answer-sheet.md` in the interview.

## 3. Session day checklist

- [ ] Tester is from our ICP and **not in this course**.
- [ ] Tester opens the link **on their own phone**: https://raw.githack.com/kilasoniatekla777/pdfse-f26-ANATE/main/02-design/prototype/v1/index.html
- [ ] Runner reads the task **word for word**, then stays silent:
  > "You need your existing gel removed and a new gel manicure today. You must leave the salon by 14:30. Use this prototype to choose an appointment you could attend. Tell us when you have decided."
- [ ] Logger starts a phone stopwatch on the last word. Writes: time to first tap, time to the choice, everything they say, word for word.
- [ ] If they tap "Message the salon", note it (failure 3). If they ask you anything, note it (failure 3). Don't help.
- [ ] Stop at 90 seconds or when they decide. Ask only: "What were you expecting to happen?"
- [ ] Write PASS / FAIL before discussing. Fail = no removal, finish after 14:30, needed help, or over 90 seconds.
- [ ] Tap "Start again" on the last screen for the next person.

## 4. Afterwards

Write rough notes within an hour: code name, date, whose phone, who ran and logged, times, what they tapped, exact quotes, verdict. Paste them to Claude and it will format them into `usability-findings.md`. Notes must be what really happened; nothing gets filled in that you didn't see.
