const canvas = document.querySelector('.canvas');
const ctx    = canvas.getContext('2d');
canvas.width = canvas.height = 800;

class Line {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    
    this.toX = 0;

    this.degree = 0;
    this.speed = 3;

    this.radius = Math.random() * 15;
    ctx.strokeStyle = 'red';
  }
  
  draw() {
    ctx.beginPath();

    ctx.moveTo(this.x, this.y);
    for(let i=0; i<this.toX; i++) {
      let s = Math.sin((this.degree+i) * Math.PI / 180) * 50;
      ctx.lineTo(i, this.y+s);
    }
    ctx.stroke();
  }
}


function tick() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0,0, 800, 800);	

  lines.forEach(v => {
    v.toX += v.speed;
    v.draw();
    if(v.toX>800) {
      v.toX = 0;
    }
  });

  requestAnimationFrame(tick);
}

/*
 * init
 */
const lines = [];
for(let i=1; i<15; i++) {
  lines.push(
    new Line(0, 50*i)
  )
}

tick();
