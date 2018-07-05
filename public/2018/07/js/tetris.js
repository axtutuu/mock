(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _Game = require('./tetris/Game');

var _Game2 = _interopRequireDefault(_Game);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var g = new _Game2.default();

},{"./tetris/Game":4}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Tetromino = require('./Tetromino');

var _Tetromino2 = _interopRequireDefault(_Tetromino);

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

var _Stage = require('./Stage');

var _Stage2 = _interopRequireDefault(_Stage);

var _ScoreManager = require('./ScoreManager');

var _ScoreManager2 = _interopRequireDefault(_ScoreManager);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game() {
    _classCallCheck(this, Game);

    // DOM container
    this._domContainer = document.querySelector(_Constants2.default.DOM.CONTAINER);

    // Next tetromino DOM container
    this._domNextContainer = document.querySelector(_Constants2.default.DOM.NEXT);

    // Keyboard events
    this._initKeyboardEvents();

    // Mouse events
    this._initMouseEvents();

    // Set up PIXI
    this._renderer = PIXI.autoDetectRenderer(_Constants2.default.WIDTH * _Constants2.default.SQUARE_SIZE, _Constants2.default.HEIGHT * _Constants2.default.SQUARE_SIZE);

    this._domContainer.appendChild(this._renderer.view);

    // Pixi container
    this._container = new PIXI.Container();

    // Game board/stage
    this._stage = new _Stage2.default(this._container);

    // Init tetrominos
    this._tetromino = undefined; // Tetromino on the stage
    this._nextTetromino = undefined; // Next tetromino
    this._newTetromino();

    // Delay between moves
    this._delay = 300;

    // Init timer
    this._timer = new Date().getTime();

    // Score manager
    this._scoreManager = new _ScoreManager2.default();

    // GO!
    this._requestId = undefined; // requestAnimationFrame ID (used to pause game)
    this._paused = false;
    this._start();
  }

  /**
   * Start the game
   */


  _createClass(Game, [{
    key: '_start',
    value: function _start() {
      var _this = this;

      this._stage.draw();
      this._requestId = requestAnimationFrame(function () {
        return _this._loop();
      });
    }

    /**
     * Game loop
     */

  }, {
    key: '_loop',
    value: function _loop() {
      var _this2 = this;

      if (new Date().getTime() - this._timer > this._delay) {
        this._timer = new Date().getTime();
        this._drop();
      }
      this._render();
      this._requestId = requestAnimationFrame(function () {
        return _this2._loop();
      });
    }

    /**
     * Pause the game
     */

  }, {
    key: '_pause',
    value: function _pause() {
      this._paused = !this._paused;
      // Stop or restart loop
      if (this._paused) {
        cancelAnimationFrame(this._requestId);
        document.querySelector(_Constants2.default.DOM.START_PAUSE).innerText = 'resume';
        document.querySelector(_Constants2.default.DOM.START_PAUSE).innerText = 'continue';
        document.querySelector(_Constants2.default.DOM.OVERLAY).className = 'active';
      } else {
        this._start();
        document.querySelector(_Constants2.default.DOM.START_PAUSE).id = 'pause';
        document.querySelector(_Constants2.default.DOM.START_PAUSE).innerText = 'pause';
        document.querySelector(_Constants2.default.DOM.OVERLAY).className = '';
      }
    }

    /**
     * Move the current tetromino downward
     */

  }, {
    key: '_drop',
    value: function _drop() {
      this._tetromino.move(0, 1); // Gravity
      // If collision, cancel  move and unite the tetromino with the game stage
      if (this._stage.isCollision(this._tetromino)) {
        this._tetromino.move(0, -1);
        this._tetromino.remove();
        var clearedLines = this._stage.unite(this._tetromino);
        if (clearedLines > 0) {
          this._scoreManager.addClearedLines(clearedLines);
        }
        this._scoreManager.tetrominoDropped();
        this._stage.draw();
        this._newTetromino();
      }
    }

    /**
     * Move the current tetromino as down as possible
     */

  }, {
    key: '_hardDrop',
    value: function _hardDrop() {
      while (!this._stage.isCollision(this._tetromino)) {
        this._tetromino.move(0, 1);
      }
      this._tetromino.move(0, -1);
      this._tetromino.remove();
      var clearedLines = this._stage.unite(this._tetromino);
      if (clearedLines > 0) {
        this._scoreManager.addClearedLines(clearedLines);
      }
      this._scoreManager.tetrominoDropped();
      this._stage.draw();
      this._newTetromino();
    }

    /**
     * Called when the game is over
     */

  }, {
    key: '_gameOver',
    value: function _gameOver() {
      this._stage.reset();
      this._stage.draw();
      this._scoreManager.reset();
    }

    /**
     * Put a new tetromino on the board
     * And check if the game is lost or not
     */

  }, {
    key: '_newTetromino',
    value: function _newTetromino() {
      if (!this._nextTetromino) {
        this._nextTetromino = _Tetromino2.default.getRandom(this._container);
      }
      this._tetromino = this._nextTetromino;
      this._nextTetromino = _Tetromino2.default.getRandom(this._container);
      this._domNextContainer.className = this._nextTetromino.type.name;
      // Lose! Restart
      if (this._stage.isCollision(this._tetromino)) {
        this._gameOver();
      }
    }

    /**
     * Init keyboard events
     */

  }, {
    key: '_initKeyboardEvents',
    value: function _initKeyboardEvents() {
      var _this3 = this;

      var leftKey = this._keyboard(37);
      var upKey = this._keyboard(38);
      var rightKey = this._keyboard(39);
      var downKey = this._keyboard(40);
      var spaceKey = this._keyboard(32);
      var pKey = this._keyboard(80);
      leftKey.press = function () {
        return _this3._pressLeft();
      };
      upKey.press = function () {
        return _this3._pressUp();
      };
      rightKey.press = function () {
        return _this3._pressRight();
      };
      downKey.press = function () {
        return _this3._pressDown();
      };
      spaceKey.press = function () {
        return _this3._pressSpace();
      };
      pKey.press = function () {
        return _this3._pause();
      };
    }

    /**
     * Init mouse events
     */

  }, {
    key: '_initMouseEvents',
    value: function _initMouseEvents() {
      var _this4 = this;

      var startPauseButton = document.querySelector(_Constants2.default.DOM.START_PAUSE);
      startPauseButton.addEventListener('click', function () {
        return _this4._pause();
      });
    }

    /**
     * "Press left" event
     */

  }, {
    key: '_pressLeft',
    value: function _pressLeft() {
      if (!this._paused) {
        this._tetromino.move(-1, 0);
        if (this._stage.isCollision(this._tetromino)) {
          this._tetromino.move(1, 0);
        }
      }
    }

    /**
     * "Press right" event
     */

  }, {
    key: '_pressRight',
    value: function _pressRight() {
      if (!this._paused) {
        this._tetromino.move(1, 0);
        if (this._stage.isCollision(this._tetromino)) {
          this._tetromino.move(-1, 0);
        }
      }
    }

    /**
     * "Press up" event
     */

  }, {
    key: '_pressUp',
    value: function _pressUp() {
      if (!this._paused) {
        this._tetromino.rotate();
        if (this._stage.isCollision(this._tetromino)) {
          this._tetromino.antiRotate();
        }
      }
    }

    /**
     * "Press down" event
     */

  }, {
    key: '_pressDown',
    value: function _pressDown() {
      if (!this._paused) {
        this._drop();
      }
    }

    /**
     * "Press space" event
     */

  }, {
    key: '_pressSpace',
    value: function _pressSpace() {
      if (!this._paused) {
        this._hardDrop();
      }
    }

    /**
     * Render function
     */

  }, {
    key: '_render',
    value: function _render() {
      this._tetromino.draw();
      this._renderer.render(this._container);
    }

    /**
     * Keyboard events helper
     */

  }, {
    key: '_keyboard',
    value: function _keyboard(keyCode) {
      var key = {};
      key.code = keyCode;
      key.isDown = false;
      key.isUp = true;
      key.press = undefined;
      key.release = undefined;
      //The `downHandler`
      key.downHandler = function (event) {
        if (event.keyCode === key.code) {
          if (key.isUp && key.press) key.press();
          key.isDown = true;
          key.isUp = false;
          event.preventDefault();
        }
      };

      //The `upHandler`
      key.upHandler = function (event) {
        if (event.keyCode === key.code) {
          if (key.isDown && key.release) key.release();
          key.isDown = false;
          key.isUp = true;
          event.preventDefault();
        }
      };

      //Attach event listeners
      window.addEventListener('keydown', key.downHandler.bind(key), false);
      window.addEventListener('keyup', key.upHandler.bind(key), false);
      return key;
    }
  }]);

  return Game;
}();

