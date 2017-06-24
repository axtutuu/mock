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

/*
 * 箱をおく
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
const cube = new THREE.Mesh(geometry, material);
cube.position.set(0, 0, -5);
scene.add(cube);

function render() {
  cube.rotation.x += 0.1;
  cube.rotation.y += 0.1;
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
// renderer.render(scene, camera);
