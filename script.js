const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const groundHeight = 60;
const pipeWidth = 60;
const pipeGap = 150;
const pipeSpeed = 2;

let pipes = [];
let score = 0;
let gameOver = false;
// Bird
const bird = {
    x: 80,
    y: 250,
    width: 30,
    height: 30,
    velocity: 0,
    gravity: 0.5,
    jump: -8
};

// Draw the bird
function drawBird() {
    ctx.fillStyle = "yellow";
    ctx.fillRect(
        bird.x,
        bird.y,
        bird.width,
        bird.height
    );
}
function drawPipes() {
    ctx.fillStyle = "#2ecc40";

    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(
            pipe.x,
            0,
            pipeWidth,
            pipe.topHeight
        );

        // Bottom pipe
        ctx.fillRect(
            pipe.x,
            pipe.bottomY,
            pipeWidth,
            canvas.height - groundHeight - pipe.bottomY
        );
    });
}
function createPipe() {
    const minHeight = 80;
    const maxHeight = canvas.height - groundHeight - pipeGap - 80;

    const topHeight =
        Math.random() * (maxHeight - minHeight) + minHeight;

    pipes.push({
    x: canvas.width,
    topHeight: topHeight,
    bottomY: topHeight + pipeGap,
    passed: false
    });
}

// Update bird position
function updateBird() {
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Check if bird touches the ground
    if (bird.y + bird.height >= canvas.height - groundHeight) {
        bird.y = canvas.height - groundHeight - bird.height;
        bird.velocity = 0;
    }
}
function updatePipes() {
    pipes.forEach(pipe => {
        pipe.x -= pipeSpeed;
    });

    // Remove pipes that leave the screen
    pipes = pipes.filter(pipe => pipe.x + pipeWidth > 0);
}
function updateScore() {
    pipes.forEach(pipe => {
        if (!pipe.passed && pipe.x + pipeWidth < bird.x) {
            score++;
            pipe.passed = true;
        }
    });
}function drawScore() {
    ctx.fillStyle = "white";
    ctx.font = "40px Arial";
    ctx.textAlign = "center";

    ctx.fillText(
        score,
        canvas.width / 2,
        60
    );
}
function drawGameOver() {
    if (!gameOver) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.5)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "40px Arial";
    ctx.fillText(
        "GAME OVER",
        canvas.width / 2,
        250
    );

    ctx.font = "25px Arial";
    ctx.fillText(
        `Score: ${score}`,
        canvas.width / 2,
        300
    );

    ctx.font = "18px Arial";
    ctx.fillText(
        "Click or press SPACE to restart",
        canvas.width / 2,
        350
    );
}
function checkCollision() {
    for (const pipe of pipes) {

        const birdRight = bird.x + bird.width;
        const birdBottom = bird.y + bird.height;

        const pipeRight = pipe.x + pipeWidth;

        // Check if bird overlaps horizontally with pipe
        const horizontalCollision =
            birdRight > pipe.x &&
            bird.x < pipeRight;

        // Check if bird hits either pipe
        const hitsTopPipe =
            bird.y < pipe.topHeight;

        const hitsBottomPipe =
            birdBottom > pipe.bottomY;

        if (
            horizontalCollision &&
            (hitsTopPipe || hitsBottomPipe)
        ) {
            gameOver = true;
        }
    }
}
//restarting the game
function resetGame() {
    bird.y = 250;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}
// Flap
function flap() {
    if (gameOver) {
        resetGame();
        return;
    }

    bird.velocity = bird.jump;
}
function drawBackground() {
    // Sky
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = "#ded895";
    ctx.fillRect(
        0,
        canvas.height - groundHeight,
        canvas.width,
        groundHeight
    );
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        flap();
    }
});

canvas.addEventListener("click", flap);

// Game loop
function gameLoop() {
    drawBackground();

    if (!gameOver) {
        updateBird();
        updatePipes();
        updateScore();
        checkCollision();
    }

    drawPipes();
    drawBird();
    drawScore();
    drawGameOver();

    requestAnimationFrame(gameLoop);
}
setInterval(createPipe, 1800);
gameLoop();
