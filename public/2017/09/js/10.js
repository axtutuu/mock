(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var main = {
  preload: function preload() {
    game.load.image('bird', 'assets/bird.png');
  },

  create: function create() {
    game.state.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);
  },

  update: function update() {
    if (this.bird.y < 0 || this.bird.y > 600) {
      this.restartGame();
    }
  },

  jump: function jump() {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function restartGame() {
    game.state.start('main');
  }
};

var game = new Phaser.Game(600, 600);
game.state.add('main', main);
game.state.start('main');

},{}]},{},[1]);
