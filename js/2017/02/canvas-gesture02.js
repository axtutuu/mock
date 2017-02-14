(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}

},{}],2:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Canvas = function (_EventEmitter) {
  _inherits(Canvas, _EventEmitter);

  function Canvas() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Canvas);

    var _this = _possibleConstructorReturn(this, (Canvas.__proto__ || Object.getPrototypeOf(Canvas)).call(this));

    _this.stage = new createjs.Stage('js-canvas');
    _this.stage.enableMouseOver();
    _this.activeShape = new createjs.Shape();
    _this.rotateShape = new createjs.Shape();
    _this.isActive = false;

    // 座標
    _this.pointA = document.querySelector('.point--a') || document.createElement('div');
    _this.pointB = document.querySelector('.point--b') || document.createElement('div');
    _this.pointC = document.querySelector('.point--c') || document.createElement('div');
    _this.pointD = document.querySelector('.point--d') || document.createElement('div');

    _this.init();
    return _this;
  }

  _createClass(Canvas, [{
    key: 'init',
    value: function init() {
      var imgUrl = '/images/2017/02/image1.jpg';
      var queue = new createjs.LoadQueue(false);
      queue.addEventListener("fileload", this.draw.bind(this));
      queue.loadFile(imgUrl);

      // 枠線
      this.activeShape.graphics.beginStroke('#D6D4D6');
      this.activeShape.graphics.setStrokeStyle(3);

      // rotate
      this.rotateShape.graphics.beginFill('#7E5384');
      this.rotateShape.cursor = 'pointer';
    }
  }, {
    key: 'draw',
    value: function draw(e) {
      this.bitmap = new createjs.Bitmap(e.result);
      this.bitmap.cursor = 'pointer';
      this.bitmap.addEventListener('click', this.active.bind(this));
      this.bitmap.x = 80;
      this.bitmap.y = 80;

      // 中心軸
      this.bitmap.regX = this.bitmap.getBounds().width / 2;
      this.bitmap.regY = this.bitmap.getBounds().height / 2;

      this.stage.addChild(this.bitmap);
      this.stage.update();
    }
  }, {
    key: 'active',
    value: function active(e) {
      if (this.isActive) {
        this.isActive = false;
        this.stage.removeChild(this.activeShape);
        this.stage.removeChild(this.rotateShape);
        this.stage.update();
        return;
      }
      var instance = e.target;
      this.isActive = true;

      // rotate
      var rotateX = this.bitmap.getBounds().width / 2 + this.bitmap.x;
      var rotateY = this.bitmap.getBounds().height / 2 + this.bitmap.y;
      this.rotateShape.graphics.drawCircle(0, 0, 25, 25);
      this.rotateShape.x = rotateX;
      this.rotateShape.y = rotateY;

      // 枠線
      // this.activeShape.graphics.drawRect(instance.x,instance.y,instance.getBounds().width,instance.getBounds().height);
      // this.stage.addChild(this.activeShape);
      this.stage.addChild(this.rotateShape);
      this.rotateShape.addEventListener('mousedown', this.rotateStart.bind(this));
      this.stage.update();
    }
  }, {
    key: 'rotateStart',
    value: function rotateStart(e) {
      var instance = e.target;
      instance.addEventListener('pressmove', this.rotate.bind(this));
      instance.addEventListener('pressup', this.rotateEnd.bind(this));
    }
  }, {
    key: 'rotate',
    value: function rotate(e) {
      var instance = e.target;
      var offsetX = this.stage.mouseX - this.bitmap.x;
      var offsetY = this.stage.mouseY - this.bitmap.y;

      var baseRads = this.tan2(offsetX, offsetY);
      this.bitmap.rotation = this.toDegree(baseRads) - 45; // ドラッグスタートが右下になるので位置調整
      var rads = this.toRadian(this.toDegree(baseRads) - 45);

      // rotate操作の移動
      var rotateX = this.bitmap.getBounds().width + this.bitmap.x;
      var rotateY = this.bitmap.getBounds().height + this.bitmap.y;
      var bitmapBounds = this.bitmap.getBounds();

      // 対角線の長さ
      var diagonalLine = this.calcDiagonalLine(this.bitmap.getBounds().width, this.bitmap.getBounds().height);

      // A点の座標
      var A_X_Offset = this.calcPointX(diagonalLine / 2, this.toRadian(this.toDegree(rads) - 135));
      var A_Y_Offset = this.calcPointY(diagonalLine / 2, this.toRadian(this.toDegree(rads) - 135));
      this.pointA.innerHTML = this.txtFormat(this.bitmap.x + A_X_Offset, this.bitmap.y + A_Y_Offset);

      // B点の座標
      var B_X_Offset = this.calcPointX(diagonalLine / 2, this.toRadian(this.toDegree(rads) - 45)); // 中央を基準とした点Bの座標
      var B_Y_Offset = this.calcPointY(diagonalLine / 2, this.toRadian(this.toDegree(rads) - 45)); // 中央を基準とした点Bの座標
      this.pointB.innerHTML = this.txtFormat(this.bitmap.x + B_X_Offset, this.bitmap.y + B_Y_Offset);

      // 対角線の座標
      // const diagonalLine    = this.calcDiagonalLine(this.bitmap.getBounds().width, this.bitmap.getBounds().height);
      var diagonalRasin = this.toRadian(this.toDegree(rads) + 45); //対角線のラジアン角
      this.pointC.innerHTML = this.txtFormat(this.bitmap.x + this.calcPointX(diagonalLine / 2, diagonalRasin), this.bitmap.y + this.calcPointY(diagonalLine / 2, diagonalRasin));

      this.rotateShape.x = this.bitmap.x + this.calcPointX(diagonalLine / 2, diagonalRasin); // 中心軸からのdistance
      this.rotateShape.y = this.bitmap.y + this.calcPointY(diagonalLine / 2, diagonalRasin);

      // D点の座標
      var verticalRasin = this.toRadian(this.toDegree(rads) + 135);
      this.pointD.innerHTML = this.txtFormat(this.bitmap.x + this.calcPointX(diagonalLine / 2, verticalRasin), this.bitmap.y + this.calcPointY(diagonalLine / 2, verticalRasin));
      this.stage.update();
    }
  }, {
    key: 'txtFormat',
    value: function txtFormat(x, y) {
      return '(' + this.calcDecimal(x) + ',' + this.calcDecimal(y) + ')';
    }
  }, {
    key: 'rotateEnd',
    value: function rotateEnd(e) {
      var instance = e.target;
      instance.removeEventListener("pressmove", this.rotate);
      instance.removeEventListener("pressup", this.rotateEnd);
    }
  }, {
    key: 'toRadian',
    value: function toRadian(degree) {
      return degree * Math.PI / 180;
    }
  }, {
    key: 'toDegree',
    value: function toDegree(radian) {
      return radian * 180 / Math.PI;
    }

    // x軸から対象点までの角度

  }, {
    key: 'tan2',
    value: function tan2(x, y) {
      return Math.atan2(y, x);
    }

    // 小数点第２位以下の切り捨て

  }, {
    key: 'calcDecimal',
    value: function calcDecimal(n) {
      return Math.floor(n * 10) / 10;
    }

    // y座標の取得 -> 距離xsin(ラジアン角度)

  }, {
    key: 'calcPointY',
    value: function calcPointY(distance, radian) {
      return distance * Math.sin(radian);
    }

    // x座標の取得  距離xcos(ラジアン角度) http://ngroku.com/?p=976

  }, {
    key: 'calcPointX',
    value: function calcPointX(distance, radian) {
      return distance * Math.cos(radian);
    }

    // 対角線の長さ √(AD^2 + AB ^2 )

  }, {
    key: 'calcDiagonalLine',
    value: function calcDiagonalLine(width, height) {
      return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
    }
  }]);

  return Canvas;
}(_events2.default);

(function (win, doc) {
  var canvas = new Canvas();
})(window, document);

},{"events":1}]},{},[2]);
