import { Game } from './Game.js';
import { Board } from './Board.js';
import { Snake } from './Snake.js';

let user = localStorage.getItem('name');

const userName = document.getElementById('userName');
const nameInput = document.getElementById('name');
const nameBtn = document.getElementById('nameBtn');
const nameArea = document.getElementById('nameArea');
const newGameBtn = document.getElementById('newGame');
const loseArea = document.getElementById('lose');
const error = document.getElementById('error');

// Hide the error message for name length
error.classList.add('nameArea__error--hide');

const startGame = () => {
	// Set name for returning user
	localStorage.setItem('name', user);

	// Mobile board size
	let gridSize = 20;

	// Checks for larger display so we can increase grid size. Media queries in CSS assist with this feature by altering the dimensions.
	if (window.innerWidth > 799) {
		gridSize = 30;
	}

	const game = new Game(user, gridSize);
	const board = new Board(gridSize);
	const snake = new Snake(user, gridSize, 3);

	// Hide Welcome Screen
	nameArea.classList.add('hide');

	// Hide Lose Screen
	loseArea.classList.add('hide');

	// Build Grid
	board.buildGrid();

	// Set the players name
	userName.innerHTML = user;

	// Get Scores
	game.getScores();

	// Create a snake
	snake.addSnake();

	// Add Food
	snake.addFood();

	// Add Event Listeners
	window.onkeydown = (e) => {
		let left = 37;
		let up = 38;
		let right = 39;
		let down = 40;

		if (e.keyCode === left) {
			snake.setDirection('left');
		}

		if (e.keyCode === up) {
			snake.setDirection('up');
		}

		if (e.keyCode === right) {
			snake.setDirection('right');
		}

		if (e.keyCode === down) {
			snake.setDirection('down');
		}
	};
};

// If no stored user then we update with the value from input, else startGame as we have a name stored
if (!user) {
	user = nameInput.value;
	nameInput.value = '';
} else {
	startGame();
}

// Error handling for the user input
const handleInput = () => {
	if (nameInput.value.length > 9) {
		error.classList.remove('nameArea__error--hide');
	} else {
		error.classList.add('nameArea__error--hide');
		nameBtn.disabled = false;
		user = nameInput.value;
	}
};

// Add event listeners for name section
nameBtn.addEventListener('click', startGame);
nameInput.addEventListener('keyup', handleInput);
newGameBtn.addEventListener('click', () => {
	location.reload();
});

startOverBtn.addEventListener('click', () => {
	loseArea.classList.add('none');
	location.reload();
});
