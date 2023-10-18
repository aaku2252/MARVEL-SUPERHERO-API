const MD5 = require("crypto-js/md5");
// need fuzzyset library

const privateKey = "";
const publicKey = "";
let ts = new Date().getTime();
let hash = MD5(ts + privateKey + publicKey);

let api = `https://gateway.marvel.com:443/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${MD5(
    ts + privateKey + publicKey
)}`;
let filteredData;
fetch(api)
    .then((response) => response.json())
    .then((data) => filters(data));

function filters(data) {
    filteredData = data.data.results;
    console.log(filteredData);
}

setTimeout(() => {
    console.log(filteredData);
}, 5000);

// Create a list of options.
const options = ["apple", "banana", "orange", "pear"];

// Create a function to get suggestions for the given input text.
function getSuggestions(inputText) {
    const suggestions = [];
    for (const option of options) {
        if (difflib.SequenceMatcher(null, inputText, option).ratio() > 0.5) {
            suggestions.push(option);
        }
    }
    return suggestions;
}

// Create a function to update the list of suggestions based on the given input text.
function updateSuggestions(inputText, suggestions) {
    const newSuggestions = [];
    for (const suggestion of suggestions) {
        if (inputText.includes(suggestion)) {
            newSuggestions.push(suggestion);
        }
    }
    return newSuggestions;
}

// Get the input element.
const input = document.querySelector("input");

// Update the list of suggestions whenever the user types in the input bar.
input.addEventListener("input", () => {
    const inputText = input.value;
    const suggestions = getSuggestions(inputText);

    // Display the suggestions to the user.
    // TODO: Implement this part.
});

//>----------------------------------------------------------
function getSuggestions(inputText) {
    const suggestions = [];
    for (const option of options) {
        // Convert both inputText and option to lowercase for case-insensitive comparison
        const normalizedInput = inputText.toLowerCase();
        const normalizedOption = option.toLowerCase();

        // Check for exact match or match with hyphen replaced by space
        if (
            normalizedInput === normalizedOption ||
            normalizedInput === normalizedOption.replace(/-/g, " ")
        ) {
            suggestions.push(option);
            continue;
        }

        // Check for match with variations in spacing
        const inputWords = normalizedInput.split(" ");
        const optionWords = normalizedOption.split(" ");
        if (inputWords.length === optionWords.length) {
            let matches = true;
            for (let i = 0; i < inputWords.length; i++) {
                if (!optionWords.includes(inputWords[i])) {
                    matches = false;
                    break;
                }
            }
            if (matches) {
                suggestions.push(option);
            }
        }
    }
    return suggestions;
}
//>----------------------------------------------------------------
function getSuggestions(inputText) {
    const suggestions = [];
    for (const option of options) {
        // Calculate the similarity between the input text and the option, ignoring spaces and punctuation.
        const similarity = difflib
            .SequenceMatcher(
                null,
                inputText.replace(/\s+/g, "").replace(/[^\w]/g, ""),
                option.replace(/\s+/g, "").replace(/[^\w]/g, "")
            )
            .ratio();

        // If the similarity is above a threshold, add the option to the suggestions list.
        if (similarity > 0.5) {
            suggestions.push(option);
        }
    }
    return suggestions;
}
//>----------------------------------------------------------------
function getSuggestions(inputText) {
    const suggestions = [];
    for (const option of options) {
        // Calculate the similarity between the input text and the option, ignoring spaces and punctuation.
        const similarity = difflib
            .SequenceMatcher(
                null,
                inputText.replace(/\s+/g, "").replace(/[^\w]/g, ""),
                option.replace(/\s+/g, "").replace(/[^\w]/g, "")
            )
            .ratio();

        // If the similarity is above a threshold, add the option to the suggestions list.
        if (similarity > 0.5) {
            suggestions.push(option);
        }
    }
    return suggestions;
}
