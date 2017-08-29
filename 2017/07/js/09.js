(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  var canvas = document.querySelector('.day-09');
  var context = canvas.getContext('2d');

  var x = 150,
      y = 100,
      r = 50;
  var c1 = line(r, -90);
  var c2 = line(r, -234);
  var c3 = line(r, -18);
  var c4 = line(r, -162);
  var c5 = line(r, -306);

  context.fillStyle = 'red';
  context.moveTo(x, y - r);

  context.beginPath();
  context.lineTo(c1.x + x, c1.y + y);
  context.lineTo(c2.x + x, c2.y + y);
  context.lineTo(c3.x + x, c3.y + y);
  context.lineTo(c4.x + x, c4.y + y);
  context.lineTo(c5.x + x, c5.y + y);
  context.closePath();
  context.fill();
  console.log('end');

  function line(r, angle) {
    return {
      x: r * Math.cos(angle / 180 * Math.PI),
      y: r * Math.sin(angle / 180 * Math.PI)
    };
  }
})();

},{}]},{},[1]);
