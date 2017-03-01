(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (doc, win) {
  console.log('exif');
  var file = doc.querySelector('.js-file');
  file.onchange = function () {
    var image = file.files[0];
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      var img = new Image();
      img.src = reader.result;

      img.onload = function () {
        var canvas = doc.createElement('canvas');
        canvas.width = canvas.height = 500;
        var canvas2d = canvas.getContext('2d');
        canvas2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        doc.body.appendChild(canvas);
      };
    };
  };

  / * exif */;
  var exifFile = doc.querySelector('.js-exif-file');
  console.log(exifFile);
  exifFile.onchange = function (e) {
    loadImage(e.target.files[0], function (img) {
      var canvas = doc.createElement('canvas');
      var canvas2d = canvas.getContext('2d');
      canvas.width = canvas.height = 500;
      canvas2d.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
      doc.body.appendChild(canvas);
    }, { orientation: true });
  };
})(document, window);

},{}]},{},[1]);
