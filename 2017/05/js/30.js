(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('hello');
var CANVAS_WIDTH = window.innerWidth,
    CANVAS_HIGHT = window.innerHeight;
var canvas = void 0,
    context = void 0,
    dot = void 0;

init();

function init() {
  canvas = document.getElementById('0530');
  context = canvas.getContext('2d');
  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HIGHT;

  createTrail();
  setInterval(loop, 1000 / 60);
}

function createTrail() {
  dot = {
    x: 100,
    y: 100,
    speed: 10,
    direction: Math.PI * 2 * Math.random()
  };
}

function updatePos() {
  var dx = dot.x + dot.speed * Math.cos(dot.direction);
  var dy = dot.y + dot.speed * Math.cos(dot.direction);

  // canvasの範囲を超えたらdirectionの変更
  if (dx < 0 || dx > CANVAS_WIDTH || dy < 0 || dy > CANVAS_HIGHT) {
    dot.direction = Math.PI * 2 * Math.random();
    updatePos();
    return;
  }

  dot.x = dx;
  dot.y = dy;
}

function loop() {
  updatePos();

  context.fillStyle = 'rgba(255,255,255,.5)';
  context.fillRect(0, 0, canvas.width, canvas.height);

  context.beginPath();
  context.fillStyle = '#ff0000';
  context.moveTo(dot.x, dot.y);
  context.arc(dot.x, dot.y, 3, 0, Math.PI * 2, true);
  context.fill();
}

},{}]},{},[1]);
