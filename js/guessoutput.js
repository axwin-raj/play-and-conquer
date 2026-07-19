const questions = [
  {
    code: "print('Hello' * 3)  (Python)",
    options: ["HelloHelloHello", "Hello3", "Error", "Hello Hello Hello"],
    answer: "HelloHelloHello"
  },
  {
    code: "for(int i=0; i<3; i++) { System.out.print(i); }  (Java)",
    options: ["012", "123", "Error", "0 1 2"],
    answer: "012"
  },
  {
    code: "a = [1, 2, 3]\nprint(a[::-1])  (Python)",
    options: ["[3, 2, 1]", "Error", "321", "[1, 2, 3]"],
    answer: "[3, 2, 1]"
  },
  {
    code: "cout << 2 + 2 * 2;  (C++)",
    options: ["8", "6", "4", "Error"],
    answer: "6"
  },
  {
    code: "print(5 == '5')  (Python)",
    options: ["True", "False", "Error", "5"],
    answer: "False"
  },
  {
    code: "System.out.println(10 / 3);  (Java)",
    options: ["3.333", "3", "3.0", "Error"],
    answer: "3"
  },
  {
    code: "print(len(set([1,2,2,3,3])))  (Python)",
    options: ["5", "3", "4", "Error"],
    answer: "3"
  },
  {
    code: "int a = 5 / 2; cout << a;  (C++)",
    options: ["2", "2.5", "Error", "3"],
    answer: "2"
  }
];

let currentSet = [];
let currentQuestion = {};
let score = 0;
let questionIndex = 0;

const codeSnippet = document.getElementById('code-snippet');
const optionsContainer = document.querySelectorAll('.option');
const result = document.getElementById('result');
const scoreDisplay = document.getElementById('score');

function startGame() {
  currentSet = [...questions].sort(() => Math.random() - 0.5).slice(0, 5);
  score = 0;
  questionIndex = 0;
  scoreDisplay.innerText = `Score: ${score} / 5`;
  loadQuestion();
}

function loadQuestion() {
  if (questionIndex >= currentSet.length) {
    showFinalResult();
    return;
  }

  currentQuestion = currentSet[questionIndex];
  codeSnippet.innerText = currentQuestion.code;

  const shuffledOptions = [...currentQuestion.options].sort(() => Math.random() - 0.5);

  optionsContainer.forEach((btn, idx) => {
    btn.innerText = shuffledOptions[idx];
    btn.disabled = false;
    btn.onclick = () => checkAnswer(btn.innerText);
  });

  result.innerText = "";
}

function checkAnswer(selected) {
  optionsContainer.forEach(btn => btn.disabled = true);

  if (selected === currentQuestion.answer) {
    result.innerText = "✅ Correct!";
    result.style.color = "#00FF7F";
    score++;
  } else {
    result.innerText = `❌ Wrong! Correct: ${currentQuestion.answer}`;
    result.style.color = "#ff4d4d";
  }

  scoreDisplay.innerText = `Score: ${score} / 5`;

  setTimeout(() => {
    questionIndex++;
    loadQuestion();
  }, 1000);
}

function showFinalResult() {
  codeSnippet.innerText = "🎉 Quiz Completed!";
  result.innerText = `You scored ${score} out of 5`;
  result.style.color = "#ffd700";
  
  optionsContainer.forEach(btn => {
    btn.style.display = "none";
  });

  document.querySelector('.buttons').innerHTML = `
    <button onclick="startGame()">🔄 Play Again</button>
    <a href="index.html" class="home-button">🏠 Home</a>
  `;
}

window.onload = startGame;
