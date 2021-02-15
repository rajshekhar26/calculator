const numberBtn = document.querySelectorAll('.btn-number');
const dotBtn = document.getElementById('.');
const operatorBtn = document.querySelectorAll('.btn-operator');
const equalBtn = document.getElementById('=');
const allClearBtn = document.getElementById('allclear');
const clearBtn = document.getElementById('clear');
const displayHistory = document.getElementById('history');
const displayResult = document.getElementById('result');
let num1 = [];
let num2 = [];
let operator = [];
let result = [];

const allClear = () => {
	displayHistory.textContent = '';
	displayResult.textContent = '';
	displayResult.style.fontSize = '2.4rem';
	displayHistory.style.fontSize = '1.4rem';
	num1 = [];
	num2 = [];
	operator = [];
	result = [];
};

const clear = () => {
	let splitHis = displayHistory.textContent.split('');
	splitHis.pop();
	displayHistory.textContent = splitHis.join('');
	if (num2.length < 2) {
		num1.pop();
	} else if (num2.length >= 2) {
		num2.pop();
	}
};

const displayText = (e) => {
	if (e.target.id !== '=') {
		displayHistory.textContent += e.target.id;
	}
	displayResult.textContent = result;
	if (displayResult.textContent > 10) {
		displayResult.style.fontSize = '1em';
	}
	if (displayHistory.textContent.length > 35) {
		displayHistory.textContent = '';
	} else if (displayHistory.textContent.length > 18) {
		displayHistory.style.fontSize = '0.7em';
	}
};

const calculate = () => {
	if (!num2.length) {
		let num1Join = parseFloat(num1.join(''));
		let num2Join = parseFloat(num2.join(''));
		switch (operator[0]) {
			case '+':
				result = num1Join + num2Join;
				break;
			case '-':
				result = num1Join - num2Join;
				break;
			case '*':
				result = num1Join * num2Join;
				break;
			case '/':
				result = num1Join / num2Join;
				break;
			case '%':
				result = num1Join % num2Join;
		}
		num1 = result.toString().split('');
		num2 = ['0'];
	}
};

const displayNum = (e) => {
	if (operator.length === 0) {
		num1.push(e.target.id);
	} else {
		num2.push(e.target.id);
	}
	displayText(e);
};

const displayEqual = (e) => {
	calculate();
	displayText(e);
	displayHistory.textContent = displayResult.textContent;
	displayResult.textContent = '';
};

const displayOperator = (e) => {
	let splitHis = displayHistory.textContent.split('');
	if (
		splitHis.lastIndexOf('+') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('-') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('*') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('%') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('/') !== splitHis.length - 1
	) {
		displayResult.textContent += e.target.id;
		calculate();
		displayText(e);
		operator.unshift(e.target.id);
	}
};

const displayDot = (e) => {
	if (operator.length === 0 && !num1.includes('.')) {
		num1.push(e.target.id);
		displayText(e);
	}
	if (operator.length !== 0 && !num2.includes('.')) {
		num2.push(e.target.id);
		displayText(e);
	}
};

numberBtn.forEach((num) => {
	num.addEventListener('click', (e) => {
		displayNum(e);
	});
});

operatorBtn.forEach((operator) => {
	operator.addEventListener('click', (e) => {
		displayOperator(e);
	});
});

dotBtn.addEventListener('click', displayDot);
equalBtn.addEventListener('click', displayEqual);
allClearBtn.addEventListener('click', allClear);
clearBtn.addEventListener('click', clear);
