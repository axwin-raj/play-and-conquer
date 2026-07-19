const questions = [
  { q: "What does CPU stand for?", options: ["Central Processing Unit", "Computer Personal Unit", "Central Performance Utility", "Control Processing Unit"], answer: "Central Processing Unit" },
  { q: "HTML stands for?", options: ["Hyper Trainer Marking Language", "Hyper Text Markup Language", "Hyper Text Marketing Language", "High Text Markup Language"], answer: "Hyper Text Markup Language" },
  { q: "Find the bug: let x == 10;", options: ["Missing semicolon", "Wrong operator '=='", "No bug", "Variable name issue"], answer: "Wrong operator '=='" },
  { q: "What is the output: console.log(2 + '2')?", options: ["22", "4", "Error", "NaN"], answer: "22" },
  { q: "Python is ______?", options: ["Low level", "Assembly", "High level", "Machine Language"], answer: "High level" },
  { q: "Find the bug in C: int main() { printf('Hello'); }", options: ["Missing return", "Missing semicolon", "Wrong printf quotes", "No bug"], answer: "Wrong printf quotes" },
  { q: "RAM stands for?", options: ["Random Access Memory", "Read Access Memory", "Run Advanced Memory", "Rapid Access Machine"], answer: "Random Access Memory" },
  { q: "Which loop checks condition after execution?", options: ["for", "while", "do-while", "None"], answer: "do-while" },
  { q: "C++ invented by?", options: ["Guido van Rossum", "Dennis Ritchie", "Bjarne Stroustrup", "James Gosling"], answer: "Bjarne Stroustrup" },
  { q: "In Java, 'int a = 5/0;' results in?", options: ["0", "Infinity", "Runtime Error", "NaN"], answer: "Runtime Error" },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 8;
let availableQuestions = [];
let userAnswers = [];

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");
const resultBox = document.getElementById("result-box");
const scoreText = document.getElementById("score-text");

function startGame() {
  currentQuestion = 0;
  score = 0;
  userAnswers = [];
  availableQuestions = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  resultBox.classList.add("hidden");
  document.getElementById("question-box").classList.remove("hidden");
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  if (currentQuestion >= availableQuestions.length) {
    return showResult();
  }
  const q = availableQuestions[currentQuestion];
  questionEl.textContent = q.q;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt);
    optionsEl.appendChild(btn);
  });
  timeLeft = 8;
  timerEl.textContent = timeLeft;
  timer = setInterval(updateTimer, 1000);
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = timeLeft;
  if (timeLeft <= 0) {
    clearInterval(timer);
    userAnswers.push({ question: availableQuestions[currentQuestion].q, selected: "No Answer", correct: availableQuestions[currentQuestion].answer });
    currentQuestion++;
    showQuestion();
  }
}

function checkAnswer(selected) {
  clearInterval(timer);
  const currentQ = availableQuestions[currentQuestion];
  if (selected === currentQ.answer) {
    score++;
  }
  userAnswers.push({ question: currentQ.q, selected, correct: currentQ.answer });
  currentQuestion++;
  showQuestion();
}

function showResult() {
  document.getElementById("question-box").classList.add("hidden");
  resultBox.classList.remove("hidden");
  scoreText.innerHTML = `
    <h3>🎯 You scored ${score} out of ${availableQuestions.length}</h3>
    <h4>Review:</h4>
    <ul>
      ${userAnswers.map(ans => `
        <li>
          <strong>Q:</strong> ${ans.question}<br>
          <strong>Your Answer:</strong> ${ans.selected} <br>
          <strong>Correct Answer:</strong> ${ans.correct} <br>
          ${ans.selected === ans.correct ? "✅ Correct" : "❌ Incorrect"}
        </li>
      `).join('')}
    </ul>
  `;
}

window.onload = startGame;
