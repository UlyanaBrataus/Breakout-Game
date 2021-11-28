const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

// Create ball properties

const ball = {
  // to place the ball at the middle of canvas
  x: canvas.width / 2,
  y: canvas.height / 2,
  size: 10,
  // direction of movement
  dx: 4,
  dy: -4,
};

// Create paddle props

const paddle = {
  // canvas.width / 2 - 40 cause total paddle width = 80
  x: canvas.width / 2 - 40,
  y: canvas.height - 30,
  // paddle width
  w: 80,
  h: 10,
  speed: 80,
  dx: 0,
};

// Draw the ball on canvas

function drawBall() {
  ctx.beginPath();
  // making a circle
  ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
  // making it visible
  ctx.fillStyle = "#1b4420b9";
  ctx.fill();
  ctx.closePath();
}

// Draw the paddle on canvas
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddle.x, paddle.y, paddle.w, paddle.h);
  ctx.fillStyle = "#1b4420b9";
  ctx.fill();
  ctx.closePath();
}

//Draw score on canvas

function drawScore() {
  ctx.font = "20px Arial";
  ctx.fillText(`Score: ${score}`, canvas.width - 100, 30);
}

// Draw everything (we add this function to avoid global scope)

function draw() {
  drawBall();
  drawPaddle();
  drawScore();
}
draw();

// Rules and close event handlers

rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));
