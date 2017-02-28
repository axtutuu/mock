(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (win, doc) {

  // 1.stageを用意する
  var canvasElem = doc.querySelector('.js-canvas');
  var stage = new createjs.Stage(canvasElem);

  // 2.インスタンスを作成する
  var shape = new createjs.Shape();
  shape.graphics.beginFill("#FFD09B").drawCircle(0, 0, 50);

  // 3.インスタンスの配置と表示
  shape.x = shape.y = 50;
  stage.addChild(shape);
  stage.update();

  / * Event * /;
  var canvasElemEvent = doc.querySelector('.js-canvas-event');
  var stageEvent = new createjs.Stage(canvasElemEvent);

  var shapeEvent = new createjs.Shape();
  shapeEvent.graphics.beginFill("#FFD09B").drawCircle(0, 0, 50);

  shapeEvent.x = shapeEvent.y = 50;

  shapeEvent.addEventListener('click', function () {
    alert('click');
  });
  stageEvent.addChild(shapeEvent);
  stageEvent.update();

  /* Move */
  var canvasElemMove = doc.querySelector('.js-canvas-move');
  var stageMove = new createjs.Stage(canvasElemMove);

  var shapeMove = new createjs.Shape();
  shapeMove.graphics.beginFill('#FFD09B').drawCircle(0, 0, 50);
  shapeMove.x = shapeMove.y = 50;
  stageMove.addChild(shapeMove);

  createjs.Ticker.setFPS(30);
  // createjs.Ticker.addEventListener('tick', ()=>{
  //   shapeMove.x = shapeMove.y += 1;
  //   stageMove.update();
  // });

  / * TweenJS */;
  var canvasTween = doc.querySelector('.js-canvas-tween');
  var stageTween = new createjs.Stage(canvasTween);

  var shapeTween = new createjs.Shape();
  shapeTween.graphics.beginFill('#FFD09B').drawRect(0, 0, 150, 150);
  shapeTween.x = shapeTween.y = 50;
  stageTween.addChild(shapeTween);

  createjs.Tween.get(shapeTween).to({ x: 150, y: 150 }, 3000, createjs.Ease.bounceInOut);
  // createjs.Tween.get(shapeTween, {loop: true}).to({rotation: 360}, 1000);
  // createjs.Tween.get(shapeTween).to({x: 150, y: 150}, 3000, createjs.Ease.bounceInOut)
  //                               .to({rotation: 360}, 1000);
  createjs.Ticker.addEventListener('tick', function () {
    stageTween.update();
  });

  / * Preload JS */;
  var canvasPreload = doc.querySelector('.js-canvas-preload');
  var stagePreload = new createjs.Stage(canvasPreload);

  // 1. LoadQueueインスタスを作成
  var queue = new createjs.LoadQueue();
  queue.loadFile('./images/ham-2063533_640.jpg');

  queue.addEventListener('fileload', function (e) {
    var bitmap = new createjs.Bitmap(e.result);
    stagePreload.addChild(bitmap);
    stagePreload.update();
  });
})(window, document);

},{}]},{},[1]);
