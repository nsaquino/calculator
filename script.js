function add(a, b) {
    return a + b;
}

function substract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b == 0) return 'MATH ERROR'
    return a / b;
}

function operate(num1, operator, num2) {
    num1 = parseInt(num1);
    num2 = parseInt(num2);

    if (isNaN(num1) || isNaN(num2)) return 'SYNTAX ERROR';
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return 'SYNTAX ERROR';
    }
}

//---

function pushInDisplay(content) {
    displayRef.textContent += content;
    displayValue += content;
}

function getDisplay() {
    return displayValue;
}

function clearDisplay() {
    displayRef.textContent = '';
    displayValue = '';
}

function displayIsClear() {
    return displayRef.textContent === '';
}

function replaceOpInDisplay(op) {
    let arr = getDisplay().split(" ");
    arr[1] = op;    
    console.log(arr.join(' '));
}

//---

const displayRef = document.querySelector('#display');
const btnDigits = document.querySelectorAll('.digit');
const btnOps = document.querySelectorAll('.operator');
const clearRef = document.querySelector('#clear');
const equalBtn = document.querySelector('#equal');

let displayValue = '';
let opInDisplay = false;
//let clearOnNextInput = false;

let firstNum;
let secondNum;
let operator;

btnDigits.forEach(btn => {
    btn.addEventListener('click', () => {
        let digit = btn.textContent;

        if (opInDisplay) {
            secondNum += digit;
        } else {
            firstNum += digit;
        }

        /* if (clearOnNextInput) {
            clearDisplay();
            clearOnNextInput = false;
        } */

        pushInDisplay(digit);
    });
});

btnOps.forEach(btn => {
    btn.addEventListener('click', () =>  {
        if (displayIsClear()) return;

        if (opInDisplay) {
            if (secondNum === '') {
                operator = btn.textContent;
                replaceOpInDisplay(operator);
            } else {
                firstNum = operate(firstNum, operator, secondNum);
                operator = btn.textContent;
                secondNum = '';

                clearDisplay();
                pushInDisplay(`${firstNum} ${operator} `);
            }
        } else { //Display not empty
            operator = btn.textContent;
            pushInDisplay(` ${operator} `);
            opInDisplay = true;
        }
    });
});

clearRef.addEventListener('click', clearDisplay);
/* 
equalBtn.addEventListener('click', () => {
    if (getDisplay().length == 0) return;

    let partialRes;
    let arguments = getDisplay().split(" ");
    while (arguments.length > 0) {
        firstNum = arguments.shift();
        operator = arguments.shift();
        secondNum = arguments.shift();

        partialRes = operate(firstNum, operator, secondNum);
        if (isNaN(partialRes)) {
            clearDisplay();
            pushInDisplay(partialRes);
            clearOnNextInput = true;
            return;
        }
    }

    //Success
    clearDisplay();
    pushInDisplay(partialRes);
    return;
});
 */
