const canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512)

export default {
  GRAVITY: 9.8,
  GAME_SPEED_X: 150,
  canvasWidthHeight: canvasWidthHeight,
  BIRD_FRAME_LIST: [
    './images/frame-1.png',
    './images/frame-2.png',
    './images/frame-3.png',
    './images/frame-4.png',
  ],
  TUBE_POS_LIST: [
    canvasWidthHeight + 150,
    canvasWidthHeight + 250,
    canvasWidthHeight + 480
  ],
  SPRITE: [
    './images/GLnwC.png'
  ]
}
