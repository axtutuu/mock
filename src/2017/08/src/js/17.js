const canvas = document.querySelector('.canvas');
const ctx    = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

const velocityX = 5, accelY = 0.4;
let velocityY = -20;

let x = 0, y = 0;
function tick() {
  x += velocityX;
  velocityY += accelY;
  y += velocityY;

  if(x > 600) x = 0;
  if(y > 600) {
    velocityY = -20;
  }
  paint(x, y);
  requestAnimationFrame(tick);
}

function paint(x, y) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, 10, 10);
  ctx.fill();
}
tick();

