(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

console.log('mario');
var canvas = document.querySelector('canvas');
var cxt = canvas.getContext('2d');

// animate()
var lastAnimationFrameTime = 0;
var enter = false;
var space = false;
var left = false;
var right = false;
var up = false;
var down = false;
var a = false;

cxt.fillStyle = "rgb(255, 0, 0)";
cxt.fillRect(0, 0, 640, 480);

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function keyDown(e) {
  var code = e.keyCode;

  switch (code) {
    case 13:
      enter = true;
      break;
    case 32:
      space = true;
      break;
    case 37:
      left = true;
      break;
    case 39:
      right = true;
      break;
    case 38:
      up = true;
      break;
    case 40:
      down = true;
      break;
    case 65:
      a = true;
  }
}

function keyUp(e) {
  var code = e.keyCode;

  switch (code) {
    case 13:
      enter = false;
      break;
    case 32:
      space = false;
      break;
    case 37:
      left = false;
      break;
    case 39:
      right = false;
      break;
    case 38:
      up = false;
      break;
    case 40:
      down = false;
      break;
    case 65:
      a = false;
  }
}

var Mario = function () {
  function Mario(x, y) {
    _classCallCheck(this, Mario);

    this.x = x;
    this.y = y;
    this.addX = 2;
    this.dir = 'right';
  }

  _createClass(Mario, [{
    key: 'draw',
    value: function draw(img) {
      if (this.dir == 'left') {
        cxt.save();
        ctx.transform(-1, 0, 0, 1, 0, 0);
        ctx.drawImage(img, this.animeX, 0, 32, 32, -this.x - 32, this.y, 32, 32);
        this.restore();
      } else {
        ctx.drawImage(img, this.animeX, 0, 32, 32, this.x, this.y, 32, 32);
      }
    }
  }]);

  return Mario;
}();

var mario = new Mario();

},{}]},{},[1]);
