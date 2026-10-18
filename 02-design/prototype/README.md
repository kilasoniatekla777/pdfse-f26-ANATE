# IERI frontend prototype · supplied HTML sources

Uploaded October 18, 2026 from Anano's local IERI folder for the team's project and Homework 1 evidence. Original files are preserved unchanged.

- [Prototype composition](<IERI Prototype.dc.html>): two customer layouts and a salon console sharing in-memory booking, freed-slot and blocked-slot state.
- [Customer view](<IERI Customer.dc.html>): salon discovery and booking interface source.
- [Provider view](<IERI Provider.dc.html>): salon calendar/booking management interface source.
- [Brand book](../../docs/artifacts/IERI-Brand-Book.html): visual identity and interface guidance.

## Runtime status

These are design-component HTML exports, not a standalone browser build. They use custom `x-dc`, `dc-import` and `DCLogic` runtime features. The sources reference `support.js`, `ieri-data.js` and `ios-frame.jsx`; none was present in the supplied IERI folder when checked. The prototype composition also requires registration/resolution of the Customer and Provider components.

The missing runtime/data/frame files or a self-contained export from the original authoring environment are needed to reproduce the interactive preview. Google Fonts links also need network access. GitHub's file view displays source; this upload does not create a hosted demo.

The source describes prototype booking and shared calendar interactions. No real provider calendar connection, real appointment creation or successful end-to-end runtime test is claimed.

## Feedback evidence

Anano reports that she and Tekla built a simple frontend and showed it mainly to friends and family, receiving positive reactions and later examples of when it might be useful. See [personal work record](../../members/xranano/personal-work-record.md). The source upload supports the frontend artifact; it does not independently date or verify those demonstrations. Detailed feedback notes and observed task-test results remain to be recorded.

The [current prototype plan](../prototype-plan.md) proposes a narrower observed service/duration-selection test; it is separate from the broader supplied prototype and has not yet been recorded as completed.
