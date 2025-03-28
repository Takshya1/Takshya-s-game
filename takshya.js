let gameStarted = false;
let score = 0;
let bestScore = localStorage.getItem("bestScore") || 0;
let scoreInterval;

document.getElementById("best-score").textContent = bestScore;

function startGame() {
    document.querySelector(".button-container").style.display = "none";
    document.getElementById("score-container").style.display = "block";
    gameStarted = true;
    document.addEventListener("keydown", jump);
    moveObstacle();
    scoreInterval = setInterval(updateScore, 1000);
    changeBackground();
}

function jump(event) {
    if (event.code === "Space" && gameStarted) {
        let dog = document.getElementById("dog");
        dog.style.transition = "0.3s";
        dog.style.bottom = "100px";

        setTimeout(() => {
            dog.style.bottom = "0px";
        }, 300);
    }
}

function updateScore() {
    if (gameStarted) {
        score++;
        document.getElementById("score").textContent = score;
    }
}

function moveObstacle() {
    let obstacle = document.getElementById("obstacle");
    obstacle.style.animation = "moveObstacle 1.5s linear infinite";
    checkCollision();
}

function checkCollision() {
    let check = setInterval(() => {
        let dog = document.getElementById("dog");
        let obstacle = document.getElementById("obstacle");

        let dogRect = dog.getBoundingClientRect();
        let obstacleRect = obstacle.getBoundingClientRect();

        if (
            dogRect.bottom > obstacleRect.top &&
            dogRect.left < obstacleRect.right &&
            dogRect.right > obstacleRect.left
        ) {
            clearInterval(check);
            clearInterval(scoreInterval);

            if (score > bestScore) {
                bestScore = score;
                localStorage.setItem("bestScore", bestScore);
            }

            document.body.innerHTML = `
                <h1 style='color: red;'>☠ Game Over! Score: ${score} <br> Best: ${bestScore}</h1>
                <button onclick="location.reload()" class="restart-button">🔄 Restart Game</button>
            `;
        }
    }, 100);
}

// Changing background colors dynamically
function changeBackground() {
    let colors = ["black", "blue", "purple", "green", "orange"];
    let index = 0;
    setInterval(() => {
        document.body.style.background = colors[index];
        index = (index + 1) % colors.length;
    }, 2000);
}

// Google Login Callback
function handleCredentialResponse(response) {
    console.log("Google User Logged In: ", response.credential);
}
