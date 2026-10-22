# Roadmap

## Current prototype
- Responsive browser UI and modular JavaScript.
- Lesson catalogue for three subjects.
- User-selectable explanation format.
- Questions, hints, correctness feedback and session-only summary.
- No voice capture or psychological inference.
- Initial Node.js unit tests for lesson structure and adaptation logic.

## Delivery sequence: child app with parent overview

1. **Stabilize the learning loop:** fix interaction edge cases, add accessibility checks, and keep automated tests passing.
2. **Improve the learning content:** define learning objectives and age appropriateness; have educators review each lesson.
3. **Create a versioned content schema:** validate lesson JSON and add a content authoring workflow.
4. **Prototype the parent overview:** show completed topics, observable practice results and cautious next-step suggestions—never personality labels.
5. **Run family usability sessions:** use consent and age-appropriate assent; evaluate accessibility and whether children understand feedback.
6. **Evaluate learning outcomes:** compare adaptive and non-adaptive approaches, including delayed recall and subgroup fairness.
7. **Decide whether accounts are necessary:** if yes, design guardian controls, authorization, consent, retention, export and deletion before implementing sync.
8. **Prepare production operations:** CI, staging/production environments, monitoring, backups, incident response and support ownership.
9. **Consider AI only if it adds demonstrated value:** call it through a server API, keep keys out of the browser, minimize child data sent to vendors and provide a safe fallback.
10. **Keep audio out of the initial MVP:** any later audio feature needs a distinct purpose, explicit consent and assent, retention limits and a privacy review. Never infer diagnosis, intelligence or personality from voice.

## Release gates before a family pilot
- Content reviewed by qualified educators.
- Automated tests and accessibility checks pass.
- Privacy notices are clear to children and guardians.
- Data collection, access, retention and deletion are documented.
- No hidden profiling, high-stakes labels or unnecessary third-party tracking.
- Evidence of learning benefit is collected before making efficacy claims.
- Applicable legal requirements are reviewed for the target launch market.

## Production readiness is not yet achieved

The current app is a static prototype. It has no authentication, backend, synced parent view, operational monitoring or deployment pipeline. Those are deliberate future decisions, not existing features.
