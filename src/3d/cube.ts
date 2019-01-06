import {
  WebGLRenderer,
  PerspectiveCamera,
  Vector3,
  Scene,
  Mesh,
  DirectionalLight,
  AmbientLight,
  BoxGeometry,
  ShaderMaterial
} from "three";
import { getContext } from "../context";
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes/1000.json");

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let mesh: Mesh;

export function drawCube() {
  renderer = new WebGLRenderer({ context: context });
  renderer.setSize(width, height);

  // Background color and alpha
  renderer.setClearColor("lightgreen", 1);

  // Camera setup
  camera = new PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(20, 10, 10);
  camera.lookAt(new Vector3());

  // Scene
  scene = new Scene();

  // Geometry
  const geometry = new BoxGeometry(1, 1, 1);
  const palette = random.pick(palettes);

  // you need vertexShader to treat each box separately
  const material = new ShaderMaterial({
    fragmentShader: `
    varying vec2 vUv;
    void main()	{
        gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    }`,
    vertexShader: `
    varying vec2 vUv;
    void main()	{
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz , 1.0 );
    }`
  });

  for (let i = 0; i < 20; i++) {
    //   const material = new MeshStandardMaterial({ color: random.pick(palette) });
    mesh = new Mesh(geometry, material);
    mesh.position.set(random.range(-5, 5), random.range(-5, 5), random.range(-5, 5));
    mesh.scale.set(random.range(1, 3), random.range(1, 3), random.range(1, 3));
    mesh.scale.multiplyScalar(0.8);
    scene.add(mesh);
  }

  // Light
  const light = new DirectionalLight("white", 1);
  light.position.set(20, 10, 0);
  scene.add(light);
  scene.add(new AmbientLight("lightblue")); // AmbientLight - color of not lightened places

  // Resize
  window.addEventListener("resize", onWindowResize, false);
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(() => animate());
  scene.rotation.y += 0.01;
  renderer.render(scene, camera);
}
