(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 600;

ctx.fillStyle = '#d8d8d8';
ctx.fillRect(0, 0, 600, 600);

var Circle = function () {
  function Circle(ctx) {
    _classCallCheck(this, Circle);

    this.x = 30;
    this.y = 30;
    this.vx = 0;
    this.vy = 0;
    this.angle = 30;
    this.radians = 0;
    this.speed = 3.0;
    this.ctx = ctx;
  }

  _createClass(Circle, [{
    key: 'update',
    value: function update() {

      // if(this.x < 10) {
      //   this.angle = 180-this.angle;
      // }
      // console.log(this.x, this.angle);

      this.redians = this.angle * Math.PI / 180;
      this.vx = Math.cos(this.radians) * this.speed;
      this.vy = Math.sin(this.radians) * this.speed;
    }
  }, {
    key: 'draw',
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.fillStyle = 'green';
      this.ctx.arc(this.x, this.y, 10, 0, Math.PI * 2.0, true);
      this.ctx.fill();
    }
  }]);

  return Circle;
}();

var c = new Circle(ctx);
function tick() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (c.x > 600 - 10) {
    c.angle = 180 - c.angle;
  }
  c.x += c.vx;
  c.y += c.vy;

  c.update();
  c.draw();
  requestAnimationFrame(tick);
}

tick();

},{}]},{},[1]);
