//all the require modules

var inquirer = require("inquirer");
var Word = require("./Word.js");
var chalk = require('chalk'); // for displaying color text

//variables
var guesses = 10;
var points = 0;
var wordsToGuess = ["Beneficial", "Knowledgeable", "Smoggy", "Spiderwebs", "Appreciate", "Playground", "Toothpaste", "Adaptable", "Yarn", "Encourage", "Protective"];
var randomWord;
var chosenWord;

//start game function ---> main process starts from here
function startGame() {
    console.log(chalk.blue("Welcome ! Play a Word Guess Game with us!!"));
}

//Method which generates the random word
function chooseRandomWord() {
    randomWord = wordsToGuess[Math.floor(Math.random() * wordsToGuess.length)]
    chosenWord = new Word(randomWord);
}

//Function which checks the word
function guessWord() {

    if (guesses > 0 && points < 5) {

        //will display the word
        console.log(chosenWord.display());
    
        //ask the user using prompt
        inquirer.prompt([
            {
                name: "txt",
                message: "Guess a letter!",
                validate: function (str) {
                    if (str.length != 1) return false;
                    var regEx = new RegExp("^[a-zA-Z\s]{1,1}$");
                    return regEx.test(str);
                }

            }

        ]).then(function (guessedLetter) {

            var guess = guessedLetter.txt;

            chosenWord.verifyGuess(guess);

            if (randomWord.toLowerCase().indexOf(guess.toLowerCase()) === -1) {
                guesses--;
                console.log(chalk.red("INCORRECT! " + guesses + " guesses remaining"))
            } 
            else {
                if (points < 5) {
                console.log(chalk.green("CORRECT!"))
                }
            }

            if (randomWord === chosenWord.display()) {
                console.log(chosenWord.display());
                guesses = 10;
                points++;

                if (points < 5) {
                    console.log(chalk.green("CORRECT! Next word!"));
                    chooseRandomWord();
                }

                else {
                    winGame();
                }
            }

            if (guesses === 0) {
                loseGame();
            }

            guessWord();

        });
    }

}

//loose game Function
function loseGame() {
    console.log(chalk.red("GAME OVER!"));
    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("Quit"));
                process.exit();
            }
        })
}

//win game function
function winGame() {

    console.log(chalk.green("YOU WIN!"));

    inquirer.prompt([
        {
            name: "confirm",
            type: "confirm",
            message: "Play again?",
            default: true
        }
    ])
        .then(function (inquirerResponse) {
            if (inquirerResponse.confirm) {
                guesses = 10;
                points = 0;
                chooseRandomWord();
                guessWord();
            }
            else {
                console.log(chalk.blue("Quit."))
                process.exit();
            }
        })

}

//main processing flow starts from here
startGame();
chooseRandomWord();
guessWord();