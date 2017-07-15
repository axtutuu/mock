(() => {
  class Particle {
    constructor(x,y) {
      this.x = x;
      this.y = y;

      this.vx = 0
      this.vy = 0
      this.next = null
    }
  }


  const particle = 3000,
        fps = Math.floor(1000 / 60);

  const canvas = document.querySelector('.day-15'),
        cxt    = canvas.getContext('2d');

  let first, old;
  // パーティクル初期化
  for(let i=0; i<particle; i++) {
    let p = new Particle(
          Math.random() * 600,
          Math.random() * 450,
        )

    if(first==null) {
      first = old = p;
    } else {
      old.next = p;
      old = p;
    }
  }

  setInterval(onTick, fps);

  function onTick() {
    cxt.fillStyle = "rgb(0, 0, 0)";
    cxt.fillRect(0,0,600,450);

    // パーティクルの塗り
    cxt.fillStyle = 'rgb(200, 200, 255)';
    let n = first;

    do {
      const x = n.x,
            y = n.y,
            acc = 50 / (x*x+y*y),
            accX = acc*x,
            accY = acc*y;

      n.vx += accX;
      n.vy += accY;
      n.x  += n.vx;
      n.y  += n.vy;

      n.vx *= 0.96;
      n.vy *= 0.96;

      if (n.x > 465)
        n.x = 0;
      else if (n.x < 0)
        n.x = 465;
      if (n.y > 465)
        n.y = 0;
      else if (n.y < 0)
        n.y = 465;

      cxt.fillRect(n.x, n.y, 1, 1);
    }
    while(n=n.next);
  }
 })();
