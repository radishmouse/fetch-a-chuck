// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

// Global joke cache
let cachedJoke = 'Why did chuck norris cross the road? The road knew better than to cross him.';
let jokePromise;

// function that gets a chuck norris joke
function getJoke() {
    return fetch('https://api.icndb.com/jokes/random')
        .then(convertToJson)
        .then(cacheJoke)
        .then(extractJokeText)
        .catch(showCachedJoke)
        .then(drawJoke)
    // .then( j => {
    // //   document.body.textContent = j.value.joke
    //     drawJoke(j.value.joke);
    // } )    
}


function convertToJson(r) {
    // console.log(r);
    let payload = r.json();
    // create intermediate variable for 
    // debugging the response
    // console.log(payload);
    return payload;
    // what is convertToJson returning?
}

function cacheJoke(jokeObj) {
    // save jokeJson 
    // 1. global variable
    // cachedJoke = jokeObj.value.joke || cachedJoke; // keep what's in cachedJoke if jokeObj.value.joke is falsey
    // return jokeObj;
    // 2. localStorage.
    // Letting JS figure out if .joke exists.
    // That is - do we have a string, or do we have undefined?
    if (jokeObj.value.joke) { // opting in to "coercion"
        console.log('Caching joke to localStorage');
        localStorage.setItem('joke', jokeObj.value.joke);
    }
    return jokeObj;
}

function showCachedJoke(err) {
    console.log(err);
    // drawJoke(cachedJoke);
    return localStorage.getItem('joke');
}


function extractJokeText(jokeObj) {
    // debugger;
    // console.log(jokeObj);
    return jokeObj.value.joke;
    // return "Why did chuck norris cross the road? The road knew better than to cross him."
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
    triggerElement.addEventListener('click', function () {
        // console.log('about to start the promise chain');
        jokePromise = getJoke();
        // console.log('ok, I started the promise chain');
        // console.log(jokePromise);
        // console.log('that was a promise for the joke');
    });
}
main();