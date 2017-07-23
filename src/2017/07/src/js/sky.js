/*
 * fork: https://threejs.org/examples/#webgl_buffergeometry_rawshader
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

  /*
   * vr setting
   */
  // controls = new THREE.VRControls(camera);
  // controls.standing = true;
  // const effect = new THREE.VREffect(renderer);
  // effect.setSize(window.innerWidth, window.innerHeight);
  // manager = new WebVRManager(renderer, effect);


  // cube
  const geometry = new THREE.BoxGeometry( 1, 1, 1 );
  const material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
  // const material = new THREE.MeshBasicMaterial({ map: 'red' });
  const cube = new THREE.Mesh( geometry, material );
  scene.add( cube );
  camera.lookAt(cube.position);
  camera.position.set(0,15,30);

  var axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // sky
  //     const cubeTexLoader = new THREE.CubeTextureLoader();
  //     const urls = ["img/px.jpg", "img/nx.jpg", "img/py.jpg", "img/ny.jpg", "img/pz.jpg", "img/nz.jpg"];

  //     cubeTexLoader.load( urls, tex => {
  //       const cubeShader = THREE.ShaderLib[ 'cube' ];
  //       cubeShader.uniforms[ 'tCube' ].value = tex;

  //       const skyBoxMaterial = new THREE.ShaderMaterial({
  //           fragmentShader: cubeShader.fragmentShader,
  //           vertexShader: cubeShader.vertexShader,
  //           uniforms: cubeShader.uniforms,
  //           depthWrite: false,
  //           side: THREE.BackSide
  //       });
  //       const mesh = new THREE.Mesh(
  //         new THREE.BoxGeometry( 3000, 3000, 3000, 1, 1, 1 ), 
  //         skyBoxMaterial
  //       );
  //       scene.add( mesh );
  //     });

  const urls = ["img/px.jpg", "img/nx.jpg", "img/py.jpg", "img/ny.jpg", "img/pz.jpg", "img/nz.jpg"];
  const scCube = THREE.ImageUtils.loadTextureCube(urls);
  scCube.format = THREE.RGBFormat;
  const  skyShader = THREE.ShaderLib["cube"];
  skyShader.uniforms["tCube"].value = scCube;
  const skyMaterial = new THREE.ShaderMaterial({
        fragmentShader: skyShader.fragmentShader,
        vertexShader: skyShader.vertexShader,
        uniforms: skyShader.uniforms,
        depthWrite: false,
        side: THREE.BackSide
    });
  const skyBox = new THREE.Mesh(new THREE.CubeGeometry(500, 500, 500), skyMaterial);
  skyMaterial.needsUpdate = true;
  scene.add(skyBox);


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
