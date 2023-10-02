let firstNum = '';
let operator = '';
let secondNum = '';
const display = document.querySelector('.display');
let numberBtns = document.querySelectorAll('.number');
let operatorBtns = document.querySelectorAll('.operation');
let backspaceBtn = document.querySelector('.backspace')

backspaceBtn.addEventListener('click', function () {
  if (secondNum !== '') {
    secondNum = '';
  } else if (operator !== '') {
    operator = '';
  } else if (firstNum !== '') {
    firstNum = '';
  }
  display.textContent = operator === '' ? firstNum : firstNum + ' ' + operator + ' ' + secondNum;
});

numberBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    // Clear the display if the error message is shown
    if (display.textContent === 'Are you trying to crash the calculator you moron') {
      display.textContent = '';
      firstNum = '';
      secondNum = '';
      operator = '';
    }

    if (operator === '') {
      if (firstNum === '0') {
        firstNum = btn.textContent;
      } else {
        firstNum += btn.textContent;
      }
    } else {
      if (secondNum === '0') {
        secondNum = btn.textContent;
      } else {
        secondNum += btn.textContent;
      }
    }

    display.textContent = operator === '' ? firstNum : firstNum + ' ' + operator + ' ' + secondNum;
  });
});

operatorBtns.forEach(btn => {
  btn.addEventListener('click', function () {
    // Clear the error message
    if (display.textContent === 'Are you trying to crash the calculator you moron') {
      display.textContent = '';
    }

    // Check if firstNum is empty or not
    if (firstNum === '') {
      firstNum = '0';
    }

    if (firstNum !== '' && secondNum === '') {
      operator = btn.textContent;
      display.textContent = firstNum + ' ' + operator + ' ';
    } else if (firstNum !== '' && secondNum !== '') {
      const result = operate(operator, firstNum, secondNum);

      // Check for division by zero
      if (result === 'Are you trying to crash the calculator you moron') {
        display.textContent = result;
      } else {
        firstNum = result.toString();
        operator = btn.textContent;
        secondNum = '';
        display.textContent = firstNum + ' ' + operator + ' ';
      }
    }
  });
});

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function operate(operator, num1, num2) {
  num1 = parseFloat(num1);
  num2 = parseFloat(num2);
  if (operator === '/' && num2 === 0) {
    return 'Are you trying to crash the calculator you moron';
  }
  if (operator === '+') {
    return add(num1, num2);
  } else if (operator === '-') {
    return subtract(num1, num2);
  } else if (operator === '*') {
    return multiply(num1, num2);
  } else if (operator === '/') {
    return divide(num1, num2);
  } else {
    return 'Invalid operator';
  }
}

function calculate() {
  if (firstNum !== '' && secondNum !== '' && operator !== '') {
    const result = operate(operator, firstNum, secondNum);
    if (result === 'Are you trying to crash the calculator you moron') {
      display.textContent = result;
    } else {
      firstNum = result.toString();
      operator = '';
      secondNum = '';
      display.textContent = firstNum;
    }
  }
}

const clearBtn = document.querySelector('.clear');
clearBtn.addEventListener('click', function () {
  firstNum = '';
  secondNum = '';
  operator = '';
  display.textContent = 0;
});

const equalsBtn = document.querySelector('.equals');
equalsBtn.addEventListener('click', calculate);
