# Iskra Learn — product direction

## Product choice

The first product is a **self-guided learning app for children with a parent-facing overview**, rather than a teacher-admin platform. The existing school website remains untouched; this app continues to live under `/adaptive-learning/` until a separate product and deployment decision is made.

## Intended users

- **Child, ages 7–16:** chooses a topic, learns through examples, steps or a visual, answers a short question, and receives kind, actionable feedback.
- **Parent or guardian:** understands what the child practised, which questions were difficult, and what to try next—without receiving a personality profile or clinical interpretation.

The experience must be age-appropriate. Parent access must not silently turn the child's learning activity into hidden surveillance. Explain what is collected, why, who can see it and how it can be deleted.

## MVP sequence

1. **Trustworthy learning loop:** stable lessons, clear feedback, hint behavior, accessible controls and automated tests.
2. **Local child experience:** no account required; keep progress in the current session until the user explicitly opts into local persistence.
3. **Parent overview prototype:** show learning objectives practised, completed activities and suggested next practice. Distinguish observed facts from recommendations.
4. **Usability and pedagogy review:** test with children and guardians using consent and age-appropriate assent; check accessibility and comprehension.
5. **Optional accounts and sync:** only after a privacy review, with guardian controls, access control, retention limits and deletion/export workflows.
6. **Production operations:** deployment pipeline, monitoring, backups, incident response and documented support process before public launch.

## Non-goals for the first release

- Voice recording or emotion/personality inference from voice.
- Mental-health diagnosis, intelligence scoring, fixed learning-style labels or high-stakes decisions.
- Public profiles, social feeds, targeted advertising or third-party tracking.
- AI calls from the browser or API secrets embedded in client code.
- Claims that adaptive delivery improves outcomes before a controlled evaluation supports them.

## Product acceptance criteria

- A child can complete a lesson without creating an account.
- Every answer receives clear feedback and an explanation.
- The child can change the explanation format and reset the session.
- Lesson content passes automated structure checks and human pedagogical review.
- Parent-facing statements describe actual learning activity, not inferred traits.
- Privacy information is understandable to children and adults.
- No personal data is sent to a server in the local-only prototype.
