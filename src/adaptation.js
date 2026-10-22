// Простая прозрачная политика адаптации. Позже её можно заменить экспериментально проверенной моделью.
export function buildLesson(topic, style, ageBand) {
  const ageNote = ageBand === 7
    ? "Начнём с короткого примера и знакомых слов."
    : ageBand === 13
      ? "Сначала идея, затем точное объяснение и применение."
      : "Разберём идею на понятном примере и проверим себя.";
  let opening = topic.concept;
  let example = topic.example;
  if (style === "story") {
    opening = ageBand === 7 ? "Представь знакомую ситуацию. " + topic.concept : topic.concept;
  } else if (style === "steps") {
    opening = "Шаг 1. " + topic.concept + " Шаг 2. Найди главное правило. Шаг 3. Проверь его на задании.";
    example = "Сначала определи, что известно. Затем примени правило. В конце проверь, подходит ли ответ. " + topic.example;
  } else if (style === "visual") {
    opening = topic.concept + " Посмотри на условную схему: каждая отметка — отдельная часть идеи.";
  }
  return { ageNote, opening, example, showVisual: style === "visual" };
}

export function nextStyle({ selectedStyle, correct, streak, hints }) {
  // Не делаем выводов о личности. Меняем подачу только как обратимый учебный эксперимент.
  if (correct && streak >= 1 && hints === 0) return selectedStyle;
  if (!correct || hints > 0) return selectedStyle === "steps" ? "story" : "steps";
  return selectedStyle;
}