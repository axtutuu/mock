import $ from "jquery";
import EventEmitter from "events";
const IMAGES = [
  // '/mock/images/2017/02/image1.jpg',
  '/images/2017/02/image1.jpg',
];

const FRAMES = {};

class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    console.log(createjs);
    this.$canvas   = opts.$canvas;
    this.canvasCxt = opts.$canvas[0].getContext('2d');
    this.stage     = new createjs.Stage('canvas');
    this.isPointerDown = false;
    this.images     = [
      { src: '/images/2017/02/image1.jpg', x: 0, y: 0 }
    ];

    this.init();
  }

  init() {
    this.$canvas[0].width = this.$canvas.width();
    this.$canvas[0].height = this.$canvas.height();
    this.stage.enableMouseOver();

    let positionX = 0;
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

    this.$canvas.on("mousedown", (e) => { this.onPointerDown(e); });
  }

  onPointerDown(e) {
    console.log(e);
    console.log(e.pageX);
    console.log(this.isPointerDown);
    this.isPointerDown = true;
  }

}

(()=>{
  const canvas = new Canvas({
    $canvas: $(".canvas")
  });
})();
