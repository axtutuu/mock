import CalcChart from './CalcChart.js';

export default class RotateShape {
  bitmap;
  bounds;
  diagonalLine;

  constructor(drawer) {
    this.drawer = drawer;
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.init.bind(this));
    queue.loadFile('/images/2017/02/Synchronize-100.png');
  }

  init(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('mousedown', this.start.bind(this));
  }

  active(e) {
    this.diagonalLine =
      CalcChart.diagonalLine(this.drawer.testShape_width,
                             this.drawer.testShape_height);

    this.bounds = this.bitmap.getBounds();
    this.position();
    this.drawer.stage.addChild(this.bitmap);
    this.drawer.stage.update();
  }

  start(e) {
    const instance = e.target;
    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
  }

  remove() {
    this.drawer.stage.removeChild(this.bitmap);
    this.drawer.stage.update();
  }

  move(e) {
    const instance = e.target;
    let   rad      = CalcChart
      .rotating(this.drawer.stage.mouseX-this.drawer.testShape.x,
                this.drawer.stage.mouseY-this.drawer.testShape.y);
    // offset
    rad = CalcChart.toRadian(CalcChart.toDegree(rad)-45);

    this.drawer.testShape.rotation = CalcChart.toDegree(rad);
    this.position(rad);
    this.drawer.stage.update();
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
