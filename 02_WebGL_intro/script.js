//  Ctrl+Space → normal completion list.

// Ctrl+Shift+Space → Trigger Parameter Hints (shows what arguments an object/function expects)

import * as THREE from 'three'; //three = dependency in package.json

// canvas - fetch from the html page by class 
const canvas = document.querySelector('canvas.webgl');

// New scene (scene, objects, camera, rederer)
const scene = new THREE.Scene();

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1);  // width, height, depth
const material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    //wireframe: true
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera 
const camera = new THREE.PerspectiveCamera(75, sizes.width/sizes.height);  //field of view - degrees, perspective (W/H)
camera.position.z = 3; //(positives goes backward!!!)
scene.add(camera);

//Renderer - provide canvas property object
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
}); 
// resize rendere
renderer.setSize(sizes.width, sizes.height);


renderer.render(scene, camera)

