const gameType = "neato";
const myGuess = Math.floor(Math.random()*20) + 1;
let guesses = 0;
let guess;
while (guess !== myGuess){
    guess = parseInt(prompt('What number am I thinking of?'),10);
    guesses++;
    if(guess < myGuess) {
        alert("Nope. Higher.");
    }else if(guess > myGuess) {
        alert("No, lower");
    }
}
alert(`Well done! You got it in ${ guesses }!`);