exports.default = Game;

},{"./Constants":3,"./ScoreManager":5,"./Stage":6,"./Tetromino":7}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Constants = require('./Constants');

var _Constants2 = _interopRequireDefault(_Constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ScoreManager = function () {
  function ScoreManager() {
    _classCallCheck(this, ScoreManager);

    this.reset();
  }

  _createClass(ScoreManager, [{
    key: 'reset',
    value: function reset() {
      this.best = localStorage.bestScore ? localStorage.bestScore : 0;
      if (this.score > this.best) {
        this.best = localStorage.bestScore = this.score;
      }
      this.level = 0;
      this.score = 0;
      this.clearedLines = 0;
      this.updateDisplay();
    }
  }, {
    key: '_addPoints',
    value: function _addPoints(points) {
      this.score += points;
    }
  }, {
    key: 'addClearedLines',
    value: function addClearedLines(lines) {
      var previousClearedLines = this.clearedLines;
      this.clearedLines += lines;
      if (previousClearedLines % 10 > this.clearedLines % 10) {
        this.level++;
      }
      if (lines === 1) {
        this._addPoints(40 * (this.level + 1));
      } else if (lines === 2) {
        this._addPoints(100 * (this.level + 1));
      } else if (lines === 3) {
        this._addPoints(300 * (this.level + 1));
      } else if (lines === 4) {
        this._addPoints(1200 * (this.level + 1));
      }
      this.updateDisplay();
    }
  }, {
    key: 'tetrominoDropped',
    value: function tetrominoDropped() {
      this._addPoints(5 * (this.level + 1));
      this.updateDisplay();
    }
  }, {
    key: 'updateDisplay',
    value: function updateDisplay() {
      document.querySelector(_Constants2.default.DOM.LEVEL).innerText = this.level;
      document.querySelector(_Constants2.default.DOM.SCORE).innerText = this.score;
      document.querySelector(_Constants2.default.DOM.CLEARED).innerText = this.clearedLines;
      document.querySelector(_Constants2.default.DOM.BEST).innerText = this.best;
    }
  }]);

  return ScoreManager;
}();

exports.default = ScoreManager;

},{"./Constants":3}],6:[function(require,module,exports){
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

},{"./BlockFactory":2,"./Constants":3}],7:[function(require,module,exports){
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

},{"./BlockFactory":2,"./Constants":3}]},{},[1]);
