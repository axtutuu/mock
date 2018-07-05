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
exports.Types = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _BlockFactory = require('./BlockFactory');

var _BlockFactory2 = _interopRequireDefault(_BlockFactory);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Represents a tetromino
 */
var Tetromino = function () {
  function Tetromino(type, container) {
    _classCallCheck(this, Tetromino);

    // Set the container
    this._container = container;

    // Type of the tetromino (I, J, L, O, S, T, Z)
    this.type = type;

    // Position of the tetromino
    this.x = Math.floor(_Constants2.default.WIDTH / 2 - this.type.size / 2);
    this.y = 0;

    // Angle of the tetromino (0: 0deg, 1: 90deg, 2: 180deg, 3: 270deg)
    this.angle = 0;

    // Pixi's blocks
    this._blocks = [];
  }

  /**
   * Static method to get a random tetromino
   */


  _createClass(Tetromino, [{
    key: 'draw',


    /**
     * Add shapes to container
     */
    value: function draw() {
      var i = 0;
      for (var x = 0; x < this.type.size; x++) {
        for (var y = 0; y < this.type.size; y++) {
          if (this.type.shapes[this.angle][y][x] === 1) {
            if (this._blocks.length !== 4) {
              var block = _BlockFactory2.default.createBlock(0, 0, _Constants2.default.SQUARE_SIZE, _Constants2.default.SQUARE_SIZE, this.type.color, _Constants2.default.COLORS.TETROMINO_BORDERS, 0.5);
              this._blocks.push(block);
              this._container.addChild(block);
            }
            this._blocks[i].x = (this.x + x) * _Constants2.default.SQUARE_SIZE;
            this._blocks[i].y = (this.y + y) * _Constants2.default.SQUARE_SIZE;
            i++;
          }
        }
      }
    }

    /**
     * Remove shapes from container
     */

  }, {
    key: 'remove',
    value: function remove() {
      for (var i = 0; i < this._blocks.length; i++) {
        this._container.removeChild(this._blocks[i]);
        delete this._blocks[i];
      }
    }

    /**
     * Rotate the tetromino to the right
     */

  }, {
    key: 'rotate',
    value: function rotate() {
      this.angle += 1;
      this.angle %= 4;
    }

    /**
     * Rotate the tetromino to the left
     */

  }, {
    key: 'antiRotate',
    value: function antiRotate() {
      this.angle -= 1;
      if (this.angle === -1) {
        this.angle = 3;
      }
    }

    /**
     * Move the tetromino
     */

  }, {
    key: 'move',
    value: function move(dx, dy) {
      this.x += dx;
      this.y += dy;
    }

    /**
     * Test if the tetromino has a block in the positino (x, y)
     * x and y being relative the the position of the tetromino
     */

  }, {
    key: 'hasBlock',
    value: function hasBlock(x, y) {
      return this.type.shapes[this.angle][y][x] === 1;
    }
  }], [{
    key: 'getRandom',
    value: function getRandom(container) {
      var types = [Types.I, Types.J, Types.L, Types.O, Types.S, Types.T, Types.Z];
      var type = types[Math.floor(Math.random() * 7)];
      return new Tetromino(type, container);
    }
  }]);

  return Tetromino;
}();

/**
 * Types of tetrominos
 */


exports.default = Tetromino;
var Types = exports.Types = {
  I: {
    name: 'I', // Name of the tetromino
    color: _Constants2.default.COLORS.TETROMINO_I, // Background color
    size: 4, // Size of the 'container' of the tetromino
    shapes: [// All shapes of the tetromino (one per rotation position)
    [[0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0], [0, 0, 1, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [1, 1, 1, 1], [0, 0, 0, 0]], [[0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]]]
  },
  J: {
    name: 'J',
    color: _Constants2.default.COLORS.TETROMINO_J,
    size: 3,
    shapes: [[[1, 0, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 1], [0, 1, 0], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 0, 1]], [[0, 1, 0], [0, 1, 0], [1, 1, 0]]]
  },
  L: {
    name: 'L',
    color: _Constants2.default.COLORS.TETROMINO_L,
    size: 3,
    shapes: [[[0, 0, 1], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 0], [0, 1, 1]], [[0, 0, 0], [1, 1, 1], [1, 0, 0]], [[1, 1, 0], [0, 1, 0], [0, 1, 0]]]
  },
  O: {
    name: 'O',
    color: _Constants2.default.COLORS.TETROMINO_O,
    size: 2,
    shapes: [[[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]], [[1, 1], [1, 1]]]
  },
  S: {
    name: 'S',
    color: _Constants2.default.COLORS.TETROMINO_S,
    size: 3,
    shapes: [[[0, 1, 1], [1, 1, 0], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 0, 1]], [[0, 0, 0], [0, 1, 1], [1, 1, 0]], [[1, 0, 0], [1, 1, 0], [0, 1, 0]]]
  },
  T: {
    name: 'T',
    color: _Constants2.default.COLORS.TETROMINO_T,
    size: 3,
    shapes: [[[0, 1, 0], [1, 1, 1], [0, 0, 0]], [[0, 1, 0], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 1], [0, 1, 0]], [[0, 1, 0], [1, 1, 0], [0, 1, 0]]]
  },
  Z: {
    name: 'Z',
    color: _Constants2.default.COLORS.TETROMINO_Z,
    size: 3,
    shapes: [[[1, 1, 0], [0, 1, 1], [0, 0, 0]], [[0, 0, 1], [0, 1, 1], [0, 1, 0]], [[0, 0, 0], [1, 1, 0], [0, 1, 1]], [[0, 1, 0], [1, 1, 0], [1, 0, 0]]]
  }
};

},{"./BlockFactory":1,"./Constants":2}]},{},[3]);
