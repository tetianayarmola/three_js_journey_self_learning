import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)

//obj property should be after creating and before adding to the scene
//mesh.position is an Vector3 in three.js
//mesh.position.x = 0.5 // to the right
//mesh.position.y = 0.5 // up
//mesh.position.z = 1 // forward

// update all axis at once using Vector3 method set(x, y, z)
mesh.position.set(0.5, 0.5, 1);


//scale
//mesh.scale.x = 0.5;
//mesh.scale.y = 2;
//mesh.scale.z = 0.5
mesh.scale.set(0.5, 2, 0.5);

//rotation is Euler, not a vector3!!!

//reorder must be before code!!!
mesh.rotation.reorder('YXZ'); //next will apply Y first, only then X
mesh.rotation.x = 0.5;
mesh.rotation.y = Math.PI;
//mesh.rotation.z = 0;
//mesh.rotation.set(- Math.PI * 0.25, Math.PI * 0.25, 0);

// quaternion - analogue of Euler, difficult to imagine, but better for games engines
scene.add(mesh);

console.log(mesh.position.length()); // distrance between the scene and object position

// distance from  to the object
console.log(mesh.position.length(new THREE.Vector3(0,0,0)));

// normalize will take vector length and normalise so it becomes 1
// mesh.position.normalize();
//console.log("Normalized position vector = ", mesh.position.length());

/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper); // cause its an object, add to the scene

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera 
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 4 //move away (positive z)
//camera.position.y = 1 //up
//camera.position.x = 1 // to the right
scene.add(camera)

// make camera object to lookAt cube obj (must be vector3 = position)
//centre = new THREE.Vector3(0, 0, 0);
camera.lookAt(mesh.position);

// distance from mech to camera
console.log("Dist to camera: ", mesh.position.distanceTo(camera.position));

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)

