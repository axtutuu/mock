(() => {
  const canvas  = document.querySelector('.day-09');
  const context = canvas.getContext('2d');

  const x = 150,
        y = 100,
        r = 50;
  const c1 = line(r, -90);
  const c2 = line(r, -234);
  const c3 = line(r, -18);
  const c4 = line(r, -162);
  const c5 = line(r, -306);

  context.fillStyle = 'red';
  context.moveTo(x,y-r);

  context.beginPath();
  context.lineTo(c1.x+x, c1.y+y);
  context.lineTo(c2.x+x, c2.y+y);
  context.lineTo(c3.x+x, c3.y+y);
  context.lineTo(c4.x+x, c4.y+y);
  context.lineTo(c5.x+x, c5.y+y);
  context.closePath();
  context.fill();
  console.log('end');

  function line(r,angle) {
    return {
      x: r * Math.cos(angle/180 * Math.PI),
      y: r * Math.sin(angle/180 * Math.PI)
    }
  }
})();
