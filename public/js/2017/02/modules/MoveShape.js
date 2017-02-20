(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var CalcChart = {
  corner: {
    A: -135,
    B: -45,
    C: 45,
    D: 135
  },
  pointY: function pointY(distance, radian) {
    return distance * Math.sin(radian);
  },
  pointX: function pointX(distance, radian) {
    return distance * Math.cos(radian);
  },
  // 対角線 √(AD^2 + AB ^2 )
  diagonalLine: function diagonalLine(width, height) {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  },
  toRadian: function toRadian(degree) {
    return degree * Math.PI / 180;
  },
  toDegree: function toDegree(radian) {
    return radian * 180 / Math.PI;
  },
  truncatePoint: function truncatePoint(n) {
    return Math.floor(n * 10) / 10;
  },
  rotating: function rotating(x, y) {
    return Math.atan2(y, x); // 対象点とmouseの角度 (radian)
  }
};

module.exports = CalcChart;

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CalcChart = require('./CalcChart.js');

var _CalcChart2 = _interopRequireDefault(_CalcChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoveShape = function () {
  function MoveShape(drawer) {
    _classCallCheck(this, MoveShape);

    this.drawer = drawer;
    this.imageUrl = '/images/2017/02/DirectionsFilled-100.png';
    var queue = new createjs.LoadQueue(false);
    queue.addEventListener('fileload', this.init.bind(this));
    queue.loadFile(this.imageUrl);
  }

  _createClass(MoveShape, [{
    key: 'active',
    value: function active(e) {
      console.log(e);
      this.diagonalLine = _CalcChart2.default.diagonalLine(this.drawer.testShape_width, this.drawer.testShape_height);
      this.bounds = this.bitmap.getBounds();
      this.position();
      this.drawer.stage.addChild(this.bitmap);
      this.drawer.stage.update();
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.drawer.stage.removeChild(this.bitmap);
      this.drawer.stage.update();
    }
  }, {
    key: 'position',
    value: function position() {
      var rad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var r = _CalcChart2.default.toRadian(_CalcChart2.default.toDegree(rad) - 45);

      this.bitmap.x = _CalcChart2.default.pointX(this.diagonalLine / 2, r) + this.drawer.testShape.x - this.bounds.width / 2;

      this.bitmap.y = _CalcChart2.default.pointY(this.diagonalLine / 2, r) + this.drawer.testShape.y - this.bounds.width / 2;
    }
  }, {
    key: 'init',
    value: function init(e) {
      this.bitmap = new createjs.Bitmap(e.result);
      this.bitmap.cursor = 'pointer';
      this.bitmap.addEventListener('mousedown', this.start.bind(this));
    }
  }, {
    key: 'start',
    value: function start(e) {
      var instance = e.target;
      this.offsetX = instance.x - e.stageX;
      this.offsetY = instance.y - e.stageY;

      instance.addEventListener('pressmove', this.move.bind(this));
      instance.addEventListener('pressup', this.end.bind(this));
    }
  }, {
    key: 'move',
    value: function move(e) {
      var instance = e.target;
    }
  }]);

  return MoveShape;
}();

exports.default = MoveShape;

},{"./CalcChart.js":1}]},{},[2]);
