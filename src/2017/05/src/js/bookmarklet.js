import $ from 'jquery';

class Canvas {
  constructor(opts={}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.canvas.classList.add('bewilder-canvas');
    this.canvas.width = $(window).width();
    this.canvas.height = $(window).height();

    document.body.appendChild(this.canvas);

    this.setImage()
      .then(()=>{
        this.clip();
      });
  }

  setImage() {
    return new Promise(resolve=>{
      const image = new Image();
      image.src = 'https://i.gyazo.com/2f180de9361c3a60fa93bd78ec56b30f.png';

      image.onload = () => {
        this.ctx.drawImage(image, 0, 0);
        resolve();
      }
    });
  }

  clip() {
    this.ctx.beginPath();
    this.ctx.fillRect(20, 20, 100, 100);
    this.ctx.beginPath();
    this.ctx.clearRect(50, 70, 60, 30);
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
