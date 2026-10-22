import { APP_CONFIG } from "./config.js";
import { LESSONS, getDefaultTopic, getTopicEntries } from "./content.js";
import { buildLesson, nextStyle } from "./adaptation.js";

const $ = selector => document.querySelector(selector);
const state = {
  ageBand: 10, subject: "math", topicKey: "fractions", style: "story",
  step: 1, selectedAnswer: null, submitted: false, correct: 0, answered: 0,
  hints: 0, streak: 0, lastCorrect: null
};

const ageSelect = $("#learnerAge");
const subjectSelect = $("#subject");
const topicSelect = $("#topic");
const lessonTitle = $("#lessonTitle");
const lessonContent = $("#lessonContent");
const quizArea = $("#quizArea");
const feedback = $("#feedback");
const nextButton = $("#nextButton");
const hintButton = $("#hintButton");
const progressBar = $("#progressBar");
const stepLabel = $("#stepLabel");

function currentTopic() { return LESSONS[state.subject].topics[state.topicKey]; }
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, ch => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[ch]));
}
function populateTopics() {
  const entries = getTopicEntries(state.subject);
  topicSelect.innerHTML = entries.map(([key, topic]) => `<option value="${escapeHtml(key)}">${escapeHtml(topic.title)}</option>`).join("");
  state.topicKey = entries.some(([key]) => key === state.topicKey) ? state.topicKey : getDefaultTopic(state.subject);
  topicSelect.value = state.topicKey;
}
function drawVisual(topic) {
  return `<div class="visual-fraction" aria-label="Условная схема частей">${topic.visual.map(filled => `<span class="fraction-block"><span class="${filled ? "filled" : ""}"></span></span>`).join("")}</div>`;
}
function renderLesson() {
  const topic = currentTopic();
  const lesson = buildLesson(topic, state.style, state.ageBand);
  lessonTitle.textContent = topic.title;
  $("#ageTag").textContent = APP_CONFIG.ageBands.find(a => a.value === state.ageBand)?.label ?? "10–12 лет";
  lessonContent.innerHTML = `<h3>${escapeHtml(lesson.ageNote)}</h3><p>${escapeHtml(lesson.opening)}</p>${lesson.showVisual ? drawVisual(topic) : ""}<div class="example-box"><strong>Пример</strong><br>${escapeHtml(lesson.example)}</div>`;
  quizArea.innerHTML = `<p class="quiz-question">${escapeHtml(topic.question)}</p><div class="answer-list">${topic.options.map((option, i) => `<button type="button" class="answer-option ${state.selectedAnswer === i ? "chosen" : ""}" data-answer="${i}" ${state.submitted ? "disabled" : ""}>${escapeHtml(option)}</button>`).join("")}</div>`;
  quizArea.querySelectorAll("[data-answer]").forEach(button => button.addEventListener("click", () => {
    if (state.submitted) return;
    state.selectedAnswer = Number(button.dataset.answer);
    quizArea.querySelectorAll("[data-answer]").forEach(b => b.classList.toggle("chosen", b === button));
    feedback.textContent = "";
    feedback.className = "feedback";
  }));
  progressBar.style.width = state.submitted ? "100%" : "45%";
  stepLabel.textContent = state.submitted ? "УРОК ЗАВЕРШЁН" : "ЗАДАНИЕ 1 ИЗ 1";
  nextButton.innerHTML = state.submitted ? "Завершить урок <span>↗</span>" : "Проверить ответ <span>↗</span>";
  hintButton.disabled = state.submitted;
  hintButton.style.opacity = state.submitted ? ".45" : "1";
  renderProfile();
}
function showHint() {
  if (state.submitted) return;
  state.hints += 1;
  feedback.className = "feedback";
  feedback.textContent = "Подсказка: " + currentTopic().hint;
  renderProfile();
}
function submitOrContinue() {
  if (state.submitted) {
    feedback.className = "feedback";
    feedback.textContent = "Урок завершён. Попробуй другую тему или подачу — так можно проверить, что удобнее именно сейчас.";
    nextButton.textContent = "Начать заново";
    nextButton.dataset.restart = "true";
    return;
  }
  if (state.selectedAnswer === null) {
    feedback.className = "feedback error";
    feedback.textContent = "Сначала выбери один из вариантов.";
    return;
  }
  const correct = state.selectedAnswer === currentTopic().correctIndex;
  state.answered += 1;
  if (correct) { state.correct += 1; state.streak += 1; } else { state.streak = 0; }
  state.lastCorrect = correct;
  state.submitted = true;
  feedback.className = correct ? "feedback" : "feedback error";
  feedback.textContent = (correct ? "Верно! " : "Пока не совсем. ") + currentTopic().explanation;
  state.style = nextStyle({ selectedStyle: state.style, correct, streak: state.streak, hints: state.hints });
  syncStyleButtons();
  renderLesson();
}
function syncStyleButtons() {
  document.querySelectorAll("[data-style]").forEach(button => button.classList.toggle("selected", button.dataset.style === state.style));
  $("#profileStyle").textContent = APP_CONFIG.styles[state.style].label;
}
function renderProfile() {
  $("#profileStyle").textContent = APP_CONFIG.styles[state.style].label;
  $("#profileAccuracy").textContent = state.answered ? `${state.correct} / ${state.answered} (${Math.round(state.correct / state.answered * 100)}%)` : "—";
  $("#profileHints").textContent = String(state.hints);
  $("#profileNote").textContent = state.answered
    ? "Это сводка только по текущим заданиям. Она не описывает способности или личность и сбрасывается вместе с сессией."
    : "Реши задание — здесь появится сводка по этой сессии.";
}
function resetSession() {
  state.step = 1; state.selectedAnswer = null; state.submitted = false;
  state.correct = 0; state.answered = 0; state.hints = 0; state.streak = 0; state.lastCorrect = null;
  delete nextButton.dataset.restart;
  feedback.textContent = ""; feedback.className = "feedback";
  renderLesson();
}
ageSelect.addEventListener("change", () => { state.ageBand = Number(ageSelect.value); renderLesson(); });
subjectSelect.addEventListener("change", () => {
  state.subject = subjectSelect.value; state.topicKey = getDefaultTopic(state.subject);
  populateTopics(); resetSession();
});
topicSelect.addEventListener("change", () => { state.topicKey = topicSelect.value; resetSession(); });
document.querySelectorAll("[data-style]").forEach(button => button.addEventListener("click", () => {
  state.style = button.dataset.style; syncStyleButtons(); renderLesson();
}));
hintButton.addEventListener("click", showHint);
nextButton.addEventListener("click", () => {
  if (nextButton.dataset.restart === "true") { resetSession(); return; }
  submitOrContinue();
});
$("#resetButton").addEventListener("click", () => {
  if (APP_CONFIG.persistSession) localStorage.removeItem("iskra-session");
  state.ageBand = 10; ageSelect.value = "10"; state.subject = "math"; subjectSelect.value = "math";
  state.topicKey = "fractions"; state.style = "story";
  populateTopics(); syncStyleButtons(); resetSession();
});
populateTopics();
syncStyleButtons();
renderLesson();