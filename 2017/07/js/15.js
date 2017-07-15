(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {
  var Particle = function Particle(x, y) {
    _classCallCheck(this, Particle);

    this.x = x;
    this.y = y;

    this.vx = 0;
    this.vy = 0;
    this.next = null;
  };

  var particle = 3000,
      fps = Math.floor(1000 / 60);

  var canvas = document.querySelector('.day-15'),
      cxt = canvas.getContext('2d');

  var first = void 0,
      old = void 0;
  // パーティクル初期化
  for (var i = 0; i < particle; i++) {
    var p = new Particle(Math.random() * 600, Math.random() * 450);

    if (first == null) {
      first = old = p;
    } else {
      old.next = p;
      old = p;
    }
  }

  setInterval(onTick, fps);

  function onTick() {
    cxt.fillStyle = "rgb(0, 0, 0)";
    cxt.fillRect(0, 0, 600, 450);

    // パーティクルの塗り
    cxt.fillStyle = 'rgb(200, 200, 255)';
    var n = first;

    do {
      var x = n.x,
          y = n.y,
          acc = 50 / (x * x + y * y),
          accX = acc * x,
          accY = acc * y;

      n.vx += accX;
      n.vy += accY;
      n.x += n.vx;
      n.y += n.vy;

      n.vx *= 0.96;
      n.vy *= 0.96;

      if (n.x > 465) n.x = 0;else if (n.x < 0) n.x = 465;
      if (n.y > 465) n.y = 0;else if (n.y < 0) n.y = 465;

      cxt.fillRect(n.x, n.y, 1, 1);
    } while (n = n.next);
  }
})();

},{}]},{},[1]);
