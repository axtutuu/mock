import EventEmitter from "events";
import RotateShape from './RotateShape.js';

export default class Drawer extends EventEmitter {
  constructor(opts={}){
    super();
    this.stage = opts.stage;
    // {shape: shape, rotate: rotate, x: x, y: y}
    this.shapes = [];

    this.canvas = document.querySelector('#js-canvas');
    this.canvas.width  = this.canvas.offsetWidth*2;
    this.canvas.height = this.canvas.offsetHeight*2;


    this.stage  = new createjs.Stage('js-canvas');
    this.stage.enableMouseOver();


    this.testShape = new createjs.Shape();
    this.testShape_width  = 300;
    this.testShape_height = 300;
    this.testShape.graphics
      .beginFill('#7E5384')
      .drawRect(0,0,this.testShape_width,this.testShape_height);

    this.testShape.addEventListener('click', this.active.bind(this));
    this.stage.addChild(this.testShape);
    this.stage.update();

    this.rotateShape = new RotateShape(this);
  }

  active(e) {
    this.rotateShape.active(e);
  }

  add() {
  }

  edit(e){
  }

  delete(e) {
  }
}
