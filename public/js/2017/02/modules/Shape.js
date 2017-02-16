(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Shape = function () {
  function Shape() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Shape);

    this.manifest = [{ "src": "/images/2017/02/Synchronize-100.png", "id": "Synchronize" }];

    this.init();
  }

  _createClass(Shape, [{
    key: "init",
    value: function init() {
      var queue = new createjs.LoadQueue(true);
      queue.loadManifest(this.manifest, true);
      queue.addEventListener("complete", this.handleComplete);
    }
  }, {
    key: "handleComplete",
    value: function handleComplete(e) {
      console.log(e.getResult("Synchronize"));
    }
  }, {
    key: "frame",
    value: function frame() {}
  }, {
    key: "rotate",
    value: function rotate() {
      return new createjs.Bitmap('/images/2017/02/Synchronize-100.png');
    }
  }, {
    key: "size",
    value: function size() {}
  }, {
    key: "remove",
    value: function remove() {}
  }]);

  return Shape;
}();

exports.default = Shape;

},{}]},{},[1]);
