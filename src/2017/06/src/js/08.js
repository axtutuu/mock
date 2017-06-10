const canvas = document.getElementById('canvas'),
      gl = canvas.getContext('webgl');

init();

function init() {
  const c = canvas;
  canvas.width = 300,
  canvas.height = 300,

  // 初期化
  gl.clearColor(0.0,0.0,0.0,1.0);
  gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT);

  const vShader = create_shader('vs'),
        fShader = create_shader('fs'),
        pg      = create_program(vShader, fShader),
        attLocation = gl.getAttribLocation(pg, 'position'),
        attStride = 3,
        vertexPos = [
          0.0, 1.0, 0.0,
          1.0, 0.0, 0.0,
          -1.0,0.0, 0.0
        ],
        vbo     = create_vbo(vertexPos);
  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.enableVertexAttribArray(attLocation);
  gl.vertexAttribPointer(attLocation, attStride, gl.FLOAT, false, 0, 0);

  const m = new matIV(),
        mMatrix = m.identity(m.create()),
        vMatrix = m.identity(m.create()),
        pMatrix = m.identity(m.create()),
        mvpMatrix = m.identity(m.create());

  m.lookAt([0.0, 1.0, 3.0], [0,0,0], [0,1,0], vMatrix);
  m.perspective(90,c.width/c.height,0.1,100,pMatrix);

  // 各行列を掛け合わせ座標変換行列を完成させる
  m.multiply(pMatrix, vMatrix, mvpMatrix);
  m.multiply(mvpMatrix, mMatrix, mvpMatrix);

  const uniLocation = gl.getUniformLocation(pg, 'mvpMatrix');
  gl.uniformMatrix4fv(uniLocation, false, mvpMatrix);

  gl.drawArrays(gl.TRIANGLES, 0, 3);
  gl.flush();
}

function create_shader(id) {
  const el = document.getElementById(id);
  if(!el) return;

  let shader;
  switch(el.type) {
    case 'x-shader/x-fragment':
      shader = gl.createShader(gl.FRAGMENT_SHADER);
      break;
    case 'x-shader/x-vertex':
      shader = gl.createShader(gl.VERTEX_SHADER);
      break;
  }

  gl.shaderSource(shader, el.text);
  gl.compileShader(shader);

  if(gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    return shader;
  } else {
    console.log('shader error', gl.getShaderInfoLog(shader));
  }
}

function create_program(vs, fs) {
  const pg = gl.createProgram();

  gl.attachShader(pg, vs);
  gl.attachShader(pg, fs);
  gl.linkProgram(pg);

  if(gl.getProgramParameter(pg, gl.LINK_STATUS)) {
    gl.useProgram(pg);
    return pg;
  } else {
    alert(gl.getProgramInfoLog(pg));
  }
}

function create_vbo(data) {
  const vbo = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);

  return vbo;
}
