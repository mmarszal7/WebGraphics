import { getContext } from "../context";
const random = require("canvas-sketch-util/random");
import { WebGLRenderer, PerspectiveCamera, Vector3, Scene, Mesh, DirectionalLight, AmbientLight, BoxGeometry, ShaderMaterial, Raycaster, Vector2, MeshBasicMaterial } from "three";
const palettes = require("nice-color-palettes/1000.json");

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

let camera: PerspectiveCamera;
let renderer: WebGLRenderer;
let scene: Scene;
let mesh: Mesh;
let raycaster = new Raycaster();
let mouse = new Vector2();

document.getElementById("customElements")!.innerHTML += `
<div style="position: absolute; top: 10px; left: 10px;">
    <input readonly id="selected"></input>
    <input type="checkbox" id="animate">Animate</input>
</div>
`;

export function drawCheckboxMatrix() {
  renderer = new WebGLRenderer({ context: context });

  renderer.setSize(width, height);

  // Background color and alpha
  renderer.setClearColor("lightblue", 1);

  // Camera setup
  camera = new PerspectiveCamera(45, 1, 0.01, 1000);
  camera.position.set(3, 5, 10);
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
    }`,
  });

  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      for (let k = -1; k < 2; k++) {
        mesh = new Mesh(geometry, new MeshBasicMaterial({ color: "red", opacity: 0.5, transparent: true }));
        mesh.frustumCulled === false;
        mesh.position.set(i * 2, j * 2, k * 2);
        mesh.scale.multiplyScalar(0.8);
        mesh.name = `Client${i + 2} - Alarm${j + 2} - Type${k + 2}`;
        scene.add(mesh);
      }
    }
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
  if ((document.getElementById("animate") as HTMLInputElement).checked == true) scene.rotation.y += 0.01;
  renderer.render(scene, camera);
}

function onMouseMove(event) {
  mouse.x = (event.clientX / width) * 2 - 1;
  mouse.y = -(event.clientY / height) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);
  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0]) {
    (document.getElementById("selected") as HTMLInputElement).value = (intersects[0].object as Mesh).name;
  }
}

function render() {
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(scene.children);
  if (intersects[0]) {
    const mesh = intersects[0].object as Mesh;

    if (mesh.frustumCulled === false) {
      mesh.frustumCulled = true;
      (intersects[0].object as Mesh).material = new MeshBasicMaterial({ color: "red", opacity: 0.5, transparent: true });
    } else {
      mesh.frustumCulled = false;
      var material = new MeshBasicMaterial({ color: "green", opacity: 0.5, transparent: true });
      (intersects[0].object as Mesh).material = material;
    }
  }
}

window.addEventListener("click", render, false);
window.addEventListener("mousemove", onMouseMove, false);
