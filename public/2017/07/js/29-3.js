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
      ctx = canvas.getContext('2d'),
      scale = 13;

  canvas.width = WIDTH * scale;
  canvas.height = HEIGHT * scale;
  ctx.fillStyle = '#FE642E';
  ctx.fillRect(0, 0, WIDTH * scale, HEIGHT * scale);

  ctx.globalCompositeOperation = 'destination-out';

  return new Promise(function (resolve) {
    var img = new Image();
    img.src = 'img/hexagon.png';
    img.onload = function () {
      ctx.drawImage(img, WIDTH * scale / 2 - img.width / 2, HEIGHT * scale / 2 - img.height / 2);
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

//offset
var offsetTop = new PIXI.Graphics();
offsetTop.beginFill(0xFE642E, 1).drawRect(0, 0, WIDTH, 400).endFill();
container.addChild(offsetTop);

var offsetBottom = new PIXI.Graphics();
offsetBottom.beginFill(0xFE642E, 1).drawRect(0, 0, WIDTH, 400).endFill();
offsetBottom.y = HEIGHT - 400;
container.addChild(offsetBottom);

var offsetLeft = new PIXI.Graphics();
offsetLeft.beginFill(0xFE642E, 1).drawRect(0, 0, 550, HEIGHT).endFill();
container.addChild(offsetLeft);

var offsetRight = new PIXI.Graphics();
offsetRight.beginFill(0xFE642E, 1).drawRect(0, 0, 550, HEIGHT).endFill();
offsetRight.x = WIDTH - 550;
container.addChild(offsetRight);

// clip
var sprite = void 0;
canvasTexture().then(function (canvas) {
  sprite = new PIXI.Sprite(canvas);
  sprite.anchor.x = sprite.anchor.y = 0.5;
  sprite.x = WIDTH / 2;
  sprite.y = HEIGHT / 2;
  sprite.scale.x = sprite.scale.y = 0.01;
  background.addChild(sprite);

  timeline.add(TweenMax.to(sprite.scale, 4, {
    x: 1,
    y: 1,
    ease: Expo.easeInOut
  }), TweenMax.to(offsetTop, 3, {
    height: 0,
    ease: Expo.easeInOut
  }), TweenMax.to(offsetLeft, 4, {
    width: 0,
    ease: Expo.easeInOut
  }), TweenMax.to(offsetBottom, 3, {
    height: 0,
    y: HEIGHT - 0,
    ease: Expo.easeInOut
  }), TweenMax.to(offsetRight, 4, {
    width: 0,
    x: WIDTH - 0,
    ease: Expo.easeInOut
  }));

  timeline.add(TweenMax.to(sprite.scale, 4, {
    x: 2,
    y: 2,
    ease: Expo.easeInOut
  }));

  timeline.play();
});

PIXI.ticker.shared.add(function () {
  renderer.render(container);
});

},{}]},{},[1]);
