# Production readiness gates

The current application is a static browser prototype. This checklist describes work required before a public family launch; it does not mean those systems already exist.

## Product and content

- [ ] Educator review for every lesson, hint, distractor and explanation.
- [ ] Age-specific curriculum variants and prerequisite progression designed; current age selector only changes the introductory note.
- [ ] Keyboard, screen-reader, zoom, contrast and mobile checks completed.
- [ ] Family usability pilot reviewed and blocking findings resolved.
- [ ] Claims about educational efficacy supported by suitable evidence.

## Privacy and child safety

- [ ] Launch markets and applicable child-data rules identified and reviewed by qualified counsel.
- [ ] Clear child-facing and guardian-facing privacy information approved.
- [ ] Data map documents purpose, collection, access, storage, retention, export and deletion.
- [ ] Guardian authorization and age-appropriate child assent designed where required.
- [ ] No hidden personality, emotion, intelligence or diagnostic inference.
- [ ] No third-party analytics, advertising SDKs or AI provider data transfer without explicit review and purpose limitation.
- [ ] Incident response, contact route and ownership defined.

## If accounts and cross-device sync are approved

- [ ] Threat model and data-flow diagram reviewed before implementation.
- [ ] Server-side authorization enforces guardian/child relationship boundaries.
- [ ] Authentication, session expiry, recovery and account deletion designed and tested.
- [ ] Data minimization and retention jobs implemented.
- [ ] Export and deletion workflows verified end to end.
- [ ] Encryption in transit and at rest, secret management, audit needs and backup restoration tested.
- [ ] API validation, rate limits, abuse handling and dependency review completed.
- [ ] No API secrets are shipped to the browser.

## Operations

- [ ] Staging and production are separate and use reviewed configuration.
- [ ] CI checks pass on the release commit.
- [ ] Error monitoring and uptime checks avoid collecting unnecessary child data.
- [ ] Backups and restore drills are documented if persistent data exists.
- [ ] Rollback, incident response, support ownership and maintenance windows are documented.
- [ ] Accessibility and security regressions have a documented release-blocking process.

## Release decision

A public launch is blocked if child-data obligations are unresolved, a critical accessibility barrier remains, lesson content has not been reviewed, or the team cannot respond to a security/privacy incident. A static demo may be shared for controlled review only with clear prototype labeling and no claim of production readiness.
