(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d'),
    fires = [],
    width = 800,
    height = 600;

canvas.width = width;
canvas.height = height;

ctx.globalAlpha = 0.3;

function random(n) {
  return Math.floor(Math.random() * n);
}

function Firework(radius, color) {
  this.color = color;
  this.radius = radius;

  this.initialize = function () {
    this.count = 0;
    this.scale = 0;
    this.x = random(width);
    this.y = random(height);
    this.xSpeed = -3 + random(6);
    this.ySpeed = -3 + random(8);
  };

  this.move = function () {
    this.x += this.xSpeed;
    this.y += this.ySpeed;

    this.ySpeed += 0.1;
    this.xSpeed /= 1.01;
  };

  this.draw = function () {
    if (this.ySpeed < -1) {
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, 4, 0, Math.PI * 2);
      ctx.fill();
    } else {
      this.count++;
      for (var t = 0; t < 4; t++) {
        this.scale += 0.06 / this.count;
        var rad = this.radius * this.scale;
        for (var i = 0; i < Math.PI * 2; i += 0.6) {
          var dx = Math.cos(i) * rad;
          var dy = Math.sin(i) * rad;
          ctx.fillStyle = this.color;
          ctx.beginPath();
          ctx.arc(this.x + dx, this.y + dy, 2, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      if (this.count > 30) {
        this.initialize();
      }
    }
  };
  this.initialize();
}

function paint() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, width, height);
  fires.forEach(function (e) {
    e.draw();
  });
}

function tick() {
  fires.forEach(function (e) {
    e.move();
  });
  paint();

  requestAnimationFrame(tick);
}

function init() {
  var colors = ['#ff000', '#ffff00', '#ffffff', '#ff00ff', '#00ff00', '#7F7FFF', '#00ffff'];

  for (var i = 0; i < 14; i++) {
    fires.push(new Firework(random(60) + 60, colors[i % 7]));
  }

  tick();
}

init();
console.log(22.2);

},{}]},{},[1]);
