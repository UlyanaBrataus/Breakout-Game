const rulesBtn = document.getElementById("rules-btn");
const closeBtn = document.getElementById("close-btn");
const rules = document.getElementById("rules");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let score = 0;

const brickRowCount = 9;
const brickColumnCount = 5;

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
  speed: 10,

  // dx: 0 - it cannot move itself, we'll add a keyboard event to move it
  dx: 0,
};

// Create brick props

const brickInfo = {
  w: 70,
  h: 20,
  padding: 10,
  // position of the first brick on the X axis
  offsetX: 45,
  offsetY: 60,
  // if the ball hit the brick, this should become false
  visible: true,
};

// Create bricks

const bricks = [];
for (let i = 0; i < brickRowCount; i++) {
  // an array for each row
  bricks[i] = [];
  // for columns
  for (let j = 0; j < brickColumnCount; j++) {
    // x axis
    const x = i * (brickInfo.w + brickInfo.padding) + brickInfo.offsetX;
    // y axis
    const y = j * (brickInfo.h + brickInfo.padding) + brickInfo.offsetY;
    bricks[i][j] = { x, y, ...brickInfo };
  }
}
console.log(bricks);
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

// Draw bricks on canvas

function drawBricks() {
  bricks.forEach((column) => {
    column.forEach((brick) => {
      ctx.beginPath();
      ctx.rect(brick.x, brick.y, brick.w, brick.h);
      ctx.fillStyle = brick.visible ? "#1b4420b9;" : "transparent";
      ctx.fill();
      ctx.closePath();
    });
  });
}

// Move paddle on canvas

function movePaddle() {
  paddle.x += paddle.dx;

  // Wall detection (right side)
  if (paddle.x + paddle.w > canvas.width) {
    paddle.x = canvas.width - paddle.w;
  }
  // left side
  if (paddle.x < 0) {
    paddle.x = 0;
  }
}

// Draw everything (we add this function to avoid global scope)

function draw() {
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawBall();
  drawPaddle();
  drawScore();
  drawBricks();
}

// Update canvas drawing and animation

function update() {
  movePaddle();

  // Draw everything
  draw();

  // It will update itself
  requestAnimationFrame(update);
}

update();

// Keydown event
function keyDown(e) {
  if (e.key === "Right" || e.key === "ArrowRight") {
    paddle.dx = paddle.speed;
  } else if (e.key === "Left" || e.key === "ArrowLeft") {
    paddle.dx = -paddle.speed;
  }
}

// Keyup event
function keyUp(e) {
  if (
    e.key === "Right" ||
    e.key === "ArrowRight" ||
    e.key === "Left" ||
    e.key === "ArrowLeft"
  ) {
    paddle.dx = 0;
  }
}

// Keyboard event handlers

document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

// Rules and close event handlers

rulesBtn.addEventListener("click", () => rules.classList.add("show"));

closeBtn.addEventListener("click", () => rules.classList.remove("show"));
