(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var scene = void 0,
    camera = void 0,
    renderer = void 0,
    controls = void 0,
    stats = void 0,
    manager = void 0;
var kado = {};
var prevCameraMatrixWorld = void 0;

var clock = new THREE.Clock();

var config = {
  camera: 'Orbit',
  resolution: 512,
  aspectRatio: 1,
  pixelRatio: 2.0,
  time: 0,
  // mandel box
  kadoScale: 2.7
};

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
  // camera.position.set(0, 150, 400);
  // camera.lookAt(scene.position);

  // camera = new THREE.PerspectiveCamera(35, 800/600);
  camera.position.z = 16;
  camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

  // renderer
  renderer = new THREE.WebGLRenderer();
  // renderer.setSize(WIDTH, HEIGHT);
  renderer.setPixelRatio(config.pixelRatio);
  renderer.setSize(config.resolution * config.aspectRatio, config.resolution);

  var container = document.querySelector('.js-main');
  container.appendChild(renderer.domElement);

  if (!renderer.extensions.get("EXT_shader_texture_lod")) {
    alert("EXT_shader_texture_lod is not supported.");
    return;
  }

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // controls = new THREE.VRControls(camera);
  // controls.standing = true;
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
  var skyBox = new THREE.Mesh(new THREE.CubeGeometry(5000, 5000, 5000), skyMaterial);
  skyMaterial.needsUpdate = true;
  scene.add(skyBox);

  // kado
  kado.geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
  kado.material = new THREE.RawShaderMaterial({
    uniforms: {
      resolution: { type: 'v2', value: new THREE.Vector2(config.resolution, config.resolution) },
      time: { type: 'f', value: 0.0 },
      cameraPos: { type: 'v3', value: camera.getWorldPosition() },
      cameraDir: { type: 'v3', value: camera.getWorldDirection() },
      kadoScale: { type: 'f', value: config.kadoScale }
    },
    vertexShader: document.getElementById('vertexShader').textContent,
    fragmentShader: document.getElementById('fragmentShader').textContent
  });
  var plane = new THREE.Mesh(kado.geometry, kado.material);
  plane.frustumCulled = false;
  scene.add(plane);
}

function animate() {

  var delta = clock.getDelta();
  if (false) {
    config.time += delta;
  }
  var needsUpdate = config.time !== kado.material.uniforms.time.value;
  if (camera && prevCameraMatrixWorld && !camera.matrixWorld.equals(prevCameraMatrixWorld)) {
    needsUpdate = true;
  }
  prevCameraMatrixWorld = camera.matrixWorld.clone();

  requestAnimationFrame(animate);
  controls.update();
  render(true);
}

function render(needsUpdate) {

  kado.material.uniforms.resolution.value = new THREE.Vector2(renderer.domElement.width, renderer.domElement.height);
  kado.material.uniforms.cameraPos.value = camera.getWorldPosition();
  kado.material.uniforms.cameraDir.value = camera.getWorldDirection();
  kado.material.uniforms.kadoScale.value = config.kadoScale;
  kado.material.uniforms.time.value = config.time;

  renderer.render(scene, camera);
  // if(needsUpdate) {
  //   renderer.render( scene, camera );
  //   // manager.render( scene, camera);
  // }
}

},{}]},{},[1]);
