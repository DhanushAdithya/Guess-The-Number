let random          = Math.floor(Math.random() * 100) + 1;
const previousGuess = document.querySelector('.guesses');
const rightWrong    = document.querySelector('.lastResult');
const lowOrHigh     = document.querySelector('.lowOrHi');
const guessSubmit   = document.querySelector('.guessSubmit');
const guessField    = document.querySelector('.guessField');
const resultDiv     = document.querySelector('.resultParas');
const score         = document.querySelector('.score');
let finalScore      = 10; 
let guessCount      = 1;
let resetButton;

const checkGuess = () => {
    let userGuess = Number(guessField.value);

    if (guessCount === 1) {
        previousGuess.textContent = 'Previous guess(es): ';
    }

    previousGuess.textContent += userGuess + ' ';

    if (userGuess === random) {
        rightWrong.textContent             = 'Congrats! You got it right!';
        rightWrong.style.backgroundColor   = '#2acf4e';
        lowOrHigh.textContent              = '';
        setGameOver();
    } else if (guessCount === 10) {
        rightWrong.textContent        = 'GAME OVER !!';
        rightWrong.style.fontWeight   = 'bold';
        lowOrHigh.textContent         = '';
        finalScore                    = 0;
        setGameOver();
    } else {
        rightWrong.textContent = 'Wrong!';
        rightWrong.style.backgroundColor = '#df3b1e';

        if (userGuess < random) {
            lowOrHigh.innerHTML = 'That was too <b>low!</b>';
        } else if (userGuess > random) {
            lowOrHigh.innerHTML = 'That was too <b>high!</b>';
        }
    }

    finalScore--;
    guessCount++;
    guessField.value = '';
    guessField.focus();
}

const enter = () => {
    if (event.keyCode == 13) {
        document.getElementById('guess').click()
    }
}

guessSubmit.addEventListener('click', checkGuess);
guessField.addEventListener('keydown',enter);

const setGameOver = () => {
    guessField.disabled      = true;
    guessSubmit.disabled     = true;
    guessField.style.cursor  = 'no-drop';
    guessSubmit.style.cursor = 'no-drop';
    guessSubmit.style.color  = '#4e4e4e';
    lowOrHigh.style.display  = 'none';
    score.textContent = finalScore;
    resetButton              = document.createElement('button');
    resetButton.textContent  = 'Start New Game';
    resultDiv.appendChild(resetButton);
    resetButton.addEventListener('click', resetGame);
}

const resetGame = () => {
    lowOrHigh.style.display  = 'block';
    guessSubmit.style.color  = 'black';
    guessSubmit.style.cursor = 'pointer';
    guessField.style.cursor  = 'text';
    score.textContent        = '';
    finalScore = 10;
    guessCount = 1;
    const resetParas = document.querySelectorAll('.resultParas p');

    for (let i = 0; i < resetParas.length; i++) {
        resetParas[i].textContent = '';
    }

    resetButton.parentNode.removeChild(resetButton);
    guessField.disabled  = false;
    guessSubmit.disabled = false;
    guessField.value     = '';
    guessField.focus();
    rightWrong.style.backgroundColor = 'transparent';
    random = Math.floor(Math.random() * 100) + 1;
}