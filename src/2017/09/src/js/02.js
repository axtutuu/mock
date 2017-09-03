import _ from 'lodash';

class Slider {
  constructor() {
    this.x = 0;
    this.inertia = 0;
    this.slider = new Hammer(document.querySelector('.slider'));
    this.items = this.slider.element.children[0];
    this.width = this.items.scrollWidth;

    this._init();
  }

  _init() {
    /*
     * listener
     */
    this.slider.on('panmove', ev => this._setTransformX(this.x+ev.deltaX));
    this.slider.on('panend',  ev => {
      this._save(this.x+ev.deltaX);
      /*
       * 慣性で移動する距離
       */
      let distance = ev.distance * ev.overallVelocity;
      
      if(this.x+distance>0) {
        distance = distance-(this.x+distance);
      }

      if(this.x+distance < this.width*-3) {
        distance = distance-Math.abs((this.width*-3)-distance);
      }
      this.inertia = distance;
    });


    /*
     * copy
     */
    const items = _(this.items.children).toArray().cloneDeep();
    const fragment = document.createDocumentFragment();

    for(let i=0; i<(items.length); i++) {
      fragment.appendChild(items[i].cloneNode(true));
    }
    for(let i=0; i<(items.length); i++) {
      fragment.appendChild(items[i].cloneNode(true));
    }
    this.items.appendChild(fragment);

    /*
     * 現在地の監視
     */
    this._setTransformX(this.width*-1);
    this._save(this.width*-1);

    const tick = () => {
      this._leap();
      this._posFix();
      requestAnimationFrame(tick);
    }
    tick();
  }

  /*
   * 位置調整用関数
   * ex:)
   *  x: -800 => 840*-2+Math.abs(-800-(-840))
   */
  _posFix() {
    const offset = 150;
    const isInRange = _.inRange(this.x, (this.width*-1)+offset, (this.width*-2)+-offset)
    if(!isInRange) {
      if(this.x > this.width*-1) {
        const diff = Math.abs(this.x-(this.width*-1));
        this._save((this.width*-2)+diff);
        this._setTransformX((this.width*-2)+diff);
      }

      if(this.x < this.width*-2) {
        const diff = Math.abs(this.x-(this.width*-2));
        this._save((this.width*-1)-diff);
        this._setTransformX((this.width*-1)-diff);
      }
    }
  }

  /*
   * 慣性
   */
  _leap() {
    if(Math.abs(this.inertia)<1) return;

    const distance = this.inertia*0.9;
    this.inertia = distance;
    this._save(this.x+distance);
    this._setTransformX(this.x+distance);

    if(Math.abs(distance)<1) {
      this.inertia = 0;
    }
  }

  _setTransformX(x) {
    this.items.style.transform =
      this.items.style.webkitTransform =
      this.items.style.msTransform = `translateX(${x}px)`;
  }

  _save(x) {
    this.x = x;
  }
}

const slider = new Slider();
