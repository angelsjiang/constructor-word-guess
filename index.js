// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./Word");
var inquirer = require("inquirer");

var candidateArr = ["potato","pumpkin","salad","fries","noodle","boba"];
var guessesLeft = 10;

function startGame() {
    console.log("Start the game!");
    if(guessesLeft !== 0) {
        
        var random = Math.floor(Math.random() * 6);
        console.log("The random number is: " + random);
        console.log("The word is: " + candidateArr[random]);
        var candidateWord = new Word(candidateArr[random]);

        console.log(candidateWord.stringifyWord());
    
        inquirer
            .prompt([
                {
                    type: 'input',
                    message: 'Guess a letter: ',
                    name: 'letter'
                }
            ])

        // need a .then function, pass in the usrinput, and print out the word again

        guessesLeft--;
        console.log("Guesses left: " + guessesLeft + "!");
    }
    else {
        guessesLeft = 10;
        startGame();
    }
};

startGame();