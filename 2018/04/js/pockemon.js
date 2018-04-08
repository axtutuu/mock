(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

var canvas = document.querySelector("canvas");
var cxt = canvas.getContext("2d");
var w = canvas.offsetWidth;
var h = canvas.offsetHeight;

var objectSize = 20;
var speed = 100;
var modifier = 100;
var score = 0;

var terrainImage = new Image();
var pokeballImage = new Image();
var houseImage = new Image();
var playerImage = new Image();
terrainImage.src = "./image/pokemon_terrain.jpg";
houseImage.src = "./image/house.png";
playerImage.src = "./image/player.png";
pokeballImage.src = "./image/pokemon_terrain.jpg";

new Promise(function (resolve) {
  var count = 0;
  terrainImage.onload = next;
  houseImage.onload = next;
  playerImage.onload = next;
  pokeballImage.onload = next;

  function next() {
    count++;
    console.log(count, 'next');
    if (count >= 4) resolve();
  }
}).then(function () {
  update();
  console.log('loaded');
});

var player = {
  x: Math.round(w / 2 / objectSize),
  y: Math.round(h / 2 / objectSize),
  currentDirection: "stand",
  direction: {
    "stand": {
      x: 0,
      y: 0
    },
    "down-1": {
      x: 17,
      y: 0
    },
    "down-2": {
      x: 34,
      y: 0
    },
    "up-1": {
      x: 142,
      y: 0
    },
    "up-2": {
      x: 142,
      y: 0
    },
    "left-1": {
      x: 69,
      y: 0
    },
    "left-2": {
      x: 87,
      y: 0
    },
    "right-1": {
      x: 160,
      y: 0
    },
    "right-2": {
      x: 178,
      y: 0
    }
  }
};

player.move = function (direction) {
  var hold_player = {
    x: player.x,
    y: player.y

    /**
     * Decide here the direction of the user and do the neccessary changes on the directions
     */
  };switch (direction) {
    case "left":
      player.x -= speed / modifier;
      if (player.currentDirection == "stand") {
        player.currentDirection = "left-1";
      } else if (player.currentDirection == "left-1") {
        player.currentDirection = "left-2";
      } else if (player.currentDirection == "left-2") {
        player.currentDirection = "left-1";
      } else {
        player.currentDirection = "left-1";
      }
      break;
    case "right":
      player.x += speed / modifier;
      if (player.currentDirection == "stand") {
        player.currentDirection = "right-1";
      } else if (player.currentDirection == "right-1") {
        player.currentDirection = "right-2";
      } else if (player.currentDirection == "right-2") {
        player.currentDirection = "right-1";
      } else {
        player.currentDirection = "right-1";
      }
      break;
    case "up":
      player.y -= speed / modifier;
      if (player.currentDirection == "stand") {
        player.currentDirection = "up-1";
      } else if (player.currentDirection == "up-1") {
        player.currentDirection = "up-2";
      } else if (player.currentDirection == "up-2") {
        player.currentDirection = "up-1";
      } else {
        player.currentDirection = "up-1";
      }
      break;
    case "down":
      player.y += speed / modifier;
      if (player.currentDirection == "stand") {
        player.currentDirection = "down-1";
      } else if (player.currentDirection == "down-1") {
        player.currentDirection = "down-2";
      } else if (player.currentDirection == "down-2") {
        player.currentDirection = "down-1";
      } else {
        player.currentDirection = "down-1";
      }
      break;
  }

  if (check_collision(player.x, player.y)) {
    player.x = hold_player.x;
    player.y = hold_player.y;
  }

  update();
};

function update() {
  cxt.drawImage(terrainImage, 0, 0);
  cxt.drawImage(houseImage, 80, 60);

  // board()

  // player
  cxt.drawImage(playerImage, player.direction[player.currentDirection].x, player.direction[player.currentDirection].y, objectSize - 2, objectSize, player.x * objectSize, player.y * objectSize, objectSize, objectSize);
}

/**
 * Our function that decides if there is a collision on the objects or not
 * @function
 * @name check_collision
 * @param {Integer} x - The x axis
 * @param {Integer} y - The y axis
 */
function check_collision(x, y) {
  var foundCollision = false;

  if (x > 3 && x < 9 && y == 6 || x > 4 && x < 9 && (y == 5 || y == 4 || y == 3)) {
    console.log("on house");

    foundCollision = true;
  }

  if (x < 1 || x > 20 || y < 2 || y > 20 || y > 0 && y < 4 && (x == 20 || x == 19) || // right corner
  y > 0 && y < 4 && (x == 2 || x == 3) || // left corner
  y > 18 && (x == 2 || x == 3) || x > 17 && (y == 19 || y == 20) || x > 19 && (y == 17 || y == 18)) {
    foundCollision = true;
  }

  return foundCollision;
}

/**
 * Here we are creating our board on the bottom right with our score
 * @todo maybe some mute button for the future?
 * @function
 * @name board
 */
function board() {
  cxt.fillStyle = "rgba(0, 0, 0, 0.5)";
  cxt.fillRect(w - 100, h - 70, 100, 70);

  cxt.font = "18px Arial";
  cxt.fillStyle = "rgba(255, 255, 255, 1)";
  cxt.fillText("You Found", w - 93, h - 45);

  cxt.font = "14px Arial";
  cxt.fillStyle = "rgba(255, 255, 255, 1)";
  cxt.fillText(score + " poketballs", w - 85, h - 25);
}

document.onkeydown = function (e) {
  if (e.keyCode == "37") player.move("left");else if (e.keyCode == "38") player.move("up");else if (e.keyCode == "39") player.move("right");else if (e.keyCode == "40") player.move("down");
};

},{}]},{},[1]);
