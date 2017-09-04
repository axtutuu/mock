const canvas = document.querySelector('.canvas')
const ctx    = canvas.getContext('2d');
canvas.width = canvas.height = 600;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 600, 600);


let size = 0;
let color = ['black', 'white'];
let bg = color[0], box = color[1];

function tick() {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 600, 600);

  ctx.fillStyle = box;

  size += 0.2;
  for(let i=0; i<10; i++) {
    ctx.fillRect((60*i), 0, size, size);
    for(let ii=0; ii<10; ii++) {
      ctx.fillRect((60*i), (60*ii), size, size);
    }
  }

  if(size > 60) {
    size = 0;
    if(bg == 'black') {
      bg = 'white';
      box = 'black';
    } else {
      box = 'white';
      bg = 'black';
    }
  }

  requestAnimationFrame(tick);
}

tick();
