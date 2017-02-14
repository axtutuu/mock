import EventEmitter from "events";
class Canvas extends EventEmitter {
  constructor(opts={}){
    super();
    this.stage  = new createjs.Stage('js-canvas');
    this.stage.enableMouseOver();
    this.activeShape = new createjs.Shape();
    this.rotateShape = new createjs.Shape();
    this.isActive = false;

    // 座標
    this.pointA = document.querySelector('.point--a') || document.createElement('div');
    this.pointB = document.querySelector('.point--b') || document.createElement('div');
    this.pointC = document.querySelector('.point--c') || document.createElement('div');
    this.pointD = document.querySelector('.point--d') || document.createElement('div');

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
    this.bitmap.x = 50;
    this.bitmap.y = 50;
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
    this.stage.addChild(this.rotateShape);
    this.rotateShape.addEventListener('mousedown', this.rotateStart.bind(this));
    this.stage.update();
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
    const bitmapBounds = this.bitmap.getBounds();

    // A点の座標 (原点)
    this.pointA.innerHTML = '(0,0)';

    // B点の座標
    this.pointB.innerHTML = this.txtFormat(this.calcPointX(bitmapBounds.width, rads), this.calcPointY(bitmapBounds.width, rads));

    // 対角線の座標
    const diagonalLine    = this.calcDiagonalLine(this.bitmap.getBounds().width, this.bitmap.getBounds().height);
    const diagonalRasin   = this.toRadian(this.toDegree(rads)+45); //対角線のラジアン角
    this.pointC.innerHTML = this.txtFormat(this.calcPointX(diagonalLine, diagonalRasin), this.calcPointY(diagonalLine, diagonalRasin));

    this.rotateShape.x = this.bitmap.x+this.calcPointX(diagonalLine, diagonalRasin);
    this.rotateShape.y = this.bitmap.y+this.calcPointY(diagonalLine, diagonalRasin);

    // D点の座標
    const verticalRasin   = this.toRadian(this.toDegree(rads)+90);
    this.pointD.innerHTML = this.txtFormat(this.calcPointX(bitmapBounds.height, verticalRasin), this.calcPointY(bitmapBounds.height, verticalRasin));
    this.stage.update();
  }

  txtFormat(x,y) {
    return '(' + this.calcDecimal(x) + ',' + this.calcDecimal(y) + ')';
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

  // 小数点第２位以下の切り捨て
  calcDecimal(n) {
    return Math.floor(n*10)/10;
  }

  // y座標の取得 -> 距離xsin(ラジアン角度)
  calcPointY(distance, radian) {
    return distance * Math.sin(radian);
  }

  // x座標の取得  距離xcos(ラジアン角度) http://ngroku.com/?p=976
  calcPointX(distance, radian) {
    return distance * Math.cos(radian);
  }

  // 対角線の長さ √(AD^2 + AB ^2 )
  calcDiagonalLine(width, height) {
    return Math.sqrt(Math.pow(width,2)+Math.pow(height,2));
  }
}

((win, doc)=>{
  const canvas = new Canvas();
})(window, document);
