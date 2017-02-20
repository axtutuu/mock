((win, doc)=> {
  const input   = doc.querySelector('.js-image-input');
  const preview = doc.querySelector('.js-preview');
  const synthesis = doc.querySelector('.preview');

  input.addEventListener('change', (e)=>{
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = (res) => {
      preview.src = res.target.result;

      // 顔
      const tracker = new tracking.ObjectTracker(['face']);
      tracking.track('.js-preview', tracker);
      tracker.on('track', (e)=> {
        const face = document.createElement('canvas');
        const faceCxt = face.getContext('2d');
        faceCxt.beginPath();
        faceCxt.fillStyle = 'rgb(192, 80, 77)'; // 赤
        faceCxt.arc(65, 65, 45, 0, Math.PI*2, false);
        faceCxt.clip();
        const img = new Image();
        img.src = preview.src;
        img.onload = () => {
          faceCxt.drawImage(img, 86, 99, 119, 119, 20, 20, 90, 90);
          synthesis.appendChild(face);
        };
      });


    };
  });
})(window, document);
