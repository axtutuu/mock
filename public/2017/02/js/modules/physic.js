(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var Physic = {
  canvas: "",
  stage: null,
  gravityVertical: 10,
  boxEdge: 20,
  count: 50,

  set init(canvas) {
    this.canvas = canvas;
    this.stage = new createjs.Stage(this.canvas);
  },

  initBox: function initBox() {
    var height = undefined.canvas.height;
    var width = undefined.canvas.width;
    var b2Vec2 = Box2D.Common.Math.b2Vec2,
        b2World = Box2D.Dynamics.b2World;
    world = new b2World(new b2Vec2(0, undefined.gravityVertical), true);
    centerX = width / 2;
    floorWidth = width * 0.8;
    floorHeight = undefined.boxEdge;
    floorLeft = (width - floorWidth) / 2;
    var floorShape = createFloor(centerX, height - floorHeight, floorWidth, floorHeight, '#CCC');
    undefined.stage.addChild(floorShape);
    for (var i = 0; i < undefined.count; i++) {
      var nX = floorWidth * Math.random() + floorLeft;
    }
  }
};

module.exports = Physic;

},{}]},{},[1]);
