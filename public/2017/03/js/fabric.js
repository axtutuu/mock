(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

(function (doc, win) {
    var canvas = doc.querySelector('.js-canvas');
    var stage = new fabric.Canvas(canvas);

    var rect = new fabric.Rect({
        left: 0,
        top: 0,
        fill: 'red',
        width: 100,
        height: 100
    });

    fabric.Canvas.prototype.customiseControls({
        tl: {
            action: 'rotate',
            cursor: 'pointer'
        },
        tr: {
            action: 'scale'
        },
        bl: {
            action: 'remove',
            cursor: 'pointer'
        }
    }, function () {
        stage.renderAll();
    });

    fabric.Object.prototype.customiseCornerIcons({
        settings: {
            borderColor: '#0094dd',
            cornerSize: 50,
            cornerShape: 'rect'
        },
        tl: {
            // TODO: react menu display
            icon: 'images/rotate.png'
        },
        tr: {
            icon: 'images/resize.png'
        },
        bl: {
            icon: 'images/trash.png'
        }
    }, function () {
        stage.renderAll();
    });

    stage.add(rect);
    stage.item(0)['hasRotatingPoint'] = false;
})(document, window);

},{}]},{},[1]);
