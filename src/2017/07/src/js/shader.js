/*
 * Refer: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Webcam-Texture.html
 * http://stemkoski.github.io/Three.js/Webcam-Texture.html
 */


/*
 * init setting
 */
let container, scene, camera, renderer, controls, stats, manager;

let video, videoImage, videoImageContext, videoTexture;

init();
animate();

function init() {
  // scene
  scene = new THREE.Scene();

  // camera
  const WIDTH = window.innerWidth,
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
  renderer = new THREE.WebGLRenderer({ antialias:true });
  renderer.setSize(WIDTH, HEIGHT);

  container = document.querySelector('.js-main');
  console.log(container);
  container.appendChild(renderer.domElement);

  // controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);

  // LIGHT
	let light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
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
  const triangles = 500;
  const geometry = new THREE.BufferGeometry();
  const vertices = new Float32Array( triangles * 3 * 3 );
  for ( var i = 0, l = triangles * 3 * 3; i < l; i += 3 ) {
    vertices[ i     ] = Math.random() - 0.5;
    vertices[ i + 1 ] = Math.random() - 0.5;
    vertices[ i + 2 ] = Math.random() - 0.5;
  }
  geometry.addAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );

  const colors = new Uint8Array( triangles * 3 * 4 );
  for ( var i = 0, l = triangles * 3 * 4; i < l; i += 4 ) {
    colors[ i     ] = Math.random() * 255;
    colors[ i + 1 ] = Math.random() * 255;
    colors[ i + 2 ] = Math.random() * 255;
  }
  geometry.addAttribute( 'color', new THREE.BufferAttribute( colors, 4, true ) );


  const mate = new THREE.RawShaderMaterial( {
  	uniforms: {
  		time: { value: 1.0 },
  	},
  	vertexShader: document.getElementById('vertex_shader').textContent,
  	fragmentShader: document.getElementById('fragment_shader').textContent,
  });
  const plane = new THREE.Mesh(geometry, mate);
  scene.add( plane );
  console.log(plane.position);
  camera.lookAt(plane.position);
}

function animate() 
{
  requestAnimationFrame( animate );
	render();		
	update();
}

function update()
{		
	controls.update();
}

function render() 
{	
	renderer.render( scene, camera );
}
