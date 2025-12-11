const body = document.querySelector("body");
const startBtn = document.getElementById("startBtn");
const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const questionBox = document.getElementById("questionBox");
const nextBtn = document.getElementById("nextBtn");
const resultScreen = document.getElementById("resultScreen");

const questions = [
    {type: "tf",q: "Jul firas i december.", answer: "Sant"},
    {type: "at",q: "Vilken dag är julafton?",options: ["23 december", "24 december", "25 december", "26 december"],answer: "24 december"},
    {type: "vj",q: "Vilka är vanliga julfärger?",options: ["Röd", "Blå", "Grön", "Svart"],answers: ["Röd", "Grön"]},
    {type: "tf",q: "Tomten bor på Nordpolen.",answer: "Sant"},
    {type: "at",q: "Vad kallas julgranen på svenska?",options: ["Gran", "Tall", "Palm", "Bjapp"],answer: "Gran"},
    {type: "vj",q: "Vilka är typiska julrätter?",options: ["Köttbullar", "Sushi", "Julskinka", "Hamburgare"],answers: ["Köttbullar", "Julskinka"]},
    {type: "tf",q: "Man firar jul över hela världen på samma sätt.",answer: "Falskt"},
    {type: "at",q: "Vilken dryck är vanlig på jul i Sverige?",options: ["Mjölk", "Julmust", "Cola", "Te"],answer: "Julmust"},
    {type: "vj",q: "Vilka hör till julen?",options: ["Tomte", "Gran", "Badboll", "Julklappar"],answers: ["Tomte", "Gran", "Julklappar"]},
    {type: "tf",q: "Man ger ofta julklappar på julafton i Sverige.",answer: "Sant"}
];

let index = 0; // vilken fråga vi är på
let userAnswer = [];   // poäng

// Starta quiz but hide quiz screen and result screen
startBtn.addEventListener('click', function () {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    questionBox.classList.remove('hidden');
    showQuestion();
});

