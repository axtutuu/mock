(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * fork: https://threejs.org/examples/#webgl_buffergeometry_rawshader
 */

/*
 * init setting
 */
var container = void 0,
    scene = void 0,
    camera = void 0,
    renderer = void 0,
    controls = void 0,
    stats = void 0,
    manager = void 0;

var video = void 0,
    videoImage = void 0,
    videoImageContext = void 0,
    videoTexture = void 0;

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

  container = document.querySelector('.js-main');
  console.log(container);
  container.appendChild(renderer.domElement);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // LIGHT
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 250, 0);
  scene.add(light);

  //  // cube
  //  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  //  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  //  // const material = new THREE.MeshBasicMaterial({ map: 'red' });
  //  const cube = new THREE.Mesh( geometry, material );
  //  scene.add( cube );
  //  camera.lookAt(cube.position);
  //  camera.position.set(0,15,30);

  // kado
  var triangles = 500;
  var geometry = new THREE.BufferGeometry();
  var vertices = new Float32Array(triangles * 3 * 3);
  for (var i = 0, l = triangles * 3 * 3; i < l; i += 3) {
    vertices[i] = Math.random() - 0.5;
    vertices[i + 1] = Math.random() - 0.5;
    vertices[i + 2] = Math.random() - 0.5;
  }
  geometry.addAttribute('position', new THREE.BufferAttribute(vertices, 3));

  var colors = new Uint8Array(triangles * 3 * 4);
  for (var i = 0, l = triangles * 3 * 4; i < l; i += 4) {
    colors[i] = Math.random() * 255;
    colors[i + 1] = Math.random() * 255;
    colors[i + 2] = Math.random() * 255;
  }
  geometry.addAttribute('color', new THREE.BufferAttribute(colors, 4, true));

  var mate = new THREE.RawShaderMaterial({
    uniforms: {
      time: { value: 1.0 }
    },
    vertexShader: document.getElementById('vertex_shader').textContent,
    fragmentShader: document.getElementById('fragment_shader').textContent
  });
  var plane = new THREE.Mesh(geometry, mate);
  scene.add(plane);
  console.log(plane.position);
  camera.lookAt(plane.position);
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
  renderer.render(scene, camera);
}

},{}]},{},[1]);
