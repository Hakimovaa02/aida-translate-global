// public/script.js

const idioms = {

  // American/British idioms
  "to feel blue": "быть в унынии",
  "break the ice": "разрядить обстановку",
  "piece of cake": "проще простого",
  "under the weather": "плохо себя чувствовать",
  "once in a blue moon": "очень редко",
  "hit the sack": "лечь спать",
  "cost an arm and a leg": "стоить очень дорого",
  "spill the beans": "выдать секрет",
  "call it a day": "закончить работу",
  "burn the midnight oil": "работать ночью",

};

const variants = {

  british: {
    apartment: "flat",
    truck: "lorry",
    fries: "chips",
    vacation: "holiday",
    elevator: "lift",
    subway: "underground"
  },

  australian: {
    friend: "mate",
    barbecue: "barbie",
    afternoon: "arvo"
  }

};

document
  .getElementById("translateBtn")
  .addEventListener("click", translateText);

async function translateText() {

  const input = document
    .getElementById("inputText")
    .value
    .trim();

  const output = document
    .getElementById("outputText");

  const direction = document
    .getElementById("direction")
    .value;

  const variant = document
    .getElementById("englishVariant")
    .value;

  if(!input){
    output.value = "Enter text...";
    return;
  }

  const lower = input.toLowerCase();

  // 🔥 Проверка идиом
  if(idioms[lower]){
    output.value = idioms[lower];
    return;
  }

  let from = "ru";
  let to = "en";

  if(direction === "en-ru"){
    from = "en";
    to = "ru";
  }

  try{

    const response = await fetch("/translate",{
      method:"POST",
      headers:{
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        text:input,
        from,
        to
      })
    });

    const data = await response.json();

    let translated = data.translated;

    // 🔥 English variants adaptation
    if(to === "en"){

      if(variants[variant]){

        for(let word in variants[variant]){

          const regex = new RegExp(`\\b${word}\\b`,"gi");

          translated = translated.replace(
            regex,
            variants[variant][word]
          );
        }
      }
    }

    output.value = translated;

  }catch(error){

    output.value = "Translation error";

  }
}