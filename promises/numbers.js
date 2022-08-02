"use strict";
var getTriviaForm = document.querySelector('#get-number-trivia');
var singleNumInput = getTriviaForm.querySelector('input');
var triviaList = document.querySelector('#trivia-list');
function getNumberFacts(n) {
    return fetch("http://numbersapi.com/".concat(n, "?json"))
        .then(function (res) { return res.json().then(function (json) { return json.text; }); })["catch"](function (err) { return err; });
}
function getMultipleNumberFacts(numbers) {
    var numString = numbers.join(',');
    fetch("http://numbersapi.com/".concat(numString, "?json"))
        .then(function (res) { return console.log(res.json()); })["catch"](function (err) { return console.log(err); });
}
getTriviaForm.addEventListener('submit', function (evt) {
    evt.preventDefault();
    var n = singleNumInput.valueAsNumber;
    var trivia = getNumberFacts(n);
    addNumberFactToDom(trivia);
});
function addNumberFactToDom(trivia) {
    trivia.then(function (fact) {
        var li = document.createElement('li');
        li.innerText = fact;
        triviaList.append(li);
    });
}
