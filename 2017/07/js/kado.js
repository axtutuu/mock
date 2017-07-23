(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

/*
 * constants
 */
var camera, orbitControls, renderer;
var prevCameraMatrixWorld;
var textureScene, mainScene;
var mouse = new THREE.Vector2(0.5, 0.5);
var canvas;
var stats;
var textureCube, texture2Ds;

// camera
var WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight,
    ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 2000;

var clock = new THREE.Clock();

var config = {
	saveImage: function saveImage() {
		render(true);
		window.open(canvas.toDataURL());
	},
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

function createQuadScene(parameters) {
	var scene = new THREE.Scene();
	var geometry = new THREE.PlaneBufferGeometry(2.0, 2.0);
	var material = new THREE.RawShaderMaterial({
		uniforms: parameters.uniforms,
		vertexShader: parameters.vertexShader,
		fragmentShader: parameters.fragmentShader
	});
	var plane = new THREE.Mesh(geometry, material);
	plane.frustumCulled = false;
	scene.add(plane);

	return {
		scene: scene,
		geometry: geometry,
		material: material
	};
}

function init() {
	// renderer
	var main = document.querySelector('.js-main');
	renderer = new THREE.WebGLRenderer({ antialias: true });

	// renderer = new THREE.WebGLRenderer();
	// renderer.setPixelRatio(config.pixelRatio);
	// renderer.setSize(config.resolution * config.aspectRatio, config.resolution);
	renderer.setSize(WIDTH, HEIGHT);

	canvas = renderer.domElement;
	main.appendChild(canvas);

	if (!renderer.extensions.get("EXT_shader_texture_lod")) {
		alert("EXT_shader_texture_lod is not supported.");
		return;
	}

	// camera
	camera = new THREE.PerspectiveCamera(35, 800 / 600);
	camera.position.z = 16;
	camera.lookAt(new THREE.Vector3(0.0, 0.0, 0.0));

	mainScene = createQuadScene({
		uniforms: {
			resolution: { type: 'v2', value: new THREE.Vector2(config.resolution, config.resolution) },
			time: { type: 'f', value: 0.0 },
			cameraPos: { type: 'v3', value: camera.getWorldPosition() },
			cameraDir: { type: 'v3', value: camera.getWorldDirection() },

			kadoScale: { type: 'f', value: config.kadoScale },
			textureCube: { type: 'tc', value: textureCube }
		},
		vertexShader: document.getElementById('vertexShader').textContent,
		fragmentShader: document.getElementById('fragmentShader').textContent
	});

	var axes = new THREE.AxisHelper(100);
	mainScene.scene.add(axes);

	// controls
	orbitControls = new THREE.OrbitControls(camera, canvas);
	// orbitControls.enablePan = true;
	// orbitControls.enableDamping = false;
	// orbitControls.enableZoom = true;
	// orbitControls.autoRotate = false;
	// orbitControls.autoRotateSpeed = 0.0;
	// orbitControls.target = new THREE.Vector3(0.0, 0.0, 0.0);
}

function animate(timestamp) {
	var delta = clock.getDelta();

	if (false) {
		config.time += delta;
	}

	var needsUpdate = config.time !== mainScene.material.uniforms.time.value;

	orbitControls.update();

	if (camera && prevCameraMatrixWorld && !camera.matrixWorld.equals(prevCameraMatrixWorld)) {
		needsUpdate = true;
	}
	prevCameraMatrixWorld = camera.matrixWorld.clone();

	render(needsUpdate);
	requestAnimationFrame(animate);
}

function render(needsUpdate) {
	mainScene.material.uniforms.resolution.value = new THREE.Vector2(canvas.width, canvas.height);
	mainScene.material.uniforms.cameraPos.value = camera.getWorldPosition();
	mainScene.material.uniforms.cameraDir.value = camera.getWorldDirection();
	//mainScene.material.uniforms.kadoScale.value = config.kadoScale;
	mainScene.material.uniforms.time.value = config.time;

	if (needsUpdate) {
		renderer.render(mainScene.scene, camera);
	}
}

},{}]},{},[1]);
