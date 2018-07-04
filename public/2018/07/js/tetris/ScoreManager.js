(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{"./Constants":1}]},{},[2]);
