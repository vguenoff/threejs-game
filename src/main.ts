import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Scene
const scene = new T.Scene()
const camera = new T.PerspectiveCamera(75, w / h, 0.1, 1000)
camera.position.z = 5

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new T.WebGLRenderer({ canvas })
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
const ground = new T.Mesh(
  new T.BoxGeometry(5, 0.5, 10),
  new T.MeshStandardMaterial({ color: 0x0000ff })
)
ground.position.y = -2
scene.add(ground)

const cube = new T.Mesh(
  new T.BoxGeometry(1, 1, 1),
  new T.MeshStandardMaterial({ color: 0x00ff00 })
)
scene.add(cube)

const light = new T.DirectionalLight(0xffffff, 1)
light.position.set(0, 3, 2)
scene.add(light)

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
