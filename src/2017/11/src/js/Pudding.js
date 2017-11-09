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
    this.tmpX = 0;
    this.tmpY = 0;
    this.minX = -(this.dom.clientWidth - opts.el.clientWidth)
    this.minY = -(this.dom.clientHeight - opts.el.clientHeight)

    const mc  = new Hammer(opts.el)

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

    mc.on('panstart', (e) => {
      this.dom.style.willChange = 'transform';
      cancelAnimationFrame(this.tick)
      this.x = this.tmpX
      this.y = this.tmpY
    });

    mc.on('panmove', (e) => {
      // if(!this._checkPos(this.tmpX, this.tmpY)) return

      this.tmpX = e.deltaX + this.x;
      this.tmpY = e.deltaY + this.y;

      this.dom.style.transform = `matrix(${1}, 0, 0, ${1}, ${this.tmpX}, ${this.tmpY})`
    });

    mc.on('panend', e => {
      this.dom.style.willChange = '';
      this.x = this.tmpX;
      this.y = this.tmpY;

      const velocity = Math.abs(e.velocity);
      const x = (e.distance * velocity) * Math.cos(e.angle * (Math.PI / 180))
      const y = (e.distance * velocity) * Math.sin(e.angle * (Math.PI / 180))

      console.log('panend', x, y, Math.abs(x) > 10 || Math.abs(y) > 10)
      this._leap(x, y)
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
          if (this.tmpX < this.minX) this.tmpX = this.minX
          if (this.tmpY > 0) this.tmpY = 0
          if (this.tmpY < this.minY) this.tmpY = this.minY

          if (now - startTime >= duration) {
            this.dom.style.willChange = '';
            this.x = this.tmpX
            this.y = this.tmpY
            return
          }

          this.tick = requestAnimationFrame(tick)

          console.log('tick', percent, this.tmpX, this.tmpY)

          this.dom.style.transform = `matrix(${1}, 0, 0, ${1}, ${this.tmpX}, ${this.tmpY})`
      }
      tick();
  }

  _checkPos(x, y) {
    console.log(x, y, this.minX, this.minY)
    return this.minX <= x && x <= 0 && this.minY <= y && y <= 0;
  }
}
