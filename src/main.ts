import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.z = 5

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(w, h)

// Controls
new OrbitControls(camera, renderer.domElement)

// Resize
window.addEventListener('resize', () => {
  ;[w, h] = useWindowDimensions()
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
})

// View
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
)
scene.add(cube)

// Animate
function animate() {
  cube.rotation.x += 0.01
  cube.rotation.y += 0.01
}

// Loop
function loop() {
  animate()
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
