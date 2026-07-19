const questions = [
  {
    code: "for i in range(5):\n    print(i)",
    options: ["Missing colon", "Missing parentheses in 'print'", "Indentation error", "Syntax error in 'for'"],
    answer: "Missing parentheses in 'print'"
  },
  {
    code: "int a = 5\nint b = 10\nprint(a + b)",
    options: ["Missing semicolons", "Wrong variable type", "Missing colon", "Invalid syntax in print"],
    answer: "Missing semicolons"
  },
  {
    code: "if (x > 10)\n    console.log('Greater')",
    options: ["Missing curly braces", "Syntax error in 'if'", "Missing parentheses in console.log", "Indentation error"],
    answer: "Missing curly braces"
  },
  {
    code: "def greet:\n    print('Hello')",
    options: ["Missing parentheses in function definition", "Missing colon after 'greet'", "Syntax error in print", "Missing return"],
    answer: "Missing parentheses in function definition"
  },
  {
    code: "print('Hello)",
    options: ["Missing closing quote", "Missing parentheses", "Indentation error", "Syntax error in print"],
    answer: "Missing closing quote"
  }
];

let currentQuestion;

function loadQuestion() {
  const randomIndex = Math.floor(Math.random() * questions.length);
  currentQuestion = questions[randomIndex];

  document.getElementById('code-snippet').innerText = currentQuestion.code;

  const optionsContainer = document.getElementById('options');
  optionsContainer.innerHTML = "";

  currentQuestion.options.forEach(option => {
    const btn = document.createElement('button');
    btn.innerText = option;
    btn.onclick = () => checkAnswer(option);
    optionsContainer.appendChild(btn);
  });

  document.getElementById('result').innerText = "";
}

function checkAnswer(selected) {
  const result = document.getElementById('result');
  if (selected === currentQuestion.answer) {
    result.innerText = "✅ Correct!";
    result.style.color = "lightgreen";
  } else {
    result.innerText = "❌ Incorrect. Try Again!";
    result.style.color = "red";
  }
}

window.onload = loadQuestion;
