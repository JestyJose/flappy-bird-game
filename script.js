// ============================================================
// FLAPPY BIRD
// ============================================================

const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");


// ============================================================
// GAME SETTINGS
// ============================================================

const groundHeight = 70;

const pipeWidth = 65;
const pipeGap = 175;
const pipeSpeed = 2.2;

let pipes = [];

let score = 0;

let gameStarted = false;
let gameOver = false;

let particles = [];

let frameCount = 0;


// ============================================================
// BIRD
// ============================================================

const bird = {

    x: 90,

    y: 270,

    width: 34,

    height: 34,

    velocity: 0,

    gravity: 0.48,

    jump: -8.2,

    angle: 0

};


// ============================================================
// COLORS
// ============================================================

const COLORS = {

    skyTop: "#35AEEF",

    skyBottom: "#B8EDFF",

    grass: "#58D83E",

    grassDark: "#28A832",

    dirt: "#A96A32",

    dirtDark: "#74421F",

    pipeDark: "#15852B",

    pipeGreen: "#39C93D",

    pipeLight: "#9BFA48",

    pipeHighlight: "#D5FF79"

};


// ============================================================
// BACKGROUND
// ============================================================

function drawBackground() {

    // --------------------------------------------------------
    // SKY
    // --------------------------------------------------------

    const sky = ctx.createLinearGradient(
        0,
        0,
        0,
        canvas.height
    );

    sky.addColorStop(
        0,
        COLORS.skyTop
    );

    sky.addColorStop(
        1,
        COLORS.skyBottom
    );

    ctx.fillStyle = sky;

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // --------------------------------------------------------
    // CLOUDS
    // --------------------------------------------------------

    drawCloud(
        55,
        85,
        1.1
    );

    drawCloud(
        300,
        125,
        0.9
    );

    drawCloud(
        185,
        45,
        0.65
    );

    drawCloud(
        365,
        250,
        0.7
    );

    drawCloud(
        30,
        300,
        0.6
    );


    // --------------------------------------------------------
    // DISTANT CITY
    // --------------------------------------------------------

    drawCity();


    // --------------------------------------------------------
    // FOREST
    // --------------------------------------------------------

    drawForest();


    // --------------------------------------------------------
    // GROUND
    // --------------------------------------------------------

    drawGround();
}


// ============================================================
// CLOUD
// ============================================================

