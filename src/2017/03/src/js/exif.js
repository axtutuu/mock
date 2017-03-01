((doc, win)=>{
  console.log('exif');
  const file = doc.querySelector('.js-file');
  file.onchange = ()=> {
    const image = file.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = () => {
        const canvas = doc.createElement('canvas');
        canvas.width = canvas.height = 500;
        const canvas2d = canvas.getContext('2d');
        canvas2d.drawImage(img, 0,0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        doc.body.appendChild(canvas);
      }
    }
  };

  / * exif */
  const exifFile = doc.querySelector('.js-exif-file');
  console.log(exifFile);
  exifFile.onchange = (e) => {
    loadImage(e.target.files[0], (img)=>{
        const canvas = doc.createElement('canvas');
        const canvas2d = canvas.getContext('2d');
        canvas.width = canvas.height = 500;
        console.log(img);
        canvas2d.drawImage(img, 0,0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        doc.body.appendChild(canvas);
    }, { orientation: true });
  }

})(document, window);
