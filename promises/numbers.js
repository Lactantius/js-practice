"use strict";
/*
 * Number Trivia
 */
const getNumberTriviaForm = document.querySelector("#get-number-trivia-form");
const singleNumInput = getNumberTriviaForm.querySelector("input");
const getMultiNumberTriviaForm = document.querySelector("#get-multi-number-trivia-form");
const multiNumInput = getMultiNumberTriviaForm.querySelector("input");
const triviaList = document.querySelector("#trivia-list");
function getNumberFacts(n) {
    return fetch(`http://numbersapi.com/${n}?json`)
        .then((res) => res.json())
        .then((json) => json.text)
        .catch((err) => err);
}
function getMultipleNumberFacts(numbers) {
    const numString = numbers.join(",");
    console.log(numString);
    return fetch(`http://numbersapi.com/${numString}?json`)
        .then((res) => res.json())
        .then((json) => Object.values(json))
        .catch((err) => err);
}
function addNumberFactToDom(fact) {
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
getMultiNumberTriviaForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const numbers = multiNumInput.value;
    const numbers_array = numbers.split(" ");
    if (numbers_array.length > 1) {
        const trivia = getMultipleNumberFacts(numbers_array);
        trivia.then((facts) => facts.forEach((fact) => addNumberFactToDom(fact)));
    }
    else {
        const trivia = getNumberFacts(Number(numbers_array.join()));
        trivia.then((fact) => addNumberFactToDom(fact));
    }
    getMultiNumberTriviaForm.reset();
});
/*
 * Deck of Cards
 */
//const getCardForm = document.querySelector("#get-card-form") as HTMLFormElement;
const getDeckForm = document.querySelector("#get-deck-form");
const cardsContainer = document.querySelector("#cards-container");
const cardsControls = document.querySelector("#cards-controls");
function getDeck() {
    return fetch("http://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
        .then((res) => res.json())
        .then((json) => json.deck_id)
        .catch((err) => err);
}
function drawCard(deck_id) {
    return fetch(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then((res) => res.json())
        .then((json) => json.cards[0].image)
        .catch((err) => {
        const drawCardButton = cardsControls.querySelector("#draw-card-button");
        cardsControls.removeChild(drawCardButton);
        return "none";
    });
}
function makeGetCardButton(deck) {
    const button = document.createElement("button");
    button.innerText = "Draw a card";
    button.id = "draw-card-button";
    button.addEventListener("click", (evt) => {
        evt.preventDefault();
        const cardImgURL = drawCard(deck);
        cardImgURL.then((url) => (url === "none" ? null : addCardToDOM(url)));
    });
    cardsControls.append(button);
}
function addCardToDOM(url) {
    const img = document.createElement("img");
    img.src = url;
    img.classList.add("card");
    cardsContainer.append(img);
}
getDeckForm.addEventListener("submit", (evt) => {
    evt.preventDefault();
    const oldButton = cardsControls.querySelector("#draw-card-button");
    if (oldButton) {
        cardsControls.removeChild(oldButton);
    }
    cardsContainer.replaceChildren("");
    const deck = getDeck();
    deck.then((deck) => makeGetCardButton(deck));
});
