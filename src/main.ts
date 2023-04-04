import * as THREE from 'three'
import './style.css'

// Show
document.body.style.display = 'block'

// Sizes
const useWindowDimensions = () => [window.innerWidth, window.innerHeight]
let [w, h] = useWindowDimensions()

// Scene
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 100)

// Renderer
const canvas = document.querySelector('.webgl') as HTMLCanvasElement
const renderer = new THREE.WebGLRenderer({ canvas })
renderer.setSize(w, h)

// Resize
window.addEventListener('resize', () => {
  ;[w, h] = useWindowDimensions()
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  renderer.setSize(w, h)
})

// Loop
function loop() {
  renderer.render(scene, camera)
  window.requestAnimationFrame(loop)
}

loop()
