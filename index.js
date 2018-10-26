// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./Word");
var inquirer = require("inquirer");

var candidateArr = ["potato","pumpkin","salad","fries","noodle","boba","zucchini"];
var guessesLeft = 10;
var random;
var candidateWord;

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
    // // check the input whether or not it is a letter
    // if(input.letter !== "a" || "b" || "c" || "d" || "e" || "f" || "g" || "h" || "i" || "j" || "k" || "l" || "m"
    //     || "n" || "o" || "p" || "q" || "r" || "s" || "t" || "u" || "v" || "w" || "x" || "y" || "z" ) {
    //     console.log("Please enter a letter!");
    //     return;
    // };
    console.log("\n-------Start the game!-------\n");
    checkAnswer(input);
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
        if(letter.letter === candidateWord.wordArr[i].letter) {
            candidateWord.wordArr[i].checkLetter(letter.letter);
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
            console.log("\nThis is word ", letter.letter);
            console.log("\nGuesses left: " + guessesLeft + "!\n");
            tryAgain();
        }
        else {
            console.log("\nOops, you have no more guesses left!\n")
            guessesLeft = 10;
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
        console.log(candidateWord.stringifyWord());
        checkAnswer(input);
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