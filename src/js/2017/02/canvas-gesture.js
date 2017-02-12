import EventEmitter from "events";
class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    this.stage  = new createjs.Stage('js-canvas');
    this.stage.enableMouseOver();
    this.activeShape = new createjs.Shape();
    this.isActive = false;

    this.init();
  }

  init() {
    const imgUrl = '/images/2017/02/image1.jpg';
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.draw.bind(this));
    queue.loadFile(imgUrl);

    this.activeShape.graphics.beginStroke('#D6D4D6');
    this.activeShape.graphics.setStrokeStyle(3);
  }

  draw(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('click', this.active.bind(this));
    this.stage.addChild(this.bitmap);
    this.stage.update();
  }

  active(e) {
    if(this.isActive) {
      this.isActive = false;
      this.stage.removeChild(this.activeShape);
      this.stage.update();
      return;
    }
    const instance = e.target;
    this.isActive = true;


    this.activeShape.graphics.drawRect(instance.x,instance.y,instance.getBounds().width,instance.getBounds().height);
    this.stage.addChild(this.activeShape);
    this.stage.update();

    // console.log(instance);
    // console.log(instance.x);
    // console.log(instance.y);
    // console.log(instance.getBounds());
  }

  moveStart() {
  }

  move() {
  }

  moveStop() {
  }

}

((win, doc)=>{
  const canvas = new Canvas();
})(window, document);
