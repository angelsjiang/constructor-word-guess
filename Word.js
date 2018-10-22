// Word.js: Contains a constructor, Word that depends on the Letter constructor. 
// This is used to create an object representing the current word the user is attempting to guess. 
// That means the constructor should define:
// An array of new Letter objects representing the letters of the underlying word
// A function that returns a string representing the word. This should call the function on each 
// letter object (the first function defined in Letter.js) that displays the character or an underscore 
// and concatenate those together.
// A function that takes a character as an argument and calls the guess function on each letter 
// object (the second function defined in Letter.js)

var Letter = require("./Letter");

var Word = function(word) {
    var candidate = word.split("");
    var wordArr = [];
    this.wordArr = wordArr;
    for(var i = 0; i < candidate.length; i++) {
        var char = new Letter(candidate[i]);
        this.wordArr.push(char);
    };

    this.stringifyWord = function() {
        var str = "";
        for(var i = 0; i < wordArr.length; i++) {
            var char = wordArr[i].reveal();
            str = str + " " + char;
        }
        return str;
    };

    this.checkWord = function(x) {
        for(var i = 0; i < wordArr.length; i++) {
            wordArr[i].checkLetter(x);
        }
    };
};

module.exports = Word;