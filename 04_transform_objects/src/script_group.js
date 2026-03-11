import * as THREE from 'three';

// Canvas
const canvas = document.querySelector('canvas.webgl');



// Scene
const scene = new THREE.Scene();

// Objects (inside the group)
const group = new THREE.Group();
group.scale.x = 0.5;
scene.add(group);


// instantiage geometry inside the instance - another method
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0000})
);

group.add(cube1);

// instantiage geometry inside the instance - another method
const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff00})
);

cube2.position.x = -2

group.add(cube2);

// instantiage geometry inside the instance - another method
const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1,1,1),
    new THREE.MeshBasicMaterial({color: 0xff0})
);

cube3.position.x = 2;

//working with the group
group.add(cube3);


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
scene.add(camera)

camera.lookAt(group.position);


/**
 * Axes Helper
 */
const axesHelper = new THREE.AxesHelper(3);
scene.add(axesHelper); 

//Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera);