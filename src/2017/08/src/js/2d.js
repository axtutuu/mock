export default class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(v) {
    return new Vec(this.x+v.x, this.y+v.y);
  }

  mul(x, y) { // 掛算
    return new Vec(this.x*x, this.y*y);
  }

  dot(v) {
    // 内積
    return this.x * v.x + this.y * v.y;
  }

  cross(v) {
    // 外積
    return this.x * v.y - v.x * this.y;
  }

  move(dx, dy) {
    // 自分を移動
    this.x += dx;
    this.y += dy;
  }
}

// 短形オブジェクト
function RectangleEntity(x, y, width, height) {
  this.shape = ShapeRectangle;
  this.type  = BodyStatic;
  this.x     = x;
  this.y     = y;
  this.w     = width;
  this.h     = height;
  this.deceleration = 1.0;
  this.isHit = function (i, j) {
    return (
      this.x <= i && i <= this.x + this.w &&
      this.y <= j && j <= this.y + this.h
    )
  }
}

// 線オブジェクト
function LineEntity(x0, y0, x1, y1, restitution) {
  this.shape = ShapeLine;
  this.type = BodyStatic;
  this.x = (x0 + x1) / 2;
  this.y = (y0 + y1) / 2;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;

  this.restitution = restitution || 0.9;
  this.vec = new Vec(x1-x0, y1-y0);
  const length = Math.sqrt(Math.pow(this.vec.x, 2) + Math.pow(this.vec.y, 2));
  this.norm = new Vec(y0-y1, x1-x0).mul(1/length);
}

// 円オブジェクト
function CircleEntity(x, y, radius, type, restitution, deceleration) {
  this.shape = ShapeCircle;
  this.type = type || BodyDynamic;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.restitution = restitution || 0.9;
  this.deceleration = deceleration || 1.0;
  this.accel = new Vec(0, 0);
  this.velocity = new Vec(0, 0);

  this.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
  }

  this.isHit = function (x, y) {
  }
}
