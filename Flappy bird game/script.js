// Game variables
let score = 0;
let gameActive = false;
let birdY = 300;
let birdVelocity = 0;
let gravity = 0.2;
let pipes = [];
let pipeSpeed = 2;
let pipeGap = 150;
let pipeFrequency = 1500; // ms

// DOM elements
const bird = document.getElementById('bird');
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score-display');
const startBtn = document.getElementById('start-btn');
const resetBtn = document.getElementById('reset-btn');
const gameOverDisplay = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const playAgainBtn = document.getElementById('play-again-btn');
const ground = document.getElementById('ground');


// Game loop
function gameLoop() {
    if (!gameActive) return;

    // Update bird position
    birdVelocity += gravity;
    birdY += birdVelocity;
    bird.style.top = birdY + 'px';

    // Check for collisions
    if (birdY <= 0 || birdY + 40 >= gameContainer.offsetHeight - 50) {
        endGame();
        return;
    }

    // Move pipes
    pipes.forEach((pipe, index) => {
        pipe.x -= pipeSpeed;
        pipe.element.style.left = pipe.x + 'px';

        // Check if bird passed a pipe
        if (pipe.x + 80 === 100 && !pipe.passed) {
            pipe.passed = true;
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
        }

        // Remove pipes that are off screen
        if (pipe.x + 80 < 0) {
            gameContainer.removeChild(pipe.element);
            pipes.splice(index, 1);
        }

        // Check for pipe collision
        if (
            (birdY <= pipe.topHeight || birdY + 40 >= pipe.topHeight + pipeGap) &&
            pipe.x <= 100 + 40 && pipe.x + 80 >= 100
        ) {
            endGame();
        }
    });

    requestAnimationFrame(gameLoop);
}