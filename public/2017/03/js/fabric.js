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

    fabric.Object.prototype.customiseCornerIcons({
        settings: {
            borderColor: 'black',
            cornerSize: 25,
            cornerShape: 'rect',
            cornerBackgroundColor: 'black',
            cornerPadding: 10
        },
        tl: {
            icon: 'images/Synchronize-100.png'
        },
        tr: {
            icon: 'icons/resize.svg'
        },
        bl: {
            icon: 'icons/remove.svg'
        },
        br: {
            icon: 'icons/up.svg'
        },
        mb: {
            icon: 'icons/down.svg'
        }
    }, function () {
        canvas.renderAll();
    });

    stage.add(rect);
})(document, window);

},{}]},{},[1]);
