document.addEventListener("DOMContentLoaded", () => {
    const player = document.getElementById("player");
    const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");
    const livesDisplay = document.getElementById("lives");
    const leaderboardList = document.getElementById("leaderboard-list");
    const bgMusic = document.getElementById("bg-music");

    let playerPosition = 50;
    let score = 0;
    let lives = 3;
    let playerName = sessionStorage.getItem("playerName");

    if (!playerName) {
        playerName = prompt("Enter your name for the leaderboard:");
        sessionStorage.setItem("playerName", playerName);
    }

    const goodItems = ["🍓","🍒","🍎","🍉","🍑","🍊","🥭","🍍","🍌","🍋","🍈","🍏","🍐","🥝","🫐","🍇","🍔","🍟","🍕","🍩","🍫","🍰"];
    const badItems = ["😈","👿","👻","💀","☠️","💩","🔥","🦠","🐛","🪱","🕷️","🦟","🐌"];

    function movePlayer(direction) {
        if (direction === "left" && playerPosition > 0) {
            playerPosition -= 5;
        } else if (direction === "right" && playerPosition < 95) {
            playerPosition += 5;
        }
        player.style.left = playerPosition + "%";
    }

    document.getElementById("leftBtn").addEventListener("click", () => movePlayer("left"));
    document.getElementById("rightBtn").addEventListener("click", () => movePlayer("right"));

    function spawnItem() {
        let item = document.createElement("div");
        item.classList.add("falling-item");
        item.textContent = Math.random() < 0.8 ? goodItems[Math.floor(Math.random() * goodItems.length)] : badItems[Math.floor(Math.random() * badItems.length)];
        item.style.left = Math.random() * 90 + "%";
        gameContainer.appendChild(item);

        let fallInterval = setInterval(() => {
            let itemTop = parseInt(window.getComputedStyle(item).getPropertyValue("top"));
            let playerLeft = player.offsetLeft;
            let playerRight = playerLeft + player.offsetWidth;
            let itemLeft = item.offsetLeft;
            let itemRight = itemLeft + item.offsetWidth;

            if (itemTop >= 370 && itemTop <= 400 && itemRight > playerLeft && itemLeft < playerRight) {
                clearInterval(fallInterval);
                gameContainer.removeChild(item);

                if (goodItems.includes(item.textContent)) {
                    score += 1;
                    scoreDisplay.textContent = score;
                    if (score % 100 === 0) {
                        updateLeaderboard();
                    }
                } else {
                    lives -= 1;
                    updateLives();
                }
            } else if (itemTop > 400) {
                clearInterval(fallInterval);
                gameContainer.removeChild(item);
            } else {
                item.style.top = itemTop + 5 + "px";
            }
        }, 100);
    }

    function updateLives() {
        if (lives <= 0) {
            alert("Game Over! Your final score: " + score);
            updateLeaderboard();
            score = 0;
            lives = 3;
        }
        livesDisplay.textContent = "❤️".repeat(lives);
    }

    function updateLeaderboard() {
        let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
        leaderboard.push({ name: playerName, score: score });
        leaderboard.sort((a, b) => b.score - a.score);
        leaderboard = leaderboard.slice(0, 5);
        localStorage.setItem("leaderboard", JSON.stringify(leaderboard));

        leaderboardList.innerHTML = "";
        leaderboard.forEach(entry => {
            let li = document.createElement("li");
            li.textContent = `${entry.name}: ${entry.score}`;
            leaderboardList.appendChild(li);
        });
    }

    setInterval(spawnItem, 2000);
    
    function goBack() {
        window.location.href = "index.html";
    }
});
                                               
