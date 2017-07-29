const WIDTH = 600*2,
      HEIGHT = 450*2;
const view = document.querySelector('.day-29-2');
const container = new PIXI.Container();

const renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view,
  transparent: true
});

// 2d canvas
let ctx, img, imgWidth = 100, imgHeight = 100;
const canvasTexture = () => {
  const canvas = document.createElement('canvas'),
        centerX = renderer.view.width / 2,
        centerY = renderer.view.height /2,
        radius = 2;
  ctx    = canvas.getContext('2d');

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.globalCompositeOperation = 'destination-out';

  img = new Image(); 
  img.src = 'img/circle.png';
  img.onload = () => {
    ctx.drawImage(img, 100, 100, imgWidth, imgHeight);
  }

  return PIXI.Texture.fromCanvas(canvas);
}


// background
const background = new PIXI.Graphics();
background
  .beginFill(0x40FF00, 1)
  .drawRect(0, 0, WIDTH, HEIGHT)
  .endFill();
container.addChild(background);


const sprite = new PIXI.Sprite(canvasTexture());
console.log(sprite);
sprite.scale.y = sprite.scale.x = 3.0;
background.addChild(sprite);

PIXI.ticker.shared.add(() => {
  renderer.render(container);
});


