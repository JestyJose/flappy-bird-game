const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

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
}

// Flap
function flap() {
    bird.velocity = bird.jump;
}

document.addEventListener("keydown", (event) => {
    if (event.code === "Space") {
        flap();
    }
});

canvas.addEventListener("click", flap);

// Game loop
function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updateBird();
    drawBird();

    requestAnimationFrame(gameLoop);
}

gameLoop();
