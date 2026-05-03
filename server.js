
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));


// локальный fallback перевод (если понадобится)
const dictRU_EN = {
  "я": "i",
  "ты": "you",
  "дом": "house",
  "друг": "friend",
  "хорошо": "good",
  "плохо": "bad"
};

const dictEN_RU = Object.fromEntries(
  Object.entries(dictRU_EN).map(([k, v]) => [v, k])
);


// простой перевод слов
function translateLocal(text, from, to) {

  const words = text.toLowerCase().split(" ");

  const dict = from === "ru" ? dictRU_EN : dictEN_RU;

  return words.map(w => dict[w] || w).join(" ");
}


// API (используется только если захочешь расширить)
app.post("/translate", async (req, res) => {

  try {

    const { text, from, to } = req.body;

    const result = translateLocal(text, from, to);

    res.json({
      translated: result
    });

  } catch (e) {

    res.json({
      translated: "Error"
    });

  }

});


app.listen(3000, () => {
  console.log("AidaTranslate Global running on http://localhost:3000");
});
