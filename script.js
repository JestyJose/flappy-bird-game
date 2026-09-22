const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const groundHeight = 60;
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

// Flap
function flap() {
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

    updateBird();
    drawBird();

    requestAnimationFrame(gameLoop);
}

gameLoop();
