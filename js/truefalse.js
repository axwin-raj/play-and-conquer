const questions = [
  { text: "HTML stands for Hyper Text Markup Language.", answer: true },
  { text: "RAM is a permanent storage device.", answer: false },
  { text: "Python is a compiled language.", answer: false },
  { text: "CSS is used for styling web pages.", answer: true },
  { text: "An array index starts from 1.", answer: false },
  { text: "C++ supports Object-Oriented Programming.", answer: true },
  { text: "SQL is used for web designing.", answer: false },
  { text: "The full form of CPU is Central Processing Unit.", answer: true },
  { text: "Git is a version control system.", answer: true },
  { text: "JavaScript runs only on the server side.", answer: false }
];

let currentQuestion = 0;
let score = 0;
let selectedQuestions = [];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function startGame() {
  selectedQuestions = shuffle([...questions]).slice(0, 5);
  currentQuestion = 0;
  score = 0;
  document.getElementById('score').innerText = '';
  showQuestion();
}

function showQuestion() {
  if (currentQuestion < selectedQuestions.length) {
    document.getElementById('question').innerText = selectedQuestions[currentQuestion].text;
  } else {
    document.getElementById('question').innerText = `🎉 You scored ${score} out of ${selectedQuestions.length}!`;
    document.getElementById('score').innerHTML = selectedQuestions.map((q, idx) => {
      const userAnswer = q.userAnswer ? '✅' : '❌';
      const correct = q.answer ? 'True' : 'False';
      return `<div>${idx + 1}. ${q.text} → Correct: <strong>${correct}</strong> ${userAnswer}</div>`;
    }).join('');
  }
}

function checkAnswer(userAnswer) {
  const currentQ = selectedQuestions[currentQuestion];
  currentQ.userAnswer = userAnswer === currentQ.answer;
  if (currentQ.userAnswer) {
    score++;
  }
  currentQuestion++;
  showQuestion();
}

startGame();
