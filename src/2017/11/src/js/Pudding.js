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

    const mc  = new Hammer(opts.el)

    mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    console.log(opts.el.children)

    mc.on('panstart', (e) => {
      this.dom.style.willChange = 'transform';
    });

    mc.on('panmove', (e) => {
      this.tmpX = e.deltaX + this.x;
      this.tmpY = e.deltaY + this.y;
      this.dom.style.transform = `matrix(${1}, 0, 0, ${1}, ${this.tmpX}, ${this.tmpY})`
    });

    mc.on('panend', e => {
      this.x = this.tmpX;
      this.y = this.tmpY;
      this.dom.style.willChange = '';

      const velocity = Math.abs(e.velocity);
      const x = (e.distance * velocity) * Math.cos(e.angle * (Math.PI / 180))
      const y = (e.distnce * velocity) * Math.sin(e.angle * (Math.PI / 180))

      this._leap(x)
    })
  }

  _leap(x) {
      console.log(x)
      const duration = 1500
      const startTime = Date.now();
      const tick = () => {
          const now = Date.now();
          if (now - startTime >= duration) return
          const percent = (now - startTime) / duration;

          console.log(percent, Ease.outCube(percent), x*Ease.inExpo(percent))
          requestAnimationFrame(tick)

          this.dom.style.transform = `matrix(${1}, 0, 0, ${1}, ${this.tmpX}, ${this.tmpY})`
      }
      tick();
  }
}
