import { WebGLRenderer, ShaderMaterial, Scene, Mesh, PlaneGeometry, Camera } from "three";
import { getContext } from "../../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

const uniforms = { time: { type: "f", value: 0 } };
const startTime = Date.now();
let renderer: WebGLRenderer;
let camera: Camera;
let scene: Scene;
let mesh: Mesh;

export function drawIllusion() {
  renderer = new WebGLRenderer({ context: context });
  renderer.setSize(width, height);

  // Camera setup
  camera = new Camera();
  camera.position.z = 1;

  // Scene
  scene = new Scene();

  // Geometry
  const geometry = new PlaneGeometry(2, 2);
  const material = new ShaderMaterial({
    uniforms: uniforms,
    vertexShader: require("./shaders/vert.glsl"),
    fragmentShader: require("./shaders/frag.glsl")
  });

  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  animate();
}

function animate() {
  requestAnimationFrame(() => animate());
  uniforms.time.value = (60 * (Date.now() - startTime)) / 1000;
  renderer.render(scene, camera);
}
