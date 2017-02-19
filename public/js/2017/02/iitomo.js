(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (win, doc) {
  var input = doc.querySelector('.js-image-input');
  var preview = doc.querySelector('.js-preview');

  Promise.resolve().then(imageReader).then(faceTracker).then(function () {
    console.log('next');
  });

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

        var canvas = document.getElementById('canvas');
        var canvasCxt = canvas.getContext('2d');

        canvasCxt.beginPath();
        canvasCxt.arc(65, 65, 45, 0, Math.PI * 2, false);
        canvasCxt.clip();

        var img = new Image();
        img.src = preview.src;
        img.onload = function () {
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

},{}]},{},[1]);
