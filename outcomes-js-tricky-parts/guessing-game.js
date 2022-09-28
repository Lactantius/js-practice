function guessingGame() {
  const answer = Math.floor(Math.random() * 100);
  let count = 0;
  let won = false;
  return (guess) => {
    if (won) {
      return "The game is over, you already won!";
    }
    if (guess === answer) {
      won = true;
      return `You win! You found ${answer} in ${count + 1} guesses.`;
    }
    if (guess < answer) {
      count++;
      return `${guess} is too low!`;
    }
    if (guess > answer) {
      count++;
      return `${guess} is too high!`;
    }
  };
}

module.exports = { guessingGame };
