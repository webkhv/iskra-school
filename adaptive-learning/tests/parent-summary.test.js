import test from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const html = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

test("parent summary exposes observable session facts and a next-step suggestion", () => {
  for (const id of ["parentTopic", "parentObjective", "profileStyle", "profileAccuracy", "profileHints", "profileNote", "parentNextStep"]) {
    assert.ok(html.includes(`id="${id}"`), `Missing parent summary element: ${id}`);
  }
  assert.match(app, /currentTopic\(\)\.title/);
  assert.match(app, /parentObjective/);
  assert.match(app, /topic\.objective/);
  assert.match(app, /state\.lastCorrect/);
});

test("interactive selections expose accessible pressed state", () => {
  assert.match(html, /data-style="story" aria-pressed="true"/);
  assert.match(app, /setAttribute\("aria-pressed", String\(selected\)\)/);
  assert.match(app, /aria-describedby="currentQuestion"/);
});

test("prototype keeps progress session-only and does not enable audio", async () => {
  const config = await readFile(new URL("../src/config.js", import.meta.url), "utf8");
  assert.match(config, /persistSession:\s*false/);
  assert.match(config, /audioEnabled:\s*false/);
});
