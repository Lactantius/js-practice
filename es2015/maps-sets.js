new Set([1, 1, 2, 2, 3, 4]); // {1, 2, 3, 4}

[...new Set("referee")].join(""); // 'ref'

let m = new Map();
m.set([1, 2, 3], true);
m.set([1, 2, 3], false);
// m = { 0: {[1, 2, 3]: true}, 1: {[1, 2, 3]: false} }

function hasDupicate(arr) {
  return arr.length !== new Set(arr).size;
}

function vowelCount(str) {
  return str
    .toLowerCase()
    .split("")
    .reduce(function (map, char) {
      if ("aeiou".includes(char)) {
        return map.get(char)
          ? map.set(char, map.get(char) + 1)
          : map.set(char, 1);
      } else {
        return map; // Otherwise map is undefined on next run.
      }
    }, new Map());
}
