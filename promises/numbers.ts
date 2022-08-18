"use strict";

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
    .then((res) => res.json().then((json) => json.text))
    .catch((err) => err);
}

function getMultipleNumberFacts(numbers: string[]): Promise<string[]> {
  const numString = numbers.join(",");
  console.log(numString);
  return fetch(`http://numbersapi.com/${numString}?json`)
    .then((res) => res.json().then((json) => Object.values(json)))
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
    trivia.then((fact) => addNumberFactToDom(fact));
  }
  getMultiNumberTriviaForm.reset();
});
