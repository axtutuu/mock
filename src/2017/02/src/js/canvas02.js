import $ from "jquery";
import EventEmitter from "events";

class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    this.$canvas   = opts.$canvas;
    this.canvasCxt = opts.$canvas[0].getContext('2d');
    this.stage     = new createjs.Stage('canvas');
    this.images     = [
      { id: "image", src: './images/image1.jpg', x: 0, y: 0 }
    ];
    this.bitmap = "";
    this.offsetX = 0;
    this.offsetY = 0;

    this.init();
  }

  init() {
    this.$canvas[0].width = this.$canvas.width();
    this.$canvas[0].height = this.$canvas.height();
    this.stage.enableMouseOver();

    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.loadCompleteHandler.bind(this));
    queue.loadFile(this.images[0].src);
  }

  loadCompleteHandler(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('mousedown', this.startDrag.bind(this));
    this.stage.addChild(this.bitmap);
    this.stage.update();
  }

  startDrag(e) {
    const instance = e.target;
    this.offsetX = instance.x - e.stageX;
    this.offsetY = instance.y - e.stageY;
    console.log('----------------------offset------------------------');
    console.log(this.offsetX);
    console.log(this.offsetY);
    console.log('----------------------offset------------------------');
    instance.addEventListener('pressmove', this.drag.bind(this));
    instance.addEventListener('pressup', this.stopDrag.bind(this));
  }

  drag(e) {
    e.preventDefault();

    const instance = e.target;
    instance.x = e.stageX + this.offsetX;
    instance.y = e.stageY + this.offsetY;
    this.stage.update();
  }

  stopDrag(e) {
    const instance = e.target;
    instance.removeEventListener("pressmove", this.drag);
    instance.removeEventListener("pressup", this.stopDrag);
  }


}

(()=>{
  const canvas = new Canvas({
    $canvas: $(".canvas")
  });
})();
