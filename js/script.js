
// Game Constants and Variables
let inputDir = { x: 0, y: 0 }
const gameSound = new Audio('music/music.mp3');
const foodSound = new Audio('music/food.mp3');
const gameOverSound = new Audio('music/gameover.mp3');
const moveSound = new Audio('music/move.mp3');
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    { x: 13, y: 15 }
]
let food = { x: 10, y: 11 };
let isMusicPlay = false;
let isGameStart = false;
let gridSize = 18;

let highScore = localStorage.getItem("highScore") || 0;
document.getElementById("highScore").innerHTML = "highScore:" + highScore;

// Game Functions
function main(currTime) {
    window.requestAnimationFrame(main);

    // console.log(currTime);
    if ((currTime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = currTime;

    gameEngine();
}
function updateHighScore() {
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", highScore);
        document.getElementById("highScore").innerHTML = "highScore:" + highScore;
    }
}

function isCollide(snake) {
    //if you bump into yourself
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }

    }
}


function gameEngine() {



    //Part: 1 Udating the Snake And Food


    //if you have eaten the food, increment the score and regenerate  the food
    if (snakeArr[0].x === food.x && snakeArr[0].y === food.y) {
        foodSound.play();
        score += 1;
        document.getElementById("score").innerHTML = "score:" + score;
        updateHighScore();
        snakeArr.unshift({ x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y })
        let a = 1;
        let b = 17;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    if (isCollide(snakeArr)) {
        gameOverSound.play();
        gameSound.pause();
        inputDir = { x: 0, y: 0 };
        updateHighScore();
        alert("Game Over. press any key to play again!")
        snakeArr = [
            { x: 13, y: 15 }
        ]
        gameSound.play();
        score = 0;

    }


    //move snake
    for (let i = snakeArr.length - 2; i >= 0; i--) {
        snakeArr[i + 1] = { ...snakeArr[i] };

    }
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    //wrap around logic
    if (snakeArr[0].x > gridSize) snakeArr[0].x = 1;
    if (snakeArr[0].x < 1) snakeArr[0].x = gridSize;
    if (snakeArr[0].y > gridSize) snakeArr[0].y = 1;
    if (snakeArr[0].y < 1) snakeArr[0].y = gridSize;

    //Part: 2 Display the Snake and Food
    //Display the Snake
    let board = document.getElementById("board");
    board.innerHTML = "";
    snakeArr.forEach((e, index) => {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('head');
            snakeElement.innerHTML = "<p>o.o</p>"

        } else {
            snakeElement.classList.add('snakeBody');
        }
        board.appendChild(snakeElement);

    })

    //Display the Food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);



}


// Start the game loop
window.requestAnimationFrame(main);
window.addEventListener('keydown', (e) => {

    if (!isGameStart) {
        gameSound.play();
        isMusicPlay = true;
        isGameStart = true;
    }
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp")
            if (inputDir.y !== 1) {
                inputDir.x = 0;
                inputDir.y = -1;
            }
            break;

        case "ArrowDown":
            console.log("ArrowDown")
            if (inputDir.y !== -1) {

                inputDir.x = 0;
                inputDir.y = 1;
            }
            break;

        case "ArrowLeft":
            console.log("ArrowLeft")
            if (inputDir.x !== 1) {

                inputDir.x = -1;
                inputDir.y = 0;
            }
            break;

        case "ArrowRight":
            console.log("ArrowRight")
            if (inputDir.x !== -1) {

                inputDir.x = 1;
                inputDir.y = 0;
            }
            break;

        default:
            break;
    }
})

// events listner of game music
let muteIcon = document.getElementById("icon");

muteIcon.addEventListener("click", () => {
    if (isMusicPlay) {
        console.log("clicked")
        gameSound.pause();
        muteIcon.src = "img/soundOn.svg"
        isMusicPlay = false;
    } else {
        console.log("clicked again")
        gameSound.play();
        muteIcon.src = "img/soundOff.svg"
        isMusicPlay = true;
    }
})


