/** @format */

class Calculator {
	constructor(previousDigitTextElement, currentDigitTextElement) {
		this.previousDigitTextElement = previousDigitTextElement;
		this.currentDigitTextElement = currentDigitTextElement;
		this.clear();
	}
	clear() {
		this.currentDigitTextElement = '';
		this.previousDigitTextElement = '';
		this.operation = undefined;
	}
	delete() {
		this.currentDigit = this.currentDigit.toString().slice(0, -1);
	}
	appendNumber(number) {
		if (number === '.' && this.currentDigitTextElement.includes('.')) return;
		this.currentDigit = this.currentDigit.toString() + number.toString();
	}
	chooseoperation(operation) {
		if (this.currentDigit === '') return;
		if (this.previousDigit !== '') {
			this.compute();
		}
		this.operation = operation;
		this.previousDigit = this.currentDigit;
		this.currentDigit = '';
	}
	compute() {
		let computation;
		const prev = parseFloat(this.previousDigit);
		const current = parseFloat(this.currentDig);
		if (isNaN(prev) || isNaN(current)) return;
		switch (this.operation) {
			case '+':
				computation = prev + current;
				break;
			case '-':
				computation = prev - current;
				break;
			case '*':
				computation = prev * current;
				break;
			case '&divide;':
				computation = prev / current;
				break;
			default:
				return;
		}
		this.currentDigit = computation;
		this.operation = undefined;
		this.previousDigit = '';
	}
	getDisplayNumber(number) {
		const stringNumber = number.toString();
		const integerDigits = parseFloat(stringNumber.split('.')[0]);
		const decimalDigits = stringNumber.split('.')[1];
		let integerDisplay;
		if (isNaN(integerDigits)) {
			integerDisplay = '';
		} else {
			integerDisplay = integerDigits.toLocaleString('en', {
				maximumFractionDigits: 0,
			});
		}
		if (decimalDigits != null) {
			return `${integerDisplay}, ${decimalDigits}`;
		} else {
			return integerDisplay;
		}
	}
	updateDisplay() {
		this.currentDigitTextElement.innerText = this.getDisplayNumber(
			this.currentDigit
		);
		if (this.operation != null) {
			this.previousDigitTextElement.innerText = `${this.getDisplayNumber(
				this.previousDigit
			)} ${this.operation}`;
		} else {
			this.previousDigitTextElement.innerText = '';
		}
	}
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allclearButton = document.querySelector('[data-allclear]');
const previousDigitTextElement = document.querySelector('[data-previous]');
const currentDigitTextElement = document.querySelector('[data-current]');

const calculator = new Calculator(
	previousDigitTextElement,
	currentDigitTextElement
);

numberButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.appendNumber(button.innerText);
		calculator.updateDisplay();
	});
});
operationButtons.forEach((button) => {
	button.addEventListener('click', () => {
		calculator.chooseOperation(button.innerText);
		calculator.updateDisplay();
	});
});
equalsButton.addEventListener('click', (button) => {
	calculator.compute();
	calculator.updateDisplay();
});
allclearButton.addEventListener('click', (button) => {
	calculator.clear();
	calculator.updateDisplay();
});
deleteButton.addEventListener('click', (button) => {
	calculator.delete();
	calculator.updateDisplay();
});
