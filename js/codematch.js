const questions = [
  { code: "for(int i=0;i<3;i++)", output: "Loop runs 3 times" },
  { code: "int x = 5/2;", output: "x = 2 (Integer division)" },
  { code: "if(1==1)", output: "Condition is TRUE" },
  { code: "printf(\"%d\",4+5);", output: "Prints 9" },
  { code: "Recursion", output: "Function calls itself" },
  { code: "int arr[5];", output: "Array of size 5" },
  { code: "while(x>0)", output: "Loop until x is zero" },
  { code: "def add(a,b):", output: "Python function definition" },
  { code: "x = [1,2,3]", output: "Python list" },
  { code: "int *ptr;", output: "Pointer declaration in C" },
  { code: "switch(x)", output: "Multi-case decision structure" },
  { code: "try...except", output: "Python error handling" }
];

let leftItems = [];
let rightItems = [];
let selectedLeft = null;

function refreshGame() {
  const containerLeft = document.getElementById("left-items");
  const containerRight = document.getElementById("right-items");
  containerLeft.innerHTML = "";
  containerRight.innerHTML = "";
  selectedLeft = null;

  const selected = questions.sort(() => 0.5 - Math.random()).slice(0, 5);

  leftItems = selected.map(q => q.code);
  rightItems = selected.map(q => q.output).sort(() => Math.random() - 0.5);

  leftItems.forEach((code) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = code;
    div.onclick = () => handleLeftClick(div, code);
    containerLeft.appendChild(div);
  });

  rightItems.forEach((output) => {
    const div = document.createElement("div");
    div.className = "item";
    div.textContent = output;
    div.onclick = () => handleRightClick(div, output);
    containerRight.appendChild(div);
  });
}

function handleLeftClick(div, code) {
  clearSelection();
  div.classList.add("selected");
  selectedLeft = code;
}

function handleRightClick(div, output) {
  if (!selectedLeft) return;
  const pair = questions.find(q => q.code === selectedLeft);
  if (pair.output === output) {
    markCorrect(selectedLeft, output);
  } else {
    markWrong(selectedLeft, output);
  }
  selectedLeft = null;
}

function markCorrect(code, output) {
  document.querySelectorAll(".item").forEach(item => {
    if (item.textContent === code || item.textContent === output) {
      item.classList.add("correct");
      item.classList.remove("selected");
    }
  });
}

function markWrong(code, output) {
  document.querySelectorAll(".item").forEach(item => {
    if (item.textContent === code || item.textContent === output) {
      item.classList.add("wrong");
      setTimeout(() => {
        item.classList.remove("wrong");
        item.classList.remove("selected");
      }, 800);
    }
  });
}

function clearSelection() {
  document.querySelectorAll(".item").forEach(item => {
    item.classList.remove("selected");
  });
}

window.onload = refreshGame;
