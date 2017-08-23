const canvas = document.querySelector('.canvas'),
      ctx    = canvas.getContext('2d');

const pic = document.getElementById('pic');
ctx.drawImage(pic, 0, 0, 250, 250);

const src = ctx.getImageData(0, 0, 250, 250),
      img = ctx.createImageData(250, 250);

processImage();
paint();

function processImage() {
  for (let i=0; i < 250*250*4; i+=4) {
    img.data[i+0] = (src.data[i+0] ^ 0xff); // R
    img.data[i+1] = src.data[i+1] ^ 0xff; // G
    img.data[i+2] = src.data[i+2] ^ 0xff; // B
    img.data[i+3] = src.data[i+3]; // A
  }
}

function paint() {
  ctx.putImageData(img, 0, 0)
}
