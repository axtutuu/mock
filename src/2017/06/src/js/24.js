/*
 * Refer: https://github.com/stemkoski/stemkoski.github.com/blob/master/Three.js/Webcam-Texture.html
 * http://stemkoski.github.io/Three.js/Webcam-Texture.html
 */


/*
 * video setting
 */
navigator
  .mediaDevices
  .enumerateDevices()
  .then(gotDevice)
  .then(getStream);

const camvideo = document.querySelector('.js-monitor');

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

function option(id) {
  return {
    video: {
      optional: [{
        sourceId: id
      }]
    }
  }
}

function gotDevice(deviceInfos) {
  const ids = [];
  // 背面カメラを使う
  return new Promise(resolve=>{
    deviceInfos.forEach(v=>{
      if(v.kind === 'videoinput') {
        ids.push(v.deviceId)
      }
    });
    resolve(option(ids[1] || ids[0]));
  });
}

function getStream(opts) {
  navigator.getUserMedia(opts, gotStream, noStream);
}

function gotStream(stream) {
  if(window.URL) {
    camvideo.src = window.URL.createObjectURL(stream);
  } else {
    camvideo.src = stream;
  }
  stream.onended = noStream;
}

function noStream(e) {
  let msg = 'No camera available.';
  if(e.code === 1) {
    msg = 'User denied access to use camera.'; 
  }
  console.log(msg);
}

function handleError(error) {
  console.log('Error: ', error);
}

/*
 * video setting
 */


/*
 * init setting
 */
let container, scene, camera, renderer, controls, stats;

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
        FAR = 20000;

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

  // events
  // THREE.WindowResize(renderer, camera);


  // Stats
  // stats = new Stats();
	// stats.domElement.style.position = 'absolute';
	// stats.domElement.style.bottom = '0px';
	// stats.domElement.style.zIndex = 100;
	// container.appendChild( stats.domElement );


  // LIGHT
	let light = new THREE.PointLight(0xffffff);
	light.position.set(0,250,0);
	scene.add(light);

	let floorTexture = new THREE.ImageUtils.loadTexture( 'img/checkerboard.jpg' );
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping; 
	floorTexture.repeat.set( 10, 10 );
	let floorMaterial = new THREE.MeshBasicMaterial( { map: floorTexture, side: THREE.DoubleSide } );
	let floorGeometry = new THREE.PlaneGeometry(1000, 1000, 10, 10);
	let floor = new THREE.Mesh(floorGeometry, floorMaterial);
	floor.position.y = -0.5;
	floor.rotation.x = Math.PI / 2;
	scene.add(floor);

  /*
   * video
   */
  video = document.querySelector('.js-monitor');
  videoImage = document.getElementsByClassName('js-monitor-canvas')[0];
  videoImageContext = videoImage.getContext('2d');

  videoImageContext.fillStyle = '#000000';
  videoImageContext.fillRect(0, 0, videoImage.width, videoImage.height);

  videoTexture  = new THREE.Texture(videoImage);
  videoTexture.minFilter = THREE.LinearFilter;
  videoTexture.magFilter = THREE.LinearFilter;

  const webcamMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: true, side: THREE.DoubleSide }),
        webcamGeometry = new THREE.PlaneGeometry(100, 100, 1, 1),
        // webcamGeometry = new THREE.BoxGeometry(10, 10, 10),
        webcamScreen   = new THREE.Mesh(webcamGeometry, webcamMaterial);
  webcamScreen.position.set(0, 50, 0);
  scene.add(webcamScreen);

  camera.position.set(0,150,300);
  camera.lookAt(webcamScreen.position);
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
	// stats.update();
}
function render() 
{	
	if ( video.readyState === video.HAVE_ENOUGH_DATA ) 
	{
		videoImageContext.drawImage( video, 0, 0, videoImage.width, videoImage.height );
		if ( videoTexture ) 
			videoTexture.needsUpdate = true;
	}
	renderer.render( scene, camera );
}



// const main = document.getElementsByClassName('js-main')[0];
// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera(
//         75, window.innerWidth / window.innerHeight, 0.1, 1000 
//       )
// const renderer = new THREE.WebGLRenderer();
// renderer.setSize(window.innerWidth, window.innerHeight);
// main.appendChild(renderer.domElement);
// 
// const newCam = new THREE.OrbitControls(camera);
// newCam.autoRotate = true;
// 
// // const mouseControls = new THREE.TrackballControls( camera );
// 
// /*
//  * vr setting
//  */
// const controls = new THREE.VRControls(camera);
// controls.standing = true;
// 
// const effect = new THREE.VREffect(renderer);
// effect.setSize(window.innerWidth, window.innerHeight);
// 
// const manager = new WebVRManager(renderer, effect);
// 
// window.addEventListener('resize', onResize, true);
// window.addEventListener('vrdisplaypresentchange', onResize, true);
// 
// /*
//  * debug
//  */
// console.log(newCam);
// 
// /*
//  * 箱をおく
//  */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
// const cube = new THREE.Mesh(geometry, material);
// cube.position.set(0, 0, 5);
// 
// 
// 
// animate();
// function animate() {
//   requestAnimationFrame(animate);
//   render();
// }
// 
// function render() {
//   if(video.readyState === video.HAVE_ENOUGH_DATA)
//     videoCanvasCxt.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
//   videoTexture.needsUpdate = true;
// 
//   renderer.render(scene, camera);
//   manager.render(scene, camera);
//   // mouseControls.update();
// }
// 
// function onResize(e) {
//   // effect.setSize(window.innerWidth / window.innerHeight);
//   // camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
// }
