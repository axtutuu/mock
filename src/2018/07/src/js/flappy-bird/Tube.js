import Constants from './Constants'
const {
  canvasWidthHeight,
  GRAVITY,
  GAME_SPEED_X,
  BIRD_FRAME_LIST,
  TUBE_POS_LIST
} = Constants

export default class Tube {
  constructor(stage, x) {
    this.sprite = new PIXI.Graphics()
    this.innerDistance = 180
    this.tubeWidth = 30

    stage.addChild(this.sprite)
    this.reset(x)
  }

  reset(x=canvasWidthHeight + 20) {
    this.x = x

    const tubeMinHeight = 60
    const randomNum = Math.random() * (canvasWidthHeight - 2 * tubeMinHeight - this.innerDistance)
    this.y = tubeMinHeight + randomNum
  }

  checkCollision(x, y, width, height) {
    if (!(x + width < this.x || this.x + this.tubeWidth < x || this.y < y)) {
      return true
    }
    if (!(x + width < this.x || this.x + this.tubeWidth < x || y + height < this.y + this.innerDistance)) {
      return true
    }
    return false
  }

  update() {
    this.x -= GAME_SPEED_X / 60
    if (this.x < -this.tubeWidth) this.reset()

    this.sprite.clear()
    this.sprite.beginFill(0x04B404, 1)
    const { x, y, tubeWidth, innerDistance } = this
    this.sprite.drawRect(x, 0, tubeWidth, y)
    this.sprite.drawRect(x, y + innerDistance, tubeWidth, canvasWidthHeight)
    this.sprite.endFill()
  }
}
