// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

function showError() {
    console.log('whoops');
    alert('something went wrong. you are not chuck norris');
    return 'knock knock';
}

// // function that gets a chuck norris joke
// function getJoke() {
//     fetch('https://api.asdfsadf.com/jokes/random')
//         .then(convertToJson)
//         // .then(x => {debugger})
//         .then(extractJokeText)
//         .then(drawJoke)
//         .catch(showError)
//         .then(x => {
//             console.log('i am still here!');
//             console.log(x);
//         })
// }




// // function that gets a list of GoT characters
// function getList() {
//     fetch('https://www.anapioficeandfire.com/api/characters')
//         .then(convertToJson)
//         .then(getUrlForOneCharacter)
//         .then(getCharacterData)
//         .then(convertToJson)
//         .then(x => console.log(x))
//         // .then(drawCharacterData)
// }


// // function that gets one character
// function getUrlForOneCharacter(characterArray) {
//     // console.log(characterArray);
//     let firstCharacter = characterArray[0];
//     return firstCharacter.url;
// }

// function getCharacterData(url) {
//     return fetch(url);
// }


// function extractJokeText(jokeObj) {
//     return jokeObj.value.joke;
// }

// // function that draws joke to DOM
// function drawJoke(jokeText) {
//     const newJoke = document.createElement('li');
//     newJoke.textContent = jokeText;

//     // not returning, just appending
//     outputElement.appendChild(newJoke);
// }



function convertToJson(r) {
    return r.json();
}


// now! with default arguments!
// a.k.a. "optional" arguments
// optional arguments *must/should* go after _required_ arguments

function getRandomInt(min=0, max=1000) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


function urlForRandomCharacter() {
    return `https://www.anapioficeandfire.com/api/characters/${getRandomInt()}`;
}

function getOneCharacter() {
    // let theRandomURL = urlForRandomCharacter();
    // return fetch(theRandomURL)
    return fetch(urlForRandomCharacter())
            .then(convertToJson)
            // .then(console.log)
}

function combineCharacterAndHouseInfo(characterInfo) {
    // let houseURL = characterInfo.allegiances[0];
    // console.log(houseURL);
    // let houseInfoPromise = getHouseInfo(houseURL) // what do i do with this?
    // and how will our hero combine it with the characterInfo?
    // return Promise.all([characterInfo, houseInfoPromise]);

    let houseInfoPromises = characterInfo.allegiances.map(getHouseInfo);
    return Promise.all([characterInfo, ...houseInfoPromises]);
}

function getHouseInfo(url) {
    return fetch(url)
            .then(convertToJson)
            // .then(x => {debugger})
}

function drawCharacterAndHouseInfo(arrayOfResults) {
    console.log(arrayOfResults);
}

function getCharacterAndHousesThenDraw() {
    getOneCharacter()
        .then(combineCharacterAndHouseInfo) // ???
        .then(drawCharacterAndHouseInfo)
}


// function getSeveralCharacters(howMany=3) {
//     // 
// }


// main function that attaches button listener
function main() {
    // triggerElement.addEventListener('click', );
}
main();