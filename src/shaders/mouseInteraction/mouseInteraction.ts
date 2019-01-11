import { Camera, WebGLRenderer, Vector2, Scene, Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { getContext } from "../../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

const uniforms = {
  time: { type: "f", value: 0 },
  mouse: { type: "v2", value: new Vector2(0.5, 0.5) }
};
let camera: Camera;
let renderer: WebGLRenderer;
let scene: Scene;
let mesh: Mesh;

export function drawCross() {
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

  context.canvas.onmousemove = handleMouseMove;
  animate();
}

function handleMouseMove(event) {
  uniforms.mouse.value = new Vector2(
    1 - (event.pageX - this.offsetLeft) / width,
    (event.pageY - this.offsetTop) / height
  );
}

function animate() {
  requestAnimationFrame(() => animate());
  uniforms.time.value += 0.02;
  renderer.render(scene, camera);
}
