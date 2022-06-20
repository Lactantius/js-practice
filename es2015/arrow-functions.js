function double(arr) {
  return arr.map((val) => val * 2);
}

function squareAndFindEvens(numbers) {
  return numbers.map((n) => n ** 2).filter((n) => n % 2 === 0);
}
