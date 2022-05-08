// HTML Elements
const textDisplay = document.querySelector('#text-display');
const inputField = document.querySelector('#input-field');

// Count variables
let wordCount;
let timeCount;

var allWords = ["here", "are", "some", "test", "words", "to", "use", "for", "testing", "alternatively", "complex", "expressions", "may", "reside", "in", "this", "spectatcular", "subset", "of", "the", "english", "dictionary"];
var randomWords = [];

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
        console.log(randInt);
        randomWords.push(randomWord);

        let span = document.createElement('span');
        span.innerHTML = randomWord + ' ';
        textDisplay.appendChild(span);
    } 

    textDisplay.firstChild.classList.add('highlight');
    inputField.focus();
}

init();