import Game from './flappy-bird/Game'
new Game()

// import Tube from './flappy-bird/Tube'
// import Bird from './flappy-bird/Bird'
// import Constants from './flappy-bird/Constants'
// const {
//   canvasWidthHeight,
//   GRAVITY,
//   GAME_SPEED_X,
//   BIRD_FRAME_LIST,
//   TUBE_POS_LIST
// } = Constants
// 
// const renderer = PIXI.autoDetectRenderer(canvasWidthHeight, canvasWidthHeight, { backgroundColor: 0xc1c2c4 });
// document.body.appendChild(renderer.view);
// const stage = new PIXI.Container();
// stage.interactive = true;
// stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
// renderer.render(stage);
// 
// const tubeList = TUBE_POS_LIST.map(d => new Tube(stage, d));
// PIXI.loader
//   .add(BIRD_FRAME_LIST)
//   .load(setup);
// 
// let bird;
// const button = document.querySelector('#start');
// 
// function setup() {
//   bird = new Bird(stage, tubeList, () => {
//     // Called when bird hit tube/ground/upper bound
//     gameFailed = true;
//     button.classList.remove('hide');
//   });
//   requestAnimationFrame(draw);
// }
// 
// let gameStarted = false;
// let gameFailed = false;
// 
// function draw() {
//   if(gameStarted) {
//     bird.updateSprite();
//     if (!gameFailed) tubeList.forEach(d => d.update());
//   }
//   renderer.render(stage);
//   requestAnimationFrame(draw);
// }
// 
// 
// button.addEventListener('click', () => {
//   gameStarted = true;
//   button.innerHTML = 'Retry';
//   if (gameFailed) {
//     gameFailed = false;
//     tubeList.forEach((d, i) => d.reset(TUBE_POS_LIST[i]));
//     bird.reset();
//   }
//   button.classList.add('hide');
// });
