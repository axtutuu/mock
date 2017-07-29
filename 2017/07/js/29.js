(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var WIDTH = 600 * 2,
    HEIGHT = 450 * 2;
var view = document.querySelector('.day-29');

var container = new PIXI.Container();

// circleのアニメーション
var circle = new PIXI.Graphics();
circle.beginFill(0xffffff);
circle.drawCircle(0, 0, 100);
circle.x = WIDTH / 2;
circle.y = HEIGHT / 2;
circle.width = 10;
circle.height = 10;

container.addChild(circle);

// timeline
var timeline = new TimelineMax({
  paused: true,
  onComplete: function onComplete() {
    console.log('complete');
  }
});

timeline.add(TweenMax.to(circle, 4, {
  width: 600,
  height: 450,
  ease: Expo.easeInOut
}));

timeline.play();

var renderer = PIXI.autoDetectRenderer({
  width: WIDTH,
  height: HEIGHT,
  view: view
});

PIXI.ticker.shared.add(function () {
  renderer.render(container);
});
console.log(renderer);

},{}]},{},[1]);
