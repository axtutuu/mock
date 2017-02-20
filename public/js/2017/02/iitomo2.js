(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (win, doc) {
  var input = doc.querySelector('.js-image-input');
  var preview = doc.querySelector('.js-preview');
  var synthesis = doc.querySelector('.preview');

  input.addEventListener('change', function (e) {
    var reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function (res) {
      preview.src = res.target.result;

      // 顔
      var tracker = new tracking.ObjectTracker(['face']);
      tracking.track('.js-preview', tracker);
      tracker.on('track', function (e) {
        var face = document.createElement('canvas');
        var faceCxt = face.getContext('2d');
        faceCxt.beginPath();
        faceCxt.fillStyle = 'rgb(192, 80, 77)'; // 赤
        faceCxt.arc(65, 65, 45, 0, Math.PI * 2, false);
        faceCxt.clip();
        var img = new Image();
        img.src = preview.src;
        img.onload = function () {
          faceCxt.drawImage(img, 86, 99, 119, 119, 20, 20, 90, 90);
          synthesis.appendChild(face);
        };
      });
    };
  });
})(window, document);

},{}]},{},[1]);
