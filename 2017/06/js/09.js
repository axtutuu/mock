(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var canvas = document.getElementById('canvas'),
    gl = canvas.getContext('webgl');

init();

function init() {
  var c = canvas;
  canvas.width = 300, canvas.height = 300,

  // 初期化
  gl.clearColor(0.0, 0.0, 0.0, 1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  var vShader = create_shader('vs'),
      fShader = create_shader('fs'),
      pg = create_program(vShader, fShader),
      attLocation = [gl.getAttribLocation(pg, 'position'), gl.getAttribLocation(pg, 'color')],
      attStride = [3, 4],
      vertexPos = [0.0, 1.0, 0.0, 1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
      vertexColor = [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0],
      positionVbo = create_vbo(vertexPos),
      colorVbo = create_vbo(vertexColor);

  gl.bindBuffer(gl.ARRAY_BUFFER, positionVbo);
  gl.enableVertexAttribArray(attLocation[0]);
  gl.vertexAttribPointer(attLocation[0], attStride[0], gl.FLOAT, false, 0, 0);

  gl.bindBuffer(gl.ARRAY_BUFFER, colorVbo);
  gl.enableVertexAttribArray(attLocation[1]);
  gl.vertexAttribPointer(attLocation[1], attStride[1], gl.FLOAT, false, 0, 0);

  var m = new matIV(),
      mMatrix = m.identity(m.create()),
      vMatrix = m.identity(m.create()),
      pMatrix = m.identity(m.create()),
      mvpMatrix = m.identity(m.create());

  m.lookAt([0.0, 1.0, 3.0], [0, 0, 0], [0, 1, 0], vMatrix);
  m.perspective(90, c.width / c.height, 0.1, 100, pMatrix);

  // 各行列を掛け合わせ座標変換行列を完成させる
  m.multiply(pMatrix, vMatrix, mvpMatrix);
  m.multiply(mvpMatrix, mMatrix, mvpMatrix);

  var uniLocation = gl.getUniformLocation(pg, 'mvpMatrix');
  gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();
}

function create_shader(id) {
  var el = document.getElementById(id);
  if (!el) return;

  var shader = void 0;
  switch (el.type) {
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    case 'x-shader/x-vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
  }

  gl.shaderSource(shader, el.text);
  gl.compileShader(shader);

  if (gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    console.log('shader error', gl.getShaderInfoLog(shader));
  }
}

function create_program(vs, fs) {
  var pg = gl.createProgram();

  gl.attachShader(pg, vs);
  gl.attachShader(pg, fs);
  gl.linkProgram(pg);

  if (gl.getProgramParameter(pg, gl.LINK_STATUS)) {
    gl.useProgram(pg);
    return pg;
  } else {
    alert(gl.getProgramInfoLog(pg));
  }
}

function create_vbo(data) {
  var vbo = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
}

},{}]},{},[1]);
