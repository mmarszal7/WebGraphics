import {
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  Scene,
  Mesh,
  MeshBasicMaterial,
  DirectionalLight,
  AmbientLight
} from "three";
import { getContext } from "../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;
const uniforms = { time: { type: "f", value: 0 } };

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let mesh: Mesh;

// Boilerplate for using OBJLoader which is not a part of THREE
const THREE = require("three");
const OBJLoader = require("three-obj-loader");
OBJLoader(THREE);

export function drawCar() {
  renderer = new WebGLRenderer({ context: context });
  renderer.setSize(width, height);

  renderer.setClearColor("lightgreen", 1);
  scene = new Scene();

  // Camera setup
  camera = new PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(20, 10, 10);
  camera.lookAt(new Vector3());

  // Geometry
  const loader = new THREE.OBJLoader();
  loader.load("./models/car.obj", object => {
    object.scale.multiplyScalar(0.01);
    object.material = new MeshBasicMaterial({ color: "red" });
    scene.add(object);
  });

  // Light
  const light = new DirectionalLight("white", 1);
  light.position.set(20, 10, 0);
  scene.add(light);
  scene.add(new AmbientLight("black"));

  animate();
}

function animate() {
  requestAnimationFrame(() => animate());
  uniforms.time.value += 0.05;
  scene.rotation.y += 0.025;
  renderer.render(scene, camera);
}
