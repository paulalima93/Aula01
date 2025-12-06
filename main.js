const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';

function drawSnake() {
    ctx.fillStyle = 'red';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
    });
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    // Mudando a posição da cabeça baseada na direção
    

    // Adiciona a nova cabeça na frente do corpo da cobra
    snake.unshift(head);

    // Remove o último segmento do corpo para manter o movimento
    snake.pop();
}

function drawBoard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width / box; i++) {
        for (let j = 0; j < canvas.height / box; j++) {
            //Fazendo as cores do board e desenha os quadrados

        }
    }
}

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

function gameLoop() {
    drawBoard();
    drawSnake();
    moveSnake();
}

setInterval(gameLoop, 150);


