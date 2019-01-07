import { Camera, WebGLRenderer, Scene, Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { getContext } from "../../context";

const context = <WebGLRenderingContext>getContext("webgl", "myCanvas", 500, 500);
const width = context.canvas.width;
const height = context.canvas.height;

const uniforms = {
  time: { type: "f", value: 1.0 },
  percentage: { type: "f", value: Math.random() }
};
let camera: Camera;
let renderer: WebGLRenderer;
let scene: Scene;
let mesh: Mesh;

export function drawArc() {
  renderer = new WebGLRenderer({ context: context });
  renderer.setSize(width, height);

  camera = new Camera();
  camera.position.z = 1;

  scene = new Scene();

  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: require("./shaders/vert.glsl"),
    fragmentShader: require("./shaders/frag.glsl")
  });

  const mesh: Mesh = new Mesh(geometry, material);
  scene.add(mesh);
  animate();
}

let increment = 0.01;

function animate() {
  requestAnimationFrame(() => animate());
  if (uniforms.percentage.value >= 1 || uniforms.percentage.value <= 0) increment *= -1;
  uniforms.percentage.value += increment;
  renderer.render(scene, camera);
}
