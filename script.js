const numberBtn = document.querySelectorAll('.btn-number');
const dotBtn = document.getElementById('.');
const operatorBtn = document.querySelectorAll('.btn-operator');
const equalBtn = document.getElementById('=');
const allClearBtn = document.getElementById('allclear');
const clearBtn = document.getElementById('clear');
const displayHis = document.getElementById('history');
const displayRes = document.getElementById('result');
const numKey = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.'];
const operatorKey = ['+', '-', '*', '/', '%'];
let num1 = [];
let num2 = [];
let operator = [];
let result = [];

const allClear = () => {
	displayHis.textContent = '';
	displayRes.textContent = '';
	displayRes.style.fontSize = '2.4rem';
	displayHis.style.fontSize = '1.4rem';
	num1 = [];
	num2 = [];
	operator = [];
	result = [];
};

const clear = () => {
	let splitHis = displayHis.textContent.split('');
	splitHis.pop();
	displayHis.textContent = splitHis.join('');
	if (num2.length < 2) {
		num1.pop();
	} else if (num2.length >= 2) {
		num2.pop();
	}
};

const displayText = (e) => {
	if (e.target.id !== '=' || e.key !== 'Equal') {
		if (!e.target.id) {
			displayHis.textContent += e.key;
		} else {
			displayHis.textContent += e.target.id;
		}
	}
	displayRes.textContent = result;
	if (displayRes.textContent > 10) {
		displayRes.style.fontSize = '1em';
	}
	if (displayHis.textContent.length > 35) {
		displayHis.textContent = '';
	} else if (displayHis.textContent.length > 18) {
		displayHis.style.fontSize = '0.7em';
	}
};

const calculate = () => {
	if (num2.length) {
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
	if (!operator.length) {
		if (!e.target.id) {
			num1.push(e.key);
		} else {
			num1.push(e.target.id);
		}
	} else if (operator.length) {
		if (!e.target.id) {
			num2.push(e.key);
		} else {
			num2.push(e.target.id);
		}
	}
	displayText(e);
};

const displayEqual = (e) => {
	calculate();
	displayText(e);
	displayHis.textContent = displayRes.textContent;
	displayRes.textContent = '';
};

const displayOperator = (e) => {
	let splitHis = displayHis.textContent.split('');
	if (
		splitHis.lastIndexOf('+') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('-') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('*') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('%') !== splitHis.length - 1 &&
		splitHis.lastIndexOf('/') !== splitHis.length - 1
	) {
		if (!e.target.id) {
			displayRes.textContent += e.key;
		} else {
			displayRes.textContent += e.target.id;
		}
		calculate();
		displayText(e);
		if (!e.target.id) {
			operator.unshift(e.key);
		} else {
			operator.unshift(e.target.id);
		}
	}
};

const displayDot = (e) => {
	if (operator.length === 0 && !num1.includes('.')) {
		if (!e.target.id) {
			num1.push(e.key);
		} else {
			num1.push(e.target.id);
		}
		displayText(e);
	}
	if (operator.length !== 0 && !num2.includes('.')) {
		if (!e.target.id) {
			num2.push(e.key);
		} else {
			num2.push(e.target.id);
		}
		displayText(e);
	}
};

numberBtn.forEach((num) => {
	num.addEventListener('click', (e) => {
		displayNum(e);
	});
});

operatorBtn.forEach((op) => {
	op.addEventListener('click', (e) => {
		displayOperator(e);
	});
});

dotBtn.addEventListener('click', displayDot);
equalBtn.addEventListener('click', displayEqual);
allClearBtn.addEventListener('click', allClear);
clearBtn.addEventListener('click', clear);

document.addEventListener('keydown', (e) => {
	numKey.forEach((num) => {
		if (e.key === num) {
			displayNum(e);
		}
	});
});

document.addEventListener('keydown', (e) => {
	operatorKey.forEach((op) => {
		if (e.key === op) {
			displayOperator(e);
		}
	});
});

document.addEventListener('keydown', (e) => {
	if (e.key === 'Enter') {
		displayEqual(e);
	}
});
