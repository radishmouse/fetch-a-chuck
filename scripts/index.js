// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

function showError() {
    console.log('whoops');
    alert('something went wrong. you are not chuck norris');
    return 'knock knock';
}

// function that gets a chuck norris joke
function getJoke() {
    fetch('https://api.asdfsadf.com/jokes/random')
        .then(convertToJson)
        // .then(x => {debugger})
        .then(extractJokeText)
        .then(drawJoke)
        .catch(showError)
        .then(x => {
            console.log('i am still here!');
            console.log(x);
        })
}

// function that gets a list of GoT characters
function getList() {
    fetch('https://www.anapioficeandfire.com/api/characters')
        .then(convertToJson)
        .then(getUrlForOneCharacter)
        .then(getCharacterData)
        .then(convertToJson)
        .then(x => console.log(x))
        // .then(drawCharacterData)
}


// function that gets one character
function getUrlForOneCharacter(characterArray) {
    // console.log(characterArray);
    let firstCharacter = characterArray[0];
    return firstCharacter.url;
}

function getCharacterData(url) {
    return fetch(url);
}


function convertToJson(r) {
    return r.json();
}

function extractJokeText(jokeObj) {
    return jokeObj.value.joke;
}

// function that draws joke to DOM
function drawJoke(jokeText) {
    const newJoke = document.createElement('li');
    newJoke.textContent = jokeText;

    // not returning, just appending
    outputElement.appendChild(newJoke);
}


// main function that attaches button listener
function main() {
    triggerElement.addEventListener('click', getList);
}
main();