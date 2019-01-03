import * as THREE from "three";

export class ShaderDrawer {
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  scene: THREE.Scene;
  mesh: THREE.Mesh;
  startTime = Date.now();
  uniforms = {
    time: { type: "f", value: 1.0 },
    resolution: { type: "v2", value: new THREE.Vector2() }
  };

  constructor(private context: WebGLRenderingContext, private width: number, private height: number) {}

  drawShader() {
    this.renderer = new THREE.WebGLRenderer({ context: this.context });
    this.renderer.setSize(this.width, this.height);

    // Camera setup
    this.camera = new THREE.Camera();
    this.camera.position.z = 1;

    // Scene
    this.scene = new THREE.Scene();

    // Geometry
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: require("./shaders/vert.glsl"),
      fragmentShader: require("./shaders/frag.glsl")
    });

    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    // this.uniforms.time.value = (60 * (Date.now() - this.startTime)) / 1000;
    this.renderer.render(this.scene, this.camera);
  }
}
