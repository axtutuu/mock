const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');
canvas.width = canvas.height = 600;

let isFlying  = false,
    velocityY = -0.1,
    y         = 300,
    offset    = 0,
    speed     = 3,
    accelY    = 0.1,
    stop      = false,
    anime     = null;

function paint() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.fillStyle = 'brown';
  ctx.beginPath();

  ctx.moveTo(0, 0);
  for(let i = 0; i <= 600; i += 10) {
    let up = 200
        + Math.sin((i+offset) * Math.PI / 360) * 80;
    ctx.lineTo(i, up);
    if(i==10 && y < up)  {
      stop = true;
    }
  }
  ctx.lineTo(600, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 600);

  for(let i = 0; i <= 600; i += 10) {
    let down = 500
        + Math.sin((i + offset) * Math.PI / 340) * 80;
    ctx.lineTo(i, down);
    if(i==10 && y + 10 > down) {
      stop = true;
    }
  }
  ctx.lineTo(620, 600);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.fillRect(10, y, 10, 10);
  ctx.fillText(offset, 500, 50);
}

(function tick() {
  velocityY += isFlying ? -accelY : accelY;
  y += velocityY;
  offset += speed;
  if( offset % 100 == 0 ) {
    speed += 0.1;
  }
  paint();
  anime = requestAnimationFrame(tick);

  if(stop) {
    cancelAnimationFrame(anime);
  }
})();


onkeydown = () => {
  isFlying = true;
}

onkeyup = () => {
  isFlying = false;
}
