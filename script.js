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
}

function getDisplay() {
    return displayRef.textContent;
}

function clearDisplay() {
    displayRef.textContent = '';
}

function isDisplayClear() {
    return displayRef.textContent === '';
}

function replaceOpInDisplay(op) {
    let arr = getDisplay().split(" ");
    arr[1] = op;    
    displayRef.textContent = arr.join(' ');
}

function getFirstNum(){
    return getDisplay().split(" ")[0];
}

function getOperator(){
    return getDisplay().split(" ")[1];
}

function getSecondNum(){
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

//let displayValue = '';
//let clearOnNextInput = false;
//let existsOperator = false;

// let firstNum;
// let secondNum;
// let operator;

btnDigits.forEach(btn => {
    btn.addEventListener('click', () => pushInDisplay(btn.textContent));
});/* {
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
    });
}); */

btnClear.addEventListener('click', clearDisplay);

btnOps.forEach(btn => {
    btn.addEventListener('click', () =>  {
        if (isDisplayClear()) {
            console.log('empty');
            return;
        };

        if (existsOperator()) {
            console.log('op in display');
            if (existsSecondNum()) {
                console.log('secondNum in display');
                const firstNum = getFirstNum();
                const operator = getOperator();
                const secondNum = getSecondNum();
                
                clearDisplay();
                pushInDisplay(operate(firstNum, operator, secondNum));

                //TODO: Check if error
                
                pushInDisplay(` ${btn.textContent} `);
            } else {
                console.log('secondNum not in display');
                replaceOpInDisplay(btn.textContent);
            }
        } else { //Only first number
            console.log('op not in display');
            pushInDisplay(` ${btn.textContent} `);
        }
    });
});

/* 
btnEqual.addEventListener('click', () => {
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
