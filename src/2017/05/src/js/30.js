console.log('hello');
const CANVAS_WIDTH = window.innerWidth,
      CANVAS_HIGHT = window.innerHeight;
let canvas, context, dot;

init();

function init() {
  canvas = document.getElementById('0530');
  context = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HIGHT;

  createTrail();
  setInterval(loop, 1000/60);
}

function createTrail() {
  dot = {
   x: 100,
   y: 100,
   speed: 10,
   direction: Math.PI*2*Math.random()
  }
}

function updatePos() {
  const dx = dot.x+dot.speed*Math.cos(dot.direction);
  const dy = dot.y+dot.speed*Math.cos(dot.direction);

  // canvasの範囲を超えたらdirectionの変更
  if(dx<0 || dx>CANVAS_WIDTH || dy<0 || dy>CANVAS_HIGHT) {
    dot.direction = Math.PI*2*Math.random();
    updatePos();
    return;
  }

  dot.x = dx;
  dot.y = dy;
}

function loop() {
  updatePos();

  context.fillStyle = 'rgba(255,255,255,.5)';
  context.fillRect(0,0,canvas.width,canvas.height);

  context.beginPath();
  context.fillStyle = '#ff0000';
  context.moveTo(dot.x,dot.y);
  context.arc(dot.x,dot.y,3,0,Math.PI*2,true);
  context.fill();
}
