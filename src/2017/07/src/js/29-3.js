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
        ctx = canvas.getContext('2d'),
        scale = 13;

  canvas.width = WIDTH*scale;
  canvas.height = HEIGHT*scale;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH*scale, HEIGHT*scale);

  ctx.globalCompositeOperation = 'destination-out';

  return new Promise(resolve => {
    const img = new Image(); 
    img.src = 'img/hexagon.png';
    img.onload = () => {
      ctx.drawImage(img, (WIDTH*scale)/2-img.width/2, (HEIGHT*scale)/2-img.height/2);
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

//offset
const offsetTop = new PIXI.Graphics();
offsetTop
  .beginFill(0xFE642E, 1)
  .drawRect(0, 0, WIDTH, 400)
  .endFill();
container.addChild(offsetTop);

const offsetBottom = new PIXI.Graphics();
offsetBottom
  .beginFill(0xFE642E, 1)
  .drawRect(0, 0, WIDTH, 400)
  .endFill();
offsetBottom.y = HEIGHT-400;
container.addChild(offsetBottom);

const offsetLeft = new PIXI.Graphics();
offsetLeft
  .beginFill(0xFE642E, 1)
  .drawRect(0, 0, 550, HEIGHT)
  .endFill();
container.addChild(offsetLeft);

const offsetRight = new PIXI.Graphics();
offsetRight
  .beginFill(0xFE642E, 1)
  .drawRect(0, 0, 550, HEIGHT)
  .endFill();
offsetRight.x = WIDTH-550;
container.addChild(offsetRight);


// clip
let sprite;
canvasTexture()
  .then(canvas => {
    sprite = new PIXI.Sprite(canvas);
    sprite.anchor.x = sprite.anchor.y = 0.5;
    sprite.x = WIDTH/2;
    sprite.y = HEIGHT/2;
    sprite.scale.x = sprite.scale.y = 0.01;
    background.addChild(sprite);

    timeline.add(
      TweenMax.to(sprite.scale, 4, {
        x: 1,
        y: 1,
        ease: Expo.easeInOut
      }),
      TweenMax.to(offsetTop, 3, {
        height: 0,
        ease: Expo.easeInOut
      }),
      TweenMax.to(offsetLeft, 4, {
        width: 0,
        ease: Expo.easeInOut
      }),
      TweenMax.to(offsetBottom, 3, {
        height: 0,
        y: HEIGHT-0,
        ease: Expo.easeInOut
      }),
      TweenMax.to(offsetRight, 4, {
        width: 0,
        x: WIDTH-0,
        ease: Expo.easeInOut
      })
    );

    timeline.add(
     TweenMax.to(sprite.scale, 4, {
       x: 2,
       y: 2,
       ease: Expo.easeInOut
     })
    )

    timeline.play();
  })




PIXI.ticker.shared.add(() => {
  renderer.render(container);
});


