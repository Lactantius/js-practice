function countDown(n) {
    setTimeout(function () {
        if (n > 1) {
            console.log(n - 1);
            countDown(n - 1);
        }
        else {
            console.log("DONE!");
        }
    }, 1000);

}

function randomGame(tries) {
    if (tries === void 0) { tries = 1; }
    setTimeout(function () {
        Math.random() > .75 ? console.log(tries) : randomGame(tries + 1);
    }, 1000);
}
