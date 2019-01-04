import {
  WebGLRenderer,
  PerspectiveCamera,
  SphereGeometry,
  ShaderMaterial,
  Vector3,
  Scene,
  Mesh,
  BoxGeometry
} from "three";

let renderer: WebGLRenderer;
let camera: PerspectiveCamera;
let scene: Scene;
let mesh: Mesh;
const uniforms = {
  time: { type: "f", value: 0 }
};

export function explosionExample(context: WebGLRenderingContext, width: number, height: number) {
  renderer = new WebGLRenderer({ context: context });
  renderer.setSize(width, height);

  renderer.setClearColor("lightgreen", 1);
  scene = new Scene();

  // Camera setup
  camera = new PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(20, 10, 10);
  camera.lookAt(new Vector3());

  // Geometry
  const geometry = new BoxGeometry(5, 5, 5);
  //   geometry.computeVertexNormals();
  const material = new ShaderMaterial({
    vertexShader: require("./shaders/explosion/explosion.vert.glsl"),
    fragmentShader: require("./shaders/explosion/explosion.frag.glsl"),
    uniforms: uniforms
  });

  mesh = new Mesh(geometry, material);
  scene.add(mesh);

  animate();
}

function animate() {
  requestAnimationFrame(() => animate());
  uniforms.time.value += 0.05;
  scene.rotation.y += 0.025;
  renderer.render(scene, camera);
}
