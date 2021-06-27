var clearBtn = document.getElementById("clearScores")
var highscoresEl = document.getElementById("highscoresEl")

window.onload = function () {
    var highscores = JSON.parse(localStorage.getItem("highscores"))
    var highscoresEl = document.getElementById("highscoresEl")

    if (highscores === null) {
        var empty = document.createElement("h3")
        empty.textContent = "Oops! There are no highscores here, play the quiz to add one."
        highscoresEl.appendChild(empty)
    } else {
        for (var i = 0; i < highscores.length; i++) {
            var element = document.createElement("li")
            element.textContent = highscores[i].initials + ": " + highscores[i].score
            highscoresEl.appendChild(element)
        }
    }
}

clearBtn.addEventListener("click", function () {
    var highscores = JSON.parse(localStorage.getItem("highscores"))

    if (highscores === null) {
        alert("There are no highscores to clear!")
    } else {
        localStorage.removeItem("highscores")
        while (highscoresEl.firstChild) {
            highscoresEl.lastChild.remove()
        }
        var empty = document.createElement("h3")
        empty.textContent = "Oops! There are no highscores here, play the quiz to add one."
        highscoresEl.appendChild(empty)
    }
})