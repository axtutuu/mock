const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');

canvas.width = canvas.height = 600;
let snows = [], timer = 0;

ctx.globalAlpha = 0.6;

function random(limit) {
  return Math.floor(Math.random() * limit);
}
function addSnow() {
  if(snows.length >= 100) return;
  snows.push(new Snow());
}

function Snow() {
  this.x      = random(600);
  this.y      = -10;
  this.drift  = Math.random();
  this.speed  = random(5) + 1;
  this.width  = random(3) + 2;
  this.height = this.width;
  this.theta  = random(100);
  this.radius = random(10) + 3;
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'white';
  snows.forEach(s => {
    ctx.fillRect(s.x + Math.sin(s.theta) * s.radius, s.y, s.width, s.height);
  });
}

(function tick(time) {
 
  if(time-timer > 200) {
    addSnow();
    timer = time;
  }

  for(let i=0; i < snows.length; i++) {
    snows[i].y += snows[i].speed;
    /*
     * 雪を戻す
     */
    if(snows[i].y > 600) {
      snows[i].y = -5;
    }
    snows[i].x += snows[i].drift;
    if(snows[i].x > 600) {
      snows[i].x = 0;
    }
    snows[i].theta += 0.1;
  }
  paint();
  requestAnimationFrame(tick);
})();
