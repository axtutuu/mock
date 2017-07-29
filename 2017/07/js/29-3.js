(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var WIDTH = 600 * 2,
    HEIGHT = 450 * 2;
var view = document.querySelector('.day-29-3');
var container = new PIXI.Container();

var renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view,
  transparent: true
});

// 2d canvas
var canvasTexture = function canvasTexture() {
  var canvas = document.createElement('canvas'),
      centerX = renderer.view.width / 2,
      centerY = renderer.view.height / 2,
      radius = 2,
      ctx = canvas.getContext('2d');

  canvas.width = WIDTH * 10;
  canvas.height = HEIGHT * 10;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH * 10, HEIGHT * 10);

  ctx.globalCompositeOperation = 'destination-out';

  return new Promise(function (resolve) {
    var img = new Image();
    img.src = 'img/hexagon.png';
    img.onload = function () {
      ctx.drawImage(img, WIDTH * 10 / 2 - img.width / 2, HEIGHT * 10 / 2 - img.height / 2);
      resolve(PIXI.Texture.fromCanvas(canvas));
    };
  });
};

// background
var background = new PIXI.Graphics();
background.beginFill(0x40FF00, 1).drawRect(0, 0, WIDTH, HEIGHT).endFill();
container.addChild(background);

// timeline
var timeline = new TimelineMax({
  paused: true,
  onComplete: function onComplete() {
    console.log('complete');
  }
});

// clip
var sprite = void 0;
canvasTexture().then(function (canvas) {
  sprite = new PIXI.Sprite(canvas);
  sprite.anchor.x = sprite.anchor.y = 0.5;
  sprite.x = WIDTH / 2;
  sprite.y = HEIGHT / 2;
  sprite.scale.x = sprite.scale.y = 0.1;
  background.addChild(sprite);

  timeline.add(TweenMax.to(sprite.scale, 4, {
    x: 1,
    y: 1,
    ease: Expo.easeInOut
  }));

  timeline.add(TweenMax.to(sprite.scale, 4, {
    x: 1.5,
    y: 1.5,
    ease: Expo.easeInOut
  }));

  timeline.play();
});

PIXI.ticker.shared.add(function () {
  renderer.render(container);
});

},{}]},{},[1]);
