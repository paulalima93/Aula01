const canvas = document.getElementById('snakeCanvas');
const ctx = canvas.getContext('2d');

const box = 20;
let snake = [{ x: 10, y: 10 }];

function drawSnake(){
    ctx.fillStyle = 'red';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = '#f2f2f2';
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);
    })
}


