/** CONSTANTS **/
const CANVAS_BORDER_COLOR = 'black';
const CANVAS_FILL_COLOR = 'white';

const SNAKE_BORDER_COLOR = 'darkgreen';
const SNAKE_FILL_COLOR = 'lightgreen';


// Snake coordinates
let snake = [
  {x: 150, y: 150},
  {x: 140, y: 150},
  {x: 130, y: 150},
  {x: 120, y: 150},
  {x: 110, y: 150},
];

// Horizontal velocity
let dx = 10;
// Vertical velocity
let dy = 0;


// Get the canvas element
var gameCanvas = document.getElementById("gameCanvas");

// Return a two dimensional drawing context
var ctx = gameCanvas.getContext("2d");


// Clears the canvas
function clearCanvas() {
  ctx.fillStyle = CANVAS_FILL_COLOR;
  ctx.strokestyle = CANVAS_BORDER_COLOR;
  ctx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);
  ctx.strokeRect(0, 0, gameCanvas.width, gameCanvas.height);
}


// Draws a part of the snake
function drawSnakePart(snakePart) {
  ctx.fillStyle = SNAKE_FILL_COLOR;
  ctx.strokestyle = SNAKE_BORDER_COLOR;
  ctx.fillRect(snakePart.x, snakePart.y, 10, 10);
  ctx.strokeRect(snakePart.x, snakePart.y, 10, 10);
}

// Draws the whole snake
function drawSnake() {
  snake.forEach(drawSnakePart);
}

// Updates the snake
function advanceSnake() {
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  snake.pop();
}


// Runs the game
function main() {
  setTimeout(function onTick() {
    clearCanvas();
    advanceSnake();
    drawSnake();
    main();
  }, 100)
}


// Changes direction when arrow key is pressed
function changeDirection(event) {
  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -10;
  const goingDown = dy === 10;
  const goingRight = dx === 10;
  const goingLeft = dx === -10;

  if (keyPressed === LEFT_KEY && !goingRight) {
    dx = -10;
    dy = 0;
  }

  if (keyPressed === UP_KEY && !goingDown) {
    dx = 0;
    dy = -10;
  }

  if (keyPressed === RIGHT_KEY && !goingLeft) {
    dx = 10;
    dy = 0;
  }

  if (keyPressed === DOWN_KEY && !goingDown) {
    dx = 0;
    dy = 10;
  }
}


// Call changeDirection upon a keypress
document.addEventListener("keydown", changeDirection);


// Run the game
main();
