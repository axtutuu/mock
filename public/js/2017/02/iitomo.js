(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

window.onload = function () {
  var img = document.getElementById('img');
  var tracker = new tracking.ObjectTracker(['face']);
  tracking.track('#img', tracker);
  tracker.on('track', function (event) {
    event.data.forEach(function (rect) {
      var canvas = document.getElementById('canvas');
      var canvasCxt = canvas.getContext('2d');
      canvasCxt.beginPath();
      canvasCxt.arc(65, 65, 45, 0, Math.PI * 2, false);
      canvasCxt.clip();

      var img4 = new Image();
      img4.onload = function () {
        canvasCxt.drawImage(img4, 98, 187, 90, 90, 20, 20, 90, 90);
      };
      img4.src = img.src;

      console.log(rect);
    });
  });
};

},{}]},{},[1]);
