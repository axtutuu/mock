const canvas = document.querySelector('.canvas');
const ctx    = canvas.getContext('2d');

canvas.width = canvas.height = 800;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,0, 800, 800);	

class Line {
  constructor() {
    this.x = 0;
    this.y = 50;
    
    this.toX = 0;
    this.toY = 50;

    this.theta = Math.random() * 2;
    this.radius = Math.random() * 15;
  }
  
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.toY);
    // ctx.lineTo(this.toX, this.toY);
    ctx.bezierCurveTo(this.toY, this.toY+(Math.sin(this.theta) * this.radius), 70, 90, 90, this.toY);
    this.x = this.toX;
    ctx.strokeStyle = 'red';
  }
}

const line = new Line();

function tick() {
  // ctx.fillStyle = 'yellow';
  // ctx.fillRect(0,0, 800, 800);	

  line.toX += 0.5;
  line.theta += 0.1;
  line.draw();
  ctx.stroke();
  
  if(line.toX > 800) {
    line.toX = 0;
  }
  requestAnimationFrame(tick);
}

tick();
