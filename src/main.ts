import * as T from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import './style.css'

import Box from './lib/Box'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Scene
const scene = new T.Scene()
const camera = new T.PerspectiveCamera(75, w / h, 0.1, 1000)
const clock = new T.Clock()
camera.position.z = 5

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new T.WebGLRenderer({ canvas })
renderer.shadowMap.enabled = true
renderer.setSize(w, h)

// Controls
const controls = new OrbitControls(camera, renderer.domElement)

// Resize
window.addEventListener('resize', () => {
  ;[w, h] = useWindowDimensions()
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
})

// View
const ground = new Box({ width: 5, height: 0.5, depth: 10, color: 0x0000ff })
ground.position.y = -2
ground.receiveShadow = true
scene.add(ground)

const cube = new Box({ width: 1, height: 1, depth: 1, color: 0x00ff00 })
cube.castShadow = true
scene.add(cube)

const light = new T.DirectionalLight(0xffffff, 1)
light.position.set(0, 3, 2)
light.castShadow = true
scene.add(light)

console.log(cube.height)

// Animate
function animate(elapsedTime: number) {
  // cube.position.y += -0.01
  controls.update()
}

// Loop
function loop() {
  animate(clock.getElapsedTime())
  renderer.render(scene, camera)
  requestAnimationFrame(loop)
}

loop()
