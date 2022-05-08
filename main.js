// HTML Elements
const textDisplay = document.querySelector('#text-display');
const inputField = document.querySelector('#input-field');

// Count variables
let wordCount;
let timeCount;

var allWords = ["here", "are", "some", "test", "words", "to", "use", "for", "testing", "alternatively", "complex", "expressions", "may", "reside", "in", "this", "spectacular", "subset", "of", "the", "english", "dictionary"];
var randomWords = [];

// Variables for speed test
let currentWord = 0; 
let correctChars = 0;
let incorrectChars = 0;
let totalChars = 0;
let startTime = 0;

function init() {
    setWordCount(10);
}

function setWordCount(count) {
    wordCount = count;
    document.querySelectorAll('#word-count > span').forEach(e => (e.style.borderBottom = ''));
    document.querySelector(`#wc-${wordCount}`).style.borderBottom = '2px solid';
    showText();
}

function showText() {
    textDisplay.style.height = 'auto';
    textDisplay.innerHTML = '';
    
    // Reset list
    randomWords = [];

    while(randomWords.length < wordCount) {
        let randInt = Math.floor(Math.random() * allWords.length);
        const randomWord = allWords[randInt];
        randomWords.push(randomWord);

        let span = document.createElement('span');
        span.innerHTML = randomWord + ' ';
        textDisplay.appendChild(span);
    } 

    textDisplay.firstChild.classList.add('highlight');
    inputField.focus();
}

inputField.addEventListener('keydown', e => {
    if (currentWord < randomWords.length) {
        inputFieldClass();
    }

    function inputFieldClass() {
        // User inputs a letter
        if (e.key >= 'a' && e.key <= 'z') {
            let userInput = inputField.value + e.key;
            let correctInput = randomWords[currentWord].slice(0, userInput.length);
            inputField.className = userInput === correctInput ? '' : 'incorrect';
        } 
        // User deletes a character
        else if (e.key === 'Backspace') {
            let userInput = inputField.value.slice(0, inputField.value.length - 1);
            let correctInput = randomWords[currentWord].slice(0, userInput.length);
            inputField.className = userInput === correctInput ? '' : 'incorrect';
        } 
        // User inputs a space (next word)
        else if (e.key === ' ') {
            inputField.className = ' ';

            e.preventDefault();

            // Increment currentWord if it is not the last word
            if (currentWord < randomWords.length -1) {

                // The word is correct
                if (inputField.value === randomWords[currentWord]) {
                    textDisplay.childNodes[currentWord].classList.add('correct');
                    correctChars += randomWords[currentWord].length + 1;
                    totalChars += randomWords[currentWord].length + 1;
                }
                // The word is incorrect
                else {
                    textDisplay.childNodes[currentWord].classList.add('incorrect');
                    incorrectChars += randomWords[currentWord].length + 1;
                    totalChars += randomWords[currentWord].length + 1;
                }
                // Highlight next word
                textDisplay.childNodes[currentWord + 1].classList.add('highlight');

            }

            inputField.value = '';
            currentWord++;
        }

        // Start the timer if this is the first character input
        if (currentWord === 0 && inputField.value === '') {
            startTime = Date.now();
        }
    }
})

init();