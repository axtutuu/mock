(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512);
var GRAVITY = 9.7;
var GAME_SPEED_X = 100;
var BIRD_FRAME_LIST = ['./images/frame-1.png', './images/frame-2.png', './images/frame-3.png', './images/frame-4.png'];
var TUBE_POS_LIST = [canvasWidthHeight + 50, canvasWidthHeight + 150, canvasWidthHeight + 280];

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

var Tube = function () {
  function Tube(stage, x) {
    _classCallCheck(this, Tube);

    this.sprite = new PIXI.Graphics();
    this.innerDistance = 180;
    this.tubeWidth = 20;

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
      this.sprite.beginFill(0xffffff, 1);
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

var renderer = PIXI.autoDetectRenderer(canvasWidthHeight, canvasWidthHeight, { backgroundColor: 0xc1c2c4 });
document.body.appendChild(renderer.view);
var stage = new PIXI.Container();
stage.interactive = true;
stage.hitArea = new PIXI.Rectangle(0, 0, 1000, 1000);
renderer.render(stage);

var tubeList = TUBE_POS_LIST.map(function (d) {
  return new Tube(stage, d);
});
PIXI.loader.add(BIRD_FRAME_LIST).load(setup);

var bird = void 0;
var button = document.querySelector('#start');
function setup() {
  bird = new Bird(stage, tubeList, function () {
    // Called when bird hit tube/ground/upper bound
    gameFailed = true;
    button.classList.remove('hide');
  });
  requestAnimationFrame(draw);
}

var gameStarted = false;
var gameFailed = false;
function draw() {
  if (gameStarted) {
    bird.updateSprite();
    if (!gameFailed) tubeList.forEach(function (d) {
      return d.update();
    });
  }
  renderer.render(stage);
  requestAnimationFrame(draw);
}

button.addEventListener('click', function () {
  gameStarted = true;
  button.innerHTML = 'Retry';
  if (gameFailed) {
    gameFailed = false;
    tubeList.forEach(function (d, i) {
      return d.reset(TUBE_POS_LIST[i]);
    });
    bird.reset();
  }
  button.classList.add('hide');
});

},{}]},{},[1]);
