import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'

/**
 * instantiated Debug UI 
 */
const gui = new GUI(
    {
        width: 340,
        title: 'Awesome Debug GUI',
        // close all folders by default
        closeFolders: true
    }
)
// close entire GUI
gui.close()
// toggle hide/unhide UI or other object when H is pressed
gui.hide()

window.addEventListener('keydown', (event) => 
{
     if(event.key == 'h')
        gui.show(gui._hidden) // shows if UI is hidden - gui._hidden
})


const debugObject = {}

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#42a936'

const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * GUI folders
 */

const cubeTweaks = gui.addFolder('Mr Cube')
//make folder drop-down closed by default
//cubeTweaks.close()


// now when object is created, tweak its y position property using lil-gui:
// mesh.position = an object, while y = a property 
// the min value, max value, and step/precision
cubeTweaks
    .add(mesh.position, 'y')
    .min(-3)
    .max(3)
    .step(0.01)
    .name('elevation-y')

// Debug UI Tweaks for non-properties
const myObject = {
    myVariable: 1235
} 
cubeTweaks
    .add(myObject, 'myVariable')
    .min(500)
    .max(2000)
    .step(0.1)
    .name('myVariable')

// Debug UI checkbox (True/False)
cubeTweaks.add(mesh, 'visible')
cubeTweaks.add(material, 'wireframe')

// Modify Color 
cubeTweaks
    .addColor(debugObject, 'color')
    .onChange((value) => {
        //set to the material
        material.color.set(debugObject.color)
    })

// create spin animation function as part of the debugObject
debugObject.spin = () => {
    // take current position of mesh and add full circle (PI * 2)
    gsap.to(mesh.rotation, { y: mesh.rotation.y + Math.PI * 2})
} 
// add to lil-gui:
cubeTweaks.add(debugObject, 'spin')

// tweaking geometry (on smth not related to threejs geometry):
debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onFinishChange(() => 
    {
        // delete old geometry from memory to avoid memory leaks
        mesh.geometry.dispose()
        // re-assign anew geometry to mesh
        mesh.geometry = new THREE.BoxGeometry(
            // size
            1, 1, 1, 
            // subdivision line
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
        console.log('geometry changed + recreated')
    })


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()