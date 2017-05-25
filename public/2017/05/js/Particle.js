(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.particle = particle;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function () {
  function Particle(opts) {
    _classCallCheck(this, Particle);

    this.scale = opts.scale;
    this.color = opts.color;
    this.speed = opts.speed;
    this.pos = {
      x: opts.x,
      y: opts.y
    };
    this.ctx = opts.ctx;
  }

  _createClass(Particle, [{
    key: 'draw',
    value: function draw() {
      this.ctx.beginPath();
      this.ctx.arc(this.pos.x, this.pos.y, this.scale, 0, 2 * Math.PI, false);
      this.ctx.fillStyle = this.color;
      this.ctx.fill();
    }
  }]);

  return Particle;
}();

function particle($el) {
  var ctx = $el[0].getContext('2d');

  var density = 100;
  var particles = [];

  for (var i = 0; i < density; i++) {
    particles[i] = new Particle({
      scale: 6,
      color: '#D0A000',
      speed: Math.random() * (4 - 2) + 2,
      ctx: ctx,
      x: Math.random() * $el[0].width,
      y: Math.random() * $el[0].height
    });
    particles[i].draw();
  }

  loop();

  function loop() {
    window.requestAnimationFrame(loop);

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    for (var _i = 0; _i < density; _i++) {
      particles[_i].pos.x += particles[_i].speed;
      console.log(particles[_i]);
      particles[_i].draw();

      // 左端に行った場合
      if (particles[_i].x > $el[0].width) {
        particles[_i].x = -30;
      }
    }
  }
}

},{}]},{},[1]);
