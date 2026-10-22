# Privacy and child-safety requirements

This document is an engineering checklist, not legal advice or a claim of compliance.

## Current prototype

- No sign-in, backend, server-side profile or remote analytics.
- Session results are held in JavaScript memory and are reset by the app.
- Audio capture and audio analysis are disabled.
- Do not add third-party tracking, advertising SDKs or hidden profiling.

## Before any account, sync or public pilot

1. Map each data field to a specific learning purpose; collect the minimum necessary.
2. Determine applicable child privacy and data-protection requirements for every launch market. Obtain qualified legal/privacy review.
3. Provide clear, age-appropriate notices for both children and guardians.
4. Define guardian permission and child assent flows where required; document how consent can be withdrawn.
5. Specify access roles, encryption in transit and at rest, retention periods, deletion, export and account recovery.
6. Prevent one family from accessing another family's records; test authorization on the server for every protected operation.
7. Create a documented process for incidents, support requests, data deletion and vendor review.
8. Assess whether a DPIA or other formal impact assessment is required before launch.
9. Use no sensitive profiling or automated high-stakes decisions. Do not infer diagnosis, intelligence, personality or emotional state from a child's voice or behavior.
10. Do not send child data to an AI provider until the purpose, data flow, provider terms, retention, parental controls and fallback behavior have been reviewed.

## Parent-facing learning summaries

Prefer observable statements such as “answered 3 of 5 fraction questions correctly” and “used two hints.” Recommendations should be tentative and actionable. Avoid claims such as “is a visual learner,” “has low ability,” or mental-health labels.

## Release gate

A public release is blocked until the team has reviewed the applicable legal requirements, published accurate privacy information, verified security controls, tested deletion and access boundaries, and approved the learning content.
