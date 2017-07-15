
navigator
  .mediaDevices
  .enumerateDevices()
  .then(gotDevice)
  .then(getStream);

navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
window.URL = window.URL || window.webkitURL;

const camvideo = document.getElementsByClassName('js-monitor')[0];

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
 * init setting
 */
const main = document.getElementsByClassName('js-main')[0];
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
        75, window.innerWidth / window.innerHeight, 0.1, 1000 
      )
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
main.appendChild(renderer.domElement);

// const mouseControls = new THREE.TrackballControls( camera );

/*
 * vr setting
 */
const controls = new THREE.VRControls(camera);
controls.standing = true;

const effect = new THREE.VREffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);

const manager = new WebVRManager(renderer, effect);

window.addEventListener('resize', onResize, true);
window.addEventListener('vrdisplaypresentchange', onResize, true);

/*
 * 箱をおく
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, 5);

/*
 * video
 */
const video = document.getElementsByClassName('js-monitor')[0],
      videoCanvas = document.getElementsByClassName('js-monitor-canvas')[0],
      videoCanvasCxt = videoCanvas.getContext('2d');

videoCanvasCxt.fillStyle = '#000000';
videoCanvasCxt.fillRect(0, 0, videoCanvas.width, videoCanvas.height);

const videoTexture     = new THREE.Texture(videoCanvas);
videoTexture.minFilter = THREE.LinearFilter;
videoTexture.magFilter = THREE.LinearFilter;

const webcamMaterial = new THREE.MeshBasicMaterial({ map: videoTexture, overdraw: true, side: THREE.DoubleSide }),
      // webcamGeometry = new THREE.PlaneGeometry(100, 100, 1, 1),
      webcamGeometry = new THREE.BoxGeometry(10, 10, 10),
      webcamScreen   = new THREE.Mesh(webcamGeometry, webcamMaterial);
webcamScreen.position.set(0, 0, -15);
scene.add(webcamScreen);

camera.lookAt(webcamScreen.position);


animate();
function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
  if(video.readyState === video.HAVE_ENOUGH_DATA)
    videoCanvasCxt.drawImage(video, 0, 0, videoCanvas.width, videoCanvas.height);
  videoTexture.needsUpdate = true;

  renderer.render(scene, camera);
  manager.render(scene, camera);
  // mouseControls.update();
}

function onResize(e) {
  // effect.setSize(window.innerWidth / window.innerHeight);
  // camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
}