((win, doc)=> {
  const input   = doc.querySelector('.js-image-input');
  const preview = doc.querySelector('.js-preview');

  const canvas = document.getElementById('canvas');
  const canvasCxt = canvas.getContext('2d');

  let x,y;
  Promise.resolve()
    .then(baseImage)
    .then(imageReader)
    .then(faceTracker)
    .then(()=>{console.log('next');});

  function baseTracker() {
    return new Promise(resolve=>{
      const tracker = new tracking.ObjectTracker(['face']);
      tracking.track('#canvas', tracker);
      tracker.on('track', (e)=> {
        const rect = e.data[0];
        console.log(rect);
        resolve();
      });
    });
  }

  function baseImage() {
    const img = new Image();
    return new Promise(resolve=>{
      img.src = "/images/2017/02/sample2.PNG";
      img.onload = ()=> {
        console.log(img);
        console.log(img.width);
        canvasCxt.drawImage(img, 0, 0, img.width, img.height);

        const tracker = new tracking.ObjectTracker(['face']);
        tracking.track(img, tracker);
        tracker.on('track', (e)=> {
          const rect = e.data[0];
          console.log(rect);
          x = rect.x; y = rect.y;
          resolve();
        });
      };
    });
  }

  function imageReader() {
    return new Promise(resolve=>{
      input.addEventListener('change', (e)=>{
        console.log(e);
        console.log(e.target.files);
        preview.file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = (res) => {
          console.log(res);
          preview.src = res.target.result;
          resolve();
        };
        reader.readAsDataURL(e.target.files[0]);
      });
    });
  }

  function faceTracker() {
    return new Promise(resolve=>{
      const tracker = new tracking.ObjectTracker(['face']);
      tracking.track('.js-preview', tracker);
      tracker.on('track', (e)=> {
        const rect = e.data[0];
        console.log(rect);

        const face = document.createElement('canvas');
        const faceCxt = canvas.getContext('2d');

        faceCxt.beginPath();
        faceCxt.arc(65, 65, 45, 0, Math.PI*2, false);
        faceCxt.clip();

        const img = new Image();
        img.src = preview.src;
        img.onload = () => {
          faceCxt.drawImage(img, 86, 99, 119, 119, 20, 20, 90, 90);
          canvasCxt.putImageData(faceCxt.getImageData(0,0,faceCxt.width, faceCxt.height),x,y);
          resolve();
        };
      });
    });
  }
})(window, document);
