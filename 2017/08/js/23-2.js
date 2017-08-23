(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d');

var pic = document.getElementById('pic');
ctx.drawImage(pic, 0, 0, 250, 250);

var src = ctx.getImageData(0, 0, 250, 250),
    img = ctx.createImageData(250, 250);

processImage();
paint();

function processImage() {
  for (var i = 0; i < 250 * 250 * 4; i += 4) {
    img.data[i + 0] = src.data[i + 0] ^ 0xff; // R
    img.data[i + 1] = src.data[i + 1] ^ 0xff; // G
    img.data[i + 2] = src.data[i + 2] ^ 0xff; // B
    img.data[i + 3] = src.data[i + 3]; // A
  }
}

function paint() {
  ctx.putImageData(img, 0, 0);
}

},{}]},{},[1]);
