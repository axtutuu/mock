class Particle {
  constructor(opts) {
    this.scale = opts.scale;
    this.color = opts.color;
    this.speed = opts.speed;
    this.pos = {
      x: opts.x,
      y: opts.y
    };
    this.ctx = opts.ctx;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.pos.x, this.pos.y, this.scale, 0, 2*Math.PI, false);
    this.ctx.fillStyle = this.color;
    this.ctx.fill();
  }
}

export function particle($el) {
  const ctx = $el[0].getContext('2d');

  const density = 100;
  const particles = [];

  for(let i=0; i<density; i++) {
    particles[i] = new Particle({
      scale: 6,
      color: '#D0A000',
      speed: Math.random()*(4-2)+2,
      ctx: ctx,
      x: Math.random()*$el[0].width,
      y: Math.random()*$el[0].height
    });
    particles[i].draw();
  }

  loop();

  function loop() {
    window.requestAnimationFrame(loop);

    ctx.clearRect(0,0,ctx.canvas.width, ctx.canvas.height);
    for(let i=0; i<density; i++) {
      particles[i].pos.x += particles[i].speed;
      console.log(particles[i]);
      particles[i].draw();

      // 左端に行った場合
      if(particles[i].x>$el[0].width) {
        particles[i].x = -30;
      }
    }
  }
}
