(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var WIDTH = 600 * 2,
    HEIGHT = 450 * 2;
var view = document.querySelector('.day-29-2');
var container = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view,
  transparent: true
});

// 2d canvas
var ctx = void 0,
    img = void 0,
    imgWidth = 100,
    imgHeight = 100;
var canvasTexture = function canvasTexture() {
  var canvas = document.createElement('canvas'),
      centerX = renderer.view.width / 2,
      centerY = renderer.view.height / 2,
      radius = 2;
  ctx = canvas.getContext('2d');

  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  ctx.globalCompositeOperation = 'destination-out';

  img = new Image();
  img.src = 'img/circle.png';
  img.onload = function () {
    ctx.drawImage(img, 100, 100, imgWidth, imgHeight);
  };

  return PIXI.Texture.fromCanvas(canvas);
};

// background
var background = new PIXI.Graphics();
background.beginFill(0x40FF00, 1).drawRect(0, 0, WIDTH, HEIGHT).endFill();
container.addChild(background);

var sprite = new PIXI.Sprite(canvasTexture());
console.log(sprite);
sprite.scale.y = sprite.scale.x = 3.0;
background.addChild(sprite);

PIXI.ticker.shared.add(function () {
  renderer.render(container);
});

},{}]},{},[1]);
