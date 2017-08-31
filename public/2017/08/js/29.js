(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
var degree = 0;

canvas.width = canvas.height = 800;
ctx.fillStyle = 'yellow';
ctx.fillRect(0, 0, 800, 800);

var Line = function () {
  function Line() {
    _classCallCheck(this, Line);

    this.x = 0;
    this.y = 50;

    this.toX = 0;
    this.toY = 150;

    this.theta = 50;
    this.radius = Math.random() * 15;
    ctx.strokeStyle = 'red';
  }

  _createClass(Line, [{
    key: 'draw',
    value: function draw() {
      ctx.beginPath();

      ctx.moveTo(Math.sin(), this.y);
      for (var i = 0; i < this.toX; i++) {
        var s = Math.sin((degree + i) * Math.PI / 180) * -50;
        ctx.lineTo(i, this.toY + s);
      }
      ctx.stroke();
    }
  }]);

  return Line;
}();

var line = new Line();

function tick() {
  ctx.fillStyle = 'yellow';
  ctx.fillRect(0, 0, 800, 800);

  degree++;

  line.toX += 1;
  // line.theta += 0.1;
  line.draw();

  if (line.toX > 800) {
    line.toX = 0;
  }
  requestAnimationFrame(tick);
}

tick();

},{}]},{},[1]);
