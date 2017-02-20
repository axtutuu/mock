import CalcChart from './CalcChart.js';

export default class MoveShape {
  bitmap;
  diagonalLine;
  bounds;
  offsetX;
  offsetY;

  constructor(drawer) {
    this.drawer = drawer;
    this.imageUrl = '/images/2017/02/DirectionsFilled-100.png';
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener('fileload', this.init.bind(this));
    queue.loadFile(this.imageUrl);
  }

  active(e) {
    const instance = e.target;
    const r = CalcChart.toRadian(instance.rotation);

    this.diagonalLine =
      CalcChart.diagonalLine(this.drawer.testShape_width,
                             this.drawer.testShape_height);
    this.bounds = this.bitmap.getBounds();
    this.position(r);
    this.drawer.stage.addChild(this.bitmap);
    this.drawer.stage.update();
  }

  remove() {
    this.drawer.stage.removeChild(this.bitmap);
    this.drawer.stage.update();
  }

  position(rad=0) {
    const r = CalcChart.toRadian(CalcChart.toDegree(rad)-45);

    this.bitmap.x =
      CalcChart.pointX(this.diagonalLine/2,r) +
      this.drawer.testShape.x-this.bounds.width/2;

    this.bitmap.y =
      CalcChart.pointY(this.diagonalLine/2,r) +
      this.drawer.testShape.y-this.bounds.width/2;
  }

  init(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('mousedown', this.start.bind(this));
  }

  start(e) {
    const instance = e.target;
    this.offsetX = instance.x - e.stageX;
    this.offsetY = instance.y - e.stageY;

    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
  }

  move(e) {
    const instance = e.target;
  }
}
