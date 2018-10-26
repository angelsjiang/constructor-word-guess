// index.js: The file containing the logic for the course of the game, which depends on Word.js and:
// Randomly selects a word and uses the Word constructor to store it
// Prompts the user for each guess and keeps track of the user's remaining guesses

var Word = require("./Word");
var inquirer = require("inquirer");

var candidateArr = ["potato","pumpkin","salad","fries","noodle","boba"];
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
        console.log("Start the game!");
        checkAnswer(input);
    });

function generateAns() {
    console.log("\n--------------------\n");

    random = Math.floor(Math.random() * 6);

    // Get the random word
    console.log("The word is: " + candidateArr[random]);
    candidateWord = new Word(candidateArr[random]);
    // print out either letters or underscores
    console.log(candidateWord.stringifyWord());
};

function checkAnswer(letter) {
    guessesLeft--;

    var correct = false;
    var changed = false;

    // check through the array to see if anything matches
    console.log(candidateWord.wordArr.length);
    for(var i = 0; i < candidateWord.wordArr.length; i++) {
        if(letter.letter === candidateWord.wordArr[i].letter) {
            candidateWord.wordArr[i].checkLetter(letter.letter);
            correct = true;
            count++;
            console.log("\nCount number is " + count);
            console.log("word length is " + candidateWord.wordArr.length + "\n");
        }
    };

    // if something matches, print out "correct", else "sorry, try again"
    if(correct) {
        console.log("Correct!");
    }
    else {
        console.log("Sorry, try again!");
    }

    // if count reaches to the number of letters in the word, then ask user if want to start again
    if(count === candidateWord.wordArr.length) {
        console.log("\nALL CHANGED!!\n");
        console.log("\n---- Answer is -----\n");
        console.log(candidateWord.stringifyWord());
        console.log("\n--------------------\n");

        startOver();
    }
    else {
        // loop inquirer if chances haven't been used up yet
        if(guessesLeft !== 0) {
            
            console.log(candidateWord.stringifyWord());
            console.log("\nThis is word ", letter.letter);
            console.log("Guesses left: " + guessesLeft + "!");
            tryAgain();
        }
        else {
            console.log("Oops, you have no more guesses left!\n")
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
        console.log("hello", res.list);
        if(res.list === "yes") {
            console.log("Ok! start again!");
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