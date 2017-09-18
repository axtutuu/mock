(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

// link: http://www.lessmilk.com/tutorial/flappy-bird-phaser-1
var main = {
  preload: function preload() {
    game.load.image('bird', 'assets/bird.png');
    game.load.image('pipe', 'assets/pipe.png');
  },

  create: function create() {
    game.state.backgroundColor = '#71c5cf';
    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.bird = game.add.sprite(100, 245, 'bird');
    game.physics.arcade.enable(this.bird);
    this.bird.body.gravity.y = 1000;

    var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    spaceKey.onDown.add(this.jump, this);

    // pipes
    this.pipes = game.add.group();
    this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
  },

  update: function update() {
    if (this.bird.y < 0 || this.bird.y > 490) {
      this.restartGame();
    }
  },

  jump: function jump() {
    this.bird.body.velocity.y = -350;
  },

  restartGame: function restartGame() {
    game.state.start('main');
  },

  addOnePipe: function addOnePipe(x, y) {
    var pipe = game.add.sprite(x, y, 'pipe');
    this.pipes.add(pipe);

    game.physics.arcade.enable(pipe);
    pipe.body.velocity.x = -200;

    pipe.checkWorldBounds = true;
    pipe.outOfBoundsKill = true;
  },

  addRowOfPipes: function addRowOfPipes() {
    var hole = Math.floor(Math.random() * 5) + 1;

    console.log(hole);

    for (var i = 0; i < 8; i++) {
      if (i != hole && i != hole + 1) {
        this.addOnePipe(400, i * 60 + 10);
      }
    }
  }
};

var game = new Phaser.Game(400, 490);
game.state.add('main', main);
game.state.start('main');

},{}]},{},[1]);
