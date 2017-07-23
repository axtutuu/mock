console.log('webvr');
let scene, camera, renderer, controls, stats, manager;

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
  const container = document.querySelector('.js-main');
  container.appendChild(renderer.domElement);


  // controls
  // controls = new THREE.OrbitControls(camera, renderer.domElement);

  controls = new THREE.VRControls(camera);
  controls.standing = true;
  const effect = new THREE.VREffect(renderer);
  effect.setSize(window.innerWidth, window.innerHeight);
  manager = new WebVRManager(renderer, effect);

  // debug
  var axes = new THREE.AxisHelper(100);
  scene.add(axes);

  // sky

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
	// renderer.render( scene, camera );
  manager.render( scene, camera);
}
