const facts = { numPlanets: 9, yearNeptuneDiscovered: 1846 };
const { numPlanets, yearNeptuneDiscovered } = facts;

console.log(numPlanets); // 9
console.log(yearNeptuneDiscovered); // 1846

const planetFacts = {
  numPlanets: 9,
  yearNeptuneDiscovered: 1846,
  yearMarsDiscovered: 1659,
};

const { nPlanets, ...discoveryYears } = planetFacts;

console.log(discoveryYears); // {yearNeptuneDiscovered: 1846, yearMarsDiscovered: 1659}

function getUserData({ firstName, favoriteColor = "green" }) {
  return `Your name is ${firstName} and you like ${favoriteColor}`;
}

getUserData({ firstName: "Alejandro", favoriteColor: "purple" }); // ?
getUserData({ firstName: "Melissa" }); // Your name is Melissa and you like green.
getUserData({}); // Your name is undefined and you like green.

const [prima, secunda, tertia] = ["Maya", "Marisa", "Chi"];

console.log(prima); // "Maya"
console.log(secunda); // "Marisa"
console.log(tertia); // "Chi"

const [raindrops, whiskers, ...aFewOfMyFavoriteThings] = [
  "Raindrops on roses",
  "whiskers on kittens",
  "Bright copper kettles",
  "warm woolen mittens",
  "Brown paper packages tied up with strings",
];

console.log(raindrops); // "Raindrops on roses"
console.log(whiskers); // "Whiskers on kittens"
console.log(aFewOfMyFavoriteThings); // [  "Bright copper kettles", "warm woolen mittens", "Brown paper packages tied up with strings"]

let numbers = [10, 20, 30];
[numbers[1], numbers[2]] = [numbers[2], numbers[1]];

console.log(numbers); // [10, 30, 20]

/* ES5 Assigning Variables to Object Properties */
var obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

var a = obj.numbers.a;
var b = obj.numbers.b;

/* Write an ES2015 Version */
const obj = {
  numbers: {
    a: 1,
    b: 2,
  },
};

const { a, b } = obj.numbers;

/* ES5 Array swap */
var arr = [1, 2];
var temp = arr[0];
arr[0] = arr[1];
arr[1] = temp;

/* ES2015 One-Line Array Swap with Destructuring */
const arr = [1, 2];
[arr[0], arr[1]] = [arr[1], arr[0]];

/* Race Results */
// Checked the answer for this one.
const raceResults = ([first, second, third, ...rest]) => ({
  first,
  second,
  third,
  rest,
});
