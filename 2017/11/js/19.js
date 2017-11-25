(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = void 0,
    ctx = void 0;

(function main() {

  canvas = canvas || document.createElement('canvas');
  ctx = canvas.getContext('2d');

  var input = document.querySelector('#img');
  var form = document.querySelector('#form');
  var reader = new FileReader();

  var request = new XMLHttpRequest();

  var blob = void 0;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var data = new FormData(e.target);
    data.append('myFile', blob);
    data.delete('image-input');
    console.log(blob);

    request.open('POST', '/');
    request.send(data);
  });

  input.onchange = function (e) {
    reader.readAsDataURL(input.files[0]);
  };

  reader.onload = function (e) {
    drawCanvas(e.target.result, orientation);

    var img = document.createElement('img');
    img.src = e.target.result;
    img.width = '300';
    document.body.appendChild(img);

    var img2 = document.createElement('img');
    var orientation = getOrientation(base64ToArrayBuffer(e.target.result));

    console.log(orientation);
    drawCanvas(e.target.result, orientation).then(function (base64) {
      img2.src = base64;
      img2.width = 300;
      document.body.appendChild(img2);

      blob = dataURIToBlob(base64);
    });
  };
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
  var view = new DataView(data);
  if (view.getUint16(0, false) != 0xFFD8) return -2;
  var length = view.byteLength,
      offset = 2;
  while (offset < length) {
    var marker = view.getUint16(offset, false);
    offset += 2;
    if (marker == 0xFFE1) {
      if (view.getUint32(offset += 2, false) != 0x45786966) return -1;
      var little = view.getUint16(offset += 6, false) == 0x4949;
      offset += view.getUint32(offset + 4, little);
      var tags = view.getUint16(offset, little);
      offset += 2;
      for (var i = 0; i < tags; i++) {
        if (view.getUint16(offset + i * 12, little) == 0x0112) {
          return view.getUint16(offset + i * 12 + 8, little);
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

  var type = dataURI.match(/image\/[^;]+/);
  var base64 = dataURI.replace(/^[^,]+,/, '');
  var arrayBuffer = new ArrayBuffer(base64.length);
  var typedArray = new Uint8Array(arrayBuffer);

  for (var i = 0; i < base64.length; i++) {
    typedArray[i] = base64.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: type });
}

// https://qiita.com/mo49/items/a3d61d97f1883ead333b
function drawCanvas(imgDataURL, orientation) {
  var img = new Image();
  img.src = imgDataURL;

  return new Promise(function (resolve) {
    img.onload = function () {
      switch (orientation) {
        case 3:
          //画像が１８０度回転している時
          canvas.width = img.width;
          canvas.height = img.height;
          ctx.rotate(Math.PI);
          ctx.drawImage(img, -img.width, -img.height);
          ctx.rotate(-Math.PI);
          break;
        case 6:
          //画像が時計回りに９０度回っている時
          canvas.width = img.height;
          canvas.height = img.width;
          ctx.rotate(Math.PI * 0.5);
          ctx.drawImage(img, 0, -img.height);
          ctx.rotate(-Math.PI * 0.5);
          break;
        case 8:
          //画像が反時計回りに９０度回っている時
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
    };
  });
}

function post() {
  request.open("POST", "/");
  request.send();
}

},{}]},{},[1]);
