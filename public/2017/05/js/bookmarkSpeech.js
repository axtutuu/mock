(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var rec = new webkitSpeechRecognition();
rec.continuous = true;
rec.interimResults = true;

var $u = $('#uButton');
var $r = $('#rButton');
var $l = $('#lButton');

rec.addEventListener('result', function (e) {
  console.log(e);
  var text = e.results[e.results.length - 1][0].transcript;
  switch (text.slice(-1)) {
    case 'ジャンプ':
    case 'jump':
    case 'プ':
    case 'p':
      $u.mousedown();
      setTimeout(function () {
        $u.mouseup();
      }, 800);
      break;
    case '右':
    case 'ぎ':
      $r.mousedown();
      $l.mouseup();
      break;
    case '左':
    case 'り':
      $l.mousedown();
      $r.mouseup();
      break;
    case '止まれ':
    case 'とまれ':
    case 'れ':
      $r.mouseup();
      $l.mouseup();
      break;
  }
  console.log(text);
});

(function init() {
  console.log('start');
  rec.start();
})();

},{}]},{},[1]);
