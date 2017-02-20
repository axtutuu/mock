import EventEmitter from 'events';
import RotateShape  from './RotateShape.js';
import MoveShape    from './MoveShape.js';
import CalcChart from './CalcChart.js';


export default class Drawer extends EventEmitter {
  currentDiagonalLine;
  rotateBounds;
  moveBounds;

  constructor(opts={}){
    super();
    this.stage = opts.stage;
    this.isActive = false; //仮
    // {shape: shape, rotate: rotate, x: x, y: y}
    this.shapes = [];

    this.canvas = document.querySelector('#js-canvas');
    this.canvas.width  = this.canvas.offsetWidth*2;
    this.canvas.height = this.canvas.offsetHeight*2;


    this.stage  = new createjs.Stage('js-canvas');
    this.stage.enableMouseOver();


    // test shape
    this.testShape = new createjs.Shape();
    this.testShape.x      = 300;
    this.testShape.y      = 300;
    this.testShape_width  = 300;
    this.testShape_height = 300;
    this.testShape.regX = 300/2;
    this.testShape.regY = 300/2;
    this.testShape.graphics
      .beginFill('#7E5384')
      .drawRect(0,0,this.testShape_width,this.testShape_height);

    this.testShape.addEventListener('click', this.active.bind(this));
    this.stage.addChild(this.testShape);
    this.stage.update();

    // operation
    this.rotateShape = new RotateShape(this);

    this.moveShape   = new MoveShape(this);

    this.on('update', (e)=>{ this.update(e); });
  }

  // radian | position | scale(未)
  update(opts={}){
    const instance = opts.instance;
    const radian =
      opts.radian || CalcChart.toRadian(instance.rotation);

    /*   rotateShape move   */
    this.rotateShape.bitmap.x =
      CalcChart.pointX(this.currentDiagonalLine/2,
                       radian+CalcChart.toRadian(45)) +
      this.testShape.x-this.rotateBounds.width/2;

    this.rotateShape.bitmap.y =
      CalcChart.pointY(this.currentDiagonalLine/2,
                       radian+CalcChart.toRadian(45)) +
      this.testShape.y-this.rotateBounds.height/2;

    /*   moveShape move   */
    this.moveShape.bitmap.x =
      CalcChart.pointX(this.currentDiagonalLine/2,
                       radian+CalcChart.toRadian(-45)) +
      this.testShape.x-this.moveBounds.width/2;

    this.moveShape.bitmap.y =
      CalcChart.pointY(this.currentDiagonalLine/2,
                       radian+CalcChart.toRadian(-45)) +
      this.testShape.y-this.moveBounds.height/2;


    this.testShape.rotation = CalcChart.toDegree(radian);
    this.stage.update();
  }

  active(e) {
    this.currentDiagonalLine =
      CalcChart.diagonalLine(this.testShape_width,
                             this.testShape_height);

    this.rotateBounds = this.rotateShape.bitmap.getBounds();
    this.moveBounds   = this.moveShape.bitmap.getBounds();
    if(this.isActive) {
      this.rotateShape.remove();
      this.moveShape.remove();
      this.isActive=false;
    } else {
      this.rotateShape.active(e);
      this.moveShape.active(e);
      this.isActive=true;
    }
  }

  add() {
  }

  edit(e){
  }

  delete(e) {
  }
}
