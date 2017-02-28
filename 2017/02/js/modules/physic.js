(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Physic = function () {
  function Physic() {
    var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Physic);

    var time = 1 / 24;
    this.canvas = opts.canvas || createElement('div');
    this.stage = new createjs.Stage(this.canvas);
    this.gravityVertical = 10;
    this.velocityIterations = 8;
    this.positionInterations = 3;

    this.initBox();
    createjs.Ticker.setInterval(time * 1000);
    createjs.Ticker.addEventListener('tick', this.update);
  }

  _createClass(Physic, [{
    key: 'initBox',
    value: function initBox() {
      var height = this.canvas.height,
          width = this.canvas.width,
          b2Vec2 = Box2D.Common.Math.b2Vec2,
          b2World = Box2D.Dynamics.b2World,
          centerX = width / 2,
          floorWidth = width * 0.8,
          floorHeight = this.boxEdge,
          floorLeft = (width - floorWidth) / 2;
      var floorShape = this.createFloor(centerX, height - floorHeight, floorWidth, floorHeight, '#CCC');
      this.world = new b2World(new b2Vec2(0, this.gravityVertical), true);
      this.stage.addChild(floorShape);
      var shape = createDynamicBox(centerX, boxEdge, boxEdge, boxEdge, "#0000FF");
      this.stage.addChild(shape);
    }
  }, {
    key: 'createDynamicBox',
    value: function createDynamicBox(x, y, width, height, color) {
      var b2Body = Box2D.Dynamics.b2Body;
      var bodyDef = defineBody(x, y, width, height, color);
      var shape = createShape(bodyDef, width, height, color);
      createBody(this.world, bodyDef);
      return shape;
    }
  }, {
    key: 'createFloor',
    value: function createFloor(x, y, width, height, color) {
      var b2Body = Box2D.Dynamics.b2Body;
      var bodyDef = defineBody(x, y, b2Body.b2_staticBody);
      var shape = createShape(bodyDef, width, height, color);
      createBody(this.world, bodyDef);
    }
  }, {
    key: 'createShape',
    value: function createShape(bodyDef, width, height, color) {
      var shape = new createjs.Shape();
      this.draw(shape.graphics, width, height, color);
      shape.regX = width / 2;
      shape.regY = height / 2;
      bodyDef.userData = shape;
      return shape;
    }
  }, {
    key: 'createBody',
    value: function createBody(world, bodyDef) {
      world.CreateBody(bodyDef);
    }
  }, {
    key: 'update',
    value: function update() {
      this.world.Step(time, velocityIterations, positionInterations);
      var body = this.world.GetBodyList();
      while (body) {
        var obj = body.GetUserData();
        if (obj) {
          var position = body.GetPosition();
          obj.x = position.x / this.scale;
          obj.y = position.y / this.scale;
          obj.rotation = body.GetAngle() / Matrix2X.DEG_TO_RAD;
        }
        body = body.GetNext();
      }
      this.stage.update();
    }
  }]);

  return Physic;
}();

exports.default = Physic;

},{}]},{},[1]);
