// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

/*
The `cachedJoke` variable is our lobal joke cache.

We set this to a default value, in case our initial fetch fails
(because the Internet is down, for example).

In the `saveJokeToCache` function, we save the value.
In the `getJokeFromCache` function, we will grab that value.
*/
let cachedJoke = 'Why did chuck norris cross the road? The road knew better than to cross him.';

// gets a chuck norris joke from the API using Ajax
function getJoke() {
    return fetch('https://api.icndb.com/jokes/random') // Make the Request.
        .then(convertToJson) // Scoop out the JSON contents, and return it to the next .then
        .then(saveJokeToCache) // While we've got the JSON contents, save a copy to localStorage, then return the joke data to the next .then
        .then(extractJokeText) // Grab just the joke text from the joke data, and return it to the next .then
        .catch(getJokeFromCache) // *IF* there was an error, grab the joke text from localStorage and return it to the next .then
        .then(drawJoke) // Receive the joke text and draw it to the DOM
}

// scoops out the JSON from the network Response
function convertToJson(r) { // Given the network Response from the API
    // create intermediate variable in case we need to debug 
    let payload = r.json();
    // console.log(payload);
    
    return payload; // Return the JSON contents
}

// save a snapshot of our joke data to localStorage
function saveJokeToCache(jokeObj) {
    // 1. global variable
    // cachedJoke = jokeObj.value.joke || cachedJoke; // keep what's in cachedJoke if jokeObj.value.joke is falsey

    // 2. localStorage.
    // Letting JS figure out if .joke exists.
    // That is, do we have a string, or do we have undefined?
    if (jokeObj.value.joke) { // opting in to "coercion" -- essentially testing if joke is undefined or not. If it's `undefined`, that's equivalent to `false` as far as our if statement is concerned.
        console.log('Caching joke to localStorage');
        localStorage.setItem('joke', jokeObj.value.joke);
    }

    // Return to the joke data as-is.
    // It's not saveJokeToCache's job to alter it in any way.
    return jokeObj;
}

// reports the error to the console
// returns the joke saved in localStorage
function getJokeFromCache(err) {
    console.log(err);
    return localStorage.getItem('joke');
}

// Grabs the joke text from the joke object.
// We do this because the joke object also contains some metadata about the joke.
function extractJokeText(jokeObj) {
    return jokeObj.value.joke;
}

// Draws joke to DOM
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