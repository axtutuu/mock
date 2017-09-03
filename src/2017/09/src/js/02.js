class Slider {
  constructor() {
    this.x = 0;
    this.slider = new Hammer(document.querySelector('.slider'));
    this.items = this.slider.element.children[0];

    this.listener();
  }

  listener() {
    this.slider.on('panmove', this._setTransformX.bind(this));
  }

  _setTransformX(ev) {
    this.items.style.transform =
      this.items.style.webkitTransform =
      this.items.style.msTransform = `translateX(${this.x+ev.deltaX}px)`;
  }
}

const slider = new Slider();
