(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('mario');
var canvas = document.querySelector('canvas');
var cxt = canvas.getContext('2d');

// animate()
var lastAnimationFrameTime = 0;
cxt.fillStyle = "rgb(255, 0, 0)";
cxt.fillRect(0, 0, 640, 480);

window.addEventListener('keydown', keyDown);
window.addEventListener('keyup', keyUp);

function keyDown(e) {
  var code = e.keyCode;

  switch (code) {
    case 13:
      enter = true;
      break;
    case 32:
      space = true;
      break;
  }
}

function keyUp(e) {
  var code = e.keyCode;

  switch (code) {
    case 13:
      enter = false;
    case 32:
      space = false;
  }
}

},{}]},{},[1]);
