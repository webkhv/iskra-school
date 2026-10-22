import test from "node:test";
import assert from "node:assert/strict";
import { APP_CONFIG } from "../src/config.js";
import { CONTENT_SCHEMA_VERSION, LESSONS, getDefaultTopic, getTopicEntries, validateTopic } from "../src/content.js";

test("configured age bands and explanation styles are available", () => {
  assert.deepEqual(APP_CONFIG.ageBands.map(({ value }) => value), [7, 10, 13]);
  assert.deepEqual(Object.keys(APP_CONFIG.styles), ["story", "steps", "visual"]);
  assert.equal(APP_CONFIG.audioEnabled, false);
  assert.equal(APP_CONFIG.persistSession, false);
});

test("lesson catalog exposes an explicit schema version", () => {
  assert.equal(CONTENT_SCHEMA_VERSION, 1);
});

test("each subject has a valid default topic", () => {
  for (const [subject, data] of Object.entries(LESSONS)) {
    assert.ok(data.label, `Missing label for ${subject}`);
    const defaultTopic = getDefaultTopic(subject);
    assert.ok(data.topics[defaultTopic], `Invalid default topic for ${subject}`);
    assert.ok(getTopicEntries(subject).length > 0);
  }
});

test("every lesson has a question, options, hint, explanation and valid answer index", () => {
  for (const [subject, data] of Object.entries(LESSONS)) {
    for (const [key, topic] of Object.entries(data.topics)) {
      const context = `${subject}/${key}`;
      assert.ok(topic.title, `${context}: missing title`);
      assert.ok(topic.objective, `${context}: missing learning objective`);
      assert.ok(topic.visualDescription, `${context}: missing accessible visual description`);
      assert.ok(Array.isArray(topic.visual) && topic.visual.length > 0, `${context}: missing visual data`);
      assert.equal(new Set(topic.options).size, topic.options.length, `${context}: duplicate answer options`);
      assert.ok(topic.options.every(option => typeof option === "string" && option.trim()), `${context}: answer options must be non-empty strings`);
      assert.ok(topic.concept, `${context}: missing concept`);
      assert.ok(topic.question, `${context}: missing question`);
      assert.ok(Array.isArray(topic.options) && topic.options.length >= 2, `${context}: invalid options`);
      assert.ok(Number.isInteger(topic.correctIndex), `${context}: answer index must be an integer`);
      assert.ok(topic.correctIndex >= 0 && topic.correctIndex < topic.options.length, `${context}: answer index out of range`);
      assert.ok(topic.hint, `${context}: missing hint`);
      assert.ok(topic.explanation, `${context}: missing explanation`);
      assert.deepEqual(validateTopic(topic), [], `${context}: invalid topic schema`);
    }
  }
});
