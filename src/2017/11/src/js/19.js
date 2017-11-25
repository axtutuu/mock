let canvas, ctx;

(function main() {

  canvas = canvas || document.createElement('canvas');
  ctx    = canvas.getContext('2d');

  const input = document.querySelector('#img')
  const reader = new FileReader();

  input.onchange = (e) => {
    reader.readAsDataURL(input.files[0])
  }

  reader.onload = (e) => {
    drawCanvas(e.target.result, orientation);

    const img = document.createElement('img');
    img.src = e.target.result;
    img.width = '300';
    document.body.appendChild(img);


    const img2 = document.createElement('img');
    const orientation = getOrientation(base64ToArrayBuffer(e.target.result));

    drawCanvas(e.target.result, orientation)
      .then(base64 => {
        img2.src = base64
        img2.width = 300
        document.body.appendChild(img2);
      })

  }
})();

// https://github.com/exif-js/exif-js/blob/master/exif.js#L343
function base64ToArrayBuffer(base64, contentType) {
    contentType = contentType || base64.match(/^data\:([^\;]+)\;base64,/mi)[1] || ''; // e.g. 'data:image/jpeg;base64,...' => 'image/jpeg'
    base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, '');
    var binary = atob(base64);
    var len = binary.length;
    var buffer = new ArrayBuffer(len);
    var view = new Uint8Array(buffer);
    for (var i = 0; i < len; i++) {
        view[i] = binary.charCodeAt(i);
    }
    return buffer;
}


/*
 * get orientation
 * https://stackoverflow.com/questions/7584794/accessing-jpeg-exif-rotation-data-in-javascript-on-the-client-side
 */
function getOrientation(data) {
  const view = new DataView(data);
  if (view.getUint16(0, false) != 0xFFD8) return -2;
  let length = view.byteLength, offset = 2;
  while (offset < length) {
    const marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xFFE1) {
      if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
      const little = view.getUint16(offset += 6, false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      const tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++) {
        if (view.getUint16(offset + (i * 12), little) == 0x0112) {
          return view.getUint16(offset + (i * 12) + 8, little);
        }
      }
    } else if ((marker & 0xFF00) != 0xFF00) { 
      break;
    } else {
      offset += view.getUint16(offset, false);
    }
    return -1;
  }
}

// https://gist.github.com/fupslot/5015897
function dataURIToBlob(dataURI) {
    dataURI = dataURI.replace(/^data:/, '');

    const type = dataURI.match(/image\/[^;]+/);
    const base64 = dataURI.replace(/^[^,]+,/, '');
    const arrayBuffer = new ArrayBuffer(base64.length);
    const typedArray = new Uint8Array(arrayBuffer);

    for (let i = 0; i < base64.length; i++) {
        typedArray[i] = base64.charCodeAt(i);
    }

    return new Blob([arrayBuffer], {type});
}

// https://qiita.com/mo49/items/a3d61d97f1883ead333b
function drawCanvas(imgDataURL, orientation) {
  const img = new Image();
  img.src = imgDataURL

  return new Promise(resolve => {
      img.onload = () => {
        switch (orientation) {
          case 3: //画像が１８０度回転している時
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.rotate(Math.PI);
            ctx.drawImage(img, -img.width, -img.height);
            ctx.rotate(-Math.PI);
            break;
          case 6: //画像が時計回りに９０度回っている時
            canvas.width = img.height;
            canvas.height = img.width;
            ctx.rotate(Math.PI * 0.5);
            ctx.drawImage(img, 0, -img.height);
            ctx.rotate(-Math.PI * 0.5);
            break;
          case 8: //画像が反時計回りに９０度回っている時
            canvas.width = img.height;
            canvas.height = img.width;
            ctx.rotate(-Math.PI * 0.5);
            ctx.drawImage(img, -img.width, 0);
            ctx.rotate(Math.PI * 0.5);
            break;
          default:
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        resolve(canvas.toDataURL("image/jpeg"));
      }
  });
}
