import CalcChart from './CalcChart.js';


export default class RotateShape {
  bitmap;

  constructor(drawer) {
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.init.bind(this));
    queue.loadFile('/images/2017/02/Synchronize-100.png');
    this.drawer = drawer;
  }

  init(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('mousedown', this.start.bind(this));
  }

  active(e) {
    console.log(e);
    console.log(this.drawer.testShape.getBounds());
    console.log(this.drawer.stage.mouseX);
    this.position();
    this.drawer.stage.addChild(this.bitmap);
    this.drawer.stage.update();
  }

  start(e) {
    const instance = e.target;
    instance.addEventListener('pressmove', this.move.bind(this));
    instance.addEventListener('pressup', this.end.bind(this));
  }

  move(e) {
    const instance = e.target;
    const radian = CalcChart
      .rotating(this.drawer.stage.mouseX-this.drawer.testShape.x,
                this.drawer.stage.mouseY-this.drawer.testShape.y);

    this.drawer.testShape.rotation = CalcChart.toDegree(radian);
    this.drawer.stage.update();

    console.log(this.drawer.testShape.x);
    console.log(radian);
    console.log(e);
  }

  end(e) {
    const instance = e.target;
    instance.removeEventListener("pressmove", this.rotate);
    instance.removeEventListener("pressup", this.rotateEnd);
  }

  position() {
    const bounds = this.bitmap.getBounds();
    this.bitmap.x = this.drawer.testShape_width+this.drawer.testShape.x-bounds.width/2;
    this.bitmap.y = this.drawer.testShape_height+this.drawer.testShape.y-bounds.height/2;
  }
}
