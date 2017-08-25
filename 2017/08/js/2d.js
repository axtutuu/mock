(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Vec = function () {
  function Vec(x, y) {
    _classCallCheck(this, Vec);

    this.x = x;
    this.y = y;
  }

  _createClass(Vec, [{
    key: "add",
    value: function add(v) {
      return new Vec(this.x + v.x, this.y + v.y);
    }
  }, {
    key: "mul",
    value: function mul(x, y) {
      // 掛算
      return new Vec(this.x * x, this.y * y);
    }
  }, {
    key: "dot",
    value: function dot(v) {
      // 内積
      return this.x * v.x + this.y * v.y;
    }
  }, {
    key: "cross",
    value: function cross(v) {
      // 外積
      return this.x * v.y - v.x * this.y;
    }
  }, {
    key: "move",
    value: function move(dx, dy) {
      // 自分を移動
      this.x += dx;
      this.y += dy;
    }
  }]);

  return Vec;
}();

// 短形オブジェクト


exports.default = Vec;
function RectangleEntity(x, y, width, height) {
  this.shape = ShapeRectangle;
  this.type = BodyStatic;
  this.x = x;
  this.y = y;
  this.w = width;
  this.h = height;
  this.deceleration = 1.0;
  this.isHit = function (i, j) {
    return this.x <= i && i <= this.x + this.w && this.y <= j && j <= this.y + this.h;
  };
}

// 線オブジェクト
function LineEntity(x0, y0, x1, y1, restitution) {
  this.shape = ShapeLine;
  this.type = BodyStatic;
  this.x = (x0 + x1) / 2;
  this.y = (y0 + y1) / 2;
  this.x0 = x0;
  this.y0 = y0;
  this.x1 = x1;
  this.y1 = y1;

  this.restitution = restitution || 0.9;
  this.vec = new Vec(x1 - x0, y1 - y0);
  var length = Math.sqrt(Math.pow(this.vec.x, 2) + Math.pow(this.vec.y, 2));
  this.norm = new Vec(y0 - y1, x1 - x0).mul(1 / length);
}

// 円オブジェクト
function CircleEntity(x, y, radius, type, restitution, deceleration) {
  this.shape = ShapeCircle;
  this.type = type || BodyDynamic;
  this.x = x;
  this.y = y;
  this.radius = radius;
  this.restitution = restitution || 0.9;
  this.deceleration = deceleration || 1.0;
  this.accel = new Vec(0, 0);
  this.velocity = new Vec(0, 0);

  this.move = function (dx, dy) {
    this.x += dx;
    this.y += dy;
  };

  this.isHit = function (x, y) {};
}

},{}]},{},[1]);