function drawCloud(x, y, scale) {

    ctx.save();

    ctx.translate(
        x,
        y
    );

    ctx.scale(
        scale,
        scale
    );


    // soft shadow

    ctx.fillStyle =
        "rgba(130, 190, 220, 0.28)";

    ctx.beginPath();

    ctx.arc(
        0,
        8,
        23,
        0,
        Math.PI * 2
    );

    ctx.arc(
        25,
        -2,
        30,
        0,
        Math.PI * 2
    );

    ctx.arc(
        55,
        8,
        23,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // cloud

    const cloudGradient =
        ctx.createLinearGradient(
            0,
            -30,
            0,
            25
        );

    cloudGradient.addColorStop(
        0,
        "#FFFFFF"
    );

    cloudGradient.addColorStop(
        1,
        "#DDF6FF"
    );

    ctx.fillStyle =
        cloudGradient;

    ctx.beginPath();

    ctx.arc(
        0,
        0,
        22,
        0,
        Math.PI * 2
    );

    ctx.arc(
        25,
        -12,
        29,
        0,
        Math.PI * 2
    );

    ctx.arc(
        53,
        0,
        22,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
}


// ============================================================
// CITY
// ============================================================

function drawCity() {

    const buildings = [

        {
            x: -10,
            width: 45,
            height: 120
        },

        {
            x: 35,
            width: 38,
            height: 165
        },

        {
            x: 75,
            width: 55,
            height: 110
        },

        {
            x: 132,
            width: 40,
            height: 145
        },

        {
            x: 175,
            width: 52,
            height: 95
        },

        {
            x: 230,
            width: 45,
            height: 150
        },

        {
            x: 278,
            width: 55,
            height: 115
        },

        {
            x: 335,
            width: 48,
            height: 165
        },

        {
            x: 382,
            width: 40,
            height: 120
        }

    ];


    ctx.fillStyle =
        "rgba(68, 142, 194, 0.38)";


    buildings.forEach(
        building => {

            const y =
                canvas.height -
                groundHeight -
                building.height -
                70;

            ctx.fillRect(
                building.x,
                y,
                building.width,
                building.height
            );


            // windows

            ctx.fillStyle =
                "rgba(180, 230, 250, 0.35)";


            for (
                let row = 0;
                row < 5;
                row++
            ) {

                for (
                    let col = 0;
                    col < 3;
                    col++
                ) {

                    const wx =
                        building.x +
                        8 +
                        col * 13;

                    const wy =
                        y +
                        15 +
                        row * 20;


                    if (
                        wx <
                        building.x +
                        building.width -
                        5
                    ) {

                        ctx.fillRect(
                            wx,
                            wy,
                            5,
                            7
                        );

                    }

                }

            }


            ctx.fillStyle =
                "rgba(68, 142, 194, 0.38)";
        }
    );
}


// ============================================================
// FOREST
// ============================================================

function drawForest() {

    const baseY =
        canvas.height -
        groundHeight -
        55;


    // distant trees

    for (
        let i = 0;
        i < 18;
        i++
    ) {

        const x =
            i * 25 - 10;

        const size =
            25 +
            (i % 4) * 8;


        ctx.fillStyle =
            "#53B96D";


        ctx.beginPath();

        ctx.arc(
            x,
            baseY,
            size,
            0,
            Math.PI * 2
        );

        ctx.arc(
            x + 20,
            baseY + 7,
            size * 0.8,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    // foreground bushes

    const bushes = [
        [15, 525, 40],
        [75, 520, 45],
        [135, 530, 38],
        [200, 520, 45],
        [265, 525, 42],
        [330, 520, 45],
        [390, 525, 40]
    ];


    bushes.forEach(
        ([x, y, size]) => {

            drawBush(
                x,
                y,
                size
            );

        }
    );
}


// ============================================================
// BUSH
// ============================================================

function drawBush(
    x,
    y,
    size
) {

    const gradient =
        ctx.createLinearGradient(
            0,
            y - size,
            0,
            y + size
        );

    gradient.addColorStop(
        0,
        "#69D85D"
    );

    gradient.addColorStop(
        1,
        "#228E48"
    );


    ctx.fillStyle =
        gradient;


    ctx.beginPath();

    ctx.arc(
        x,
        y,
        size,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x + size * 0.65,
        y + 5,
        size * 0.75,
        0,
        Math.PI * 2
    );

    ctx.arc(
        x - size * 0.65,
        y + 5,
        size * 0.75,
        0,
        Math.PI * 2
    );

    ctx.fill();
}


// ============================================================
// GROUND
// ============================================================

function drawGround() {

    const grassY =
        canvas.height -
        groundHeight;


    // dirt

    ctx.fillStyle =
        COLORS.dirt;

    ctx.fillRect(
        0,
        grassY,
        canvas.width,
        groundHeight
    );


    // dirt gradient

    const dirtGradient =
        ctx.createLinearGradient(
            0,
            grassY,
            0,
            canvas.height
        );

    dirtGradient.addColorStop(
        0,
        "#B9783C"
    );

    dirtGradient.addColorStop(
        1,
        "#8C542C"
    );


    ctx.fillStyle =
        dirtGradient;

    ctx.fillRect(
        0,
        grassY + 12,
        canvas.width,
        groundHeight - 12
    );


    // dirt spots

    for (
        let i = 0;
        i < 45;
        i++
    ) {

        const x =
            (i * 47) %
            canvas.width;

        const y =
            grassY +
            20 +
            ((i * 23) % 38);

        const radius =
            2 +
            (i % 3);


        ctx.fillStyle =
            i % 2 === 0
                ? "#75421F"
                : "#D08A45";


        ctx.beginPath();

        ctx.arc(
            x,
            y,
            radius,
            0,
            Math.PI * 2
        );

        ctx.fill();
    }


    // grass top

    ctx.fillStyle =
        COLORS.grassDark;

    ctx.fillRect(
        0,
        grassY,
        canvas.width,
        13
    );


    // bright grass edge

    ctx.fillStyle =
        COLORS.grass;


    ctx.beginPath();

    ctx.moveTo(
        0,
        grassY
    );


    for (
        let x = 0;
        x <= canvas.width;
        x += 18
    ) {

        ctx.lineTo(
            x,
            grassY
        );

        ctx.quadraticCurveTo(
            x + 9,
            grassY + 13,
            x + 18,
            grassY
        );

    }


    ctx.lineTo(
        canvas.width,
        grassY + 14
    );

    ctx.lineTo(
        0,
        grassY + 14
    );

    ctx.closePath();

    ctx.fill();


    // tiny grass highlights

    ctx.strokeStyle =
        "#8AF06A";

    ctx.lineWidth = 2;


    for (
        let x = 5;
        x < canvas.width;
        x += 24
    ) {

        ctx.beginPath();

        ctx.moveTo(
            x,
            grassY + 2
        );

        ctx.lineTo(
            x + 3,
            grassY - 4
        );

        ctx.stroke();

    }
}


// ============================================================
// PIPES
// ============================================================

function drawPipes() {

    pipes.forEach(
        pipe => {

            drawSinglePipe(
                pipe.x,
                0,
                pipeWidth,
                pipe.topHeight,
                true
            );


            drawSinglePipe(
                pipe.x,
                pipe.bottomY,
                pipeWidth,
                canvas.height -
                groundHeight -
                pipe.bottomY,
                false
            );

        }
    );
}


// ============================================================
// SINGLE PIPE
// ============================================================

function drawSinglePipe(
    x,
    y,
    width,
    height,
    topPipe
) {

    if (height <= 0) {
        return;
    }


    // pipe body gradient

    const gradient =
        ctx.createLinearGradient(
            x,
            0,
            x + width,
            0
        );


    gradient.addColorStop(
        0,
        "#126D28"
    );

    gradient.addColorStop(
        0.18,
        "#28A936"
    );

    gradient.addColorStop(
        0.40,
        "#91F04D"
    );

    gradient.addColorStop(
        0.55,
        "#51D73A"
    );

    gradient.addColorStop(
        0.78,
        "#229B2E"
    );

    gradient.addColorStop(
        1,
        "#126B25"
    );


    ctx.fillStyle =
        gradient;


    // body

    ctx.fillRect(
        x,
        y,
        width,
        height
    );


    // bright vertical highlight

    ctx.fillStyle =
        "rgba(255,255,180,0.45)";


    ctx.fillRect(
        x + 10,
        y,
        8,
        height
    );


    ctx.fillStyle =
        "rgba(255,255,255,0.20)";


    ctx.fillRect(
        x + 20,
        y,
        5,
        height
    );


    // cap

    const capHeight = 28;

    const capWidth =
        width + 12;

    const capX =
        x - 6;


    let capY;


    if (topPipe) {

        capY =
            y +
            height -
            capHeight;

    } else {

        capY =
            y;

    }


    const capGradient =
        ctx.createLinearGradient(
            capX,
            0,
            capX + capWidth,
            0
        );


    capGradient.addColorStop(
        0,
        "#167629"
    );

    capGradient.addColorStop(
        0.20,
        "#42C93A"
    );

    capGradient.addColorStop(
        0.42,
        "#B1F85B"
    );

    capGradient.addColorStop(
        0.60,
        "#63DD40"
    );

    capGradient.addColorStop(
        1,
        "#16752A"
    );


    ctx.fillStyle =
        capGradient;


    ctx.fillRect(
        capX,
        capY,
        capWidth,
        capHeight
    );


    // cap highlight

    ctx.fillStyle =
        "rgba(255,255,255,0.35)";


    ctx.fillRect(
        capX + 7,
        capY + 4,
        8,
        capHeight - 8
    );


    // dark bottom edge

    ctx.fillStyle =
        "rgba(0,70,15,0.30)";


    ctx.fillRect(
        capX,
        topPipe
            ? capY + capHeight - 4
            : capY,
        capWidth,
        4
    );
}


// ============================================================
// CREATE PIPE
// ============================================================

function createPipe() {

    if (
        !gameStarted ||
        gameOver
    ) {
        return;
    }


    const minHeight = 85;

    const maxHeight =
        canvas.height -
        groundHeight -
        pipeGap -
        85;


    const topHeight =
        Math.random() *
        (maxHeight - minHeight) +
        minHeight;


    pipes.push({

        x: canvas.width + 10,

        topHeight: topHeight,

        bottomY:
            topHeight +
            pipeGap,

        passed: false

    });
}


// ============================================================
// UPDATE BIRD
// ============================================================

function updateBird() {

    bird.velocity +=
        bird.gravity;

    bird.y +=
        bird.velocity;


    // rotation

    const targetAngle =
        Math.max(
            -0.45,
            Math.min(
                0.7,
                bird.velocity * 0.055
            )
        );


    bird.angle +=
        (
            targetAngle -
            bird.angle
        ) * 0.12;


    // ground collision

    if (
        bird.y +
        bird.height >=
        canvas.height -
        groundHeight
    ) {

        bird.y =
            canvas.height -
            groundHeight -
            bird.height;

        bird.velocity = 0;

        crash();

    }


    // ceiling

    if (
        bird.y < 0
    ) {

        bird.y = 0;

        bird.velocity = 0;

    }
}


// ============================================================
// UPDATE PIPES
// ============================================================

function updatePipes() {

    pipes.forEach(
        pipe => {

            pipe.x -=
                pipeSpeed;

        }
    );


    pipes =
        pipes.filter(
            pipe =>
                pipe.x +
                pipeWidth >
                -20
        );
}


// ============================================================
// UPDATE SCORE
// ============================================================

function updateScore() {

    pipes.forEach(
        pipe => {

            if (
                !pipe.passed &&
                pipe.x +
                pipeWidth <
                bird.x
            ) {

                pipe.passed = true;

                score++;

            }

        }
    );
}


// ============================================================
// COLLISION
// ============================================================

function checkCollision() {

    for (
        const pipe of pipes
    ) {

        const birdLeft =
            bird.x + 5;

        const birdRight =
            bird.x +
            bird.width -
            4;

        const birdTop =
            bird.y + 5;

        const birdBottom =
            bird.y +
            bird.height -
            4;


        const pipeLeft =
            pipe.x;

        const pipeRight =
            pipe.x +
            pipeWidth;


        const horizontal =
            birdRight >
            pipeLeft &&
            birdLeft <
            pipeRight;


        const topHit =
            birdTop <
            pipe.topHeight;


        const bottomHit =
            birdBottom >
            pipe.bottomY;


        if (
            horizontal &&
            (
                topHit ||
                bottomHit
            )
        ) {

            crash();

            return;

        }

    }
}


// ============================================================
// CRASH
// ============================================================

function crash() {

    if (gameOver) {
        return;
    }


    gameOver = true;

    createCrashParticles();


    // tilt bird dramatically

    bird.angle =
        bird.velocity > 0
            ? 0.75
            : -0.45;

}


// ============================================================
// CRASH PARTICLES
// ============================================================

function createCrashParticles() {

    particles = [];


    // yellow feathers

    for (
        let i = 0;
        i < 12;
        i++
    ) {

        particles.push({

            x:
                bird.x +
                bird.width / 2,

            y:
                bird.y +
                bird.height / 2,

            velocityX:
                (Math.random() - 0.5) *
                7,

            velocityY:
                (Math.random() - 0.5) *
                7,

            size:
                Math.random() * 5 +
                3,

            rotation:
                Math.random() *
                Math.PI,

            rotationSpeed:
                (Math.random() - 0.5) *
                0.25,

            life: 45,

            type: "feather"

        });

    }


    // white impact particles

    for (
        let i = 0;
        i < 10;
        i++
    ) {

        particles.push({

            x:
                bird.x +
                bird.width / 2,

            y:
                bird.y +
                bird.height / 2,

            velocityX:
                (Math.random() - 0.5) *
                8,

            velocityY:
                (Math.random() - 0.5) *
                8,

            size:
                Math.random() * 4 +
                2,

            rotation: 0,

            rotationSpeed: 0,

            life: 30,

            type: "spark"

        });

    }
}


// ============================================================
// UPDATE PARTICLES
// ============================================================

function updateParticles() {

    particles.forEach(
        particle => {

            particle.x +=
                particle.velocityX;

            particle.y +=
                particle.velocityY;


            particle.velocityY +=
                0.18;


            particle.rotation +=
                particle.rotationSpeed;


            particle.life--;

        }
    );


    particles =
        particles.filter(
            particle =>
                particle.life > 0
        );
}


// ============================================================
// DRAW PARTICLES
// ============================================================

function drawParticles() {

    particles.forEach(
        particle => {

            ctx.save();

            ctx.translate(
                particle.x,
                particle.y
            );

            ctx.rotate(
                particle.rotation
            );


            if (
                particle.type ===
                "feather"
            ) {

                ctx.fillStyle =
                    "#FFD83D";


                ctx.strokeStyle =
                    "#C99700";


                ctx.lineWidth = 1.5;


                ctx.beginPath();

                ctx.ellipse(
                    0,
                    0,
                    particle.size * 1.8,
                    particle.size * 0.7,
                    0,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

                ctx.stroke();

            } else {

                ctx.fillStyle =
                    "white";


                ctx.beginPath();

                ctx.arc(
                    0,
                    0,
                    particle.size,
                    0,
                    Math.PI * 2
                );

                ctx.fill();

            }


            ctx.restore();

        }
    );
}


// ============================================================
// BIRD
// ============================================================

function drawBird() {

    ctx.save();


    // bird center

    ctx.translate(

        bird.x +
        bird.width / 2,

        bird.y +
        bird.height / 2

    );


    ctx.rotate(
        bird.angle
    );


    // scale

    ctx.scale(
        1.25,
        1.25
    );


    // --------------------------------------------------------
    // MOTION TRAIL
    // --------------------------------------------------------

    if (
        gameStarted &&
        !gameOver &&
        Math.abs(
            bird.velocity
        ) > 1
    ) {

        ctx.fillStyle =
            "rgba(255,255,255,0.25)";


        ctx.beginPath();

        ctx.ellipse(
            -28,
            8,
            16,
            4,
            -0.15,
            0,
            Math.PI * 2
        );

        ctx.fill();


        ctx.beginPath();

        ctx.ellipse(
            -35,
            13,
            10,
            3,
            -0.15,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    // --------------------------------------------------------
    // SHADOW
    // --------------------------------------------------------

    ctx.fillStyle =
        "rgba(0,0,0,0.15)";


    ctx.beginPath();

    ctx.ellipse(
        0,
        17,
        16,
        5,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // --------------------------------------------------------
    // BODY OUTLINE
    // --------------------------------------------------------

    ctx.fillStyle =
        "#A76B00";


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        18,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // --------------------------------------------------------
    // BODY
    // --------------------------------------------------------

    const bodyGradient =
        ctx.createRadialGradient(
            -5,
            -8,
            2,
            0,
            0,
            20
        );


    bodyGradient.addColorStop(
        0,
        "#FFF47A"
    );

    bodyGradient.addColorStop(
        0.45,
        "#FFD83D"
    );

    bodyGradient.addColorStop(
        1,
        "#F4B900"
    );


    ctx.fillStyle =
        bodyGradient;


    ctx.beginPath();

    ctx.arc(
        0,
        0,
        15.5,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // --------------------------------------------------------
    // BELLY
    // --------------------------------------------------------

    ctx.fillStyle =
        "#FFE979";


    ctx.beginPath();

    ctx.ellipse(
        -3,
        4,
        9,
        10,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // --------------------------------------------------------
    // WING OUTLINE
    // --------------------------------------------------------

    ctx.fillStyle =
        "#B77900";


    ctx.beginPath();

    ctx.ellipse(
        -9,
        7,
        12,
        8,
        -0.25,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // --------------------------------------------------------
    // WING
    // --------------------------------------------------------

    ctx.fillStyle =
        "#F7B900";


    ctx.beginPath();

    ctx.ellipse(
        -9,
        6,
        10,
        6,
        -0.25,
        0,
        Math.PI * 2
    );

    ctx.fill();


    // wing line

    ctx.strokeStyle =
        "#D58D00";

    ctx.lineWidth = 2;


    ctx.beginPath();

    ctx.moveTo(
        -16,
        6
    );

    ctx.quadraticCurveTo(
        -9,
        10,
        -3,
        6
    );

    ctx.stroke();


    // --------------------------------------------------------
    // EYE
    // --------------------------------------------------------

    if (gameOver) {

        // CLOSED / CRASHED EYE

        ctx.strokeStyle =
            "#202020";

        ctx.lineWidth = 3;

        ctx.lineCap = "round";


        // left slash

        ctx.beginPath();

        ctx.moveTo(
            3,
            -12
        );

        ctx.lineTo(
            11,
            -6
        );

        ctx.stroke();


        // right slash

        ctx.beginPath();

        ctx.moveTo(
            11,
            -12
        );

        ctx.lineTo(
            3,
            -6
        );

        ctx.stroke();

    } else {

        // eye outline

        ctx.fillStyle =
            "#222";


        ctx.beginPath();

        ctx.arc(
            7,
            -9,
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // white

        ctx.fillStyle =
            "white";


        ctx.beginPath();

        ctx.arc(
            7,
            -9,
            5.5,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // pupil

        ctx.fillStyle =
            "#111";


        ctx.beginPath();

        ctx.arc(
            8.5,
            -9,
            3,
            0,
            Math.PI * 2
        );

        ctx.fill();


        // shine

        ctx.fillStyle =
            "white";


        ctx.beginPath();

        ctx.arc(
            9.5,
            -10,
            1,
            0,
            Math.PI * 2
        );

        ctx.fill();

    }


    // --------------------------------------------------------
    // BEAK
    // --------------------------------------------------------

    // outline

    ctx.fillStyle =
        "#B64E00";


    ctx.beginPath();

    ctx.moveTo(
        13,
        -2
    );

    ctx.lineTo(
        27,
        2
    );

    ctx.lineTo(
        14,
        9
    );

    ctx.closePath();

    ctx.fill();


    // orange

    ctx.fillStyle =
        "#FF8A00";


    ctx.beginPath();

    ctx.moveTo(
        14,
        -3
    );

    ctx.lineTo(
        25,
        1
    );

    ctx.lineTo(
        14,
        5
    );

    ctx.closePath();

    ctx.fill();


    // beak line

    ctx.strokeStyle =
        "#A84D00";

    ctx.lineWidth = 1.5;


    ctx.beginPath();

    ctx.moveTo(
        15,
        1
    );

    ctx.lineTo(
        24,
        1
    );

    ctx.stroke();


    ctx.restore();
}


// ============================================================
// SCORE
// ============================================================

function drawScore() {

    if (
        !gameStarted ||
        gameOver
    ) {
        return;
    }


    ctx.textAlign =
        "center";


    // dark outline

    ctx.font =
        "bold 48px Arial";


    ctx.lineWidth = 6;

    ctx.strokeStyle =
        "rgba(0,0,0,0.65)";


    ctx.strokeText(
        score,
        canvas.width / 2,
        65
    );


    // white

    ctx.fillStyle =
        "white";


    ctx.fillText(
        score,
        canvas.width / 2,
        65
    );
}


// ============================================================
// START SCREEN
// ============================================================

function drawStartScreen() {

    if (gameStarted) {
        return;
    }


    // dark transparent overlay

    ctx.fillStyle =
        "rgba(0,0,0,0.08)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // --------------------------------------------------------
    // TITLE
    // --------------------------------------------------------

    ctx.textAlign =
        "center";


    ctx.font =
        "bold 58px Arial";


    // FLAPPY

    ctx.lineWidth = 9;

    ctx.strokeStyle =
        "#20252B";


    ctx.strokeText(
        "FLAPPY",
        canvas.width / 2,
        150
    );


    ctx.fillStyle =
        "#FFFFFF";


    ctx.fillText(
        "FLAPPY",
        canvas.width / 2,
        150
    );


    // BIRD

    ctx.font =
        "bold 55px Arial";


    ctx.strokeStyle =
        "#20252B";


    ctx.strokeText(
        "BIRD",
        canvas.width / 2,
        205
    );


    ctx.fillStyle =
        "#FFD83D";


    ctx.fillText(
        "BIRD",
        canvas.width / 2,
        205
    );


    // --------------------------------------------------------
    // START PANEL
    // --------------------------------------------------------

    const panelX = 65;

    const panelY = 390;

    const panelWidth = 270;

    const panelHeight = 85;


    ctx.fillStyle =
        "rgba(20,60,80,0.62)";


    roundRect(
        panelX,
        panelY,
        panelWidth,
        panelHeight,
        22
    );


    ctx.fill();


    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 19px Arial";


    ctx.fillText(
        "Click or press SPACE",
        canvas.width / 2,
        425
    );


    ctx.fillText(
        "to start",
        canvas.width / 2,
        452
    );
}


// ============================================================
// GAME OVER
// ============================================================

function drawGameOver() {

    if (!gameOver) {
        return;
    }


    // transparent overlay

    ctx.fillStyle =
        "rgba(0,0,0,0.08)";

    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );


    // --------------------------------------------------------
    // GAME OVER TEXT
    // --------------------------------------------------------

    ctx.textAlign =
        "center";


    ctx.font =
        "bold 45px Arial";


    ctx.lineWidth = 9;

    ctx.strokeStyle =
        "#20252B";


    ctx.strokeText(
        "GAME OVER",
        canvas.width / 2,
        330
    );


    // split color effect

    ctx.fillStyle =
        "#FFFFFF";


    ctx.fillText(
        "GAME",
        canvas.width / 2 - 70,
        330
    );


    ctx.fillStyle =
        "#FF7777";


    ctx.fillText(
        "OVER",
        canvas.width / 2 + 70,
        330
    );


    // --------------------------------------------------------
    // SCORE PANEL
    // --------------------------------------------------------

    const panelX = 70;

    const panelY = 365;

    const panelWidth = 260;

    const panelHeight = 115;


    ctx.fillStyle =
        "rgba(20,60,80,0.68)";


    roundRect(
        panelX,
        panelY,
        panelWidth,
        panelHeight,
        22
    );


    ctx.fill();


    // score

    ctx.fillStyle =
        "white";


    ctx.font =
        "bold 26px Arial";


    ctx.fillText(
        `Score: ${score}`,
        canvas.width / 2,
        410
    );


    // restart

    ctx.font =
        "bold 17px Arial";


    ctx.fillText(
        "Click or press SPACE",
        canvas.width / 2,
        447
    );


    ctx.fillText(
        "to restart",
        canvas.width / 2,
        470
    );
}


// ============================================================
// ROUNDED RECTANGLE
// ============================================================

function roundRect(
    x,
    y,
    width,
    height,
    radius
) {

    ctx.beginPath();

    ctx.moveTo(
        x + radius,
        y
    );

    ctx.lineTo(
        x + width - radius,
        y
    );

    ctx.quadraticCurveTo(
        x + width,
        y,
        x + width,
        y + radius
    );

    ctx.lineTo(
        x + width,
        y + height - radius
    );

    ctx.quadraticCurveTo(
        x + width,
        y + height,
        x + width - radius,
        y + height
    );

    ctx.lineTo(
        x + radius,
        y + height
    );

    ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - radius
    );

    ctx.lineTo(
        x,
        y + radius
    );

    ctx.quadraticCurveTo(
        x,
        y,
        x + radius,
        y
    );

    ctx.closePath();
}


// ============================================================
// RESET GAME
// ============================================================

function resetGame() {

    bird.x = 90;

    bird.y = 270;

    bird.velocity = 0;

    bird.angle = 0;


    pipes = [];

    particles = [];

    score = 0;

    gameOver = false;

}


// ============================================================
// FLAP / START / RESTART
// ============================================================

function flap() {

    // START

    if (!gameStarted) {

        gameStarted = true;

        bird.velocity =
            bird.jump;

        return;
    }


    // RESTART

    if (gameOver) {

        resetGame();

        gameStarted = true;

        bird.velocity =
            bird.jump;

        return;
    }


    // NORMAL FLAP

    bird.velocity =
        bird.jump;
}


// ============================================================
// KEYBOARD
// ============================================================

document.addEventListener(
    "keydown",
    event => {

        if (
            event.code ===
            "Space"
        ) {

            event.preventDefault();

            flap();

        }

    }
);


// ============================================================
// MOUSE / TOUCH
// ============================================================

canvas.addEventListener(
    "click",
    flap
);

canvas.addEventListener(
    "touchstart",
    event => {

        event.preventDefault();

        flap();

    }
);


// ============================================================
// PIPE SPAWNING
// ============================================================

setInterval(
    () => {

        if (
            gameStarted &&
            !gameOver
        ) {

            createPipe();

        }

    },
    2400
);


// ============================================================
// GAME LOOP
// ============================================================

function gameLoop() {

    frameCount++;


    // background

    drawBackground();


    // gameplay

    if (
        gameStarted &&
        !gameOver
    ) {

        updateBird();

        updatePipes();

        updateScore();

        checkCollision();

    }


    // particles always update

    updateParticles();


    // draw pipes

    drawPipes();


    // draw bird

    drawBird();


    // draw particles

    drawParticles();


    // score

    drawScore();


    // overlays

    drawGameOver();

    drawStartScreen();


    requestAnimationFrame(
        gameLoop
    );
}


// ============================================================
// START
// ============================================================

gameLoop();
