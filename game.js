// Game setup
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800;
canvas.height = 600;

let player = { x: canvas.width / 2, y: canvas.height - 60, width: 50, height: 50, speed: 5, emoji: '🤤' };
let foodItems = [];
let badItems = [];
let score = 0;
let lives = 3;
let gameOver = false;

const foodEmojis = ["🍓", "🍒", "🍎", "🍉", "🍑", "🍊", "🥭", "🍍", "🍌", "🍋", "🍋‍🟩", "🍈", "🍏", "🍐", "🥝", "🫒", "🫐", "🍇"];
const badEmojis = ["😈", "👿", "👻", "💀", "☠️", "🎃", "💩", "👾", "🔥", "🦠", "🐛", "🪱", "🦋", "🐞", "🐝", "🪰", "🪳", "🦟", "🦂", "🕷️"];

// Game loop
function gameLoop() {
    if (gameOver) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
    ctx.fillText(`Lives: ♥️`.repeat(lives), 10, 60);

    // Draw player
    ctx.fillText(player.emoji, player.x, player.y);

    // Move player
    if (leftPressed && player.x > 0) player.x -= player.speed;
    if (rightPressed && player.x < canvas.width - player.width) player.x += player.speed;

    // Draw falling items
    handleFallingItems();
    requestAnimationFrame(gameLoop);
}

function handleFallingItems() {
    // Update food items
    foodItems.forEach((item, index) => {
        item.y += 2;
        ctx.fillText(item.emoji, item.x, item.y);

        if (item.y > canvas.height) foodItems.splice(index, 1);

        if (item.y + 30 >= player.y && item.x > player.x && item.x < player.x + player.width) {
            score += 10;
            foodItems.splice(index, 1);
        }
    });

    // Update bad items
    badItems.forEach((item, index) => {
        item.y += 2;
        ctx.fillText(item.emoji, item.x, item.y);

        if (item.y > canvas.height) badItems.splice(index, 1);

        if (item.y + 30 >= player.y && item.x > player.x && item.x < player.x + player.width) {
            lives -= 1;
            if (lives <= 0) gameOver = true;
            badItems.splice(index, 1);
        }
    });
}

// Control movement
let leftPressed = false;
let rightPressed = false;

document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') leftPressed = true;
    if (e.key === 'ArrowRight') rightPressed = true;
});

document.addEventListener('keyup', function (e) {
    if (e.key === 'ArrowLeft') leftPressed = false;
    if (e.key === 'ArrowRight') rightPressed = false;
});

// Add new items
setInterval(() => {
    if (gameOver) return;
    const food = { x: Math.random() * canvas.width, y: 0, emoji: foodEmojis[Math.floor(Math.random() * foodEmojis.length)] };
    foodItems.push(food);

    const bad = { x: Math.random() * canvas.width, y: 0, emoji: badEmojis[Math.floor(Math.random() * badEmojis.length)] };
    badItems.push(bad);
}, 1000);

// Start game loop
gameLoop();
