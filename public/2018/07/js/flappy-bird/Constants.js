(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var canvasWidthHeight = Math.min(Math.min(window.innerHeight, window.innerWidth), 512);

exports.default = {
  GRAVITY: 9.8,
  GAME_SPEED_X: 150,
  canvasWidthHeight: canvasWidthHeight,
  BIRD_FRAME_LIST: ['./images/frame-1.png', './images/frame-2.png', './images/frame-3.png', './images/frame-4.png'],
  TUBE_POS_LIST: [canvasWidthHeight + 150, canvasWidthHeight + 250, canvasWidthHeight + 480]
};

},{}]},{},[1]);
