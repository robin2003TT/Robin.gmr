const player = document.getElementById("player");
const gameContainer = document.getElementById("game-container");
const music = document.getElementById("bg-music");
const leftBtn = document.getElementById("leftBtn");
const rightBtn = document.getElementById("rightBtn");

const foods = "🍓🍒🍎🍉🍑🍊🥭🍍🍌🍋🍈🍏🍐🥝🫐🍇🍔🍟🍕🍩🍫🍰".split("");
const badItems = "😈👿👻💀☠️💩🔥🦠🐛🪱🕷️🦟🐌".split("");
const heart = "♥️";

let lives = 3;
let score = 0;
let playerPos = 50; // Center position

// Music Loop Between Two Songs
const songs = ["BUSSIN'.mp3", "Let's Go.mp3"];
let currentSongIndex = 0;

music.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    music.src = songs[currentSongIndex];
    music.play();
});

// Move Player
leftBtn.addEventListener("click", () => movePlayer(-10));
rightBtn.addEventListener("click", () => movePlayer(10));

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") movePlayer(-10);
    if (e.key === "ArrowRight") movePlayer(10);
});

function movePlayer(direction) {
    playerPos += direction;
    playerPos = Math.max(0, Math.min(90, playerPos));
    player.style.left = playerPos + "%";
}

// Spawn Falling Items
function spawnItem() {
    const item = document.createElement("div");
    item.classList.add("falling-item");

    const isHeart = Math.random() < 0.05;
    const isBad = Math.random() < 0.2;
    item.textContent = isHeart ? heart : isBad ? badItems[Math.floor(Math.random() * badItems.length)] : foods[Math.floor(Math.random() * foods.length)];
    
    item.style.left = Math.random() * 90 + "%";
    gameContainer.appendChild(item);

    let fallInterval = setInterval(() => {
        let itemTop = parseFloat(getComputedStyle(item).top) || 0;
        item.style.top = itemTop + 5 + "px";

        // Collision Check
        if (itemTop > 350) {
            let playerLeft = player.offsetLeft;
            let playerRight = playerLeft + player.offsetWidth;
            let itemLeft = item.offsetLeft;
            let itemRight = itemLeft + item.offsetWidth;

            if (itemRight > playerLeft && itemLeft < playerRight) {
                clearInterval(fallInterval);
                gameContainer.removeChild(item);
                
                if (item.textContent === heart) {
                    if (lives < 3) lives++;
                } else if (badItems.includes(item.textContent)) {
                    lives--;
                    if (lives <= 0) {
                        alert("Game Over!");
                        window.location.reload();
                    }
                } else {
                    score += 10;
                }
            }
        }

        if (itemTop > 400) {
            clearInterval(fallInterval);
            gameContainer.removeChild(item);
        }
    }, 100);
}

// Spawn Items Every 2 Seconds
setInterval(spawnItem, 2000);

// Back Button
function goBack() {
    window.location.href = "index.html";
            }
