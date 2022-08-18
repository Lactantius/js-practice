"use strict";

/*
 * Number Trivia
 */

const getNumberTriviaForm = document.querySelector(
  "#get-number-trivia-form"
) as HTMLFormElement;
const singleNumInput = getNumberTriviaForm.querySelector(
  "input"
) as HTMLInputElement;
const getMultiNumberTriviaForm = document.querySelector(
  "#get-multi-number-trivia-form"
) as HTMLFormElement;
const multiNumInput = getMultiNumberTriviaForm.querySelector(
  "input"
) as HTMLInputElement;

const triviaList = document.querySelector("#trivia-list") as HTMLUListElement;

function getNumberFacts(n: number): Promise<string> {
  return fetch(`http://numbersapi.com/${n}?json`)
    .then((res) => res.json())
    .then((json) => json.text)
    .catch((err) => err);
}

function getMultipleNumberFacts(numbers: string[]): Promise<string[]> {
  const numString = numbers.join(",");
  console.log(numString);
  return fetch(`http://numbersapi.com/${numString}?json`)
    .then((res) => res.json())
    .then((json) => Object.values(json))
    .catch((err) => err);
}

function addNumberFactToDom(fact: string): void {
  const li = document.createElement("li");
  li.innerText = fact;
  triviaList.append(li);
}

getNumberTriviaForm.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const n = singleNumInput.valueAsNumber;
  const trivia = getNumberFacts(n);
  trivia.then((fact) => addNumberFactToDom(fact));
  getNumberTriviaForm.reset();
});

/*
 * This function does not catch invalid input
 */
getMultiNumberTriviaForm.addEventListener("submit", (evt: SubmitEvent) => {
  evt.preventDefault();
  const numbers = multiNumInput.value;
  const numbers_array = numbers.split(" ");
  if (numbers_array.length > 1) {
    const trivia = getMultipleNumberFacts(numbers_array);
    trivia.then((facts) =>
      facts.forEach((fact: string) => addNumberFactToDom(fact))
    );
  } else {
    const trivia = getNumberFacts(Number(numbers_array.join()));
    trivia
      .then((fact) => addNumberFactToDom(fact))
      .catch((err) => console.log(err));
  }
  getMultiNumberTriviaForm.reset();
});

/*
 * Deck of Cards
 */

//const getCardForm = document.querySelector("#get-card-form") as HTMLFormElement;
const getDeckForm = document.querySelector("#get-deck-form") as HTMLFormElement;
const cardsContainer = document.querySelector(
  "#cards-container"
) as HTMLDivElement;
const cardsControls = document.querySelector(
  "#cards-controls"
) as HTMLDivElement;

function getDeck(): Promise<string> {
  return fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
    .then((res) => res.json())
    .then((json) => json.deck_id)
    .catch((err) => err);
}

function drawCard(deck_id: string): Promise<string> {
  return fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
    .then((res) => res.json())
    .then((json) => json.cards[0].image)
    .catch((err) => {
      const drawCardButton = cardsControls.querySelector(
        "#draw-card-button"
      ) as HTMLButtonElement;
      cardsControls.removeChild(drawCardButton);
      return "none";
    });
}

function makeGetCardButton(deck: string): void {
  const button = document.createElement("button");
  button.innerText = "Draw a card";
  button.id = "draw-card-button";
  button.addEventListener("click", (evt: MouseEvent) => {
    evt.preventDefault();
    const cardImgURL = drawCard(deck);
    cardImgURL.then((url) => (url === "none" ? null : addCardToDOM(url)));
  });
  cardsControls.append(button);
}

function addCardToDOM(url: string): void {
  const img = document.createElement("img") as HTMLImageElement;
  img.src = url;
  img.classList.add("card");
  cardsContainer.append(img);
}

getDeckForm.addEventListener("submit", (evt: SubmitEvent) => {
  evt.preventDefault();
  const oldButton = cardsControls.querySelector("#draw-card-button");
  if (oldButton) {
    cardsControls.removeChild(oldButton);
  }
  cardsContainer.replaceChildren("");
  const deck = getDeck();
  deck.then((deck) => makeGetCardButton(deck));
});
