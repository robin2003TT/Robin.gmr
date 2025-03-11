let player = document.getElementById("player");
let gameContainer = document.getElementById("game-container");
let scoreDisplay = document.getElementById("score");
let livesDisplay = document.getElementById("lives");
let leaderboardDisplay = document.getElementById("leaderboard");

let score = 0;
let lives = 3;
let playerPosition = 50;

const goodItems = ["🍓", "🍒", "🍎", "🍕", "🍩"];
const badItems = ["💀", "💩", "🔥", "🦠"];
const heart = "❤️";

function moveLeft() {
    playerPosition -= 10;
    if (playerPosition < 0) playerPosition = 0;
    player.style.left = playerPosition + "%";
}

function moveRight() {
    playerPosition += 10;
    if (playerPosition > 90) playerPosition = 90;
    player.style.left = playerPosition + "%";
}

document.getElementById("leftBtn").addEventListener("click", moveLeft);
document.getElementById("rightBtn").addEventListener("click", moveRight);

function createItem() {
    let item = document.createElement("div");
    item.classList.add("falling-item");
    item.textContent = Math.random() < 0.8 ? goodItems[Math.floor(Math.random() * goodItems.length)] : badItems[Math.floor(Math.random() * badItems.length)];
    item.style.left = Math.random() * 90 + "%";
    gameContainer.appendChild(item);

    let fallInterval = setInterval(() => {
        let itemTop = parseInt(window.getComputedStyle(item).top);
        if (itemTop > 370) {
            let itemLeft = parseInt(window.getComputedStyle(item).left);
            if (Math.abs(itemLeft - playerPosition) < 10) {
                if (goodItems.includes(item.textContent)) {
                    score++;
                } else {
                    lives--;
                }
            }
            item.remove();
            clearInterval(fallInterval);
        } else {
            item.style.top = itemTop + 5 + "px";
        }
    }, 100);
}

setInterval(createItem, 1500);

function goBack() {
    window.location.href = "index.html";
}
