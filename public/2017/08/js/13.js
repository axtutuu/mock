(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * forked : https://codepen.io/paultrone/pen/XbLWMj
 */
var Sphere3D = function () {
  function Sphere3D(radius) {
    _classCallCheck(this, Sphere3D);

    this.radius = radius;
    this.point = new Array();
    this.color = 'rgb(100, 255, 0)';

    this.numberOfVertexes = 0;

    this.setPointAlpha();
    this.setPointBeta();
  }

  _createClass(Sphere3D, [{
    key: 'setPointAlpha',
    value: function setPointAlpha() {
      for (var alpha = 0; alpha <= 6.28; alpha += 0.17) {
        var p = this.point[this.numberOfVertexes] = new Point3D();

        p.x = Math.cos(alpha) * this.radius;
        p.y = 0;
        p.z = Math.sin(alpha) * this.radius;
        this.numberOfVertexes++;
      }
    }
  }, {
    key: 'setPointBeta',
    value: function setPointBeta() {
      for (var direction = 1; direction >= -1; direction -= 2) {
        for (var beta = 0.19; beta < 1.445; beta += 0.17) {
          var redius = Math.cos(beta) * this.radius;
          var fixedY = Math.sin(beta) * this.radius * direction;

          for (var alpha = 0; alpha < 6.28; alpha += 0.17) {
            var p = this.point[this.numberOfVertexes] = new Point3D();
            p.x = Math.cos(alpha) * redius;
            p.y = fixedY;
            p.z = Math.sin(alpha) * redius;

            this.numberOfVertexes++;
          }
        }
      }
    }
  }]);

  return Sphere3D;
}();

function rotateX(p, radians) {
  var y = p.y;
  p.y = y * Math.cos(radians) + p.z * Math.sin(radians) * -1.0;
  p.z = y * Math.sin(radians) + p.z * Math.cos(radians);
}

function rotateY(p, radians) {
  var x = p.x;
  p.x = x * Math.cos(radians) + p.z * Math.sin(radians) * -1.0;
  p.z = x * Math.sin(radians) + p.z * Math.cos(radians);
}

function rotateZ(p, radians) {
  var x = p.x;
  p.x = x * Math.cos(radians) + p.y * Math.sin(radians) * -1.0;
  p.y = x * Math.sin(radians) + p.y * Math.cos(radians);
}

function projection(xy, z, xyOffset, zOffset, distance) {
  return distance * xy / (z - zOffset) + xyOffset;
}

function drawPoint(ctx, x, y, size, color) {
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = color;
  ctx.arc(x, y, size, 0, 2 * Math.PI, true);
  ctx.fill();
  ctx.restore();
}

function update() {
  ctx.save();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (var i = 0; sphere.numberOfVertexes; i++) {
    var p = {};
    console.log(i, sphere.point.length, sphere.point[i]);

    p.x = sphere.point[i].x;
    p.y = sphere.point[i].y;
    p.z = sphere.point[i].z;

    rotateX(p, Math.sin(+new Date() / 360));
    rotateY(p, Math.cos(+new Date() / 360));

    var x = projection(p.x, p.z, canvas.width / 2.0, 100.0, distance);
    var y = projection(p.y, p.z, canvas.height / 2.0, 100.0, distance);

    if (x >= 0 && x < canvas.width) {
      if (y >= 0 && y < canvas.height) {
        if (p.z < 0) {
          drawPoint(ctx, x, y, 1, "rgba(200,200,200,0.6)");
        }
      }
    }
  }
  ctx.restore();
}

function Point3D() {
  this.x = 0;
  this.y = 0;
  this.z = 0;
}

var canvas = document.querySelector('.canvas'),
    ctx = canvas.getContext('2d'),
    distance = 300,
    sphere = new Sphere3D(40);

canvas.width = 800;
canvas.height = 600;
update();

},{}]},{},[1]);
