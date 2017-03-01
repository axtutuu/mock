((doc, win)=>{
  console.log('exif');
  const file = doc.querySelector('.js-file')
  file.onchange = ()=> {
    const image = file.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      const imgElem = doc.createElement('img');
      imgElem.src = reader.result;
      doc.body.appendChild(imgElem);
    }
  }

})(document, window);
