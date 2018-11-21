'use strict';
const c = document.getElementById("PlayArea");
const ctx = c.getContext("2d");
let fontSize = 0;
c.width = 800;
c.height = 600;
resizeCanvas();
const ball = {
    "pos": { "x": c.width / 2, "y": c.height / 2 },
    "dir": { "x": 0, "y": 0 },
    "size": 20,
    "speed": 10,
    "startSpeed": 10,
    "speedIncrease": .5
};
const score = {
    "left": 0,
    "right": 0
};
const player = {
    "left": {
        "y": 0
    },
    "right": {
        "y": 0
    },
    "size": {
        "w": 20,
        "h": 100
    },
    "dist": 30,
    "speed": 8
};
const inputs = {
    "w": 0,
    "s": 0,
    "up": 0,
    "down": 0
};
function keyPress(e) {
    if (!e)
        e = window.event;
    switch (e.code) {
        case "KeyW":
            if (e.type === "keyup") {
                inputs.w = 0;
            }
            else {
                inputs.w = player.speed;
            }
            break;
        case "KeyS":
            if (e.type === "keyup") {
                inputs.s = 0;
            }
            else {
                inputs.s = player.speed;
            }
            break;
        case "ArrowUp":
            if (e.type === "keyup") {
                inputs.up = 0;
            }
            else {
                inputs.up = player.speed;
            }
            break;
        case "ArrowDown":
            if (e.type === "keyup") {
                inputs.down = 0;
            }
            else {
                inputs.down = player.speed;
            }
            break;
        case "Enter":
            if (ball.dir.x === 0) {
                ball.dir.x = Math.random() < .5 ? -ball.speed : ball.speed;
            }
            break;
        default:
            break;
    }
}
function resizeCanvas() {
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    fontSize = c.height / 8;
    ctx.textBaseline = "bottom";
    ctx.font = fontSize + 'px "Press Start 2P"';
}
function draw() {
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = "#fff";
    ctx.textAlign = "left";
    ctx.fillText(`${score.right}`, fontSize * 2, fontSize);
    ctx.textAlign = "right";
    ctx.fillText(`${score.left}`, c.width - fontSize * 2, fontSize);
    ctx.fillRect(ball.pos.x - ball.size / 2, ball.pos.y - ball.size / 2, ball.size, ball.size);
    ctx.fillRect(player.dist, player.left.y, player.size.w, player.size.h);
    ctx.fillRect(c.width - player.dist, player.right.y, player.size.w, player.size.h);
}
function physics() {
    ball.pos.x += ball.dir.x;
    ball.pos.y += ball.dir.y;
    if (ball.pos.x - ball.size / 2 <= 0) {
        score.left++;
        ball.pos = { "x": c.width / 2, "y": c.height / 2 };
        ball.dir = { "x": 0, "y": 0 };
        ball.speed = ball.startSpeed;
    }
    if (ball.pos.x + ball.size / 2 >= c.width) {
        score.right++;
        ball.pos = { "x": c.width / 2, "y": c.height / 2 };
        ball.dir = { "x": 0, "y": 0 };
        ball.speed = ball.startSpeed;
    }
    if (ball.pos.x - ball.size / 2 < player.dist + player.size.w &&
        ball.pos.y + ball.size / 2 > player.left.y &&
        ball.pos.y - ball.size / 2 < player.left.y + player.size.h &&
        ball.pos.x + ball.size / 2 > player.dist) {
        ball.dir.x = ball.dir.x < 0 ? ball.speedIncrease + (-ball.dir.x) : -ball.speedIncrease - ball.dir.x;
        ball.dir.y = ball.speed * (ball.pos.y - (player.left.y + player.size.h / 2)) / player.size.h;
        ball.speed += ball.speedIncrease;
    }
    if (ball.pos.x + ball.size / 2 > c.width - player.dist &&
        ball.pos.y + ball.size / 2 > player.right.y &&
        ball.pos.y - ball.size / 2 < player.right.y + player.size.h &&
        ball.pos.x - ball.size / 2 < c.width - (player.dist - player.size.w)) {
        ball.dir.x = ball.dir.x < 0 ? ball.speedIncrease + (-ball.dir.x) : -ball.speedIncrease - ball.dir.x;
        ball.dir.y = ball.speed * (ball.pos.y - (player.right.y + player.size.h / 2)) / player.size.h;
        ball.speed += ball.speedIncrease;
    }
    if (ball.pos.y - ball.size / 2 < 0 || ball.pos.y + ball.size / 2 > c.height) {
        ball.dir.y = -ball.dir.y;
    }
}
function mainLoop() {
    requestAnimationFrame(mainLoop);
    draw();
    physics();
    player.left.y += inputs.s - inputs.w;
    player.right.y += inputs.down - inputs.up;
    player.left.y = player.left.y < 0 ? 0 : player.left.y;
    player.right.y = player.right.y < 0 ? 0 : player.right.y;
    player.left.y = player.left.y + player.size.h > c.height ? c.height - player.size.h : player.left.y;
    player.right.y = player.right.y + player.size.h > c.height ? c.height - player.size.h : player.right.y;
}
window.addEventListener("resize", resizeCanvas);
window.addEventListener("keydown", keyPress);
window.addEventListener("keyup", keyPress);
requestAnimationFrame(mainLoop);
//# sourceMappingURL=main.js.map