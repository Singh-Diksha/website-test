import gsap from "https://cdn.skypack.dev/gsap";
import * as THREE from 'https://cdn.skypack.dev/three@0.130.1';
import { OrbitControls } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/controls/OrbitControls.js';
import * as dat from "https://cdn.skypack.dev/dat.gui";
import { STLLoader } from 'https://cdn.skypack.dev/three@0.130.1/examples/jsm/loaders/STLLoader.js';

let camera, scene, light, renderer, loader

scene = new THREE.Scene()
scene.background = new THREE.Color( 0xcce0ff )
scene.fog = new THREE.Fog( 0xcce0ff, 500, 10000 )

camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 1, 1000)
camera.position.set(0,-50,18)
camera.rotation.set(1.3, 0, 0)
camera.castShadow = true
scene.add(camera)


function gui(){
//const gui = new dat.GUI()
//const world = {
//  plane: {
//    x: 0,
//    y: 0,
//    z: 0,
//    X: 0,
//    Y: 0,
//    Z: 100
//  }
//}	

//gui.add(camera.rotation, 'x', -3.14, 3.14).name('x')
//gui.add(camera.rotation, 'y', -3.14, 3.14).name('y')
//gui.add(camera.rotation, 'z', -3.14, 3.14).name('z')
//gui.add(camera.position, 'x', -500, 500).name('X')
//gui.add(camera.position, 'y', -500, 500).name('Y')
//gui.add(camera.position, 'z', -500, 500).name('Z')
}

const plane = new THREE.PlaneGeometry(200, 200, 5, 5)
loader = new THREE.TextureLoader()
const groundTexture = loader.load( 'grasslight-big.jpg' )
groundTexture.wrapS = groundTexture.wrapT = THREE.RepeatWrapping
groundTexture.repeat.set( 25, 25 )
groundTexture.anisotropy = 16
groundTexture.encoding = THREE.sRGBEncoding
const groundMaterial = new THREE.MeshLambertMaterial( { map: groundTexture } );
const mesh = new THREE.Mesh(plane, groundMaterial)
scene.add(mesh)

scene.add( new THREE.AmbientLight( 0x666666 ) );
light = new THREE.DirectionalLight( 0xffffff, .9)
light.position.set(0,0,1)
light.rotation.set(10,10,10)
scene.add(light)

loader = new STLLoader()
loader.load('/FL_Taj Mahal.stl', function ( geometry ) {

					const material = new THREE.MeshPhongMaterial( {color: 0xfffff0} );
					const mesh = new THREE.Mesh( geometry, material );
					mesh.scale.set( 0.05, 0.05, 0.05 );
					mesh.rotation.set(0, 0, 0);
					mesh.castShadow = true;
					mesh.receiveShadow = true;
					scene.add( mesh );
				})

renderer = new THREE.WebGLRenderer( { antialias: true } )
renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize( window.innerWidth, window.innerHeight )
document.body.appendChild(renderer.domElement)

//new OrbitControls(camera, renderer.domElement)

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}

animate()

