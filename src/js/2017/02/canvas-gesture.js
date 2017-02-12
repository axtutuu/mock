import EventEmitter from "events";
class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    this.stage  = new createjs.Stage('js-canvas');
    this.stage.enableMouseOver();
    this.activeShape = new createjs.Shape();
    this.rotateShape = new createjs.Shape();
    this.isActive = false;

    this.init();
  }

  init() {
    const imgUrl = '/images/2017/02/image1.jpg';
    const queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.draw.bind(this));
    queue.loadFile(imgUrl);

    // 枠線
    this.activeShape.graphics.beginStroke('#D6D4D6');
    this.activeShape.graphics.setStrokeStyle(3);

    // rotate
    this.rotateShape.graphics.beginFill('#7E5384');
    this.rotateShape.cursor = 'pointer';
  }

  draw(e) {
    this.bitmap = new createjs.Bitmap(e.result);
    this.bitmap.cursor = 'pointer';
    this.bitmap.addEventListener('click', this.active.bind(this));
    this.bitmap.x = 300;
    this.bitmap.y = 300;
    this.stage.addChild(this.bitmap);
    this.stage.update();
  }

  active(e) {
    if(this.isActive) {
      this.isActive = false;
      this.stage.removeChild(this.activeShape);
      this.stage.removeChild(this.rotateShape);
      this.stage.update();
      return;
    }
    const instance = e.target;
    this.isActive = true;

    // rotate
    const rotateX = this.bitmap.getBounds().width+this.bitmap.x;
    const rotateY = this.bitmap.getBounds().height+this.bitmap.y;
    this.rotateShape.graphics.drawCircle(0,0,25,25);
    this.rotateShape.x = rotateX;
    this.rotateShape.y = rotateY;

    // 枠線
    this.activeShape.graphics.drawRect(instance.x,instance.y,instance.getBounds().width,instance.getBounds().height);
    this.stage.addChild(this.activeShape);
    this.stage.addChild(this.rotateShape);
    this.rotateShape.addEventListener('mousedown', this.rotateStart.bind(this));
    this.stage.update();

    // console.log(instance);
    // console.log(instance.x);
    // console.log(instance.y);
    // console.log(instance.getBounds());
  }

  rotateStart(e) {
    const instance = e.target;
    instance.addEventListener('pressmove', this.rotate.bind(this));
    instance.addEventListener('pressup', this.rotateEnd.bind(this));
  }

  rotate(e) {
    const instance     = e.target;
    const offsetX = this.stage.mouseX - this.bitmap.x;
    const offsetY = this.stage.mouseY - this.bitmap.y;

    const rads        = this.tan2(offsetX, offsetY);
    this.bitmap.rotation = this.toDegree(rads);


    // rotate操作の移動
    const rotateX = this.bitmap.getBounds().width+this.bitmap.x;
    const rotateY = this.bitmap.getBounds().height+this.bitmap.y;

    // Bの座標
    console.log(this.bitmap.getBounds().width*Math.sin(rads));

    // 対角線の座標
    const ab = Math.pow(this.bitmap.getBounds().width, 2);  // 累乗
    const ad = Math.pow(this.bitmap.getBounds().height, 2); // 累乗
    const ac = Math.sqrt(ab+ad); // 対角線
    const dDeg = this.toDegree(rads)+45;
    const dAds = this.toRadian(dDeg);
    console.log(ac*(Math.sin(dAds)));
    // console.log((Math.sin(rads)-45));


    this.stage.update();
    // console.log(angle-40);
    // console.log(this.stage.mouseY);
    // console.log(instance.y);
    // console.log(Math.atan2(this.stage.mouseY - instance.y, this.stage.mouseX - instance.x));
    // console.log(this.stage.mouseX);
  }

  rotateEnd(e) {
    const instance = e.target;
    instance.removeEventListener("pressmove", this.rotate);
    instance.removeEventListener("pressup", this.rotateEnd);
  }

  toRadian(degree) {
    return degree * Math.PI / 180;
  }

  toDegree(radian) {
    return radian * 180 / Math.PI;
  }

  // x軸から対象点までの角度
  tan2(x,y) {
    return Math.atan2(y,x);
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
