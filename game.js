const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

canvas.width = 800;
canvas.height = 600;

let player = { x: canvas.width / 2 - 25, y: canvas.height - 60, width: 50, height: 50, speed: 7, emoji: "🤤" };
let foodItems = [];
let badItems = [];
let score = 0;
let lives = 3;
let gameOver = false;

const foodEmojis = ["🍓", "🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🍌"];
const badEmojis = ["😈", "👿", "👻", "💀", "☠️", "🎃", "💩", "🔥"];

let leftPressed = false;
let rightPressed = false;

// Key Event Listeners
document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowLeft") leftPressed = true;
    if (e.key === "ArrowRight") rightPressed = true;
});

document.addEventListener("keyup", (e) => {
    if (e.key === "ArrowLeft") leftPressed = false;
    if (e.key === "ArrowRight") rightPressed = false;
});

// Update Game
function update() {
    if (gameOver) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Lives: ${"♥️".repeat(lives)}`, 10, 60);

    // Move Player
    if (leftPressed && player.x > 0) player.x -= player.speed;
    if (rightPressed && player.x < canvas.width - player.width) player.x += player.speed;

    ctx.fillText(player.emoji, player.x, player.y);

    // Handle Falling Items
    handleFallingItems();

    requestAnimationFrame(update);
}

// Handle Falling Items
function handleFallingItems() {
    foodItems.forEach((item, index) => {
        item.y += 3;
        ctx.fillText(item.emoji, item.x, item.y);

        if (item.y > canvas.height) foodItems.splice(index, 1);

        if (collisionDetected(item, player)) {
            score += 10;
            foodItems.splice(index, 1);
        }
    });

    badItems.forEach((item, index) => {
        item.y += 3;
        ctx.fillText(item.emoji, item.x, item.y);

        if (item.y > canvas.height) badItems.splice(index, 1);

        if (collisionDetected(item, player)) {
            lives -= 1;
            if (lives <= 0) {
                gameOver = true;
                alert("Game Over! Refresh to play again.");
            }
            badItems.splice(index, 1);
        }
    });
}

// Collision Detection
function collisionDetected(item, player) {
    return (
        item.y + 30 >= player.y &&
        item.x > player.x &&
        item.x < player.x + player.width
    );
}

// Spawn Items
setInterval(() => {
    if (gameOver) return;

    foodItems.push({ x: Math.random() * canvas.width, y: 0, emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)] });
    badItems.push({ x: Math.random() * canvas.width, y: 0, emoji: badEmojis[Math.floor(Math.random() * badEmojis.length)] });
}, 1000);

// Start Game Loop
update();
