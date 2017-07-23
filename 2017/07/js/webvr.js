(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

console.log('webvr');
var scene = void 0,
    camera = void 0,
    renderer = void 0,
    controls = void 0,
    stats = void 0,
    manager = void 0;

init();
animate();

function init() {
  // scene
  scene = new THREE.Scene();

  // camera
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight,
      ANGLE = 45,
      ASPECT = WIDTH / HEIGHT,
      NEAR = 0.1,
      FAR = 2000;

  camera = new THREE.PerspectiveCamera(ANGLE, ASPECT, NEAR, FAR);
  scene.add(camera);
  camera.position.set(0, 150, 400);
  camera.lookAt(scene.position);

  // renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(WIDTH, HEIGHT);
  var container = document.querySelector('.js-main');
  container.appendChild(renderer.domElement);

  // controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls = new THREE.VRControls(camera);
  controls.standing = true;
  var effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);
  manager = new WebVRManager(renderer, effect);

  // debug
  var axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // sky

  var urls = ["img/px.jpg", "img/nx.jpg", "img/py.jpg", "img/ny.jpg", "img/pz.jpg", "img/nz.jpg"];
  var scCube = THREE.ImageUtils.loadTextureCube(urls);
  scCube.format = THREE.RGBFormat;
  var skyShader = THREE.ShaderLib["cube"];
  skyShader.uniforms["tCube"].value = scCube;
  var skyMaterial = new THREE.ShaderMaterial({
    fragmentShader: skyShader.fragmentShader,
    vertexShader: skyShader.vertexShader,
    uniforms: skyShader.uniforms,
    depthWrite: false,
    side: THREE.BackSide
  });
  var skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skyMaterial);
  skyMaterial.needsUpdate = true;
  scene.add(skyBox);
}

function animate() {
  requestAnimationFrame(animate);
  render();
  update();
}

function update() {
  controls.update();
}

function render() {
  // renderer.render( scene, camera );
  manager.render(scene, camera);
}

},{}]},{},[1]);
