console.log('mario')
const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')

// animate()
let lastAnimationFrameTime = 0
let enter = false
let space = false
let left = false
let right = false
let up = false
let down = false
let a = false


cxt.fillStyle = "rgb(255, 0, 0)"
cxt.fillRect(0, 0, 640, 480)

window.addEventListener('keydown', keyDown)
window.addEventListener('keyup', keyUp)

function keyDown(e) {
  const code = e.keyCode

  switch(code) {
    case 13:
      enter = true
      break
    case 32:
      space = true
      break
    case 37:
      left = true
      break
    case 39:
      right = true
      break
    case 38:
      up = true
      break
    case 40:
      down = true
      break
    case 65:
      a = true
  }
}


function keyUp(e) {
  const code = e.keyCode

  switch(code) {
    case 13:
      enter = false
      break
    case 32:
      space = false
      break
    case 37:
      left = false
      break
    case 39:
      right = false
      break
    case 38:
      up = false
      break
    case 40:
      down = false
      break
    case 65:
      a = false
  }
}


class Mario {
  constructor(x, y) {
    this.x = x
    this.y = y
    this.addX = 2
    this.dir = 'right'
  }

  draw(img) {
    if (this.dir == 'left') {
      cxt.save()
      ctx.transform(-1,0,0,1,0,0)
      ctx.drawImage(img, this.animeX, 0, 32, 32, -this.x - 32, this.y, 32, 32)
      this.restore()
    } else {
      ctx.drawImage(img, this.animeX, 0, 32, 32, this.x, this.y, 32, 32)
    }
  }
}

const mario = new Mario()
