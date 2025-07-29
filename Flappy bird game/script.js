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
