import test from "node:test";
import assert from "node:assert/strict";
import { buildLesson, nextStyle } from "../src/adaptation.js";

const topic = {
  concept: "Дробь показывает часть целого.",
  example: "Пиццу разделили на четыре части.",
};

test("buildLesson returns readable lesson content for each supported style", () => {
  for (const style of ["story", "steps", "visual"]) {
    const lesson = buildLesson(topic, style, 10);
    assert.equal(typeof lesson.opening, "string");
    assert.ok(lesson.opening.length > 0);
    assert.equal(typeof lesson.example, "string");
    assert.equal(lesson.showVisual, style === "visual");
  }
});

test("buildLesson adapts the age note to the selected age band", () => {
  assert.match(buildLesson(topic, "story", 7).ageNote, /знакомых слов/i);
  assert.match(buildLesson(topic, "story", 13).ageNote, /точное объяснение/i);
});

test("correct answer without hints keeps the selected style", () => {
  assert.equal(nextStyle({ selectedStyle: "visual", correct: true, streak: 1, hints: 0 }), "visual");
});

test("incorrect answer changes style without assigning a learner label", () => {
  assert.equal(nextStyle({ selectedStyle: "visual", correct: false, streak: 0, hints: 0 }), "steps");
  assert.equal(nextStyle({ selectedStyle: "steps", correct: false, streak: 0, hints: 0 }), "story");
});

test("asking for a hint changes style in a reversible way", () => {
  assert.equal(nextStyle({ selectedStyle: "story", correct: true, streak: 1, hints: 1 }), "steps");
});
