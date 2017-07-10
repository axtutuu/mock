(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function () {
  console.log('10');
  var canvas = document.querySelector('.day-10');
  var context = canvas.getContext('2d');
  var i = 0;
  var config = {
    unit: 5,
    width: 600,
    height: 300,
    x: 300,
    y: 150,
    defaultSize: 20,
    size: 0
  };
  canvas.width = config.width;
  canvas.height = config.height;

  function init() {
    console.log('init');
    setInterval(move, 50);
  }

  function move() {
    i += config.unit;

    var sin = Math.sin(i / 360 * 2 * Math.PI);
    var cos = Math.cos(i / 360 * 2 * Math.PI);
    config.x = sin * config.width / 2 - 50 + config.width / 2;
    config.y = sin * config.height / 2 - 50 + config.height / 2;
    config.size = (cos + 2) / 2 * config.defaultSize;

    draw();
  }

  function draw() {
    context.clearRect(0, 0, config.width, config.height);

    // circle
    context.beginPath();
    context.globalAlpha = 1;
    context.fillStyle = '#CC0000';
    context.arc(config.x, config.y, config.size, 0, Math.PI * 2, false);
    context.fill();

    // text
    context.fillStyle = '#666666';
    context.fillText('x: ' + config.x, 5, 12);
    context.fillText('y: ' + config.y, 5, 24);
  }
  init();
})();

},{}]},{},[1]);