// Nästa-knapp > spara svar och visa nästa fråga tills slutet kommer vis resultat
nextBtn.addEventListener('click', function () {
    saveAnswer();
    index++;
    if (index < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// Visa frågor
function showQuestion() {
    const q = questions[index];
    questionBox.innerHTML = ""; 

    const title = document.createElement("h3");
    title.style.marginBottom = "8px";
    title.style.paddingLeft = "30px";
    title.textContent = q.q;
    questionBox.appendChild(title);

    if (q.type === "tf") {
        createRadioOptions(["Sant", "Falskt"]);
    }
    if (q.type === "at") {
        createRadioOptions(q.options);
    }
    if (q.type === "vj") {
        createCheckboxOptions(q.options);
    }
}
// Skapa radioknappar för alternativ
function createRadioOptions(options) {
    const group = "answer-" + index;

    options.forEach(opt => {
        const label = document.createElement("label");
        label.style.padding = "3px 0 0 30px";
        label.style.display = "block";   // block för ny rad för varje alternativ 

        const input = document.createElement("input");
        input.type = "radio";
        input.name = group;
        input.value = opt;

        label.append(input);
        label.append(" " + opt);
        questionBox.append(label);
    });
}

// Skapa kryssrutor för flera alternativ
function createCheckboxOptions(options) {
    const group = "answer-" + index; // unikt namn för varje svar så att de inte kolliderar

    options.forEach(opt => {
        const label = document.createElement("label");
        label.style.padding = "3px 0 0 30px";
        label.style.display = "block";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = group;
        input.value = opt;

        label.append(input);
        label.append(" " + opt);
        questionBox.append(label);
    });
}

// Spara användarens svar i userAnswer array
function saveAnswer() {
    const group = 'answer-' + index; 
    const currentQuestion = questions[index];

    let userAns; // användarens svar

    if (currentQuestion.type === "tf" || currentQuestion.type === "at") {
        const checked = document.querySelector(`input[name="${group}"]:checked`);
        userAns = checked ? checked.value : ""; 
    } 
    else if (currentQuestion.type === "vj") {
        const checks = document.querySelectorAll(`input[name="${group}"]:checked`);
        userAns = [];
        checks.forEach(c => userAns.push(c.value));
    } 
    else {
        userAns = "";
    }

    userAnswer.push({
        question: currentQuestion.q, 
        correct: currentQuestion.answer || currentQuestion.answers,
        user: userAns
    });
}


function showResult() {
    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    // Count correct answers
    let correctCount = 0;

    userAnswer.forEach(ans => {
        // single-answer case (string)
        if (typeof ans.correct === "string") {
            if (ans.user === ans.correct) correctCount++;
        }
        // multi-answer case (array)
        else if (Array.isArray(ans.correct)) {
            const u = Array.isArray(ans.user) ? ans.user : [];
            let isCorrect =
                u.length === ans.correct.length &&
                ans.correct.every(a => u.includes(a));
            if (isCorrect) correctCount++;
        }
    });

    const total = questions.length;
    const percent = Math.round((correctCount / total) * 100);

    // render header
    resultScreen.innerHTML = `
        <h2>Resultat</h2>
        <p>Du fick <strong>${correctCount}</strong> av <strong>${total}</strong> rätt.</p>
        <p>Procent: <strong>${percent}%</strong></p>
    `;

    let message = ""; // resultatmeddelande 
    let color = ""; // färg för meddelandet 

    if (percent < 50) {
        message = "Underkänt";
        color = "red";
    } else if (percent >= 50 && percent <= 75) {
        message = "Bra!";
        color = "orange";
    } else {
        message = "Riktigt bra jobbat!";
        color = "green";
    }

    const resultTitle = document.createElement("h3");
    resultTitle.textContent = message; //valuen från ovan kommer visas inuti här 
    resultTitle.style.color = color; 
    resultTitle.style.fontSize = "28px";
    resultTitle.style.marginLeft = "195px";
    resultScreen.append(resultTitle);

    // Show feedback for each question
    const feedbackDiv = document.createElement("div"); // container för feedback boxes
    feedbackDiv.style.padding = "10px";
    feedbackDiv.style.marginTop = "5px";
    feedbackDiv.style.maxHeight = "200px";
    feedbackDiv.style.overflowY = "auto";

    userAnswer.forEach((ans, idx) => {
        // kolla om svaret är rätt
        let isCorrect = false; // antag fel först 
        if (typeof ans.correct === "string") {
            isCorrect = ans.user === ans.correct;
        } else if (Array.isArray(ans.correct)) {  // kolla för flervalsfrågor
            const u = Array.isArray(ans.user) ? ans.user : [];
            isCorrect =
                u.length === ans.correct.length &&
                ans.correct.every(a => u.includes(a));
        }

        // Create feedback box for this question
        const feedbackBox = document.createElement("div");
        feedbackBox.style.border = isCorrect ? "2px solid green" : "2px solid red";
        feedbackBox.style.padding = "5px";
        feedbackBox.style.marginBottom = "5px";
        feedbackBox.style.borderRadius = "5px";
        feedbackBox.style.backgroundColor = isCorrect ? "#e8f5e9" : "#ffebee";
        feedbackBox.style.lineHeight = "1";

        let feedbackHTML = `
            <p " margin: 0 0 10px 0;">
                Fråga ${idx + 1} <br> <strong>Ditt svar:</strong> ${formatAnswer(ans.user)} <br>
                <strong>Rätt svar:</strong> ${formatAnswer(ans.correct)}
            </p>
        `;

        feedbackBox.innerHTML = feedbackHTML;
        feedbackDiv.append(feedbackBox);
    });

    resultScreen.append(feedbackDiv);
    console.log("Final userAnswer array:", userAnswer);
}

// Helper to format answer display (string or array)
function formatAnswer(ans) {
    if (Array.isArray(ans)) {
        return ans.join(", "); 
    }
    return ans || "(ingen svar)";
}

