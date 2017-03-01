(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// import Physics from './modules/Physics.js';

(function (doc, win) {
  console.log('physic');

  // const physic = new Physics({
  //   canvas: doc.querySelector('.js-canvas'),
  // });

  console.log(Box2D);
  // let stage, world;
  // const boxEdge = 20,
  //       scale  = 1/30,
  //       gravityVertical = 10;

  // function init() {
  //   const canvas = doc.querySelector('.js-canvas');
  //   stage = new createjs.Stage(canvas);
  //   initBox(canvas.width);
  //   stage.update();
  // }

  // function initBox(width) {
  //   const b2Vec2  = Box2D.Common.Math.b2Vec2;
  //   const b2Body  = Box2D.Dynamics.b2Body;
  //   const b2World = Box2D.Dynamics.b2World;
  //   this.world    = new b2World(new b2Vec2(0, gravityVertical), true);
  //   const bodyDef = defineBody(width/2, boxEdge, b2Body.b2_staticBody);
  //   const shape   = createShape(bodyDef, boxEdge, boxEdge, '#0000FF');
  //   stage.addChild(shape);
  // }

  // function defineBody(x,y,type) {
  //   const b2BodyDef = Box2D.Dynamics.b2BodyDef;
  //   const bodyDef = new b2BodyDef();
  //   bodyDef.position.Set(x*scale, y*scale);
  //   bodyDef.type = type;
  //   return bodyDef;
  // }

  // function createShape(bodyDef, width, height, color) {
  //   const shape = new Shape();
  //   shape.graphics.beginFill(color)
  //                 .drawRect(0,0,width,height);
  //   shape.regX = width/2;
  //   shape.regY = height/2;
  //   bodyDef.userData = shape;
  //   return shape;
  // }

  // init();
})(document, window);

},{}]},{},[1]);
