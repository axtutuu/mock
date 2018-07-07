(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512);
var width = 275;
var height = 512;

exports.default = {
  GRAVITY: 9.8,
  GAME_SPEED_X: 150,
  canvasWidthHeight: canvasWidthHeight,
  BIRD_FRAME_LIST: ['./images/frame-1.png', './images/frame-2.png', './images/frame-3.png', './images/frame-4.png'],
  TUBE_POS_LIST: [canvasWidthHeight + 150, canvasWidthHeight + 250, canvasWidthHeight + 480],
  SPRITE: ['./images/GLnwC.png']
};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvasWidthHeight = _Constants2.default.canvasWidthHeight,
    GRAVITY = _Constants2.default.GRAVITY,
    GAME_SPEED_X = _Constants2.default.GAME_SPEED_X,
    BIRD_FRAME_LIST = _Constants2.default.BIRD_FRAME_LIST,
    TUBE_POS_LIST = _Constants2.default.TUBE_POS_LIST;

var Tube = function () {
  function Tube(stage, x) {
    _classCallCheck(this, Tube);

    this.sprite = new PIXI.Graphics();
    this.innerDistance = 180;
    this.tubeWidth = 30;

    stage.addChild(this.sprite);
    this.reset(x);
  }

  _createClass(Tube, [{
    key: 'reset',
    value: function reset() {
      var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : canvasWidthHeight + 20;

      this.x = x;

      var tubeMinHeight = 60;
      var randomNum = Math.random() * (canvasWidthHeight - 2 * tubeMinHeight - this.innerDistance);
      this.y = tubeMinHeight + randomNum;
    }
  }, {
    key: 'checkCollision',
    value: function checkCollision(x, y, width, height) {
      if (!(x + width < this.x || this.x + this.tubeWidth < x || this.y < y)) {
        return true;
      }
      if (!(x + width < this.x || this.x + this.tubeWidth < x || y + height < this.y + this.innerDistance)) {
        return true;
      }
      return false;
    }
  }, {
    key: 'update',
    value: function update() {
      this.x -= GAME_SPEED_X / 60;
      if (this.x < -this.tubeWidth) this.reset();

      this.sprite.clear();
      this.sprite.beginFill(0x04B404, 1);
      var x = this.x,
          y = this.y,
          tubeWidth = this.tubeWidth,
          innerDistance = this.innerDistance;

      this.sprite.drawRect(x, 0, tubeWidth, y);
      this.sprite.drawRect(x, y + innerDistance, tubeWidth, canvasWidthHeight);
      this.sprite.endFill();
    }
  }]);

  return Tube;
}();

exports.default = Tube;

},{"./Constants":1}]},{},[2]);
