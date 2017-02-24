import $ from "jquery";
import EventEmitter from "events";
const IMAGES = [
  'images/canvas/image1.jpg',
  'images/canvas/image2.jpg',
  'images/canvas/image3.jpg',
  'images/canvas/image4.jpg'
];

const FRAMES = {};

class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    console.log(createjs);
    this.$canvas   = opts.$canvas;
    this.canvasCxt = opts.$canvas[0].getContext('2d');
    this.stage     = new createjs.Stage('canvas');

    this.init();
  }

  init() {
    this.$canvas[0].width = this.$canvas.width();
    this.$canvas[0].height = this.$canvas.height();
    this.stage.enableMouseOver();

    let positionX = 0;
    console.log(IMAGES);
    IMAGES.forEach((v,i)=>{
      const bitmap = new createjs.Bitmap(v);
      bitmap.cursor = 'pointer';
      bitmap.addEventListener('click',()=>{ alert('click'); });
      this.stage.addChild(bitmap);

      if((i+1)%4==0){
        positionX = 0;
        bitmap.y  = 200;
      }
      bitmap.x = positionX*200;
      positionX += 1;
    });

    createjs.Ticker.setFPS(30);
    createjs.Ticker.addEventListener('tick', ()=>{
      this.stage.update();
    });
  };
}

(()=>{
  const canvas = new Canvas({
    canvas: $(".js-canvas")
  });
})();
