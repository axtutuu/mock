import Tube from './Tube'
import Bird from './Bird'
import Constants from './Constants'
const {
  canvasWidthHeight,
  GRAVITY,
  GAME_SPEED_X,
  BIRD_FRAME_LIST,
  TUBE_POS_LIST
} = Constants

export default class Game {
  constructor() {
    this.startBtn = document.querySelector('#start')
    this.started = false
    this.failed = false
    const canvas = document.querySelector('.js-canvas')
    this.renderer = PIXI.autoDetectRenderer({
      width: canvasWidthHeight,
      height: canvasWidthHeight,
      view: canvas,
      backgroundColor: 0xc1c2c4,
    })
    this.stage = new PIXI.Container()
    this.stage.interactive = true
    this.stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000)
    this.renderer.render(this.stage)

    this.tubeList = TUBE_POS_LIST.map(d => new Tube(this.stage, d))
    this.startBtn.addEventListener('click', () => {
      this.started = true
      this.startBtn.innerHTML = 'Retry'
      if (this.failed) {
        this.failed = false
        this.tubeList.forEach((d, i) => d.reset(TUBE_POS_LIST[i]))
        this.bird.reset()
      }
      this.startBtn.classList.add('hide')
    })

    PIXI.loader
      .add(BIRD_FRAME_LIST)
      .load(this.setup.bind(this))
  }

  setup() {
    this.bird = new Bird(this.stage, this.tubeList)
    this.bird.on('collision', () => {
      this.failed = true
      this.startBtn.classList.remove('hide')
    })
    this.draw();
  }

  draw() {
    if (this.started) {
      this.bird.updateSprite()
      if (!this.failed)  this.tubeList.forEach(d => d.update())
    }
    this.renderer.render(this.stage)
    requestAnimationFrame(this.draw.bind(this));
  }
}
