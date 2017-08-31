(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');
var degree = 0;

canvas.width = canvas.height = 600;

function paint() {
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);

  ctx.save();
  ctx.translate(100, 100);

  drawLine(0, -100, 0, 500, 'black');
  drawLine(-100, 0, 500, 0, 'black');

  var ss = Math.sin(degree * Math.PI / 180),
      cc = Math.cos(degree * Math.PI / 180),
      c = cc * 50,
      s = ss * -50;
  drawLine(0, 0, c, s, 'red');
  ctx.arc(0, 0, 50, 0, Math.PI * 2);
  ctx.stroke();

  /*
   * sinカーブ
   */
  ctx.strokeStyle = 'green';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for (var i = 0; i < 200; i++) {
    var _s = Math.sin((degree + i) * Math.PI / 180) * -50;
    ctx.lineTo(i, _s);
  }
  ctx.stroke();

  /*
   * cosカーブ
   */
  ctx.strokeStyle = 'blue';
  ctx.beginPath();
  ctx.moveTo(c, s);
  for (var _i = 0; _i < 500; _i++) {
    var _c = Math.cos((degree + _i) * Math.PI / 180) * 50;
    ctx.lineTo(_c, _i);
  }
  ctx.stroke();
  ctx.restore();
}

function drawLine(x, y, xx, yy, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y);
  ctx.lineTo(xx, yy);
  ctx.closePath();
  ctx.stroke();
}

(function tick() {
  degree++;
  paint();
  requestAnimationFrame(tick);
})();

},{}]},{},[1]);
