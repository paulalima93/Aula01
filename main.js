const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food;

/* =====================
   DESENHA A COBRA
===================== */
function drawSnake() {
    ctx.fillStyle = 'red';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = '#2f2f2f';
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
    });
}

/* =====================
   MOVIMENTA A COBRA
===================== */
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        food = generateFoodPosition(); // Gera nova comida
    } else {
        snake.pop(); // Remove a última parte da cobra
    }

    // Adiciona a nova cabeça na frente do corpo da cobra
    snake.unshift(head);
}

/* =====================
   DESENHA O TABULEIRO
===================== */
function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < canvas.width / box; i++) {
        for (let j = 0; j < canvas.height / box; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#cdcdcd';
            ctx.fillRect(i * box, j * box, box, box);
        }
    }
}

/* =====================
   CONTROLES
===================== */
document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            direction = 'up';
            console.log("para cima");
            break;
        case 's':
            direction = 'down';
            console.log("para baixo");
            break;
        case 'a':
            direction = 'left';
            console.log("esquerda");
            break;
        case 'd':
            direction = 'right';
            console.log("direita");
            break;
    }
});

/* =====================
   DESENHA A COMIDA
===================== */
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

/* =====================
   GERA POSIÇÃO DA COMIDA
===================== */
function generateFoodPosition() {

}

/* =====================
   LOOP DO JOGO
===================== */
function gameLoop() {
    drawBoard();
    moveSnake();
    drawSnake();
    drawFood();
}

food = generateFoodPosition(); // Posiciona a comida inicialmente
let game = setInterval(gameLoop, 150); // Inicia o jogo
