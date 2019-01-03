import * as THREE from "three";

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

    // Background color and alpha
    this.renderer.setClearColor("lightgreen", 1);

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(45, 1, 0.01, 1000);
    this.camera.position.set(4, 2, 2);
    this.camera.lookAt(new THREE.Vector3());

    // Scene
    this.scene = new THREE.Scene();

    // Geometry
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 1, 1),
      new THREE.MeshBasicMaterial({
        color: "red"
      })
    );
    this.scene.add(this.mesh);

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
    this.mesh.rotation.x += 0.005;
    this.mesh.rotation.y += 0.01;
    this.renderer.render(this.scene, this.camera);
  }
}
