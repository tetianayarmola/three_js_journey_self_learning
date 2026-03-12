import './style.css'
import * as THREE from 'three'
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Cursor - take the position
 */
// Cursor obj to store coordinates
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) => {
    // divided by sizes to make X in range of 0 to 1, minus to make negative value
    cursor.x = event.clientX / sizes.width - 0.5; 
    cursor.y = (event.clientY / sizes.height - 0.5) * -1; // invert Y 

    //console.log("X: ", cursor.x, "Y: ", cursor.y) 

    // cursos  axis pixel values coordinates (Y increases when goes down)
    //console.log("X: ", event.clientX, "Y: ", event.clientY) 
}) 


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// field of view (75 degree vertically), value between 45-75 is recommdended to avoid distortion
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100) 

// const aspectRatio = sizes.width / sizes.height   // then put it on horizontal 
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio, //left
//     1 * aspectRatio, //right
//     1,      //top
//     -1,     //bottom
//     0.1,    //near
//     100     //far
// )

//camera.position.x = 2
//camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
console.log(camera.position.length())
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas); // provide area where cursor will be positioned - canvas
controls.enableDamping = true
// change where it looks and update:
// controls.target.y = 1;
// controls.update();

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // // Update objects
    // //mesh.rotation.y = elapsedTime;

    // // update camera - circle move
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
    // camera.position.y = cursor.y * 5;
   
    // //camera.lookAt(new THREE.Vector3()); // camera will always look at 0,0,0 (cube position)
    // camera.lookAt(mesh.position); // use when the cube does not move anywhere

    // use Orbit Control class

    // Dumping in controls needs to be updated on each frame:
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

// call at least once
tick()