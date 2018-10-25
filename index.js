// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./Word");
var inquirer = require("inquirer");

var candidateArr = ["potato","pumpkin","salad","fries","noodle","boba"];
var guessesLeft = 10;
var random;
var candidateWord;

generateAns();

inquirer
    .prompt([
        {
            type: 'input',
            message: 'Guess a letter: ',
            name: 'letter'
        }
    ]).then(function(input) {

        checkAnswer(input);
    });

function generateAns() {
    console.log("\n--------------------\n");

    random = Math.floor(Math.random() * 6);
    console.log("The random number is: " + random);
    console.log("The word is: " + candidateArr[random]);
    candidateWord = new Word(candidateArr[random]);
    // candidateWord = new Word(candidateArr[0]);
    
    console.log(candidateWord.stringifyWord());
};

function checkAnswer(letter) {
    console.log("Start the game!");
    guessesLeft--;

    console.log(candidateWord.wordArr.length);
    for(var i = 0; i < candidateWord.wordArr.length; i++) {
        if(letter.letter === candidateWord.wordArr[i].letter) {
            candidateWord.wordArr[i].checkLetter(letter.letter);
            console.log("HElloooo?", candidateWord.wordArr[i].reveal());
        }
        // if(candidateWord.wordArr[])
    };

    console.log(candidateWord.stringifyWord());

    // loop inquirer if chances haven't been used up yet
    if(guessesLeft !== 0) {
        
        console.log("\nThis is word ", letter.letter);
        // if(letter !== candidateWord.wordArr) {

        // }
        console.log("Guesses left: " + guessesLeft + "!");
        tryAgain();
    }
    else {
        guessesLeft = 10;
    }
};

function tryAgain() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Guess a letter: ',
            name: 'letter'
        }
    ]).then(function(input) {
        console.log(candidateWord.stringifyWord());
        checkAnswer(input);
    });
};

// startGame();