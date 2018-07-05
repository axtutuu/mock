const canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512);
const GRAVITY = 9.7;
const GAME_SPEED_X = 100;
const BIRD_FRAME_LIST = [
  './images/frame-1.png',
  './images/frame-2.png',
  './images/frame-3.png',
  './images/frame-4.png',
];
const TUBE_POS_LIST = [
  canvasWidthHeight + 50,
  canvasWidthHeight + 150,
  canvasWidthHeight + 280
];

class Bird {
  constructor(stage, tubeList, onCollision) {
    this.speedY = 0
    this.sprite = new PIXI.Sprite()
    this.isDied = false
    this.textureCounter = 0
    this.tubeList = tubeList
    this.onCollision = onCollision
    this.updateTexture = () => {
      if (this.isDied) return;
      this.sprite.texture = PIXI.loader.resources[BIRD_FRAME_LIST[this.textureCounter++]].texture;

      if (this.textureCounter === BIRD_FRAME_LIST.length) this.textureCounter = 0;
    }

    stage.addChild(this.sprite);
    this.sprite.anchor.set(0.5, 0.5);
    this.updateTexture();
    this.sprite.scale.x = 0.06;
    this.sprite.scale.y = 0.06;
    this.reset();

    document.addEventListener('keydown', e => {
      if (e.keyCode == 32) this.addSpeed(-GRAVITY / 3);
    });
    stage.on('pointerdown', () => this.addSpeed(-GRAVITY / 3))

    setInterval(this.updateTexture, 200);
  }

  updateSprite() {
    this.speedY += GRAVITY / 70;
    this.sprite.y += this.speedY;
    this.sprite.rotation = Math.atan(this.speedY / GAME_SPEED_X);

    let isCollide = false;
    const { x, y, width, height } = this.sprite;
    this.tubeList.forEach(d => {
      if (d.checkCollision(x - width / 2, y - height / 2, width, height)) isCollide = true;
    });
    if (y < -height / 2 || y > canvasWidthHeight + height / 2) isCollide = true;

    if (isCollide) {
      this.onCollision();
      this.isDied = true;
    }
  }

  addSpeed(speedInc) {
    this.speedY += speedInc;
    this.speedY = Math.max(-GRAVITY, this.speedY);
  }

  reset() {
    this.sprite.x = canvasWidthHeight / 6;
    this.sprite.y = canvasWidthHeight / 2.5;
    this.speedY = 0;
    this.isDied = false;
  }

}

class Tube {
  constructor(stage, x) {
    this.sprite = new PIXI.Graphics()
    this.innerDistance = 180
    this.tubeWidth = 20

    stage.addChild(this.sprite);
    this.reset(x);
  }

  reset(x=canvasWidthHeight + 20) {
    this.x = x;

    const tubeMinHeight = 60;
    const randomNum = Math.random() * (canvasWidthHeight - 2 * tubeMinHeight - this.innerDistance);
    this.y = tubeMinHeight + randomNum;
  }

  checkCollision(x, y, width, height) {
    if (!(x + width < this.x || this.x + this.tubeWidth < x || this.y < y)) {
      return true;
    }
    if (!(x + width < this.x || this.x + this.tubeWidth < x || y + height < this.y + this.innerDistance)) {
      return true;
    }
    return false;
  }

  update() {
    this.x -= GAME_SPEED_X / 60;
    if (this.x < -this.tubeWidth) this.reset();

    this.sprite.clear();
    this.sprite.beginFill(0xffffff, 1);
    const { x, y, tubeWidth, innerDistance } = this;
    this.sprite.drawRect(x, 0, tubeWidth, y);
    this.sprite.drawRect(x, y + innerDistance, tubeWidth, canvasWidthHeight);
    this.sprite.endFill();
  }
}

const renderer = PIXI.autoDetectRenderer(canvasWidthHeight, canvasWidthHeight, { backgroundColor: 0xc1c2c4 });
document.body.appendChild(renderer.view);
const stage = new PIXI.Container();
stage.interactive = true;
stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
renderer.render(stage);

const tubeList = TUBE_POS_LIST.map(d => new Tube(stage, d));
PIXI.loader
  .add(BIRD_FRAME_LIST)
  .load(setup);

let bird;
const button = document.querySelector('#start');
function setup() {
  bird = new Bird(stage, tubeList, () => {
    // Called when bird hit tube/ground/upper bound
    gameFailed = true;
    button.classList.remove('hide');
  });
  requestAnimationFrame(draw);
}

let gameStarted = false;
let gameFailed = false;
function draw() {
  if(gameStarted) {
    bird.updateSprite();
    if (!gameFailed) tubeList.forEach(d => d.update());
  }
  renderer.render(stage);
  requestAnimationFrame(draw);
}

button.addEventListener('click', () => {
  gameStarted = true;
  button.innerHTML = 'Retry';
  if (gameFailed) {
    gameFailed = false;
    tubeList.forEach((d, i) => d.reset(TUBE_POS_LIST[i]));
    bird.reset();
  }
  button.classList.add('hide');
});
