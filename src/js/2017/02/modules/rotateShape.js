export default class Shape {
  constructor(opts={}) {
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.init.bind(this));
    queue.loadFile('/images/2017/02/Synchronize-100.png');
    this.bitmap = "";
  }

  init(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
  }

  start() {
  }

  move() {
  }

  end() {
  }

  setInstance(instance) {
    console.log(instance);
  }
}
