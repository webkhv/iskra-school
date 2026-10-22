# Lesson content authoring guide

## Purpose

A lesson should help a learner practise one observable learning objective. The prototype is not a diagnostic instrument and must not assign fixed labels to a child.

## Current topic fields

Every entry under `LESSONS[subject].topics` in `src/content.js` must include:

- `title`: short, child-readable topic name.
- `objective`: one observable skill the learner should practise.
- `visualDescription`: a plain-language description of the diagram for assistive technology and learners who cannot interpret the visual alone.
- `concept`: concise explanation of the central idea.
- `example`: worked example grounded in a familiar or relevant context.
- `visual`: array of booleans used to render the current four-part decorative diagram.
- `question`: one unambiguous question that assesses the stated objective.
- `options`: two or more distinct, non-empty answer strings.
- `correctIndex`: zero-based index of the correct option.
- `hint`: a hint that supports reasoning without simply repeating the answer.
- `explanation`: an explanation of why the correct answer is correct.

Run `npm run check` from this directory after editing lesson content. Automated checks verify structural requirements; they do not establish pedagogical quality or factual correctness.

## Editorial review before release

For each lesson, a qualified reviewer should confirm:

1. The learning objective describes a skill that can be observed in the activity.
2. The concept, example, question, hint and answer explanation agree.
3. There is exactly one defensible correct answer unless the question explicitly says otherwise.
4. Incorrect options are plausible but not deceptive, humiliating or culturally dependent.
5. Language, reading load, examples and prerequisite knowledge suit the intended age band.
6. Feedback is specific, kind and actionable; it does not describe a child as smart, weak, lazy or a fixed learner type.
7. The visual has an equivalent text description and does not carry essential information through colour alone.
8. The material has been checked for factual accuracy, inclusion and avoidable stereotypes.

## Age-band note

The current age selector changes the introductory note, not the underlying academic difficulty. Do not describe the prototype as fully age-adaptive until lesson variants, prerequisites and age-appropriate assessments have been designed and reviewed.

## Content versioning

When lesson content changes materially, include the change in the commit message and review the relevant tests. Before accounts or cross-device history are introduced, add an explicit content schema version and define how saved results will reference the lesson version used.
