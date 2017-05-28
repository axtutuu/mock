import $ from 'jquery';

class Canvas {
  constructor(opts={}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();
    this.canvas.classList.add('bewilder-canvas');
    this.canvas.width = $(window).width()*2;
    this.canvas.height = $(window).height()*2;

    document.body.appendChild(this.canvas);

    this.loadImage()
      .then(()=>{
        this.setImage();
        this.clip();
      });

    this.listener();
  }

  listener() {
    $(this.canvas).on('click', (e) => {
      console.log(e.screenX, e.screenY);
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.setImage();
      this.clip(e.screenX*2, (e.screenY*2)-150);
    });

    document.addEventListener("keydown", (e) => {
      console.log(e.which);
      switch (e.which) {
        case 32:
          this.clipLine(400);
          break;
      }
    });

  }

  loadImage() {
    return new Promise(resolve=>{
      this.image.src = 'https://i.gyazo.com/2f180de9361c3a60fa93bd78ec56b30f.png';
      this.image.onload = () => {
        resolve();
      }
    });
  }

  setImage() {
    const scale = (this.canvas.height/this.image.height);
    this.ctx.drawImage(this.image, 0, 0, this.image.width*scale, this.image.height*scale);
  }

  clip(x=50, y=50) {
    this.ctx.beginPath();
    this.ctx.clearRect(x, y, 60, 30);
  }

  clipLine(y) {
    this.ctx.beginPath();
    this.ctx.clearRect(0, y, this.canvas.width, 150);
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
