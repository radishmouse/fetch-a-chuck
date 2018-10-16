// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

// function that gets a chuck norris joke
function getJoke() {
    fetch('https://api.icndb.com/jokes/random')
        .then(convertToJson)
        .then(extractJokeText)
        .then(drawJoke)
    // .then( j => {
    // //   document.body.textContent = j.value.joke
    //     drawJoke(j.value.joke);
    // } )    
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
    triggerElement.addEventListener('click', getJoke);
}
main();