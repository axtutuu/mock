(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// fork http://q068891.hatenablog.com/entry/2016/10/02/111033
var canvas = document.getElementsByClassName('day-22')[0];
var ctx = canvas.getContext('2d');
var width = 600,
    height = 450,
    power = 5.0,
    // 冪指数
workerNum = 20,
    //walkerの数
workerDistance = 1,
    // walkerが1回で進む距離
workerMaxDistance = 1000000000,
    x = new Array(workerNum),
    y = new Array(workerNum),
    workerRadian = new Array(workerNum),
    NumberOfWork = new Array(workerNum),
    colorR = new Array(workerNum),
    colorG = new Array(workerNum),
    colorB = new Array(workerNum);

ctx.strokeStyle = 'rgb(0,0,0)';
ctx.strokeRect(0, 0, width, height);

/*
 * 初期位置とcolorの決定
 */

for (var i = 0; i < workerNum; i++) {
  // 初期位置
  x[i] = width * Math.random();
  y[i] = height * Math.random();

  NumberOfWork[i] = 0;
  workerRadian[i] = 0;

  //  color
  colorR[i] = Math.floor(Math.random() * 256);
  colorG[i] = Math.floor(Math.random() * 256);
  colorB[i] = Math.floor(Math.random() * 256);
}

function ticker() {
  requestAnimationFrame(ticker);
  // worker の描画
  for (var _i = 0; _i < workerNum; _i++) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgb(' + colorR[_i] + ', ' + colorG[_i] + ', ' + colorB[_i] + ')';
    ctx.arc(x[_i], y[_i], 0.05, 0, Math.PI * 2, false);
    ctx.stroke();
  }

  // workerの位置情報を更新
  for (var _i2 = 0; _i2 < workerNum; _i2++) {

    if (NumberOfWork[_i2] <= 0) {
      workerRadian[_i2] = power * Math.PI * Math.random();

      // 次に進む距離をべき分布からランダムに決定
      var tmp1 = Math.pow(workerDistance, -power);
      var tmp2 = Math.pow(width * workerMaxDistance, -power) - tmp1;
      var tmp3 = tmp2 * Math.random() + tmp1;
      NumberOfWork[_i2] = Math.pow(tmp3, 1.0 / -power);
    }
    // 計算した角度に距離分移動
    x[_i2] = x[_i2] + workerDistance * Math.cos(workerRadian[_i2]);
    y[_i2] = y[_i2] + workerDistance * Math.sin(workerRadian[_i2]);
    NumberOfWork[_i2] = NumberOfWork[_i2] - 1;

    // 周期的境界条件
    if (width <= x[_i2]) {
      x[_i2] = x[_i2] - width;
    }

    if (height <= y[_i2]) {
      y[_i2] = y[_i2] - height;
    }

    if (x[_i2] <= 0) {
      x[_i2] = x[_i2] + width;
    }

    if (y[_i2] <= 0) {
      y[_i2] = y[_i2] + height;
    }
  }
}

ticker();

},{}]},{},[1]);
