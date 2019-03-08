// Constructor Letter
var Letter = function (character)
{
    this.character = character;
    this.isLetterGuessed = false;

    //display method
    this.display = function()
    {
        if (this.isLetterGuessed)
            return this.character;
        else
            return '_';
    }

    //method to check if letter guessed correctly
    this.letterGuess = function(guess)
    {
        if (guess.toLowerCase() === this.character.toLowerCase()) 
            this.isLetterGuessed = true;
    }

}

module.exports = Letter;