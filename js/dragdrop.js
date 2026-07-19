const termsData = [
  { term: "Algorithm", definition: "A step-by-step procedure to solve a problem." },
  { term: "Variable", definition: "A storage location for data in a program." },
  { term: "Compiler", definition: "Translates source code into machine code." },
  { term: "Loop", definition: "Repeats a set of instructions until a condition is met." },
  { term: "Function", definition: "A block of code designed to perform a particular task." }
];

function initGame() {
  const termsContainer = document.getElementById('terms');
  const definitionsContainer = document.getElementById('definitions');
  const result = document.getElementById('result');

  termsContainer.innerHTML = '';
  definitionsContainer.innerHTML = '';
  result.textContent = '';

  const shuffledTerms = [...termsData].sort(() => Math.random() - 0.5);
  const shuffledDefs = [...termsData].sort(() => Math.random() - 0.5);

  shuffledTerms.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('item');
    div.draggable = true;
    div.textContent = item.term;
    div.dataset.term = item.term;
    div.addEventListener('dragstart', handleDragStart);
    termsContainer.appendChild(div);
  });

  shuffledDefs.forEach(item => {
    const dropzone = document.createElement('div');
    dropzone.classList.add('dropzone');
    dropzone.dataset.term = item.term;
    dropzone.textContent = item.definition;

    dropzone.addEventListener('dragover', (e) => e.preventDefault());
    dropzone.addEventListener('drop', handleDrop);

    definitionsContainer.appendChild(dropzone);
  });
}

function handleDragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.dataset.term);
}

function handleDrop(e) {
  e.preventDefault();
  const draggedTerm = e.dataTransfer.getData('text/plain');
  const correctTerm = e.target.dataset.term;

  if (draggedTerm === correctTerm) {
    e.target.classList.add('correct');
    e.target.classList.remove('incorrect');
    e.target.innerHTML += `<div style="margin-top:0.5rem; color:#fff;">✔ ${draggedTerm}</div>`;
    const draggable = document.querySelector(`[data-term="${draggedTerm}"]`);
    draggable.remove();
  } else {
    e.target.classList.add('incorrect');
    setTimeout(() => {
      e.target.classList.remove('incorrect');
    }, 1000);
  }

  checkWin();
}

function checkWin() {
  if (document.querySelectorAll('.item').length === 0) {
    document.getElementById('result').textContent = "🎉 Well Done! All matched correctly!";
  }
}

window.onload = initGame;
