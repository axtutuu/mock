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
    this.toY = 150;

    this.theta = 555;
    this.radius = Math.random() * 15;
  }
  
  draw() {
    ctx.beginPath();

    ctx.moveTo(this.x, this.toY);
    for(let i=0; i<this.toX; i+=1) {
      ctx.lineTo(i, (this.toY+Math.sin(50+i)*50)*2)
    }
    ctx.strokeStyle = 'red';
  }
}

const line = new Line();

function tick() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0,0, 800, 800);	

  line.toX += 1;
  // line.theta += 0.1;
  line.draw();
  ctx.stroke();
  
  if(line.toX > 800) {
    line.toX = 0;
  }
  requestAnimationFrame(tick);
}

tick();
