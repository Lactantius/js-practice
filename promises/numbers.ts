"use strict";

const getTriviaForm = document.querySelector('#get-number-trivia') as HTMLFormElement;
const singleNumInput = getTriviaForm.querySelector('input') as HTMLInputElement;

const triviaList = document.querySelector('#trivia-list') as HTMLUListElement;

function getNumberFacts(n: number): Promise<any> {
  return fetch(`http://numbersapi.com/${n}?json`)
    .then(res => res.json().then(json => json.text))
    .catch(err => err)
}

function getMultipleNumberFacts(numbers: [number]): void {
  const numString = numbers.join(',')
  fetch(`http://numbersapi.com/${numString}?json`)
    .then(res => console.log(res.json()))
    .catch(err => console.log(err))
}


getTriviaForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const n = singleNumInput.valueAsNumber;
  const trivia = getNumberFacts(n);
  addNumberFactToDom(trivia);
});

function addNumberFactToDom(trivia: Promise<any>): void {
  trivia.then(fact => {
    const li = document.createElement('li');
    li.innerText = fact;
    triviaList.append(li);
  })
}
