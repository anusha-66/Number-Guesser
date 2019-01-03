/**
 * Game Funtion:
 * Player must guess a number between a min and a max
 * player gets a certain amount of guesses
 * notify player of guesses remaining
 * notify player of a correct guess if lost
 * let player choose if he wants to play again
 */

// Game Values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min,max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#guess-btn'),
    guessInput = document.querySelector('#guess-input'),
    message = document.querySelector('.message');

// Assign UI min and Max

minNum.textContent = min;
maxNum.textContent = max;

// Play again event listener
game.addEventListener('mousedown', function(e){
    if(e.target.className === 'play-again'){
        window.location.reload();
    }
});

//Listen for guess
guessBtn.addEventListener('click', function () {
    let guess = parseInt(guessInput.value);

    //Validate
    if (isNaN(guess) || guess < min || guess > max) {
        setMessage(`Please Enter a number between ${min} and ${max}`, red);
    }

    //check if won
    if (guess === winningNum) {

        //Game over - won

        gameOver(true, `${winningNum} is correct!, You Win`);

    } else {
        // Wrong number
        guessesLeft -= 1;

        if (guessesLeft === 0) {
            //Game Over - Lost

            gameOver(false, `Game Over, Correct num is ${winningNum} Try Again`)

        } else {

            //Game continues answe wrong

            guessInput.style.borderColor = 'red';

            //Clear Input
            guessInput.value = '';

            setMessage(`Incorrect Guess, ${guessesLeft} guesses left, Try Again`, 'red');
        }
    }
});


// Game Over
function gameOver(won, msg) {

    let color;
    won === true ? color = 'green' : color = 'red';
    // Disable Inout
    guessInput.disabled = true;
    //change border color
    guessInput.style.borderColor = color;
    //set text color
    message.style.color = color;
    //Set message
    setMessage(msg);

    //Play Again
    guessBtn.value = 'Play Again';
    //Add class to play again btn
    guessBtn.className += 'play-again';
}

// Get Winning num
function getRandomNum(min, max){
   let num = Math.floor(Math.random()*(max - min +1) + min);
   console.log(num);
   return num;
}

// set message
function setMessage(msg, color) {
    message.style.color = color;
    message.textContent = msg;
}