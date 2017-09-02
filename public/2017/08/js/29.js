(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 800;

var Line = function () {
  function Line(x, y) {
    _classCallCheck(this, Line);

    this.x = x;
    this.y = y;

    this.toX = 0;

    this.degree = 0;
    this.speed = 3;

    this.radius = Math.random() * 15;
    ctx.strokeStyle = 'red';
  }

  _createClass(Line, [{
    key: 'draw',
    value: function draw() {
      ctx.beginPath();

      ctx.moveTo(this.x, this.y);
      for (var i = 0; i < this.toX; i++) {
        var s = Math.sin((this.degree + i) * Math.PI / 180) * 50;
        ctx.lineTo(i, this.y + s);
      }
      ctx.stroke();
    }
  }]);

  return Line;
}();

function tick() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, 800, 800);

  lines.forEach(function (v) {
    v.toX += v.speed;
    v.draw();
    if (v.toX > 800) {
      v.toX = 0;
    }
  });

  requestAnimationFrame(tick);
}

/*
 * init
 */
var lines = [];
for (var i = 1; i < 15; i++) {
  lines.push(new Line(0, 50 * i));
}

tick();

},{}]},{},[1]);
