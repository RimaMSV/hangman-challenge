"use strict";

const displayWordEl = document.querySelector(".word-display");
const guessesChanceEl = document.querySelector(".guesses-text");
const hintEl = document.querySelector(".hint-text");
const guessChancesEl = document.querySelector(".guesses-text > strong");
const keyboardEl = document.querySelector(".keyboard");
const modalEl = document.querySelector("#modal");
const playAgainBtnEl = document.querySelector(".play-again");

const maxGuesse = 6;
let wrongGuessCount = 0;
let chosenWord;
let chosenWordHint;
let chosenWordArr = [];

const createKeyboardLetter = () => {
  let Characters = Array.from({ length: 26 }, (_, index) =>
    String.fromCharCode(65 + index)
  );
  Characters.map(
    (item) =>
      (keyboardEl.innerHTML += `<button class="letter-btn">${item}</button>`)
  );
};

const generateRandomWord = (wordList) => {
  let randomIndex = Math.floor(Math.random() * wordList.length);

  chosenWord = wordList[randomIndex].word;
  chosenWordHint = wordList[randomIndex].hint;
  chosenWordArr = Array.from(
    { length: chosenWord.length },
    () => '<li class="letter"></li>'
  );
};

const renderWord = () => {
  displayWordEl.innerHTML = "";
  hintEl.innerHTML = "";

  for (let i = 0; i < chosenWordArr.length; i++) {
    displayWordEl.innerHTML += chosenWordArr[i];
  }
  hintEl.innerHTML = `Hint :<strong>${chosenWordHint}</strong>`;
};

const keyboardClick = (e) => {
  if (e.target.tagName.toUpperCase() == "BUTTON") {
    console.log(e.target.innerText); //for Test
    checkLetter(e.target.innerText);
  }
};

function checkLetter(letter) {
  let found = false;
  for (let i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i].toUpperCase() === letter) {
      found = true;
      chosenWordArr[
        i
      ] = `<li class="letter guessed">${letter.toUpperCase()}</li>`;
    }
  }
  if (!found) {
    found = false;
    wrongGuessCount++;

    guessChancesEl.innerText = `${wrongGuessCount} / ${maxGuesse}`;
  }
  renderWord();
}

keyboardEl.addEventListener("click", keyboardClick);

createKeyboardLetter();
generateRandomWord(wordList);
renderWord();

console.log(chosenWord);
console.log(chosenWordArr);
