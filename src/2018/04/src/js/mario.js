console.log('mario')
const canvas = document.querySelector('canvas')
const cxt = canvas.getContext('2d')

// animate()
let lastAnimationFrameTime = 0
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
  }
}


function keyUp(e) {
  const code = e.keyCode

  switch(code) {
    case 13:
      enter = false
    case 32:
      space = false
  }
}
