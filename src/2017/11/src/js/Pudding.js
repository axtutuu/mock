import 'hammerjs';
// https://github.com/component/ease/blob/master/index.js
const Ease = {
  linear: n => {
    return n;
  },
  outBack: n => {
    const  s = 0.60158; // default 1.70158
    return --n * n * ((s + 1) * n + s) + 1;
  },
  inExpo: n => {
    return 0 == n ? 0 : Math.pow(1024, n - 1);
  },
  outCube: n => {
    return --n * n * n + 1;
  }
}

export default class Pudding {
  constructor(opts) {
    this.dom = opts.el.children[0];
    this.mc = new Hammer(opts.el)
    this.minX = -(this.dom.clientWidth - opts.el.clientWidth);
    this.minY = -(this.dom.clientHeight - opts.el.clientHeight);

    this._setting()
    this._pan()
    this._pinch()
  }

  _setting() {
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.tmpX = 0;
    this.tmpY = 0;
    this.tmpScale = 1;
    this.minScale = 0.5;
    this.maxScale = 2.5;
    this.pinchStart = 0;

    this.mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.mc.get('pinch').set({ enable: true })
  }

  _pan() {
    this.mc.on('panstart', (e) => {
      this.dom.style.willChange = 'transform';
      cancelAnimationFrame(this.tick)
      this.x = this.tmpX
      this.y = this.tmpY

      console.log(e)
    });

    this.mc.on('panmove', (e) => {
      this.tmpX = e.deltaX + this.x;
      this.tmpY = e.deltaY + this.y;

      // this.dom.style.transformOrigin = `${e.center.x + this.x }px ${e.center.y + this.y }px`;
      this.dom.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.tmpX}, ${this.tmpY})`;
    });

    this.mc.on('panend', e => {
      this.dom.style.willChange = '';
      this.x = this.tmpX;
      this.y = this.tmpY;

      const velocity = Math.abs(e.velocity);
      const x = (e.distance * velocity) * Math.cos(e.angle * (Math.PI / 180))
      const y = (e.distance * velocity) * Math.sin(e.angle * (Math.PI / 180))

      // this.dom.style.transformOrigin = `${e.center.x + this.x }px ${e.center.y + this.y }px`;
      this._leap(x, y)
    })
  }

  _pinch() {
    this.mc.on('pinchstart', e => {
         cancelAnimationFrame(this.tick)
         this.x = this.tmpX
         this.y = this.tmpY

        this.dom.style.willChange = 'transform';
        this.pinchStart = this._distance(
           e.pointers[0].clientX,
           e.pointers[0].clientY,
           e.pointers[1].clientX,
           e.pointers[1].clientY
        )
    })

    this.mc.on('pinchmove', e => {
      const current = this._distance(
           e.pointers[0].clientX,
           e.pointers[0].clientY,
           e.pointers[1].clientX,
           e.pointers[1].clientY
      )
      this.tmpScale = (current - this.pinchStart) / this.pinchStart + this.scale

      if (this.tmpScale < this.minScale * 0.5) this.tmpScale = this.minScale * 0.5
      if (this.tmpScale > this.maxScale * 1.5) this.tmpScale = this.maxScale * 1.5
      this.dom.style.transform = `matrix(${this.tmpScale}, 0, 0, ${this.tmpScale}, ${this.x}, ${this.y})`
    })

    this.mc.on('pinchend', e => {
      this.dom.style.willChange = '';

      if (this.tmpScale < this.minScale) this.tmpScale = this.minScale
      if (this.tmpScale > this.maxScale) this.tmpScale = this.maxScale
      this.scale = this.tmpScale
      this.dom.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.x}, ${this.y})`
    })
  }

  _leap(x, y) {
      this.dom.style.willChange = 'transform';
      const duration = 1500
      const startTime = Date.now();
      const tick = () => {
          const now = Date.now();
          const percent = (now - startTime) / duration;

          this.tmpX = this.x + x * Ease.outCube(percent);
          this.tmpY = this.y + y * Ease.outCube(percent);

          // transform-origin は left topの順番だったのを勘違いしていたっぽい
          // if (this.tmpX > 0) this.tmpX = 0
          if (this.tmpX > (250 * (this.scale - 1))) this.tmpX = (250 * (this.scale - 1))
          if (this.tmpX < this.minX * this.scale) this.tmpX = this.minX * this.scale
          if (this.tmpY > 0) this.tmpY = 0
          if (this.tmpY < this.minY * this.scale) this.tmpY = this.minY * this.scale

          if (now - startTime >= duration) {
            this.dom.style.willChange = '';
            this.x = this.tmpX
            this.y = this.tmpY
            return
          }

          this.tick = requestAnimationFrame(tick)

          this.dom.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.tmpX}, ${this.tmpY})`
      }
      tick();
  }

   _distance(posX1, posY1, posX2, posY2) {
       return Math.sqrt(Math.pow(posX1 - posX2, 2) + Math.pow(posY1 - posY2, 2));
   }
}
