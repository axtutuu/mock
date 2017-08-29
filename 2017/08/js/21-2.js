(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var clock = 0;
var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');

canvas.width = canvas.height = 600;

function paintWave(degree, amplitude, color) {
  var boatY = 0;
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(0, 600);
  for (var i = 0; i <= 600; i += 20) {
    var y = Math.sin((i + degree) * Math.PI / 180) * amplitude + 300;
    ctx.lineTo(i, y);
    if (i === 300) {
      boatY = y;
    }
  }
  ctx.lineTo(600, 600);
  ctx.fill();
  return boatY;
}

function paint() {
  ctx.globalAlpha = 0.2;
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 600, 600);
  var wave1 = paintWave(clock, 40, '#0000ff');
  var wave2 = paintWave(clock * 2.5, 30, '#0022CC');
  var wave3 = paintWave(clock * 3, 20, '#2200DD');
  var y = Math.min(wave1, Math.min(wave2, wave3));

  ctx.fillStyle = 'green';
  ctx.fillRect(275, y - 20, 50, 20);
}

(function tick() {
  paint();
  clock++;
  requestAnimationFrame(tick);
})();

},{}]},{},[1]);
