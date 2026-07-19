const questions = [
  { term: "Algorithm", definition: "A step-by-step procedure to solve a problem." },
  { term: "Compiler", definition: "Translates source code into machine code." },
  { term: "Variable", definition: "A storage location for data in a program." },
  { term: "Loop", definition: "Repeats a set of instructions." },
  { term: "Array", definition: "A collection of items stored at contiguous memory locations." },
  { term: "Function", definition: "A block of reusable code." },
  { term: "Class", definition: "A blueprint for creating objects." },
  { term: "Object", definition: "An instance of a class." },
  { term: "Recursion", definition: "A function calling itself." },
  { term: "Database", definition: "An organized collection of data." },
  { term: "Operating System", definition: "Manages hardware and software resources." },
  { term: "IP Address", definition: "A unique identifier for a device on a network." },
  { term: "Firewall", definition: "A network security system." },
  { term: "IDE", definition: "A software for coding with tools like editor, debugger." },
  { term: "Syntax", definition: "The set of rules in programming." },
  { term: "API", definition: "Interface allowing communication between programs." },
  { term: "Stack", definition: "LIFO data structure." },
  { term: "Queue", definition: "FIFO data structure." },
  { term: "DNS", definition: "Converts domain names to IP addresses." },
  { term: "Cloud Computing", definition: "Delivery of services over the internet." },
];

function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

function loadCards() {
  const cardContainer = document.getElementById('card-container');
  cardContainer.innerHTML = "";

  const selected = shuffle(questions).slice(0, 5);

  selected.forEach(q => {
    const card = document.createElement('div');
    card.className = 'flip-card';

    card.innerHTML = `
      <div class="flip-card-inner">
        <div class="flip-card-front">
          <h3>${q.term}</h3>
        </div>
        <div class="flip-card-back">
          <p>${q.definition}</p>
        </div>
      </div>
    `;

    cardContainer.appendChild(card);
  });
}

function refreshCards() {
  loadCards();
}

// Initial load
window.onload = loadCards;
