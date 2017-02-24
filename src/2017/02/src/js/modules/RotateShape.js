import CalcChart from './CalcChart.js';

export default class RotateShape {
  bitmap;
  bounds;
  diagonalLine;
  target;

  constructor(drawer) {
    this.drawer = drawer;
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.init.bind(this));
    queue.loadFile('./images/Synchronize-100.png');
  }

  init(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('mousedown', this.start.bind(this));
  }

  remove() {
    this.drawer.stage.removeChild(this.bitmap);
    this.drawer.stage.update();
  }

  active(e) {
    this.target = e.target;

    this.drawer.stage.addChild(this.bitmap);
    this.drawer.emit('update', {instance: this.target});
  }

  start(e) {
    const instance = e.target;
    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
  }


  move(e) {
    const instance = e.target;
    let   rad      = CalcChart
      .rotating(this.drawer.stage.mouseX-this.target.x,
                this.drawer.stage.mouseY-this.target.y);
    rad = rad - CalcChart.toRadian(45); // offset
    this.target.rotation = CalcChart.toDegree(rad);

    this.drawer.emit('update', {instance: this.target});
  }

  end(e) {
    const instance = e.target;
    instance.removeEventListener("pressmove", this.rotate);
    instance.removeEventListener("pressup", this.rotateEnd);
  }

  position(rad=0) {
    const r = CalcChart.toRadian(CalcChart.toDegree(rad)+45);

    this.bitmap.x =
      CalcChart.pointX(this.diagonalLine/2, r) +
      this.drawer.testShape.x-this.bounds.width/2;

    this.bitmap.y =
      CalcChart.pointY(this.diagonalLine/2, r) +
      this.drawer.testShape.y-this.bounds.height/2;
  }
}
