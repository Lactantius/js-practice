"use strict";
const getNumberTriviaForm = document.querySelector("#get-number-trivia-form");
const singleNumInput = getNumberTriviaForm.querySelector("input");
const getMultiNumberTriviaForm = document.querySelector("#get-multi-number-trivia-form");
const multiNumInput = getMultiNumberTriviaForm.querySelector("input");
const triviaList = document.querySelector("#trivia-list");
function getNumberFacts(n) {
    return fetch(`http://numbersapi.com/${n}?json`)
        .then((res) => res.json().then((json) => json.text))
        .catch((err) => err);
}
function getMultipleNumberFacts(numbers) {
    const numString = numbers.join(",");
    console.log(numString);
    return fetch(`http://numbersapi.com/${numString}?json`)
        .then((res) => res.json().then((json) => Object.values(json)))
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
