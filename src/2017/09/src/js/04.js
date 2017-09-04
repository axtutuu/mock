const canvas = document.querySelector('.canvas')
const ctx    = canvas.getContext('2d');
canvas.width = canvas.height = 600;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 600, 600);


// for(let i=0; i<10; i++) {
//   ctx.fillRect((60*i), 0, 50, 50);
//   for(let ii=0; ii<10; ii++) {
//     ctx.fillRect((60*i), (60*ii), 50, 50);
//   }
// }

let size = 20;
ctx.fillStyle = 'black';
function tick() {
  size += 0.1;
  for(let i=0; i<10; i++) {
    ctx.fillRect((60*i), 0, size, size);
    for(let ii=0; ii<10; ii++) {
      ctx.fillRect((60*i), (60*ii), size, size);
    }
  }

  requestAnimationFrame(tick);
}

tick();
