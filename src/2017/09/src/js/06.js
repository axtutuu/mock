const canvas = document.querySelector('.canvas');
const ctx    = canvas.getContext('2d');
canvas.width = canvas.height = 600;

ctx.fillStyle = '#d8d8d8';
ctx.fillRect(0, 0, 600, 600);

class Circle {
  constructor(ctx) {
    this.x       = 30;
    this.y       = 30;
    this.vx      = 0;
    this.vy      = 0;
    this.angle   = 30;
    this.radians = 0;
    this.speed   = 3.0;
    this.ctx     = ctx;
  }

  update() {

    // if(this.x < 10) {
    //   this.angle = 180-this.angle;
    // }
    // console.log(this.x, this.angle);

    this.redians = this.angle * Math.PI / 180;
    this.vx = Math.cos(this.radians)*this.speed;
    this.vy = Math.sin(this.radians)*this.speed;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'green';
    this.ctx.arc(this.x, this.y, 10, 0, Math.PI*2.0, true);
    this.ctx.fill();
  }
}

const c = new Circle(ctx);
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if(c.x > 600-10) {
    c.angle = 180-c.angle;
  }
  c.x += c.vx;
  c.y += c.vy;

  c.update();
  c.draw();
  requestAnimationFrame(tick);
}

tick();
