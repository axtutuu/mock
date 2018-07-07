import Constants from './Constants'
import EventEmitter from 'events'
const {
  canvasWidthHeight,
  GRAVITY,
  GAME_SPEED_X,
  BIRD_FRAME_LIST,
  TUBE_POS_LIST
} = Constants

export default class Bird extends EventEmitter {
  constructor(stage, tubeList) {
    super()
    this.speedY = 0
    this.sprite = new PIXI.Sprite()
    this.isDied = false
    this.textureCounter = 0
    this.tubeList = tubeList
    this.updateTexture = () => {
      if (this.isDied) return;
      this.sprite.texture = PIXI.loader.resources[BIRD_FRAME_LIST[this.textureCounter++]].texture;

      if (this.textureCounter === BIRD_FRAME_LIST.length) this.textureCounter = 0;
    }

    stage.addChild(this.sprite);
    this.sprite.anchor.set(0.5, 0.5);
    this.sprite.scale.x = 0.06;
    this.sprite.scale.y = 0.06;
    this.reset();

    document.addEventListener('keydown', e => {
      if (e.keyCode == 32) this.jump(-GRAVITY / 3);
    });
    stage.on('pointerdown', () => this.jump(-GRAVITY / 3))

    setInterval(this.updateTexture, 200);
  }

  updateSprite() {
    this.speedY += GRAVITY / 70;
    this.sprite.y += this.speedY;

    let isCollide = false;
    const { x, y, width, height } = this.sprite;
    this.tubeList.forEach(d => {
      if (d.checkCollision(x - width / 2, y - height / 2, width, height)) isCollide = true;
    })
    if (y < -height / 2 || y > canvasWidthHeight + height / 2) isCollide = true;

    if (isCollide) {
      this.isDied = true;
      this.emit('collision')
    }
  }

  jump(speedInc) {
    this.speedY += speedInc;
    this.speedY = Math.max(-GRAVITY, this.speedY);
  }

  reset() {
    this.sprite.x = canvasWidthHeight / 6
    this.sprite.y = canvasWidthHeight / 2.5
    this.speedY = 0;
    this.isDied = false;
  }
}
