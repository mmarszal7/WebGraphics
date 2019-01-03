import * as THREE from "three";
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes/1000.json");

export class CubeDrawer {
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  mesh: THREE.Mesh;

  constructor(private context: WebGLRenderingContext, private width: number, private height: number) {}

  drawCube() {
    this.initScene();
    this.animate();
  }

  initScene() {
    this.renderer = new THREE.WebGLRenderer({ context: this.context });
    this.renderer.setSize(this.width, this.height);

    // Background color and alpha
    this.renderer.setClearColor("lightgreen", 1);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    this.camera.position.set(20, 10, 10);
    this.camera.lookAt(new THREE.Vector3());

    // Scene
    this.scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const palette = random.pick(palettes);
    for (let i = 0; i < 20; i++) {
      this.mesh = new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: random.pick(palette) }));
      this.mesh.position.set(random.range(-5, 5), random.range(-5, 5), random.range(-5, 5));
      this.mesh.scale.set(random.range(1, 3), random.range(1, 3), random.range(1, 3));
      this.mesh.scale.multiplyScalar(0.8);
      this.scene.add(this.mesh);
    }

    // Light
    const light = new THREE.DirectionalLight("white", 1);
    light.position.set(20, 10, 0);
    this.scene.add(light);
    this.scene.add(new THREE.AmbientLight("lightblue")); // AmbientLight - color of not lightened places

    // Resize
    window.addEventListener("resize", this.onWindowResize, false);
  }

  onWindowResize() {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.scene.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
