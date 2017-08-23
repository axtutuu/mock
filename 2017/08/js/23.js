(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');

var x0 = 0,
    y0 = 0,
    x1 = 0,
    y1 = 0,
    count = 0;

ctx.lineWidth = 3;
canvas.width = canvas.height = 500;

canvas.onmousedown = function (e) {
  var x = Math.floor((e.offsetX - 240) / 25),
      y = Math.floor((e.offsetY - 240) / 25);
  if (count++ % 2 === 0) {
    x0 = x, y0 = y;
  } else {
    x1 = x, y1 = y;
  }
  repaint();
};
repaint();

function repaint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 500, 500);
  ctx.save();
  ctx.translate(250, 250);
  for (var i = -10; i <= 10; i++) {
    for (var ii = -10; ii <= 10; ii++) {
      drawCircle(i, ii, 'white');
    }
  }

  drawLine(-10, 0, 10, 0, 'red');
  drawLine(0, -10, 0, 10, 'red');

  drawLine(0, 0, x0, y0, 'blue');
  drawLine(0, 0, x1, y1, 'green');

  ctx.restore();

  var dot = x0 * x1 + y0 * y1;
  var sizeV1 = Math.sqrt(x0 * x0 + y0 * y0);
  var sizeV2 = Math.sqrt(x1 * x1 + y1 * y1);
  var cosTheta = dot / (sizeV1 * sizeV2);

  document.getElementById('v0').textContent = '(' + x0 + ', ' + y0 + ')';
  document.getElementById('v1').textContent = '(' + x1 + ', ' + y1 + ')';
  document.getElementById('v2').textContent = dot;
  document.getElementById('v3').textContent = sizeV1;
  document.getElementById('v4').textContent = sizeV2;
  document.getElementById('v5').textContent = cosTheta;
  document.getElementById('v6').textContent = Math.acos(cosTheta) * 180 / Math.PI;
}

function drawCircle(x, y, color) {
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x * 25, y * 25, 1, 0, Math.PI * 2);
  ctx.fill();
}

function drawLine(x0, y0, x1, y1, color) {
  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(x0 * 25, y0 * -25);
  ctx.lineTo(x1 * 25, y1 * -25);
  ctx.stroke();
}

},{}]},{},[1]);
