const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const groundHeight = 60;
const pipeWidth = 60;
const pipeGap = 170;
const pipeSpeed = 2;

let pipes = [];
let score = 0;
let gameOver = false;
let gameStarted = false;
let particles = [];
let collisionEffectTimer = 0;
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
    // Body
    ctx.fillStyle = "#FFD93D";
    ctx.beginPath();
    ctx.arc(
        bird.x + bird.width / 2,
        bird.y + bird.height / 2,
        bird.width / 2,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Eye
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.arc(
        bird.x + 21,
        bird.y + 9,
        6,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Pupil
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(
        bird.x + 23,
        bird.y + 9,
        3,
        0,
        Math.PI * 2
    );
    ctx.fill();

    // Beak
    ctx.fillStyle = "#FF8C00";
    ctx.beginPath();
    ctx.moveTo(bird.x + bird.width, bird.y + 14);
    ctx.lineTo(bird.x + bird.width + 10, bird.y + 18);
    ctx.lineTo(bird.x + bird.width, bird.y + 22);
    ctx.closePath();
    ctx.fill();

    // Wing
    ctx.fillStyle = "#F4B400";
    ctx.beginPath();
    ctx.ellipse(
        bird.x + 10,
        bird.y + 19,
        9,
        5,
        0,
        0,
        Math.PI * 2
    );
    ctx.fill();
}
function drawPipes() {
    pipes.forEach(pipe => {
        // Main pipe body
        const pipeGradient = ctx.createLinearGradient(
            pipe.x,
            0,
            pipe.x + pipeWidth,
            0
        );

        pipeGradient.addColorStop(0, "#176B2C");
        pipeGradient.addColorStop(0.25, "#39D353");
        pipeGradient.addColorStop(0.55, "#72E35A");
        pipeGradient.addColorStop(1, "#218C35");

        ctx.fillStyle = pipeGradient;

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

        // Pipe caps
        const capGradient = ctx.createLinearGradient(
            pipe.x - 5,
            0,
            pipe.x + pipeWidth + 5,
            0
        );

        capGradient.addColorStop(0, "#1B7A30");
        capGradient.addColorStop(0.3, "#45D957");
        capGradient.addColorStop(0.6, "#7BEF68");
        capGradient.addColorStop(1, "#249438");

        ctx.fillStyle = capGradient;

        // Top cap
        ctx.fillRect(
            pipe.x - 5,
            pipe.topHeight - 20,
            pipeWidth + 10,
            20
        );

        // Bottom cap
        ctx.fillRect(
            pipe.x - 5,
            pipe.bottomY,
            pipeWidth + 10,
            20
        );

        // Highlight
        ctx.fillStyle = "rgba(255, 255, 255, 0.18)";

        ctx.fillRect(
            pipe.x + 8,
            0,
            7,
            pipe.topHeight - 20
        );

        ctx.fillRect(
            pipe.x + 8,
            pipe.bottomY + 20,
            7,
            canvas.height - groundHeight - pipe.bottomY - 20
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
}
function drawScore() {
    if (gameOver) return;

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
function drawStartScreen() {
    if (gameStarted) return;

    ctx.fillStyle = "rgba(0, 0, 0, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    ctx.textAlign = "center";

    ctx.font = "42px Arial";
    ctx.fillText(
        "FLAPPY BIRD",
        canvas.width / 2,
        240
    );

    ctx.font = "20px Arial";
    ctx.fillText(
        "Click or press SPACE to start",
        canvas.width / 2,
        300
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
            createCollisionEffect();
            gameOver = true;
        }
    }
}
function createCollisionEffect() {
    particles = [];

    for (let i = 0; i < 15; i++) {
        particles.push({
            x: bird.x + bird.width / 2,
            y: bird.y + bird.height / 2,
            size: Math.random() * 5 + 3,
            velocityX: (Math.random() - 0.5) * 6,
            velocityY: (Math.random() - 0.5) * 6,
            life: 30
        });
    }

    collisionEffectTimer = 30;
}
function updateParticles() {
    particles.forEach(particle => {
        particle.x += particle.velocityX;
        particle.y += particle.velocityY;
        particle.velocityY += 0.2;
        particle.life--;
    });

    particles = particles.filter(
        particle => particle.life > 0
    );

    if (collisionEffectTimer > 0) {
        collisionEffectTimer--;
    }
}function drawParticles() {
    particles.forEach(particle => {
        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(
            particle.x,
            particle.y,
            particle.size,
            0,
            Math.PI * 2
        );
        ctx.fill();
    });
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
    if (!gameStarted) {
        gameStarted = true;
        bird.velocity = bird.jump;
        return;
    }

    if (gameOver) {
        resetGame();
        gameStarted = true;
        return;
    }

    bird.velocity = bird.jump;
}
function drawBackground() {
    // Sky gradient
    const skyGradient = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    skyGradient.addColorStop(0, "#4FC3F7");
    skyGradient.addColorStop(1, "#B3E5FC");

    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Clouds
    drawCloud(70, 100, 0.8);
    drawCloud(300, 150, 0.7);
    drawCloud(200, 60, 0.5);

    // Distant buildings
    ctx.fillStyle = "rgba(70, 130, 180, 0.35)";

    const buildings = [
        { x: 0, width: 45, height: 100 },
        { x: 50, width: 35, height: 140 },
        { x: 90, width: 55, height: 80 },
        { x: 150, width: 40, height: 125 },
        { x: 195, width: 50, height: 95 },
        { x: 250, width: 40, height: 145 },
        { x: 295, width: 55, height: 90 },
        { x: 355, width: 45, height: 120 }
    ];

    buildings.forEach(building => {
        ctx.fillRect(
            building.x,
            canvas.height - groundHeight - building.height,
            building.width,
            building.height
        );
    });

    // Trees / bushes
    drawBush(35, canvas.height - groundHeight - 20, 35);
    drawBush(100, canvas.height - groundHeight - 15, 40);
    drawBush(180, canvas.height - groundHeight - 20, 35);
    drawBush(270, canvas.height - groundHeight - 15, 45);
    drawBush(350, canvas.height - groundHeight - 20, 40);

    // Grass
    ctx.fillStyle = "#4CAF50";
    ctx.fillRect(
        0,
        canvas.height - groundHeight,
        canvas.width,
        12
    );

    // Dirt
    ctx.fillStyle = "#A66A3F";
    ctx.fillRect(
        0,
        canvas.height - groundHeight + 12,
        canvas.width,
        groundHeight - 12
    );

    // Small dirt spots
    ctx.fillStyle = "#7D4B2A";

    for (let i = 0; i < 20; i++) {
        const x = (i * 37) % canvas.width;
        const y =
            canvas.height -
            groundHeight +
            25 +
            ((i * 17) % 25);

        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
    }
}
function drawCloud(x, y, scale) {
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";

    ctx.beginPath();

    ctx.arc(
        x,
        y,
        22 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 25 * scale,
        y - 10 * scale,
        28 * scale,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + 50 * scale,
        y,
        22 * scale,
        0,
        Math.PI * 2
    );

    ctx.fill();
}
function drawBush(x, y, size) {
    ctx.fillStyle = "#2E8B57";

    ctx.beginPath();

    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.arc(x + size * 0.7, y + 5, size * 0.8, 0, Math.PI * 2);
    ctx.arc(x - size * 0.7, y + 5, size * 0.8, 0, Math.PI * 2);

    ctx.fill();
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

    if (gameStarted && !gameOver) {
        updateBird();
        updatePipes();
        updateScore();
        checkCollision();
}

    updateParticles();

    drawPipes();
    drawBird();
    drawParticles();
    drawScore();
    drawGameOver();
    drawStartScreen();

    requestAnimationFrame(gameLoop);
}
setInterval(createPipe, 2600);
gameLoop();
