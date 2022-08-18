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

interface NumberFact {
  text: string;
  number: number;
  found: boolean;
  type: string;
}

async function getNumberFacts(n: number): Promise<string> {
  const res = await fetch(`http://numbersapi.com/${n}?json`);
  const json: NumberFact = await res.json(); /* Is there a better way? */
  return json.text;
}

async function getMultipleNumberFacts(numbers: number[]): Promise<string[]> {
  const numString = numbers.join(",");
  const res = await fetch(`http://numbersapi.com/${numString}?json`);
  const json = await res.json();
  return Object.values(json);
}

function addNumberFactToDom(fact: string): void {
  const li = document.createElement("li");
  li.innerText = fact;
  triviaList.append(li);
}

getNumberTriviaForm.addEventListener("submit", async (evt: SubmitEvent) => {
  evt.preventDefault();
  const n = singleNumInput.valueAsNumber;
  const fact = await getNumberFacts(n);
  addNumberFactToDom(fact);
  getNumberTriviaForm.reset();
});

/*
 * This function does not catch invalid input
 */
getMultiNumberTriviaForm.addEventListener(
  "submit",
  async (evt: SubmitEvent) => {
    evt.preventDefault();
    const numbers = multiNumInput.value
      .split(" ")
      .map((n) => Number(n))
      .filter((n) => isFinite(n));

    if (numbers.length > 1) {
      const facts = await getMultipleNumberFacts(numbers);
      facts.forEach((fact) => addNumberFactToDom(fact));
    } else {
      const fact = await getNumberFacts(Number(numbers.join()));
      addNumberFactToDom(fact);
    }

    getMultiNumberTriviaForm.reset();
  }
);

/*
 * Deck of Cards
 */

const getDeckForm = document.querySelector("#get-deck-form") as HTMLFormElement;
const cardsContainer = document.querySelector(
  "#cards-container"
) as HTMLDivElement;
const cardsControls = document.querySelector(
  "#cards-controls"
) as HTMLDivElement;

interface Deck {
  deck_id: string; // There's more, but it's not really needed here
}

async function getDeck(): Promise<string> {
  const res = await fetch(
    "http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1"
  );
  const json: Deck = await res.json();
  return json.deck_id;
}

/* Again, there's more to these */
interface CardDraw {
  cards: Card[];
  remaining: number;
}

interface Card {
  image: string;
}

async function drawCard(deck_id: string): Promise<string> {
  const res = await fetch(
    `http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`
  );
  const json: CardDraw = await res.json();

  /* Remove button if no cards are remaining */
  if (json.remaining === 0) {
    const drawCardButton = cardsControls.querySelector(
      "#draw-card-button"
    ) as HTMLButtonElement;
    cardsControls.removeChild(drawCardButton);
  }

  return json.cards[0].image;
}

function makeGetCardButton(deck: string): void {
  const button = document.createElement("button");
  button.innerText = "Draw a card";
  button.id = "draw-card-button";

  button.addEventListener("click", async (evt: MouseEvent) => {
    evt.preventDefault();
    const cardImgURL = await drawCard(deck);
    addCardToDOM(cardImgURL);
  });

  cardsControls.append(button);
}

function addCardToDOM(url: string): void {
  const img = document.createElement("img") as HTMLImageElement;
  img.src = url;
  img.classList.add("card");
  cardsContainer.append(img);
}

getDeckForm.addEventListener("submit", async (evt: SubmitEvent) => {
  evt.preventDefault();
  const oldButton = cardsControls.querySelector("#draw-card-button");
  if (oldButton) {
    cardsControls.removeChild(oldButton);
  }
  cardsContainer.replaceChildren("");
  const deck = await getDeck();
  makeGetCardButton(deck);
});
