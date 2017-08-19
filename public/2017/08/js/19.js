(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');
canvas.width = canvas.height = 600;

var isFlying = false,
    velocityY = -20,
    y = 300,
    offset = 0,
    speed = 10,
    accelY = 0.5,
    anime = null;

function tick() {
  velocityY += isFlying ? -accelY : accelY;
  y += velocityY;
  offset += speed;
  if (offset % 100 == 0) {
    speed += 1;
  }
  paint();
  anime = requestAnimationFrame(tick);
}

function paint() {
  ctx.fillStyle = 'green';
  ctx.fillRect(0, 0, 600, 600);
  ctx.beginPath();
  ctx.fillStyle = 'brown';
  ctx.beginPath();

  ctx.moveTo(0, 0);
  for (var i = 0; i <= 600; i += 10) {
    var up = 200 + Math.sin((i + offset) * Math.PI / 360) * 80;
    ctx.lineTo(i, up);
    if (i == 10 && y < up) {
      cancelAnimationFrame(anime);
    }
  }
  ctx.lineTo(600, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(0, 600);

  for (var _i = 0; _i <= 600; _i += 10) {
    var down = 400 + Math.sin((_i + offset) * Math.PI / 340) * 80;
    ctx.lineTo(_i, down);
    if (_i == 10 && y + 10 > down) {
      cancelAnimationFrame(anime);
    }
  }
  ctx.lineTo(620, 600);
  ctx.fill();

  ctx.fillStyle = 'white';
  ctx.fillRect(10, y, 10, 10);
  ctx.fillText(offset, 500, 50);
}

onkeydown = function onkeydown() {
  isFlying = true;
};

onkeyup = function onkeyup() {
  isFlying = false;
};

tick();

},{}]},{},[1]);
