((win, doc)=> {
  const input   = doc.querySelector('.js-image-input');
  const preview = doc.querySelector('.js-preview');

  Promise.resolve()
    .then(imageReader)
    .then(faceTracker)
    .then(()=>{console.log('next');});


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

        const canvas = document.getElementById('canvas');
        const canvasCxt = canvas.getContext('2d');

        canvasCxt.beginPath();
        canvasCxt.arc(65, 65, 45, 0, Math.PI*2, false);
        canvasCxt.clip();

        const img = new Image();
        img.src = preview.src;
        img.onload = () => {
          canvasCxt.drawImage(img, 86, 99, 119, 119, 20, 20, 90, 90);
          resolve();
        };
      });
    });
  }
})(window, document);


// window.onload = function() {
//   var img = document.getElementById('img');
//   var tracker = new tracking.ObjectTracker(['face']);
//   tracking.track('#img', tracker);
//   tracker.on('track', function(event) {
//     event.data.forEach(function(rect) {
//       const canvas = document.getElementById('canvas');
//       const canvasCxt = canvas.getContext('2d');
//       canvasCxt.beginPath();
//       canvasCxt.arc(65, 65, 45, 0, Math.PI*2, false);
//       canvasCxt.clip();
// 
//       var img4 = new Image();
//       img4.onload = function() {
//         canvasCxt.drawImage(img4, 98, 187, 90, 90, 20, 20, 90, 90);
//       };
//       img4.src = img.src;
//       console.log(rect);
//     });
//   });
// };
