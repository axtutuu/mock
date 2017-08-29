const WIDTH = 600*2,
      HEIGHT = 450*2;
const view = document.querySelector('.day-29');

const container = new PIXI.Container();

// background
const background = new PIXI.Graphics();
background
  .beginFill(0x40FF00, 1)
  .drawRect(0, 0, WIDTH, HEIGHT)
  .endFill();
container.addChild(background);

// circleのアニメーション
const circle = new PIXI.Graphics();
circle.beginFill(0xffffff);
circle.drawCircle(0 ,0 ,100);
circle.x = WIDTH/2;
circle.y = HEIGHT/2;
circle.width = 10;
circle.height = 10;

container.addChild(circle);

// timeline
const timeline = new TimelineMax({
  paused: true,
  onComplete: () => {
    console.log('complete');
  }
})

timeline.add(
  TweenMax.to(circle, 4, {
    width: 600,
    height: 450,
    ease: Expo.easeInOut
  })
)
timeline.add(
  TweenMax.to(circle, 4, {
    width: 600*1.5,
    height: 450*1.5,
    ease: Expo.easeInOut
  })
)

timeline.play();

const renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view
});

PIXI.ticker.shared.add(() => {
  renderer.render(container);
});
