"use strict";

const displayWordEl = document.querySelector(".word-display");
const hangmanImageEl = document.querySelector(".hangman-box > img");
const guessesChanceEl = document.querySelector(".guesses-text");
const hintEl = document.querySelector(".hint-text");
const guessChancesEl = document.querySelector(".guesses-text > strong");
const keyboardEl = document.querySelector(".keyboard");

const modalEl = document.querySelector("#modal");
const resultImg = document.querySelector("#modal > img");
const resultMsg = document.querySelector("#modal > h4");
const resultDesc = document.querySelector("#modal > p");
const playAgainBtnEl = document.querySelector(".play-again");

let maxGuesse = 6;
let wrongGuessCount = 0;
let chosenWord;
let chosenWordHint;
let chosenWordArr = [];
let correctLetters = [];

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

let checkLetter = (e) => {
  let foundLetterFlag = false;
  for (let i = 0; i < chosenWord.length; i++) {
    if (chosenWord[i].toUpperCase() === e.innerText) {
      foundLetterFlag = true;
      correctLetters.push(e.innerText);
      console.log(correctLetters);
      chosenWordArr[
        i
      ] = `<li class="letter guessed">${e.innerText.toUpperCase()}</li>`;

      e.classList.add("disabled");
    }
  }
  hangmanImageEl.src = `images/hangman-${wrongGuessCount}.svg`;
  guessChancesEl.innerText = `${wrongGuessCount} / ${maxGuesse}`;

  if (!foundLetterFlag) {
    foundLetterFlag = false;
    wrongGuessCount++;
  }
  const initGame = function () {
    modalEl.close();
    wrongGuessCount = 0;
    chosenWord;
    chosenWordHint;
    chosenWordArr = [];
    correctLetters = [];

    keyboardEl.innerHTML = "";
    createKeyboardLetter();
    keyboardEl.classList.remove("disabled");
    hangmanImageEl.src = `images/hangman-${wrongGuessCount}.svg`;
    guessChancesEl.innerText = `${wrongGuessCount} / ${maxGuesse}`;

    generateRandomWord(wordList);
    console.log(chosenWord); // for Test
    renderWord();
  };
  if (wrongGuessCount > maxGuesse) {
    modalEl.showModal();

    resultMsg.innerHTML = "";
    resultDesc.innerHTML = "";
    resultImg.src = `images/lost.gif`;
    resultMsg.innerHTML = `<h4 class="lose-msg">Game Over!</h4>`;
    resultDesc.innerHTML = `<p>The correct word was : <strong>${chosenWord}</strong></p>`;

    playAgainBtnEl.addEventListener("click", initGame);
  } else if (correctLetters.length === chosenWord.length) {
    // console.log("you win");
    keyboardEl.classList.add("disabled");
    modalEl.showModal();

    resultMsg.innerHTML = "";
    resultDesc.innerHTML = "";
    resultImg.src = `images/victory.gif`;
    resultMsg.innerHTML = `<h4 class="win-msg">Congrats!</h4>`;
    resultDesc.innerHTML = `<p>You found the word : <strong>${chosenWord}</strong></p>`;

    playAgainBtnEl.addEventListener("click", initGame);
  }
  renderWord();
};

const keyboardClick = (e) => {
  if (e.target.tagName.toUpperCase() == "BUTTON") {
    console.log(e.target.innerText); //for Test
    checkLetter(e.target);
  }
};

keyboardEl.addEventListener("click", keyboardClick);

createKeyboardLetter();
generateRandomWord(wordList);
renderWord();

console.log(chosenWord); //for Test
console.log(chosenWordArr); // for Test
