const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 10, y: 10 }];
let food = {}; // Variável para guardar a posição da comida
let direction = 'right';
let comidaConsumida = 0;
let speed = 150;

function drawSnake(){
    ctx.fillStyle = 'blue';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = '#f2f2f2'; 
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
    })
}

function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y }; // Posição da cabeça da cobrinha
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

    if (head.x < 0 || head.x >= canvas.width / box || head.y < 0 || head.y >= canvas.height / box) {
        clearInterval(game); // Para o jogo
        
        return;
    }

    if (snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        clearInterval(game); // Para o jogo
        
        return;
    }

    if (head.x === food.x && head.y === food.y){
        food = generateFoodPosition(); // Gera nova posição para a comida
       //Aumentar quantidade  de comida
       
        if (comidaConsumida % 5 === 0) {
            // Aumenta a velocidade em 20%
           
            clearInterval(game);
            game = setInterval(gameLoop, speed);
        }
    } else {
        snake.pop(); // Remove a última parte da cobrinha se não comeu a comida
      }

    // Adiciona a nova cabeça na frente do corpo da cobrinha
    snake.unshift(head);
}
function drawBoard(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width / box; i++) {
        for (let j = 0; j < canvas.height  / box; j++) {
            ctx.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#eeeeee';
            ctx.fillRect(i * box, j * box, box, box);
        }
    }
}

document.addEventListener('keydown', e => {
    switch (e.key) {
         case 'w':
            if (direction !== 'down') direction = 'up';
            break;
        case 's':
            if (direction !== 'up') direction = 'down';
            break;
        case 'a':
            if (direction !== 'right') direction = 'left';
            break;
        case 'd':
            if (direction !== 'left') direction = 'right';
            break;
    }
})
function drawFood(){
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x * box, food.y * box, box, box);
}

function generateFoodPosition(){
    let newFoodX, newFoodY;
    do { 
        newFoodX = Math.floor(Math.random() * (canvas.width / box));
        newFoodY = Math.floor(Math.random() * (canvas.height / box));
     } while (snake.some(segment => segment.x === newFoodX && segment.y === newFoodY));
     return { x: newFoodX, y: newFoodY };
}

function drawScore() {
    ctx.fillStyle = 'black';
    ctx.font = '30px Arial';
    ctx.fillText(`Score: ${comidaConsumida}`, 10, 30);
}

function gameLoop() {
    drawBoard();
    moveSnake();
    drawSnake();
    drawFood();
    drawScore();
};
food = generateFoodPosition(); // Posiciona a comida inicialmente
let game = setInterval(gameLoop, 150); // Inicia o jogo



// clearInterval(game);
