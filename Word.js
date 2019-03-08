var Letter = require("./Letter.js");

var Word = function(word)
{
    //method to create An array of new Letter objects representing the letters of the underlying word
    this.buildWord = function(word)
    {
        var lettersArr = [];
        for (var i = 0; i < word.length; i++) {
            var currentLetter = new Letter(word[i]);
            lettersArr.push(currentLetter);
        }
        return lettersArr;
    }
    //poulate build word in letters
    this.letters = this.buildWord(word);
    this.chosenWord = word;

    //verify the user guess by calling letterguess method of Letter
    this.verifyGuess = function (guess) {

        for (var i = 0; i < this.letters.length; i++) {
            this.letters[i].letterGuess(guess);
        }
    }

    //display the popuated word after verifying the user guess
    this.display = function () {
        var lettersStr = '';
        for (var i = 0; i < this.letters.length; i++) {
            lettersStr += this.letters[i].display();
        }
        return lettersStr;
    }

}
module.exports = Word;