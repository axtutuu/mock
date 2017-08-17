(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 600;

var velocityX = 5,
    accelY = 0.4;
var velocityY = -20;

var x = 0,
    y = 0;
function tick() {
  x += velocityX;
  velocityY += accelY;
  y += velocityY;

  console.log(y, velocityY);

  if (x > 600) x = 0;
  if (y > 600) {
    velocityY = -20;
  }
  paint(x, y);
  requestAnimationFrame(tick);
}

function paint(x, y) {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 600, 600);
  ctx.fillStyle = 'white';
  ctx.fillRect(x, y, 10, 10);
  ctx.fill();
}
tick();

},{}]},{},[1]);
