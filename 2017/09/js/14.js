(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var $width = $('.js-width');
var $displayWidth = $('.js-display-width');
var $scale = $('.js-sacle');

var width = $(window).width();
$(window).on('touchmove', function (evt) {
  var innerWidth = window.innerWidth;

  $width.text(width);
  $displayWidth.text(innerWidth);
  $scale.text(width / innerWidth);
  console.log(evt.originalEvent.touches.length);
  console.log(width / innerWidth, width, innerWidth);
});

},{}]},{},[1]);
