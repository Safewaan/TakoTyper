// HTML Elements
const textDisplay = document.querySelector('#text-display');
const inputField = document.querySelector('#input-field');
const results = document.querySelector('#results');
const mainArea = document.querySelector("#main-area");
const themeArea = document.querySelector('#theme-area');

// Hide the theme area
themeArea.style.display = "none";

// Count variables
let wordCount;
let timeCount;

var allWords = ["here", "are", "some", "test", "words", "to", "use", "for", "testing", "alternatively", "complex", "expressions", "may", "reside", "in", "this", "spectacular", "subset", "of", "the", "english", "dictionary"];
var randomWords = [];

// Variables for speed test
let currentWord = 0;
let correctWords = 0;
let correctChars = 0;
let totalChars = 0;
let startTime = 0;

function resetState() {
    currentWord = 0;
    correctWords = 0;
    correctChars = 0;
    totalChars = 0
    startTime = 0;
    results.innerHTML = "Words/Minute: | Accuracy: ";
}

function init() {
    setWordCount(10);
    showAllThemes()
}


// set functions
function setWordCount(count) {
    resetState();

    wordCount = count;
    document.querySelectorAll('#word-count > span').forEach(e => (e.style.borderBottom = ''));
    document.querySelector(`#wc-${wordCount}`).style.borderBottom = '2px solid';
    showText();
}

function setTheme(_theme) {
    let theme = _theme.toLowerCase();
    fetch(`themes/${theme}.css`).then(response => {
        if (response.status === 200) {
            response.text().then(css => {
                document.querySelector("#theme").setAttribute('href', `themes/${theme}.css`);
            })
                .catch(error => console.error(error));
        }
        else {
            console.log(`The theme ${theme} was not found.`);
        }
    })
        .catch(error => console.error(error));
}

// show functions
function showText() {
    textDisplay.style.height = 'auto';
    textDisplay.innerHTML = '';

    resetState();

    // Reset list
    randomWords = [];

    while (randomWords.length < wordCount) {
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

function showResults() {
    let timeTakenMin, accuracy, wpm;
    timeTakenMin = (Date.now() - startTime) / 1000 / 60;
    accuracy = Math.floor((correctChars / totalChars) * 100);
    wpm = Math.floor(correctWords / timeTakenMin);
    results.innerHTML = `Words/Minute: ${wpm} | Accuracy: ${accuracy}`;
}

function showThemeArea() {
    mainArea.style.display = "none";
    themeArea.style.display = "block";
}

function showMainArea() {
    mainArea.style.display = "block";
    themeArea.style.display = "none";
}

function showAllThemes() {
    fetch(`themes/theme-data.json`).then(response => {
        if (response.status === 200) {
            response.text().then(body => {
                let themes = JSON.parse(body);
                let keys = Object.keys(themes);

                for (var i = 0; i < keys.length; i++) {
                    if (keys[i] != "colors") {
                        let theme = document.createElement('div');
                        theme.setAttribute('class', 'theme-button');
                        theme.setAttribute('onClick', `setTheme('${keys[i]}')`)
                        theme.setAttribute('id', keys[i]);
                        theme.textContent = keys[i];
                        theme.style.background = themes[keys[i]]['background'];
                        theme.style.color = themes[keys[i]]['color'];
                        document.getElementById('theme-menu').appendChild(theme);
                    }
                }
            })
                .catch(error => console.error(error));
        }
        else {
            console.log("Cannot find theme data.");
        }
    })
        .catch(error => console.error(error));
}

// Key input event
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
            if (currentWord < randomWords.length) {

                // The word is correct
                if (inputField.value === randomWords[currentWord]) {
                    textDisplay.childNodes[currentWord].classList.add('correct');
                    correctChars += randomWords[currentWord].length + 1;
                    totalChars += randomWords[currentWord].length + 1;
                    correctWords++;
                }
                // The word is incorrect
                else {
                    textDisplay.childNodes[currentWord].classList.add('incorrect');
                    totalChars += randomWords[currentWord].length + 1;
                }
            }

            // Show results after the last word is inputted
            if (currentWord === randomWords.length - 1) {
                showResults();
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