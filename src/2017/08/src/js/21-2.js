let clock = 0;
const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');

canvas.width = canvas.height = 600;

function paintWave(degree, amplitude, color) {
  let boatY = 0;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 600);
  for(let i=0; i <= 600; i += 20) {
    const y = Math.sin((i + degree) * Math.PI / 180) * amplitude + 300;
    ctx.lineTo(i, y);
    if( i === 300 ) {
      boatY = y;
    }
  }
  ctx.lineTo(600,600);
  ctx.fill();
  return boatY;
}

function paint() {
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600)
  const wave1 = paintWave(clock, 40, '#0000ff');
  const wave2 = paintWave(clock * 2.5, 30, '#0022CC');
  const wave3 = paintWave(clock * 3, 20, '#2200DD');
  const y = Math.min(wave1, Math.min(wave2, wave3))

  ctx.fillStyle = 'green';
  ctx.fillRect(275, y-20, 50, 20);
}

(function tick() {
  paint();
  clock++;
  requestAnimationFrame(tick);
})();
