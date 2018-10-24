// DOM selection
const triggerElement = document.querySelector('[ data-trigger]');
const outputElement = document.querySelector('[ data-output]');

function handleZodiacError(whichSign) {
    console.log(whichSign);
}

// Fetches the zodiac information from the API.
// The API sends back the Response, but does not include the "Access-Control-Allow-Origin"
// Without that header, the browser thinks the contents of the Response aren't safe to use.
// So, your JavaScript is not allowed to access it.
function getZodiac() {
    // This only happens when you're accessing an API built by someone else (i.e., not you).
    // The workaround is to use the "my-little-cors-proxy" that adds the appropriate header.
    fetch('https://my-little-cors-proxy.herokuapp.com/https://zodiacal.herokuapp.com/api')
        .then(convertToJson)
        .then(function (payload) {
            console.log(payload);
            // Only logging to console for now, for demo purposes
        })
        .catch(function () {
            handleZodiacError(sign);
        });
}


// main function that attaches button listener
function main() {
    triggerElement.addEventListener('click', getZodiac);
}
main();