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
    num1 = parseFloat(num1);
    num2 = parseFloat(num2);

    if (!isNaN(num1) && operator === undefined) return num1;
    if (isNaN(num1) || isNaN(num2)) return 'SYNTAX ERROR';
    
    let res;
    switch (operator) {
        case '+':
            res = add(num1, num2);
            break;
        case '-':
            res = substract(num1, num2);
            break;
        case '*':
            res = multiply(num1, num2);
            break;
        case '/':
            res = divide(num1, num2);
            break;
        default:
            return 'SYNTAX ERROR';
    }
    return Math.round(res * 1000000) / 1000000;
}

//---

function pushInDisplay(content) {
    displayRef.textContent += content;
}

function getDisplay() {
    return displayRef.textContent;
}

function clearDisplay() {
    displayRef.textContent = '';
}

function isDisplayEmpty() {
    return displayRef.textContent.trim().length === 0;
}

function replaceOpInDisplay(op) {
    let arr = getDisplay().split(" ");
    arr[1] = op;
    displayRef.textContent = arr.join(' ');
}

function getFirstNum() {
    return getDisplay().split(" ")[0];
}

function getOperator() {
    return getDisplay().split(" ")[1];
}

function getSecondNum() {
    return getDisplay().split(" ")[2];
}

function existsOperator() {
    const op = getOperator();
    return (op === '+' || op === '-' || op === '*' || op === '/');
}

function existsSecondNum() {
    const secondNum = getSecondNum();
    return (secondNum !== '' && secondNum !== undefined);
}

//---

const displayRef = document.querySelector('#display');
const btnDigits = document.querySelectorAll('.digit');
const btnOps = document.querySelectorAll('.operator');
const btnClear = document.querySelector('#clear');
const btnEqual = document.querySelector('#equal');
const btnDot = document.querySelector('#dot');

//let displayValue = '';
let clearOnNextInput = false;
//let existsOperator = false;

// let firstNum;
// let secondNum;
// let operator;

btnDigits.forEach(btn => {
    btn.addEventListener('click', () => {
        if (clearOnNextInput) {
            clearDisplay();
            clearOnNextInput = false;
        }
        pushInDisplay(btn.textContent)
    });
});
/* 
        let digit = btn.textContent;

        // if (existsOperator) {
        //     secondNum += digit;
        // } else {
        //     firstNum += digit;
        // }
        // if (clearOnNextInput) {
        //     clearDisplay();
        //     clearOnNextInput = false;
        // }

        pushInDisplay(digit);
    });*/

btnClear.addEventListener('click', clearDisplay);

btnOps.forEach(btn => {
    btn.addEventListener('click', () => {
        if (isDisplayEmpty() || clearOnNextInput) {
            return;
        };

        if (existsOperator()) {
            if (existsSecondNum()) {
                const firstNum = getFirstNum();
                const operator = getOperator();
                const secondNum = getSecondNum();

                clearDisplay();
                pushInDisplay(operate(firstNum, operator, secondNum));

                //TODO: Check if error

                pushInDisplay(` ${btn.textContent} `);
            } else {
                replaceOpInDisplay(btn.textContent);
            }
        } else { //Only first number
            pushInDisplay(` ${btn.textContent} `);
        }
    });
});


btnEqual.addEventListener('click', () => {
    if (isDisplayEmpty()) return;

    const firstNum = getFirstNum();
    const operator = getOperator();
    const secondNum = getSecondNum();

    const res = operate(firstNum, operator, secondNum);
    clearDisplay();
    pushInDisplay(res);
    if (isNaN(res)) clearOnNextInput = true;
    return;
});

btnDot.addEventListener('click', () => {
    if (isDisplayEmpty() || clearOnNextInput) {
        return;
    };
    //TODO
})