// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./Word");
var inquirer = require("inquirer");

var letterOptions = "abcdefghijklmnopqrstuvwxyz";
var candidateArr = ["potato","pumpkin","salad","fries","noodle","boba","zucchini"];
var guessesLeft = 10;
var random;
var candidateWord;
var guessedArray = [];

var count = 0;

generateAns();

inquirer
.prompt([
    {
        type: 'input',
        message: 'Guess a letter: ',
        name: 'letter'
    }
]).then(function(input) {
    // check the input whether or not it is a letter
    var usrinput = input.letter.toLowerCase();

    if(letterOptions.includes(usrinput) || usrinput.length != 1) {

        console.log("to lower case ", input.letter.toLowerCase());
        console.log("\n-------Start the game!-------\n");
        checkAnswer(usrinput);
    }
    else {
        console.log("Please enter a letter!");
        startOver();
    }

});


function generateAns() {
    console.log("\n---------- GAME BEGIN -----------\n");

    random = Math.floor(Math.random() * 7);

    // Get the random word
    candidateWord = new Word(candidateArr[random]);
    // print out either letters or underscores
    console.log(candidateWord.stringifyWord(), " \n");
};

function checkAnswer(letter) {
    guessesLeft--;

    var correct = false;

    // check through the array to see if anything matches
    console.log(candidateWord.wordArr.length);
    for(var i = 0; i < candidateWord.wordArr.length; i++) {
        if(letter === candidateWord.wordArr[i].letter) {
            candidateWord.wordArr[i].checkLetter(letter);
            correct = true;
            count++;
        }
    };

    // if something matches, print out "correct", else "sorry, try again"
    if(correct) {
        console.log("\nCorrect!\n");
    }
    else {
        console.log("\nSorry, try again!\n");
        guessedArray.push(letter);
    }

    // if count reaches to the number of letters in the word, then ask user if want to start again
    if(count === candidateWord.wordArr.length) {
        console.log("\nALL CHANGED!!\n");
        console.log("\n---- Answer is -----\n");
        console.log(candidateWord.stringifyWord(), " \n");
        console.log("\n--------------------\n");

        startOver();
    }
    else {
        // loop inquirer if chances haven't been used up yet
        if(guessesLeft !== 0) {
            
            console.log(candidateWord.stringifyWord());
            console.log("\nWrong guesses: " + guessedArray.join(" "));
            console.log("\nThis is word ", letter);
            console.log("\nGuesses left: " + guessesLeft + "!\n");
            tryAgain();
        }
        else {
            console.log("\nOops, you have no more guesses left!\n")
            guessesLeft = 10;
            guessedArray = [];
            startOver();
        }
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
        var usrinput = input.letter.toLowerCase();

        if(!letterOptions.includes(usrinput) || usrinput.length != 1) {
            console.log("Please enter a letter!");
            tryAgain();
        }
        else {
            console.log("to lower case ", input.letter.toLowerCase());
            console.log("\n-------Start the game!-------\n");
            checkAnswer(usrinput);
        }
    });
};

function startOver() {
    inquirer
    .prompt([
        {
            type: "list",
            message: "Want to play again?",
            choices: ["yes","no"],
            name: "list"
        }
    ])
    .then(function(res) {
        if(res.list === "yes") {
            console.log("\n-----Ok! start again!-----\n");
            guessedArray = [];
            guessesLeft = 10;
            count = 0;
            generateAns();
            tryAgain();
        }
        else {
            return;
        }
    });
};