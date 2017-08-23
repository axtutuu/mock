const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');

let x0 = 0,
    y0 = 0,
    x1 = 0,
    y1 = 0,
    count = 0;

ctx.lineWidth = 3;
canvas.width = canvas.height = 500;

canvas.onmousedown = (e) => {
  const x = Math.floor((e.offsetX-240) / 25),
        y = Math.floor((e.offsetY-240) / 25);
  if(count++ % 2 === 0) {
    x0 = x, y0 = y;
  } else {
    x1 = x, y1 = y;
  }
  repaint();
}
repaint();

function repaint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  ctx.save();
  ctx.translate(250, 250);
  for(let i=-10; i <= 10; i++) {
    for(let ii=-10; ii <= 10; ii++) {
      drawCircle(i, ii, 'white');
    }
  }

  drawLine(-10, 0, 10, 0, 'red');
  drawLine(0, -10, 0, 10, 'red');

  drawLine(0, 0, x0, y0, 'blue');
  drawLine(0, 0, x1, y1, 'green');

  ctx.restore();

  const dot = x0*x1 + y0*y1;
  const sizeV1 = Math.sqrt(x0*x0 + y0*y0);
  const sizeV2 = Math.sqrt(x1*x1 + y1*y1);
  const cosTheta = dot / (sizeV1*sizeV2);

  document.getElementById('v0').textContent = `(${x0}, ${y0})`;
  document.getElementById('v1').textContent = `(${x1}, ${y1})`;
  document.getElementById('v2').textContent = dot;
  document.getElementById('v3').textContent = sizeV1;
  document.getElementById('v4').textContent = sizeV2;
  document.getElementById('v5').textContent = cosTheta;
  document.getElementById('v6').textContent = Math.acos(cosTheta)*180/Math.PI;
}

function drawCircle(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x*25, y*25, 1, 0, Math.PI*2);
  ctx.fill();
}

function drawLine(x0, y0, x1, y1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0*25, y0 * -25);
  ctx.lineTo(x1*25, y1 * -25);
  ctx.stroke();
}
