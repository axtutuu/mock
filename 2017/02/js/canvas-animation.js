(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (win, doc) {
  var canvas = doc.querySelector('.js-canvas');
  var stage = new createjs.Stage(canvas);
  var shape = new createjs.Shape();
  canvas.width = canvas.offsetWidth * 2;
  canvas.height = canvas.offsetHeight * 2;
  shape.x = 50;
  shape.y = 50;
  stage.addChild(shape);
  draw(shape.graphics);
  createjs.Ticker.setFPS(30);
  createjs.Ticker.addEventListener('tick', rotate);

  function draw(graphic) {
    graphic.beginStroke('blue').beginFill('#3817a3').drawPolyStar(0, 0, 40, 5, 0.6, -90);
  }

  function rotate() {
    shape.rotation += 5;
    stage.update();
  }
})(window, document);

},{}]},{},[1]);
