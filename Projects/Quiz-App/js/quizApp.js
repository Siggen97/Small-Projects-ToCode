/** @format */

const startButton = document.getElementById('start-button');
const nextButton = document.getElementById('next-button');
const questionContainer = document.getElementById('question-container');
const questionDisplay = document.getElementById('question');
const answerButtons = document.getElementById('multiple-choice-btn');

// This will be undefined, and be perfect for it's functionality
let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
	currentQuestionIndex++;
	nextQuestion();
});

function startGame() {
	console.log('started');
	startButton.classList.add('hide');
	shuffledQuestions = questions.sort(() => Math.random() - 0.5);
	currentQuestionIndex = 0;
	questionContainer.classList.remove('hide');
	nextQuestion();
}

function nextQuestion() {
	resetState();
	showQuestion(shuffledQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
	questionDisplay.innerText = question.question;
	question.answer.forEach((answer) => {
		const button = document.createElement('button');
		button.innerText = answer.text;
		button.classList.add('choice-btn');
		if (answer.correct) {
			button.dataset.correct = answer.correct;
		}
		button.addEventListener('click', selectAnswer);
		answerButtons.appendChild(button);
	});
}

function resetState() {
	clearStatusClass(document.body);
	nextButton.classList.add('hide');
	while (answerButtons.firstChild) {
		answerButtons.removeChild(answerButtons.firstChild);
	}
}

function selectAnswer(e) {
	const selectedButton = e.target;
	const correct = selectedButton.dataset.correct;
	setStatusClass(document.body, correct);
	Array.from(answerButtons.children).forEach((button) => {
		setStatusClass(button, button.dataset.correct);
	});
	// This one under here is telling us that we have more questions than we are currently on,
	// and we are not on the last question. We then want our next button to display.
	if (shuffledQuestions.length > currentQuestionIndex + 1) {
		nextButton.classList.remove('hide');
	} else {
		startButton.innerText = 'Restart';
		startButton.classList.remove('hide');
	}
}

function setStatusClass(element, correct) {
	clearStatusClass(element);
	if (correct) {
		element.classList.add('correct');
	} else {
		element.classList.add('wrong');
	}
}

function clearStatusClass(element) {
	element.classList.remove('correct');
	element.classList.remove('wrong');
}

// Here is my questions using an array
const questions = [
	{
		question:
			'When was Arsène Wenger unveiled as the new manager of Arsenal FC?',
		answer: [
			{ text: '22 September 1996', correct: true },
			{ text: '14 August 1996', correct: false },
			{ text: '1 October 1996', correct: false },
			{ text: '21 January 1997', correct: false },
		],
	},
	{
		question:
			'How many Premier League titles did Arsenal win under Arsène Wenger??',
		answer: [
			{ text: '1', correct: false },
			{ text: '2', correct: false },
			{ text: '3', correct: true },
			{ text: '4', correct: false },
		],
	},
	{
		question:
			'Arsenal won the FA Cup numerous times. How many FA Cups did they win under Arsène Wenger?',
		answer: [
			{ text: '4', correct: false },
			{ text: '5', correct: false },
			{ text: '6', correct: true },
			{ text: '7', correct: false },
		],
	},
	{
		question:
			'In which year did Arsène Wenger lead Arsenal to the UEFA Champions League final?',
		answer: [
			{ text: '2005', correct: false },
			{ text: '2006', correct: true },
			{ text: '2007', correct: false },
			{ text: '2008', correct: false },
		],
	},
	{
		question:
			'How many years did Arsène Wenger spend as the manager of Arsenal?',
		answer: [
			{ text: '22 years', correct: true },
			{ text: '24 years', correct: false },
			{ text: '21 years', correct: false },
			{ text: '20 years', correct: false },
		],
	},
	{
		question:
			'What is the highest number of points accumulated by Arsenal in a single Premier League season under Arsène Wengers management?',
		answer: [
			{ text: '75', correct: false },
			{ text: '83', correct: false },
			{ text: '89', correct: true },
			{ text: '97', correct: false },
		],
	},
	{
		question:
			'Who scored the winning goal for Arsenal in the FA Cup final against Manchester United in 2005',
		answer: [
			{ text: 'Freddi Ljungberg', correct: false },
			{ text: 'Robert Pires', correct: false },
			{ text: 'Sol Campbell', correct: false },
			{ text: 'Patrik Vieira', correct: true },
		],
	},
	{
		question:
			'Over the years Arsène Wenger has brought in a lot of players, but what player was his second signing for the club?',
		answer: [
			{ text: 'Kaba Diawara', correct: false },
			{ text: 'Nicolas Anelka', correct: false },
			{ text: 'Gilles Grimandi', correct: false },
			{ text: 'Rémi Garde', correct: true },
		],
	},
	{
		question:
			'Before joining Arsenal, Arsène Wenger had managerial stints in which country?',
		answer: [
			{ text: 'France', correct: false },
			{ text: 'Japan', correct: true },
			{ text: 'Germany', correct: false },
			{ text: 'South Korea', correct: false },
		],
	},
	{
		question:
			'At which stadium did Arsène Wenger get sent off by kicking a plastic bottle?',
		answer: [
			{ text: 'Anfield', correct: false },
			{ text: 'Stamford Bridge', correct: false },
			{ text: 'Old Trafford', correct: true },
			{ text: 'Emirates', correct: false },
		],
	},
	{
		question:
			'When Arsène Wenger took over as the manager of Arsenal FC in October 1996, the famous back four usally consisted of the following, but what player decided to hang up his boots first?',
		answer: [
			{ text: 'Lee Dixon', correct: true },
			{ text: 'Tony Adams', correct: false },
			{ text: 'Steve Bould', correct: false },
			{ text: 'Nigel Winterburn', correct: false },
		],
	},
];
