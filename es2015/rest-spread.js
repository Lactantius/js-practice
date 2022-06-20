function filterOutOdds(...nums) {
  return nums.filter((n) => n % 2 === 0);
}

function findMin(...nums) {
  return nums.reduce((min, next) => (min < next ? min : next));
}

function mergeObjects(first, second) {
  return { ...first, ...second };
}

function doubleAndReturnArgs(arr, ...args) {
  return [...arr, ...args.map((n) => n * 2)];
}

/** remove a random element in the items array
and return a new array without that item. */
// Random index taken from https://stackoverflow.com/a/5915122
function removeRandom(items) {
  const random = Math.floor(Math.random() * items.length);
  return items.filter((_, index) => index !== random);
}

/** Return a new array with every item in array1 and array2. */
function extend(array1, array2) {
  return [...array1, ...array2];
}

/** Return a new object with all the keys and values
from obj and a new key/value pair */
function addKeyVal(obj, key, val) {
  return { ...obj, ...{ [key]: val } };
}

/** Return a new object with a key removed. */
// Modified from https://stackoverflow.com/questions/33053310/remove-value-from-object-without-mutation/33053362
function removeKey(obj, key) {
  const { [key]: ignore, ...remainingKeys } = obj;
  return remainingKeys;
}

/** Combine two objects and return a new object. */
function combine(obj1, obj2) {
  return { ...obj, ...obj2 };
}

/** Return a new object with a modified key and value. */
// Should be the same as addKeyVal(obj, key, val)
