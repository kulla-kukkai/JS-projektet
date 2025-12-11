document.addEventListener("DOMContentLoaded", () => {

    const toggle = document.getElementById("toggle-dark");
    const body = document.querySelector("body");
    const quizBox = document.querySelector(".quiz-box");
    const startBtn = document.getElementById("startBtn");
    const nextBtn = document.getElementById("nextBtn");
    const resultScreen = document.getElementById("resultScreen");
    const title = document.getElementById("quizTitle");

    toggle.addEventListener("click", function () {
        // to toggle icon
        this.classList.toggle("bi-moon-stars-fill");
        this.classList.toggle("bi-brightness-high-fill");

        // to check the Light mode 
        const isLight = this.classList.contains("bi-brightness-high-fill");

        if (isLight) {
            // ---- Light Mode ----
            body.style.background = "#D7554a";
            body.style.color ="black";
            quizBox.style.background = "rgb(251, 195, 195)";
            resultScreen.style.background = "rgb(251, 195, 195)";
            nextBtn.style.background = "rgb(187, 0, 0)";
            startBtn.style.background = "rgb(187, 0, 0)";
            title.style.color = "#ffffffff";
            body.style.removeProperty("text-shadow"); 
        } else {
            // ---- Dark Mode ----
            body.style.background = "black";
            body.style.color ="white";
            nextBtn.style.background ="rgba(28, 66, 23, 0.91)";
            startBtn.style.background ="rgba(28, 66, 23, 0.91)";
            quizBox.style.background = "rgba(30, 40, 30, 0.9)";
            resultScreen.style.background = "rgba(30, 40, 30, 0.9)";
            title.style.color = "#c2ffb9ff";
            body.style.textShadow = "0 0 8px #132f0dff, 0 0 8px #fbff24ff";
        }

    // Transition & layout
    body.style.transition = "all 0.5s ease";
    body.style.minHeight = "100vh";
    body.style.height = "auto";
});


});
