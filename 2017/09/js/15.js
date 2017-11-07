(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var el = document.querySelector('.box');
var mc = new Hammer(el);
mc.get('pinch').set({ enable: true });

var scale = 1;
mc.on('pinchstart', function (evt) {
  console.log(evt);
  console.log(evt.target.offsetLeft);
  $(el).children().css({ transformOrigin: '' + (-1 * evt.target.x + evt.center.x) + 'px ' + (-1 * evt.target.y + evt.center.y) + 'px' });
});

mc.on('pinchmove', function (evt) {
  console.log(evt, scale, scale + (evt.scale - 1));
  var s = void 0;
  if (evt.scale < 0) {
    s = scale - evt.scale;
  } else {
    s = scale + (evt.scale - 1);
  }
  console.log(s);
  $(el).children().css({ transform: 'scale(' + s + ')' });
});

mc.on('pinchend', function (evt) {
  console.log(evt);
  if (evt.scale < 0) {
    scale = scale - evt.scale;
  } else {
    scale = scale + (evt.scale - 1);
  }
  $(el).children().css({ transformOrigin: '' + (-1 * evt.target.x + evt.center.x) + 'px ' + (-1 * evt.target.y + evt.center.y) + 'px' });
});

},{}]},{},[1]);
