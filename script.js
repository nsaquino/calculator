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
    return a / b;
}

function operate(num1, operator, num2) {
    switch (operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return substract(num1, num2);
        case '*':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
    }
}

//---

let firstNum;
let secondNum;
let operator;

const displayRef = document.querySelector('#display');
const digits = document.querySelectorAll('.digit, .operator');
const clearRef = document.querySelector('#clear');
let displayValue = '';

digits.forEach(digit => {
    digit.addEventListener('click', () => {
        displayValue += digit.textContent;
        displayRef.textContent += digit.textContent;
    })
})

clearRef.addEventListener('click', () => displayRef.textContent = '')
