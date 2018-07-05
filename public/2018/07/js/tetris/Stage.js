(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BlockFactory = function () {
  function BlockFactory() {
    _classCallCheck(this, BlockFactory);
  }

  _createClass(BlockFactory, null, [{
    key: 'createBlock',
    value: function createBlock(x, y, width, height, backgroundColor, borderColor, borderWidth) {
      var block = new PIXI.Container();
      var border = new PIXI.Sprite(getTexture(borderColor));
      border.width = width;
      border.height = height;
      block.addChild(border);
      var background = new PIXI.Sprite(getTexture(backgroundColor));
      background.width = width - 2 * borderWidth;
      background.height = height - 2 * borderWidth;
      background.position.x = borderWidth;
      background.position.y = borderWidth;
      block.addChild(background);
      block.position.x = x;
      block.position.y = y;
      return block;
    }
  }]);

  return BlockFactory;
}();

exports.default = BlockFactory;


function getTexture(color) {
  if (colorTextures[color] === undefined) {
    var canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    var ctx = canvas.getContext('2d');
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.rect(0, 0, 1, 1);
    ctx.fill();
    ctx.closePath();
    colorTextures[color] = PIXI.Texture.fromCanvas(canvas);
  }
  return colorTextures[color];
};

var colorTextures = {};

},{}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
 * Game constants
 */
exports.default = {
  WIDTH: 12, // Width of the game (in number of blocks)
  HEIGHT: 24, // Height of the game (in number of blocks)
  SQUARE_SIZE: 25, // Width and height of a block (in px)
  COLORS: {
    TETROMINO_BORDERS: '#373c40',
    TETROMINO_I: '#ff8000',
    TETROMINO_J: '#2cc990',
    TETROMINO_L: '#f34344',
    TETROMINO_O: '#ffdf00',
    TETROMINO_S: '#ccdce4',
    TETROMINO_T: '#008aff',
    TETROMINO_Z: '#fcb941',
    BACKGROUND: '#2d3236',
    BORDERS: '#373C40'
  },
  DOM: {
    CONTAINER: '#canvas-container',
    NEXT: '#next-tetromino',
    START_PAUSE: '#start-pause button',
    LEVEL: '#level',
    SCORE: '#score',
    CLEARED: '#cleared',
    BEST: '#best-score',
    OVERLAY: '#overlay'
  }
};

},{}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _BlockFactory = require('./BlockFactory');

var _BlockFactory2 = _interopRequireDefault(_BlockFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represent the game stage
 */
var Stage = function () {
  function Stage(container) {
    _classCallCheck(this, Stage);

    // Set the container
    this._container = container;

    // _data represents the state of every block of the stage
    // 0 for "empty", hexa code color if not
    // We initialize it with zeros
    this._data = [];
    for (var x = 0; x < _Constants2.default.WIDTH; x++) {
      this._data.push([]);
      for (var y = 0; y < _Constants2.default.HEIGHT; y++) {
        this._data[x].push(0);
      }
    }

    // Pixi's blocks
    this._blocks = [];
  }

  /**
   * Add shapes to the _container
   */


  _createClass(Stage, [{
    key: 'draw',
    value: function draw() {
      var i = 0;
      for (var x = 0; x < _Constants2.default.WIDTH; x++) {
        for (var y = 0; y < _Constants2.default.HEIGHT; y++) {
          // Color blocks when not empty
          if (this._data[x][y] !== 0) {
            var block = _BlockFactory2.default.createBlock(x * _Constants2.default.SQUARE_SIZE, y * _Constants2.default.SQUARE_SIZE, _Constants2.default.SQUARE_SIZE, _Constants2.default.SQUARE_SIZE, this._data[x][y], _Constants2.default.COLORS.TETROMINO_BORDERS, 0.5);

            this._container.removeChild(this._blocks[i]);
            delete this._blocks[i];
            this._container.addChild(block);
            this._blocks[i] = block;
          } else if (this._blocks[i] === undefined) {
            // Just a grid if empty
            var block = _BlockFactory2.default.createBlock(x * _Constants2.default.SQUARE_SIZE, y * _Constants2.default.SQUARE_SIZE, _Constants2.default.SQUARE_SIZE, _Constants2.default.SQUARE_SIZE, _Constants2.default.COLORS.BACKGROUND, _Constants2.default.COLORS.BORDERS, 0.5);
            this._container.addChild(block);
            this._blocks[i] = block;
          }
          i++;
        }
      }
    }

    /**
     * Check if 'tetromino' is in collision with the stage
     */

  }, {
    key: 'isCollision',
    value: function isCollision(tetromino) {
      for (var x = 0; x < tetromino.type.size; x++) {
        for (var y = 0; y < tetromino.type.size; y++) {
          if (tetromino.x + x < 0 || tetromino.x + x >= _Constants2.default.WIDTH || y >= _Constants2.default.HEIGHT || tetromino.y >= 0 && this._data[tetromino.x + x][tetromino.y + y] !== 0) {
            if (tetromino.hasBlock(x, y)) {
              return true;
            }
          }
        }
      }
      return false;
    }

    /**
     * Fusion 'tetromino' with the stage
     * If the fusion create a line, we clear the line
     * Return the number of cleared lines
     */

  }, {
    key: 'unite',
    value: function unite(tetromino) {
      var clearedLines = 0;

      // Fusion the tetromino with the stage
      for (var y = 0; y < tetromino.type.size; y++) {
        for (var x = 0; x < tetromino.type.size; x++) {
          if (tetromino.x + x < _Constants2.default.WIDTH && tetromino.x + x >= 0 && tetromino.hasBlock(x, y)) {
            this._data[tetromino.x + x][tetromino.y + y] = tetromino.type.color;
          }
        }
      }

      for (var _y = 0; _y < tetromino.type.size; _y++) {
        // Check if the fusion created a new line
        var eraseLine = true;
        if (_y + tetromino.y >= _Constants2.default.HEIGHT) {
          eraseLine = false;
        } else {
          for (var _x = 0; _x < _Constants2.default.WIDTH; _x++) {
            if (this._data[_x][_y + tetromino.y] === 0) {
              eraseLine = false;
              break;
            }
          }
        }
        // If yes, we erase it and move all concerned blocks
        if (eraseLine) {
          clearedLines++;
          for (var yy = _y + tetromino.y; yy >= 0; yy--) {
            for (var _x2 = 0; _x2 < _Constants2.default.WIDTH; _x2++) {
              if (yy > 0) {
                this._data[_x2][yy] = this._data[_x2][yy - 1];
              } else {
                this._data[_x2][yy] = 0;
              }
            }
          }
          // empty the blocks (we will need to redraw)
          this._blocks = [];
        }
      }

      return clearedLines;
    }

    /**
     * Reset the stage
     */

  }, {
    key: 'reset',
    value: function reset() {
      this._data = [];
      for (var x = 0; x < _Constants2.default.WIDTH; x++) {
        this._data.push([]);
        for (var y = 0; y < _Constants2.default.HEIGHT; y++) {
          this._data[x].push(0);
        }
      }
      this._blocks = [];
    }
  }]);

  return Stage;
}();

exports.default = Stage;

},{"./BlockFactory":1,"./Constants":2}]},{},[3]);
