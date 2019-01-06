import { Camera, WebGLRenderer, Vector2, Scene, Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { getContext } from "../../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

const startTime = Date.now();
const uniforms = {
  time: { type: "f", value: 1.0 },
  resolution: { type: "v2", value: new Vector2() }
};
let camera: Camera;
let renderer: WebGLRenderer;
let scene: Scene;
let mesh: Mesh;

export function drawGradient() {
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
    vertexShader: require("./shaders/gradient.vert.glsl"),
    fragmentShader: require("./shaders/gradient.frag.glsl")
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
