const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');
let   degree = 0;

canvas.width = canvas.height = 600;

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);

  ctx.save();
  ctx.translate(100, 100);

  drawLine(0, -100, 0, 500, 'black');
  drawLine(-100, 0, 500, 0, 'black');

  const ss = Math.sin(degree*Math.PI/180),
        cc = Math.cos(degree*Math.PI/180),
        c  = cc*50,
        s  = ss*-50;
  drawLine(0, 0, c, s, 'red');
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.stroke();

  /*
   * sinカーブ
   */
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for(let i=0; i < 200; i++) {
    let s = Math.sin((degree+i) * Math.PI / 180) * -50;
    ctx.lineTo(i, s);
  }
  ctx.stroke();

  /*
   * cosカーブ
   */
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for(let i=0; i < 500; i++) {
    const c = Math.cos((degree + i) * Math.PI / 180) * 50;
    ctx.lineTo(c, i);
  }
  ctx.stroke();
  ctx.restore();
}

function drawLine(x, y, xx, yy, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(xx, yy);
  ctx.closePath();
  ctx.stroke();
}

(function tick() {
  degree++;
  paint();
  requestAnimationFrame(tick);
})();

