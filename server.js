// server.js

const express = require("express");
const cors = require("cors");
const translate = require("google-translate-api-x");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.post("/translate", async (req, res) => {

  try {

    const { text, from, to } = req.body;

    const result = await translate(text, {
      from: from,
      to: to
    });

    res.json({
      translated: result.text
    });

  } catch (e) {

    res.json({
      translated: "Translation failed"
    });

  }

});

app.listen(3000, () => {
  console.log("AidaTranslate Global running on http://localhost:3000");
});