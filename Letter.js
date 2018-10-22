// A string value to store the underlying character for the letter
// A boolean value that stores whether that letter has been guessed yet
// A function that returns the underlying character if the letter has been guessed, 
// or a placeholder(like an underscore) if the letter has not been guessed
// A function that takes a character as an argument and checks it against the underlying character, 
// updating the stored boolean value to true if it was guessed correctly

var Letter = function(letter) {
    // get that from the word?
    this.letter = letter;
    this.correct = false;
    this.reveal = function() {
        if(this.correct) {
            // return the letter
            return this.letter;
        }
        else {
            // return underscore
            return "_";
        }
    }; 
    this.checkLetter = function(x) {
        if(this.letter === x) {
            this.correct = true;
        }
        else {
            this.correct = false;
        }
    };
};

module.exports = Letter;