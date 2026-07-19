const questions = [
  {
    question: "What is an Algorithm?",
    options: [
      "A programming language",
      "A step-by-step procedure to solve a problem",
      "A computer component",
      "An operating system"
    ],
    answer: 1
  },
  {
    question: "What does a Compiler do?",
    options: [
      "Translates source code to machine code",
      "Stores data",
      "Runs websites",
      "Manages memory"
    ],
    answer: 0
  },
  {
    question: "What is a Variable?",
    options: [
      "A fixed number",
      "A storage location for data in a program",
      "A loop",
      "A function"
    ],
    answer: 1
  },
  {
    question: "What is the purpose of a Loop?",
    options: [
      "To compile code",
      "To store variables",
      "To repeat a set of instructions",
      "To design UI"
    ],
    answer: 2
  },
  {
    question: "Full form of CPU?",
    options: [
      "Central Process Unit",
      "Central Processing Unit",
      "Computer Primary Unit",
      "Control Processing Unit"
    ],
    answer: 1
  },
  {
    question: "What is a Function?",
    options: [
      "A type of variable",
      "A set of instructions performing a task",
      "An input device",
      "A CSS property"
    ],
    answer: 1
  },
  {
    question: "What is Debugging?",
    options: [
      "Creating bugs",
      "Fixing errors in code",
      "Running games",
      "Adding code"
    ],
    answer: 1
  }
];

let currentQuestion = 0;
let score = 0;
let shuffledQuestions = [];

const questionElement = document.getElementById("question");
const optionsContainer = document.getElementById("options");
const feedbackElement = document.getElementById("feedback");
const nextButton = document.getElementById("next-btn");

function startQuiz() {
  shuffledQuestions = questions.sort(() => Math.random() - 0.5).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  nextButton.style.display = "none";
  feedbackElement.innerText = "";
  showQuestion();
}

function showQuestion() {
  const q = shuffledQuestions[currentQuestion];
  questionElement.innerText = q.question;
  optionsContainer.innerHTML = "";

  q.options.forEach((option, index) => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(btn);
  });
}

function selectAnswer(selected) {
  const q = shuffledQuestions[currentQuestion];

  if (selected === q.answer) {
    feedbackElement.innerText = "✅ Correct!";
    score++;
  } else {
    feedbackElement.innerText = `❌ Wrong! Correct: ${q.options[q.answer]}`;
  }

  Array.from(optionsContainer.children).forEach(btn => {
    btn.disabled = true;
  });

  nextButton.style.display = "inline-block";
}

nextButton.addEventListener("click", () => {
  currentQuestion++;
  if (currentQuestion < shuffledQuestions.length) {
    feedbackElement.innerText = "";
    showQuestion();
    nextButton.style.display = "none";
  } else {
    showResult();
  }
});

function showResult() {
  questionElement.innerHTML = `
    <div class="result-box">
      <h3>🎉 Quiz Completed!</h3>
      <p>You scored <span>${score}</span> out of <span>${shuffledQuestions.length}</span></p>
      <p class="remark">${getRemark(score)}</p>
    </div>
  `;
  optionsContainer.innerHTML = "";
  feedbackElement.innerText = "";
  nextButton.style.display = "none";
}

function getRemark(score) {
  const total = shuffledQuestions.length;
  const percentage = (score / total) * 100;
  if (percentage === 100) return "🔥 Perfect! You're a Pro!";
  else if (percentage >= 80) return "💯 Excellent Work!";
  else if (percentage >= 60) return "👍 Good Job!";
  else if (percentage >= 40) return "🙂 Keep Practicing!";
  else return "💡 Don't Give Up, Try Again!";
}


window.onload = startQuiz;
