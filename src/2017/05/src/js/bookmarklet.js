import $ from 'jquery';

class Canvas {
  constructor(opts={}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.canvas.classList.add('bewilder-canvas');
    this.canvas.width = $(window).width();
    this.canvas.height = $(window).height();

    document.body.appendChild(this.canvas);

    this.setImage()
      .then(()=>{
        this.clip();
      });

    this.listener();
  }

  listener() {
    $(this.canvas).on('click', (e) => {
      console.log(e.screenX, e.screenY);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setImage();
      this.clip(e.screenX, e.screenY-100);
    });
  }

  setImage() {
    return new Promise(resolve=>{
      if(this.image.src) {
        this.ctx.drawImage(this.image, 0, 0);
        resolve();
        return;
      }

      this.image.src = 'https://i.gyazo.com/2f180de9361c3a60fa93bd78ec56b30f.png';
      this.image.onload = () => {
        this.ctx.drawImage(this.image, 0, 0);
        resolve();
      }
    });
  }

  clip(x=50, y=50) {
    this.ctx.beginPath();
    this.ctx.clearRect(x, y, 60, 30);
  }
}


(function init() {
  // styleの差し込み
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'http://localhost:3000/2017/05/css/bookmarklet.css';

  document.body.appendChild(link);

  const canvas = new Canvas();
})();
