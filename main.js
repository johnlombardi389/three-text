import "./style.css";
import * as THREE from "three";

// Canvas
const canvas = document.querySelector(".webgl");

// Scene
const scene = new THREE.Scene();

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
