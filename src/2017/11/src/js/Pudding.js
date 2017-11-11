import 'hammerjs';
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
    this.x = 0;
    this.y = 0;
    this.scale = 1;
    this.tmpX = 0;
    this.tmpY = 0;
    this.tmpScale = 1;
    this.minX = -(this.dom.clientWidth - opts.el.clientWidth)
    this.minY = -(this.dom.clientHeight - opts.el.clientHeight)
    this.minScale = 0.5
    this.maxScale = 2.5
    this.pinchStart = 0

    const mc  = new Hammer(opts.el)

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    mc.get('pinch').set({ enable: true })

    mc.on('panstart', (e) => {
      this.dom.style.willChange = 'transform';
      cancelAnimationFrame(this.tick)
      this.x = this.tmpX
      this.y = this.tmpY
    });

    mc.on('panmove', (e) => {
      this.tmpX = e.deltaX + this.x;
      this.tmpY = e.deltaY + this.y;

      this.dom.style.transform = `matrix(${this.scale}, 0, 0, ${this.scale}, ${this.tmpX}, ${this.tmpY})`
    });

    mc.on('panend', e => {
      this.dom.style.willChange = '';
      this.x = this.tmpX;
      this.y = this.tmpY;

      const velocity = Math.abs(e.velocity);
      const x = (e.distance * velocity) * Math.cos(e.angle * (Math.PI / 180))
      const y = (e.distance * velocity) * Math.sin(e.angle * (Math.PI / 180))

      this._leap(x, y)
    })


     mc.on('pinchstart', e => {
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

     mc.on('pinchmove', e => {
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

     mc.on('pinchend', e => {
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

          if (this.tmpX > 0) this.tmpX = 0
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
