import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry.js";

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

// Texture
const mcTexture = new THREE.TextureLoader().load(
  "static/textures/mcTexture1.png"
);

// Fonts
const fontLoader = new FontLoader();
fontLoader.load("/static/fonts/helvetiker_regular.typeface.json", (font) => {
  // Material
  const material = new THREE.MeshMatcapMaterial({ matcap: mcTexture });

  // Text
  const textGeometry = new TextGeometry("JOHN", {
    font: font,
    size: 0.5,
    height: 0.15,
    curveSegments: 9,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 6,
  });
  textGeometry.center();

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
});

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
});

// Camera
const perspectiveCamera = new THREE.PerspectiveCamera(
  50,
  sizes.width / sizes.height,
  0.1,
  100
);
perspectiveCamera.position.x = 1;
perspectiveCamera.position.y = 1;
perspectiveCamera.position.z = 2;
scene.add(perspectiveCamera);

// Controls
const controls = new OrbitControls(perspectiveCamera, canvas);
controls.enableDamping = true;

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Animate
const clock = new THREE.Clock();

const loop = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, perspectiveCamera);

  // Call loop
  window.requestAnimationFrame(loop);
};
loop();
