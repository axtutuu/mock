(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (win, doc) {
  var input = doc.querySelector('.js-image-input');
  var preview = doc.querySelector('.js-preview');

  var canvas = document.getElementById('canvas');
  var canvasCxt = canvas.getContext('2d');

  var x = void 0,
      y = void 0;
  Promise.resolve().then(baseImage).then(imageReader).then(faceTracker).then(function () {
    console.log('next');
  });

  function baseTracker() {
    return new Promise(function (resolve) {
      var tracker = new tracking.ObjectTracker(['face']);
      tracking.track('#canvas', tracker);
      tracker.on('track', function (e) {
        var rect = e.data[0];
        console.log('-------------------base track----------------');
        console.log(rect);
        resolve();
      });
    });
  }

  function baseImage() {
    var img = new Image();
    return new Promise(function (resolve) {
      img.src = "/images/2017/02/sample.jpg";
      img.onload = function () {
        console.log(img);
        console.log(img.width);
        canvasCxt.drawImage(img, 0, 0, img.width, img.height);

        var tracker = new tracking.ObjectTracker(['face']);
        tracking.track(img, tracker);
        tracker.on('track', function (e) {
          var rect = e.data[0];
          console.log('-------------------base track----------------');
          console.log(rect);
          x = rect.x;y = rect.y;
          resolve();
        });
      };
    });
  }

  function imageReader() {
    return new Promise(function (resolve) {
      input.addEventListener('change', function (e) {
        console.log(e);
        console.log(e.target.files);
        preview.file = e.target.files[0];
        var reader = new FileReader();
        reader.onload = function (res) {
          console.log(res);
          preview.src = res.target.result;
          resolve();
        };
        reader.readAsDataURL(e.target.files[0]);
      });
    });
  }

  function faceTracker() {
    return new Promise(function (resolve) {
      var tracker = new tracking.ObjectTracker(['face']);
      tracking.track('.js-preview', tracker);
      tracker.on('track', function (e) {
        var rect = e.data[0];
        console.log(rect);

        var face = document.createElement('canvas');
        // const faceCxt = canvas.getContext('2d');
        var faceCxt = face.getContext('2d');

        faceCxt.beginPath();
        faceCxt.fillStyle = 'rgb(192, 80, 77)'; // 赤
        faceCxt.arc(65, 65, 45, 0, Math.PI * 2, false);
        faceCxt.fill();

        var img = new Image();
        img.src = preview.src;
        img.onload = function () {

          face.width = face.height = 119;
          faceCxt.drawImage(img, 86, 99, 119, 119, 0, 0, 119, 119);

          // faceCxt.drawImage(img, 86, 99, 119, 119, 20, 20, 90, 90);
          var newImage = faceCxt.getImageData(0, 0, 90, 90);
          canvasCxt.putImageData(newImage, 300, 300);
          resolve();
        };
      });
    });
  }
})(window, document);

},{}]},{},[1]);
