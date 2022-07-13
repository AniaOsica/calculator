const previousOperationTextElement = document.querySelector(
  ".previous-operation"
);
const currentOperationTextElement =
  document.querySelector(".current-operation");
const numberButton = document.querySelectorAll(".number");
const operationButton = document.querySelectorAll(".operation");
const clearButton = document.querySelector(".clear-all");
const equalButton = document.querySelector(".equal");
const deleteButton = document.querySelector(".delete");

let previousOperation = "";
let currentOperation = "";
let operat = undefined;

const calculate = () => {
  let calculation;
  if (!previousOperation || !currentOperation) {
    return;
  }

  const prev = parseFloat(previousOperation);
  const current = parseFloat(currentOperation);

  if (isNaN(prev) || isNaN(current)) {
    return;
  }

  switch (operat) {
    case "+":
      calculation = prev + current;
      break;
    case "-":
      calculation = prev - current;
      break;
    case "*":
      calculation = prev * current;
      break;
    case "/":
      calculation = prev / current;
      break;
    case "%":
      calculation = (prev / 100) * current;
      break;
    case "√":
      calculation = Math.pow(prev, 1 / current);
      break;
    default:
      return;
  }
  currentOperation = calculation;
  operat = undefined;
  previousOperation = "";
};

const chooseNumber = (number) => {
  if (number === "." && currentOperation.includes(".")) {
    return;
  }
  currentOperation = currentOperation.toString() + number.toString();
};

const chooseOperation = (operation) => {
  if (currentOperation === "") {
    return;
  }
  if (previousOperation !== "") {
    calculate();
  }
  operat = operation;
  previousOperation = currentOperation;
  currentOperation = "";
};

const updateDisplay = () => {
  currentOperationTextElement.innerText = currentOperation;
  if (operat != null) {
    previousOperationTextElement.innerText = previousOperation + operat;
  } else {
    previousOperationTextElement.innerText = "";
  }
};

const deleteNumber = () => {
  currentOperation = currentOperation.toString().slice(0, -1);
};

const clearAll = () => {
  currentOperation = "";
  operat = undefined;
  previousOperation = "";
};

numberButton.forEach((number) => {
  number.addEventListener("click", () => {
    chooseNumber(number.innerText);
    updateDisplay();
  });
});

operationButton.forEach((operation) => {
  operation.addEventListener("click", () => {
    chooseOperation(operation.innerText);
    updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculate();
  updateDisplay();
});

deleteButton.addEventListener("click", () => {
  deleteNumber();
  updateDisplay();
});

clearButton.addEventListener("click", () => {
  clearAll();
  updateDisplay();
});
