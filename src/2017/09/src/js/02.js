import _ from 'lodash';

class Slider {
  constructor() {
    this.x = 0;
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
    this.slider.on('panend',  ev => this._save(this.x+ev.deltaX));


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
     * set pos
     */
    this._setTransformX(this.width*-1);
    this._save(this.width*-1);

    const tick = () => {
      this._posFix();
      requestAnimationFrame(tick);
    }
    tick();
  }

  _posFix() {
    const offset = 150;
    const isInRange = _.inRange(this.x, (this.width*-1)+offset, (this.width*-2)+-offset)
    if(!isInRange) {
      if(this.x > this.width*-1) {
        console.log('left');
        const diff = Math.abs(this.x-(this.width*-1));
        this._save((this.width*-2)+diff);
        this._setTransformX((this.width*-2)+diff);
      }

      if(this.x < this.width*-2) {
        console.log('right');
        const diff = Math.abs(this.x-(this.width*-2));
        this._save((this.width*-1)-diff);
        this._setTransformX((this.width*-1)-diff);
      }
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
