'use strict';

const theKey = process.env.dictKey;
const body = document.querySelector('body');
const button = document.querySelector('button');
const button2 = document.querySelector('.search-button')
const word = document.createElement('h2');
body.appendChild(word);
const definition = document.createElement('p');
body.appendChild(definition);

const randomWord = () => {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
    .then(response => {
        return response.json();
    })
    .then(response => {
        word.textContent = response
        console.log(response);
        randomDefinition(word);
    })
    .catch(err => {
        console.log(err);
    });
}

const randomDefinition = () => {
    fetch(`https://www.dictionaryapi.com/api/v3/references/collegiate/json/${word.textContent}?key=${theKey}`)
    .then(response => {
        return response.json();
    })
    .then(response => {
        console.log(response[0].shortdef[0]);
        definition.textContent = "Definition: " + response[0].shortdef[0];
    })
    .catch(err => {
       console.error(err);
    });

}

const searchWord = () => {
    try {
        var searchedWord = window.prompt("Enter the word: ");
        word.textContent = searchedWord;
        console.log(searchedWord);
        randomDefinition(searchedWord);
    } catch (err){
        console.error(err);
    }

}

button.addEventListener('click', function(){
    randomWord();
})

button2.addEventListener('click', function(){
    searchWord();
})
