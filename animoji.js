import * as THREE from 'three'
window.THREE = THREE
require('three/examples/js/controls/OrbitControls.js')
require('three/examples/js/loaders/GLTFLoader.js')

import Tracker from './tracker.js'

const scene = new THREE.Scene()
scene.background = new THREE.Color(0xffffff)
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight)
camera.position.set(0, 0, 100)
// camera.lookAt(scene.position);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// const gridHelper = new THREE.GridHelper(100, 200)
// scene.add(gridHelper)

const renderer = new THREE.WebGLRenderer({ antialias: true })
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
renderer.gammaInput = true
renderer.gammaOutput = true
renderer.shadowMap.enabled = true
// const control = new THREE.OrbitControls(camera, renderer.domElement)

const loader = new THREE.GLTFLoader()
loader.load('scene.gltf', object => {
  console.log(object)
  object.scene.rotation.x = -Math.PI / 2
  scene.add(object.scene)
  object.scene.lookAt(camera.position.x, camera.position.y, -camera.position.z)
  object.scene.children[0].children[0].children[0].position.set(-20, -20, 0)

  renderer.render(scene, camera)
})

Tracker.onLoop = (deltaX, deltaY) => {
  const x = (deltaX / 20).toFixed(2)
  const y = (deltaY / 20).toFixed(2)
  scene.lookAt(x, -y, 1)

  renderer.render(scene, camera)
}
