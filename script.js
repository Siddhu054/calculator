let displayValue = '0';
let equation = '';
let operator = '';
let firstOperand = '';
let waitingForSecondOperand = false;
let showingResult = false;

const resultDisplay = document.getElementById('result');

function updateDisplay() {
    // Show equation if it exists, otherwise show current value
    resultDisplay.value = equation || displayValue;
}

function appendNumber(number) {
    if (showingResult) {
        // If we're showing a result and start typing a new number, reset everything
        reset();
    }
    
    if (waitingForSecondOperand) {
        displayValue = number;
        equation += number;
        waitingForSecondOperand = false;
    } else {
        displayValue = displayValue === '0' ? number : displayValue + number;
        equation = equation === '0' ? number : equation + number;
    }
    updateDisplay();
}

function appendOperator(op) {
    showingResult = false;
    // Convert multiplication symbol for display
    const displayOp = op === '*' ? '×' : op;
    
    if (operator && !waitingForSecondOperand) {
        calculate(false);
    }
    firstOperand = displayValue;
    operator = op;
    equation += ' ' + displayOp + ' ';
    waitingForSecondOperand = true;
    updateDisplay();
}

function calculate(showEquals = true) {
    if (operator === '' || waitingForSecondOperand) return;

    const secondOperand = displayValue;
    let result;

    switch (operator) {
        case '+':
            result = parseFloat(firstOperand) + parseFloat(secondOperand);
            break;
        case '-':
            result = parseFloat(firstOperand) - parseFloat(secondOperand);
            break;
        case '*':
            result = parseFloat(firstOperand) * parseFloat(secondOperand);
            break;
        case '/':
            result = parseFloat(firstOperand) / parseFloat(secondOperand);
            break;
    }

    displayValue = String(result);
    if (showEquals) {
        equation += ' = ' + displayValue;
        showingResult = true;
    } else {
        equation = displayValue;
    }
    operator = '';
    updateDisplay();
}

function deleteNumber() {
    if (showingResult) {
        reset();
        return;
    }
    
    if (equation.length > 1) {
        // Remove last character and any trailing space
        equation = equation.replace(/\s*.$/, '');
        displayValue = equation;
    } else {
        equation = '0';
        displayValue = '0';
    }
    updateDisplay();
}

function reset() {
    displayValue = '0';
    equation = '';
    operator = '';
    firstOperand = '';
    waitingForSecondOperand = false;
    showingResult = false;
    updateDisplay();
}