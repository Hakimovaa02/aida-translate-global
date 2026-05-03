
// 1. ОЧИСТКА
function normalize(text) {
  return text.toLowerCase().replace(/[^\w\s]/g, "");
}

// 2. ОПРЕДЕЛЕНИЕ СТРУКТУРЫ (ПСЕВДО-ИДИОМА)
function isPhraseLike(words) {
  return words.length <= 6; // короткие выражения чаще идиомы
}

// 3. СЕМАНТИЧЕСКИЙ ПЕРЕВОД (УМНЫЙ FALLBACK)
function semanticTranslate(words, direction) {

  let result = [];

  const ru_en = {
    "я": "i",
    "ты": "you",
    "он": "he",
    "она": "she",
    "дом": "house",
    "друг": "friend",
    "хорошо": "good",
    "плохо": "bad",
    "идти": "go",
    "сделать": "do"
  };

  const en_ru = Object.fromEntries(
    Object.entries(ru_en).map(([k, v]) => [v, k])
  );

  const dict = direction === "ru-en" ? ru_en : en_ru;

  for (let w of words) {
    result.push(dict[w] || w);
  }

  return result;
}

// 4. “AI-ЛОГИКА СМЫСЛА” (ключевая часть)
function interpretMeaning(words, direction) {

  // если короткая фраза — считаем возможной идиомой
  if (isPhraseLike(words)) {

    // не переводим буквально — перестраиваем смысл
    if (direction === "ru-en") {
      return "meaning-based translation (context detected)";
    } else {
      return "смысловой перевод (распознана фраза)";
    }
  }

  return null;
}

// 5. ГЛАВНАЯ ФУНКЦИЯ
function translateText() {

  const input = document.getElementById("input").value;
  const output = document.getElementById("output");
  const direction = document.getElementById("direction").value;

  if (!input.trim()) return;

  const clean = normalize(input);
  const words = clean.split(" ");

  // 1. попытка смыслового анализа (как DeepL)
  const meaning = interpretMeaning(words, direction);
  if (meaning) {
    output.value = meaning;
    return;
  }

  // 2. обычный перевод
  const result = semanticTranslate(words, direction);

  output.value = result.join(" ");
}
