const canvas = document.querySelector('.canvas');
const ctx    = canvas.getContext('2d');
let   degree = 0;

canvas.width = canvas.height = 800;
ctx.fillStyle = 'yellow';
ctx.fillRect(0,0, 800, 800);	

class Line {
  constructor() {
    this.x = 0;
    this.y = 50;
    
    this.toX = 0;
    this.toY = 150;

    this.theta = 50;
    this.radius = Math.random() * 15;
    ctx.strokeStyle = 'red';
  }
  
  draw() {
    ctx.beginPath();

    ctx.moveTo(Math.sin(), this.y);
    for(let i=0; i<this.toX; i++) {
      let s = Math.sin((degree+i) * Math.PI / 180) * -50;
      ctx.lineTo(i, this.toY+s);
    }
    ctx.stroke();
  }
}

const line = new Line();

function tick() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0,0, 800, 800);	

  degree++

  line.toX += 1;
  // line.theta += 0.1;
  line.draw();
  
  if(line.toX > 800) {
    line.toX = 0;
  }
  requestAnimationFrame(tick);
}

tick();
