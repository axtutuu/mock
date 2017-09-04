(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas');
var ctx = canvas.getContext('2d');
canvas.width = canvas.height = 600;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, 600, 600);

var size = 0;
var color = ['black', 'white'];
var bg = color[0],
    box = color[1];

function tick() {
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, 600, 600);

  ctx.fillStyle = box;

  size += 0.2;
  for (var i = 0; i < 10; i++) {
    ctx.fillRect(60 * i, 0, size, size);
    for (var ii = 0; ii < 10; ii++) {
      ctx.fillRect(60 * i, 60 * ii, size, size);
    }
  }

  if (size > 60) {
    size = 0;
    if (bg == 'black') {
      bg = 'white';
      box = 'black';
    } else {
      box = 'white';
      bg = 'black';
    }
  }

  requestAnimationFrame(tick);
}

tick();

},{}]},{},[1]);
