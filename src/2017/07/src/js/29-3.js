const WIDTH = 600*2,
      HEIGHT = 450*2;
const view = document.querySelector('.day-29-3');
const container = new PIXI.Container();

const renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view,
  transparent: true
});

// 2d canvas
const canvasTexture = () => {
  const canvas = document.createElement('canvas'),
        centerX = renderer.view.width / 2,
        centerY = renderer.view.height /2,
        radius = 2,
        ctx = canvas.getContext('2d');

  canvas.width = WIDTH*10;
  canvas.height = HEIGHT*10;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH*10, HEIGHT*10);

  ctx.globalCompositeOperation = 'destination-out';

  return new Promise(resolve => {
    const img = new Image(); 
    img.src = 'img/hexagon.png';
    img.onload = () => {
      ctx.drawImage(img, WIDTH*10/2-img.width/2, HEIGHT*10/2-img.height/2);
      resolve(PIXI.Texture.fromCanvas(canvas));
    }
  });
}


// background
const background = new PIXI.Graphics();
background
  .beginFill(0x40FF00, 1)
  .drawRect(0, 0, WIDTH, HEIGHT)
  .endFill();
container.addChild(background);

// timeline
const timeline = new TimelineMax({
  paused: true,
  onComplete: () => {
    console.log('complete');
  }
})


// clip
let sprite;
canvasTexture()
  .then(canvas => {
    sprite = new PIXI.Sprite(canvas);
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.x = WIDTH/2;
    sprite.y = HEIGHT/2;
    sprite.scale.x = sprite.scale.y = 0.1;
    background.addChild(sprite);

    timeline.add(
      TweenMax.to(sprite.scale, 4, {
        x: 1,
        y: 1,
        ease: Expo.easeInOut
      })
    );

    timeline.add(
      TweenMax.to(sprite.scale, 4, {
        x: 1.5,
        y: 1.5,
        ease: Expo.easeInOut
      })
    );

    timeline.play();
  })




PIXI.ticker.shared.add(() => {
  renderer.render(container);
});


