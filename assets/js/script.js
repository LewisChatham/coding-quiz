var questions = [{
    question: "To insert a JavaScript file into an HTML page, which tag is used?",
    choices: ["<script='java'>", "<javascript>", "<script src=' '>", "<script>"],
    correctAnswer: 2
}, {
    question: "What is the name of a true or false variable?",
    choices: ["Boolean", "Number", "Object", "String"],
    correctAnswer: 0
}, {
    question: "Which function runs through each object in an array?",
    choices: ["filter()", "every()", "concat()", "forEach()"],
    correctAnswer: 3
}, {
    question: "What do you call data passed into a function?",
    choices: ["Variable", "Parameter", "Argument", "Object"],
    correctAnswer: 1
}, {
    question: "What is jQuery?",
    choices: ["A Library", "A Resource", "A Repository", "A Dependency"],
    correctAnswer: 0
}];

var questionCounter = 0;

var secondsSpan = document.getElementById("secondsLeft")
var startQuizBtn = document.getElementById("startQuiz")
var introduction = document.getElementById("introduction")
var quizArea = document.getElementById("quizArea")
var loseArea = document.getElementById("loseArea")
var winArea = document.getElementById("winArea")
var tryAgain = document.getElementById("tryAgain")
var home = document.getElementById("home")
var saveScore = document.getElementById("saveScore")
var timeInterval;

startQuizBtn.addEventListener("click", startQuiz)

function startQuiz () {
    resetQuiz()
    showQuiz()
    countdown(75)
    createQuestion(questionCounter)
}

function resetQuiz () {
    questionCounter = 0;
    var question = document.getElementById("question")
    var elementCheck = document.getElementById("answerEl")

    if (question != null) {
        question.remove()
    }
    
    if (elementCheck != null) {
        elementCheck.remove()
    } 
}

function showQuiz() {
  introduction.setAttribute("class", "hidden")
  loseArea.setAttribute("class", "hidden")
  winArea.setAttribute("class", "hidden")
  quizArea.setAttribute("class", "")
}

function countdown(timer) {
  secondsSpan.innerHTML = timer

  timeInterval = setInterval(function () {
      var secondsLeft = secondsSpan.innerHTML
      secondsLeft--
      secondsSpan.innerHTML = secondsLeft
  
      if (secondsLeft <= 0) {
        clearInterval(timeInterval)
        gameOver()
      }
    }, 1000);
}

function createQuestion(index) {
    var questionEL = document.createElement("div")
    questionEL.setAttribute("id", "question")
    quizArea.appendChild(questionEL)

    var header = document.createElement("h2")
    header.textContent = "Question: " + questions[index].question
    questionEL.appendChild(header)

    var buttons = createButtons(index)
    questionEL.appendChild(buttons)
}

function createButtons(index) {
    var buttonList = document.createElement("ul")
    var item;
    var button;

    for(var i = 0; i < questions[index].choices.length; i++) {
        item = document.createElement("li")
        button = document.createElement("input")
        button.setAttribute("type", "button")
        button.setAttribute("value", questions[index].choices[i])
        button.setAttribute("data-index", i)
        button.setAttribute("class", "answer")
        item.appendChild(button)
        buttonList.appendChild(item)
    }
    return buttonList
}

quizArea.addEventListener("click", function (event) {
    var userChoice = event.target
    if (userChoice.matches(".answer")) {
        var userIndex = userChoice.getAttribute("data-index")
        compareAnswer(userIndex)
    } 
})

function compareAnswer(index) {
    var correctAnswer = questions[questionCounter].correctAnswer
    var isCorrect;

    if (index == correctAnswer) {
        isCorrect = true;
    } else {
        isCorrect = false;
    }

    displayNext()
    displayAnswer(isCorrect)
}

function displayNext() {
    questionCounter++
    question = document.getElementById("question")
    question.remove()

    if (questionCounter === questions.length) {
        quizArea.setAttribute("class", "hidden")
        gameWon()
    } else {
        createQuestion(questionCounter)
    }
}

function displayAnswer(isCorrect) {
    var elementCheck = document.getElementById("answerEl")

    if (elementCheck != null) {
        elementCheck.remove()
    } 

    var answerEl = document.createElement("h3")
    answerEl.setAttribute("id", "answerEl")
    
    if (isCorrect) {
        answerEl.textContent = "Correct!"
    } else {
        answerEl.textContent = "Wrong!"
        reduceTime()
    }
    quizArea.appendChild(answerEl)
}

function reduceTime() {
    var secondsLeftEL = document.getElementById("secondsLeft")
    var secondsLeft = secondsLeftEL.innerHTML
    
    secondsLeft = secondsLeft - 10;
    if (secondsLeft <= 0) {
        gameOver()
    } else {
        secondsLeftEL.innerHTML = secondsLeft;
    }
}

function gameOver () {
    quizArea.setAttribute("class", "hidden")
    loseArea.setAttribute("class", "")
}

function gameWon() {
    quizArea.setAttribute("class", "hidden")
    winArea.setAttribute("class", "")

    clearInterval(timeInterval)
    var timeRemaining = secondsSpan.innerHTML
    var timeRemainingEL = document.getElementById("timeRemaining")
    timeRemainingEL.innerHTML = timeRemaining
}

tryAgain.addEventListener("click", startQuiz)

home.addEventListener("click", goHome)

saveScore.addEventListener("click", addHighscore)

function goHome() {
    quizArea.setAttribute("class", "hidden")
    loseArea.setAttribute("class", "hidden")
    winArea.setAttribute("class", "hidden")
    introduction.setAttribute("class", "")
}

function addHighscore () {
    
}