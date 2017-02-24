import CalcChart from './CalcChart.js';

export default class MoveShape {
  bitmap;
  diagonalLine;
  bounds;
  offsetX;
  offsetY;
  target;

  constructor(drawer) {
    this.drawer = drawer;
    this.imageUrl = './images/DirectionsFilled-100.png';
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener('fileload', this.init.bind(this));
    queue.loadFile(this.imageUrl);
  }

  active(e) {
    this.target = e.target;

    this.drawer.stage.addChild(this.bitmap);
    this.drawer.emit('update', {instance: this.target});
  }

  start(e) {
    const instance = e.target;
    this.offsetX = instance.x - e.stageX;
    this.offsetY = instance.y - e.stageY;

    console.log(this.offsetX);
    console.log(this.offsetY);

    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
  }

  move(e) {
    const instance = e.target;
    const r = CalcChart.toRadian(this.target.rotation-45);

    this.target.x = e.stageX + this.offsetX -
      CalcChart.pointX(this.drawer.currentDiagonalLine/2, r);

    this.target.y = e.stageY + this.offsetY -
      CalcChart.pointY(this.drawer.currentDiagonalLine/2, r);

    this.drawer.emit('update', {instance: this.target});
  }

  end(e) {
    const instance = e.target;
    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
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


}
