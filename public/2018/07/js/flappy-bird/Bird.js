(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

var Bird = function () {
  function Bird(stage, tubeList, onCollision) {
    var _this = this;

    _classCallCheck(this, Bird);

    this.speedY = 0;
    this.sprite = new PIXI.Sprite();
    this.isDied = false;
    this.textureCounter = 0;
    this.tubeList = tubeList;
    this.onCollision = onCollision;
    this.updateTexture = function () {
      if (_this.isDied) return;
      _this.sprite.texture = PIXI.loader.resources[BIRD_FRAME_LIST[_this.textureCounter++]].texture;

      if (_this.textureCounter === BIRD_FRAME_LIST.length) _this.textureCounter = 0;
    };

    stage.addChild(this.sprite);
    this.sprite.anchor.set(0.5, 0.5);
    this.updateTexture();
    this.sprite.scale.x = 0.06;
    this.sprite.scale.y = 0.06;
    this.reset();

    document.addEventListener('keydown', function (e) {
      if (e.keyCode == 32) _this.addSpeed(-GRAVITY / 3);
    });
    stage.on('pointerdown', function () {
      return _this.addSpeed(-GRAVITY / 3);
    });

    setInterval(this.updateTexture, 200);
  }

  _createClass(Bird, [{
    key: 'updateSprite',
    value: function updateSprite() {
      this.speedY += GRAVITY / 70;
      this.sprite.y += this.speedY;
      this.sprite.rotation = Math.atan(this.speedY / GAME_SPEED_X);

      var isCollide = false;
      var _sprite = this.sprite,
          x = _sprite.x,
          y = _sprite.y,
          width = _sprite.width,
          height = _sprite.height;

      this.tubeList.forEach(function (d) {
        if (d.checkCollision(x - width / 2, y - height / 2, width, height)) isCollide = true;
      });
      if (y < -height / 2 || y > canvasWidthHeight + height / 2) isCollide = true;

      if (isCollide) {
        this.onCollision();
        this.isDied = true;
      }
    }
  }, {
    key: 'addSpeed',
    value: function addSpeed(speedInc) {
      this.speedY += speedInc;
      this.speedY = Math.max(-GRAVITY, this.speedY);
    }
  }, {
    key: 'reset',
    value: function reset() {
      this.sprite.x = canvasWidthHeight / 6;
      this.sprite.y = canvasWidthHeight / 2.5;
      this.speedY = 0;
      this.isDied = false;
    }
  }]);

  return Bird;
}();

exports.default = Bird;

},{"./Constants":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512);
exports.default = {
  GRAVITY: 9.8,
  GAME_SPEED_X: 100,
  canvasWidthHeight: canvasWidthHeight,
  BIRD_FRAME_LIST: ['./images/frame-1.png', './images/frame-2.png', './images/frame-3.png', './images/frame-4.png'],
  TUBE_POS_LIST: [canvasWidthHeight + 150, canvasWidthHeight + 250, canvasWidthHeight + 480]
};

},{}]},{},[1]);
