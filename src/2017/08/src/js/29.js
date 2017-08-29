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
  }
  
  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.toX, this.toY);
    ctx.strokeStyle = 'red';
  }
}

const line = new Line();

function tick() {
  line.toX += 1;
  line.draw();
  ctx.stroke();
  
  if(line.toX > 800) {
    line.toX = 0;
  }
  requestAnimationFrame(tick);
}


tick();

