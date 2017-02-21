import $ from 'jquery';

window.onload = function() {
  console.log('load');
  const input   = document.querySelector('.js-image-input');
  const preview = document.querySelector('.js-preview');
  const content = document.querySelector('.preview');

  let x,y,width,height;

  function baseImage() {
    return new Promise((resolve)=>{
      const tracker = new tracking.ObjectTracker(['face']);
      tracking.track('#img', tracker);
      tracker.on('track', (e)=> {
        const rect = e.data[0];
        console.log('-------------------base track----------------');
        console.log(rect);
        x=rect.x;y=rect.y,width=rect.width,height=rect.height;
        resolve();
      });
    });
  }

  function imageReader(){
    return new Promise((resolve)=>{
      input.addEventListener('change', (e)=>{
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = (res) => {
          preview.src = res.target.result;
          resolve();
        };
      });
    });
  }

  function imageTracker(){ 
    const tracker = new tracking.ObjectTracker(['face']);
    tracking.track('.js-preview', tracker);
    tracker.on('track', (e)=>{
      const rect = e.data[0];
      console.log(rect);
      faceCanvas(rect.x,rect.y,rect.width,rect.height);
    });
  }

  function faceCanvas(sx,sy,swidth,sheight) {
    console.log('face canvas');
    const face = document.createElement('canvas');
    const faceCxt = face.getContext('2d');

    face.width = face.height = swidth;
    faceCxt.beginPath();
    faceCxt.arc(65, 65, 45, 0, Math.PI*2, false);
    faceCxt.clip();

    const img = new Image();
    img.src   = preview.src;
    img.onload = ()=>{
      // faceCxt.drawImage(img, sx, sy, swidth, sheight, 0, 0, 90, 90);
      faceCxt.drawImage(img, sx, sy, swidth, sheight, 20, 20, 90, 90);
      $(face).css({
        "position": "absolute",
        "top": y,
        "left": x,
        "width": width,
        "height": height
      });
      // face.width = face.height = swidth;
      content.appendChild(face);
    };
  }


  Promise.resolve()
    .then(baseImage)
    .then(imageReader)
    .then(imageTracker);
};



