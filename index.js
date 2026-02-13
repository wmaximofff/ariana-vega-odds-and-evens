const numberBank = [];
const oddNumbers = [];
const evenNumbers = [];

function addNumber(num) {
  numberBank.push(num);
  render();
}

function sort() {
  const number = numberBank.shift();
  if (number % 2 === 0) {
    evenNumbers.push(number);
  } else {
    oddNumbers.push(number);
  }
}

function sortOne() {
  sort();
  render();
}

function sortAll() {
  while (numberBank.length) {
    sort();
  }
  render();
}


function createNumberElement(num) {
  const span = document.createElement("span");
  span.textContent = num;
  return span;
}

function createNumberSection(title, numbers) {
  const section = document.createElement("section");
  section.innerHTML = `<h2>${title}</h2>`;
  
  const output = document.createElement("output");
  
  const numberElements = numbers.map(createNumberElement);
  output.append(...numberElements);
  section.appendChild(output);
  return section;
}


function createForm() {
  const form = document.createElement("form");
  

  form.innerHTML = `
    <label>
      Add a number to the bank
      <input type="number" id="number-input" />
    </label>
    <button type="button" data-action="add">Add number</button>
    <button type="button" data-action="sortOne">Sort 1</button>
    <button type="button" data-action="sortAll">Sort All</button>
  `;
  

  form.addEventListener("click", (event) => {
    if (event.target.tagName !== "BUTTON") return;
    

    const action = event.target.dataset.action;
    
    if (action === "add") {
      const input = form.querySelector("#number-input");
      const num = Number(input.value);
      if (input.value !== "") {
        addNumber(num);
      }
    } else if (action === "sortOne") {
      sortOne();
    } else if (action === "sortAll") {
      sortAll();
    }
  });
  
  return form;
}

function render() {
  const app = document.querySelector("#app");
  app.innerHTML = "";
  

  const title = document.createElement("h1");
  title.textContent = "Odds and Evens";
  app.appendChild(title);
  

  app.appendChild(createForm());
  app.appendChild(createNumberSection("Bank", numberBank));
  app.appendChild(createNumberSection("Odds", oddNumbers));
  app.appendChild(createNumberSection("Evens", evenNumbers));
}


render();