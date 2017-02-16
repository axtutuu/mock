(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var CalcChart = {
  corner: {
    A: -135,
    B: -45,
    C: 45,
    D: 135
  },
  calcPointY: function calcPointY(distance, radian) {
    return distance * Math.sin(radian);
  },
  calcPointX: function calcPointX(distance, radian) {
    return distance * Math.cos(radian);
  },
  // 対角線の長さ √(AD^2 + AB ^2 )
  diagonalLine: function diagonalLine(width, height) {
    return Math.sqrt(Math.pow(width, 2) + Math.pow(height, 2));
  },
  toRadian: function toRadian(degree) {
    return degree * Math.PI / 180;
  },
  toDegree: function toDegree(radian) {
    return radian * 180 / Math.PI;
  },
  truncatePoint: function truncatePoint(n) {
    return Math.floor(n * 10) / 10;
  }
};

module.exports = CalcChart;

},{}]},{},[1]);
