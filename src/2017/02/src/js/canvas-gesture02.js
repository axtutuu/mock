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
    const imgUrl = './images/image1.jpg';
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
    this.bitmap.x = 80;
    this.bitmap.y = 80;

    // 中心軸
    this.bitmap.regX = this.bitmap.getBounds().width/2;
    this.bitmap.regY = this.bitmap.getBounds().height/2;

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
    const rotateX = this.bitmap.getBounds().width/2+this.bitmap.x;
    const rotateY = this.bitmap.getBounds().height/2+this.bitmap.y;
    this.rotateShape.graphics.drawCircle(0,0,25,25);
    this.rotateShape.x = rotateX;
    this.rotateShape.y = rotateY;

    // 枠線
    // this.activeShape.graphics.drawRect(instance.x,instance.y,instance.getBounds().width,instance.getBounds().height);
    // this.stage.addChild(this.activeShape);
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
    const instance = e.target;
    const offsetX  = this.stage.mouseX - this.bitmap.x;
    const offsetY  = this.stage.mouseY - this.bitmap.y;

    const baseRads     = this.tan2(offsetX, offsetY);
    this.bitmap.rotation = this.toDegree(baseRads)-45; // ドラッグスタートが右下になるので位置調整
    const rads         = this.toRadian(this.toDegree(baseRads)-45);


    // rotate操作の移動
    const rotateX = this.bitmap.getBounds().width+this.bitmap.x;
    const rotateY = this.bitmap.getBounds().height+this.bitmap.y;
    const bitmapBounds = this.bitmap.getBounds();

    // 対角線の長さ
    const diagonalLine    = this.calcDiagonalLine(this.bitmap.getBounds().width, this.bitmap.getBounds().height);

    // A点の座標
    const A_X_Offset = this.calcPointX(diagonalLine/2, this.toRadian(this.toDegree(rads)-135));
    const A_Y_Offset = this.calcPointY(diagonalLine/2, this.toRadian(this.toDegree(rads)-135));
    this.pointA.innerHTML = this.txtFormat(this.bitmap.x+A_X_Offset, this.bitmap.y+A_Y_Offset);


    // B点の座標
    const B_X_Offset = this.calcPointX(diagonalLine/2, this.toRadian(this.toDegree(rads)-45)); // 中央を基準とした点Bの座標
    const B_Y_Offset = this.calcPointY(diagonalLine/2, this.toRadian(this.toDegree(rads)-45)); // 中央を基準とした点Bの座標
    this.pointB.innerHTML = this.txtFormat(this.bitmap.x+B_X_Offset, this.bitmap.y+B_Y_Offset);


    // 対角線の座標
    // const diagonalLine    = this.calcDiagonalLine(this.bitmap.getBounds().width, this.bitmap.getBounds().height);
    const diagonalRasin   = this.toRadian(this.toDegree(rads)+45); //対角線のラジアン角
    this.pointC.innerHTML =
      this.txtFormat(this.bitmap.x+this.calcPointX(diagonalLine/2, diagonalRasin), this.bitmap.y+this.calcPointY(diagonalLine/2, diagonalRasin));

    this.rotateShape.x = this.bitmap.x+this.calcPointX(diagonalLine/2, diagonalRasin); // 中心軸からのdistance
    this.rotateShape.y = this.bitmap.y+this.calcPointY(diagonalLine/2, diagonalRasin);


    // D点の座標
    const verticalRasin   = this.toRadian(this.toDegree(rads)+135);
    this.pointD.innerHTML =
      this.txtFormat(this.bitmap.x+this.calcPointX(diagonalLine/2, verticalRasin), this.bitmap.y+this.calcPointY(diagonalLine/2, verticalRasin));
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
