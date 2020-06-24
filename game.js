// Create questions/answers here
var questions = [
  new Question("How does a WHILE loop start?", ["while i = 1 to 10", "while (i <=10; i++)", "while ( i <= 10)", "None of the above is correct"], "while ( i <= 10)"),
  new Question("How to write an IF statement in JavaScript?", ["if i == 5", "if (i == 5)", "if i == 5 then", "if i = 5 then"], "if (i == 5)"),
  new Question("How do you create a function in JavaScript?", ["function Myfunction()", "function:Myfunction()", "function = Myfunction()", "None of the above is correct"], "function Myfunction()"),
  new Question("How do you call a function named 'myFunction'?", ["myFunction()", "call myFunction", "call function myFunction()", "None of the above is correct"], "myFunction()"),
  new Question("Which operator is used to assign a value to a variable?", ["=", "+", "*", "$"], "=")
];

// Create Timer
var sec = 30;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('timer').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!!");
    }
}

  
// Create Quiz function
function Quiz(questions) {
  this.score = 0;
  this.questions = questions;
  this.questionIndex = 0;
}
// select question to display based on question index
Quiz.prototype.getQuestionIndex = function() {
  return this.questions[this.questionIndex];
}
// count the score if correct answer is selected
Quiz.prototype.guess = function(answer) {
  if(this.getQuestionIndex().isCorrectAnswer(answer)) {
      this.score++;
  }

  this.questionIndex++;
}
// quiz will end if all questions have been answered
Quiz.prototype.isEnded = function() {
  return this.questionIndex === this.questions.length;
}


function Question(text, choices, answer) {
  this.text = text;
  this.choices = choices;
  this.answer = answer;
}

Question.prototype.isCorrectAnswer = function(choice) {
  return this.answer === choice;
}


function populate() {
  if(quiz.isEnded()) {
      showScores();
  }
  else {
      // show question
      var element = document.getElementById("question");
      element.innerHTML = quiz.getQuestionIndex().text;

      // show options
      var choices = quiz.getQuestionIndex().choices;
      for(var i = 0; i < choices.length; i++) {
          var element = document.getElementById("choice" + i);
          element.innerHTML = choices[i];
          guess("btn" + i, choices[i]);
      }

      showProgress();
  }
};

function guess(id, guess) {
  var button = document.getElementById(id);
  button.onclick = function() {
      quiz.guess(guess);
      populate();
  }
};


function showProgress() {
  var currentQuestionNumber = quiz.questionIndex + 1;
  var element = document.getElementById("progress");
  element.innerHTML = "Question " + currentQuestionNumber + " of " + quiz.questions.length;
};

function showScores() {
  var gameOverHTML = "<h1>Result</h1>";
  gameOverHTML += "<h2 id='score'> Your scores: " + quiz.score + "</h2>";
  var element = document.getElementById("quiz");
  element.innerHTML = gameOverHTML;
};

// create quiz
var quiz = new Quiz(questions);

// display quiz
populate();





