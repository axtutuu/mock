(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var camvideo = document.getElementsByClassName('js-monitor')[0];
console.log(navigator.getUserMedia);
if (!navigator.getUserMedia) {
  alert('could not to access');
} else {
  navigator.getUserMedia({ video: true }, gotStream, noStream);
}

function gotStream(stream) {
  alert(stream);
  camvideo.src = window.URL.createObjectURL(stream);
  stream.onended = noStream;
}

function noStream(e) {
  var msg = 'No camera available.';
  if (e.code === 1) {
    msg = 'User denied access to use camera.';
  }
  console.log(msg);
}

/*
 * init setting
 */
var main = document.getElementsByClassName('js-main')[0];
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
main.appendChild(renderer.domElement);

/*
 * vr setting
 */
var controls = new THREE.VRControls(camera);
controls.standing = true;

var effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

var manager = new WebVRManager(renderer, effect);

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

/*
 * 箱をおく
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 0, -5);
// scene.add(cube);

/*
 * video
 */
var video = document.getElementsByClassName('jjjk');

function render() {
  // cube.rotation.x += 0.1;
  // cube.rotation.y += 0.1;
  // requestAnimationFrame(render);
  // renderer.render(scene, camera);
  manager.render(scene, camera);
}

function onResize(e) {
  effect.setSize(window.innerWidth / window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}
render();
// renderer.render(scene, camera);

},{}]},{},[1]);
