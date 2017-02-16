import EventEmitter from "events";

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
    this.testShape.graphics
      .beginFill('#7E5384')
      .drawRect(0,0,300,300);

    this.testShape.addEventListener('click', this.active.bind(this));
    this.stage.addChild(this.testShape);
    this.stage.update();
  }

  add() {
  }

  edit(e){
  }

  delete(e) {
  }
}
