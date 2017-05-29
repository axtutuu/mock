import $ from 'jquery';

class Canvas {
  constructor(opts={}) {
    this.canvas = document.createElement('canvas');
    this.ctx = this.canvas.getContext('2d');

    this.image = new Image();

    // TODO: add valiation
    this.images = [
      'https://i.gyazo.com/2f180de9361c3a60fa93bd78ec56b30f.png',
      'https://i.gyazo.com/fb412b49fd2a3739f0d2ce347b9dc4c2.png'
    ];

    this.currentImage = 0;

    this.canvas.classList.add('bewilder-canvas');
    this.canvas.width = $(window).width()*2;
    this.canvas.height = $(window).height()*2;

    this.pointer = true;

    this.squareWidth  = 50;
    this.squareHeight = 50;

    this.currentX = 0;
    this.currentY = 0;

    document.body.appendChild(this.canvas);

    this.loadImage()
      .then(()=>{
        this.setImage();
        this.clip();
      });

    this.listener();
  }

  clear() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  listener() {
    $(this.canvas).on('mousedown', (e) => {
      console.log(e.screenX, e.screenY);

      this.clear();
      this.setImage();
      this.currentX = e.screenX*2;
      this.currentY = (e.screenY*2)-150;
      this.clip();

      this.watchStart();
    });

    $(this.canvas).on('mouseup', (e) => {
      this.watchStop();
    });

    document.addEventListener("keydown", (e) => {
      console.log(e.which);
      switch (e.which) {
        case 32: // space
          this.currentX = 0;
          this.currentY = 0;
          if(this.squareWidth == this.canvas.width) {
            this.squareWidth = 50;
            this.squareHeight = 50;
          } else {
            this.squareWidth = this.canvas.width;
            this.squareHeight = 150;
          }
          this.clear();
          this.setImage();
          this.clip();
          break;
        case 187: // +
          this.upScale();
          break;
        case 65: // a
          const next = (this.images.length-1 <= this.currentImage) ? 0 : this.currentImage+1;
          this.currentImage = next;
          this.loadImage()
            .then(()=>{
              this.setImage();
              this.clip();
            });
          break;
      }
    });
  }

  upScale() {
    this.squareWidth += 50;
    this.squareHeight += 50;

    this.clear();
    this.setImage();
    this.clip();
  }

  watchStart() {
    $(this.canvas).on('mousemove', (e) => {
      console.log(e.screenX, e.screenY);
      this.clear();
      this.setImage();
      this.currentX = e.screenX*2;
      this.currentY = (e.screenY*2)-150;
      this.clip();
    });
  }

  watchStop() {
    $(this.canvas).off('mousemove');
  }


  loadImage() {
    return new Promise(resolve=>{
      this.image.src = this.images[this.currentImage];
      this.image.onload = () => {
        resolve();
      }
    });
  }

  setImage() {
    const scale = (this.canvas.height/this.image.height);
    this.ctx.drawImage(this.image, 0, 0, this.image.width*scale, this.image.height*scale);
  }

  clip(x=this.currentX, y=this.currentY) {
    this.ctx.beginPath();
    this.ctx.clearRect(x, y, this.squareWidth, this.squareHeight);
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
