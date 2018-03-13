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
"use strict";

var _CalcChart = require("./modules/CalcChart.js");

var _CalcChart2 = _interopRequireDefault(_CalcChart);

var _Drawer = require("./modules/Drawer.js");

var _Drawer2 = _interopRequireDefault(_Drawer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(function () {
  // console.log(CalcChart.publicPropertyyy);
  new _Drawer2.default();
})();

},{"./modules/CalcChart.js":3,"./modules/Drawer.js":4}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _RotateShape = require('./RotateShape.js');

var _RotateShape2 = _interopRequireDefault(_RotateShape);

var _MoveShape = require('./MoveShape.js');

var _MoveShape2 = _interopRequireDefault(_MoveShape);

var _CalcChart = require('./CalcChart.js');

var _CalcChart2 = _interopRequireDefault(_CalcChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Drawer = function (_EventEmitter) {
  _inherits(Drawer, _EventEmitter);

  function Drawer() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Drawer);

    var _this = _possibleConstructorReturn(this, (Drawer.__proto__ || Object.getPrototypeOf(Drawer)).call(this));

    _this.stage = opts.stage;
    _this.isActive = false; //仮
    // {shape: shape, rotate: rotate, x: x, y: y}
    _this.shapes = [];

    _this.canvas = document.querySelector('#js-canvas');
    _this.canvas.width = _this.canvas.offsetWidth * 2;
    _this.canvas.height = _this.canvas.offsetHeight * 2;

    _this.stage = new createjs.Stage('js-canvas');
    _this.stage.enableMouseOver();

    // test shape
    _this.testShape = new createjs.Shape();
    _this.testShape.x = 300;
    _this.testShape.y = 300;
    _this.testShape_width = 300;
    _this.testShape_height = 300;
    _this.testShape.regX = 300 / 2;
    _this.testShape.regY = 300 / 2;
    _this.testShape.graphics.beginFill('#7E5384').drawRect(0, 0, _this.testShape_width, _this.testShape_height);

    _this.testShape.addEventListener('click', _this.active.bind(_this));
    _this.stage.addChild(_this.testShape);
    _this.stage.update();

    // operation
    _this.rotateShape = new _RotateShape2.default(_this);

    _this.moveShape = new _MoveShape2.default(_this);

    _this.on('update', function (e) {
      _this.update(e);
    });
    return _this;
  }

  // radian | position | scale(未)


  _createClass(Drawer, [{
    key: 'update',
    value: function update() {
      var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var instance = opts.instance;
      var radian = opts.radian || _CalcChart2.default.toRadian(instance.rotation);

      /*   rotateShape move   */
      this.rotateShape.bitmap.x = _CalcChart2.default.pointX(this.currentDiagonalLine / 2, radian + _CalcChart2.default.toRadian(45)) + this.testShape.x - this.rotateBounds.width / 2;

      this.rotateShape.bitmap.y = _CalcChart2.default.pointY(this.currentDiagonalLine / 2, radian + _CalcChart2.default.toRadian(45)) + this.testShape.y - this.rotateBounds.height / 2;

      /*   moveShape move   */
      this.moveShape.bitmap.x = _CalcChart2.default.pointX(this.currentDiagonalLine / 2, radian + _CalcChart2.default.toRadian(-45)) + this.testShape.x - this.moveBounds.width / 2;

      this.moveShape.bitmap.y = _CalcChart2.default.pointY(this.currentDiagonalLine / 2, radian + _CalcChart2.default.toRadian(-45)) + this.testShape.y - this.moveBounds.height / 2;

      this.testShape.rotation = _CalcChart2.default.toDegree(radian);
      this.stage.update();
    }
  }, {
    key: 'active',
    value: function active(e) {
      this.currentDiagonalLine = _CalcChart2.default.diagonalLine(this.testShape_width, this.testShape_height);

      this.rotateBounds = this.rotateShape.bitmap.getBounds();
      this.moveBounds = this.moveShape.bitmap.getBounds();
      if (this.isActive) {
        this.rotateShape.remove();
        this.moveShape.remove();
        this.isActive = false;
      } else {
        this.rotateShape.active(e);
        this.moveShape.active(e);
        this.isActive = true;
      }
    }
  }, {
    key: 'add',
    value: function add() {}
  }, {
    key: 'edit',
    value: function edit(e) {}
  }, {
    key: 'delete',
    value: function _delete(e) {}
  }]);

  return Drawer;
}(_events2.default);

exports.default = Drawer;

},{"./CalcChart.js":3,"./MoveShape.js":5,"./RotateShape.js":6,"events":1}],5:[function(require,module,exports){
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
      this.target = e.target;

      // this.diagonalLine =
      //   CalcChart.diagonalLine(this.drawer.testShape_width,
      //                          this.drawer.testShape_height);
      // this.bounds = this.bitmap.getBounds();
      // this.position(r);

      this.drawer.stage.addChild(this.bitmap);
      this.drawer.emit('update', { instance: this.target });
      // this.drawer.stage.update();
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

},{"./CalcChart.js":3}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CalcChart = require('./CalcChart.js');

var _CalcChart2 = _interopRequireDefault(_CalcChart);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var RotateShape = function () {
  function RotateShape(drawer) {
    _classCallCheck(this, RotateShape);

    this.drawer = drawer;
    var queue = new createjs.LoadQueue(false);
    queue.addEventListener("fileload", this.init.bind(this));
    queue.loadFile('/images/2017/02/Synchronize-100.png');
  }

  _createClass(RotateShape, [{
    key: 'init',
    value: function init(e) {
      this.bitmap = new createjs.Bitmap(e.result);
      this.bitmap.cursor = 'pointer';
      this.bitmap.addEventListener('mousedown', this.start.bind(this));
    }
  }, {
    key: 'remove',
    value: function remove() {
      this.drawer.stage.removeChild(this.bitmap);
      this.drawer.stage.update();
    }
  }, {
    key: 'active',
    value: function active(e) {
      this.target = e.target;
      var r = _CalcChart2.default.toRadian(this.target.rotation);

      this.drawer.stage.addChild(this.bitmap);
      this.drawer.emit('update', { instance: this.target });
    }
  }, {
    key: 'start',
    value: function start(e) {
      var instance = e.target;
      instance.addEventListener('pressmove', this.move.bind(this));
      instance.addEventListener('pressup', this.end.bind(this));
    }
  }, {
    key: 'move',
    value: function move(e) {
      var instance = e.target;
      var rad = _CalcChart2.default.rotating(this.drawer.stage.mouseX - this.target.x, this.drawer.stage.mouseY - this.target.y);
      rad = rad - _CalcChart2.default.toRadian(45); // offset

      this.drawer.emit('update', { instance: this.target, radian: rad });
    }
  }, {
    key: 'end',
    value: function end(e) {
      var instance = e.target;
      instance.removeEventListener("pressmove", this.rotate);
      instance.removeEventListener("pressup", this.rotateEnd);
    }
  }, {
    key: 'position',
    value: function position() {
      var rad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      var r = _CalcChart2.default.toRadian(_CalcChart2.default.toDegree(rad) + 45);

      this.bitmap.x = _CalcChart2.default.pointX(this.diagonalLine / 2, r) + this.drawer.testShape.x - this.bounds.width / 2;

      this.bitmap.y = _CalcChart2.default.pointY(this.diagonalLine / 2, r) + this.drawer.testShape.y - this.bounds.height / 2;
    }
  }]);

  return RotateShape;
}();

exports.default = RotateShape;

},{"./CalcChart.js":3}]},{},[2]);
