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
    const material = this.getShader();
    this.mesh = new THREE.Mesh(geometry, material);
    this.scene.add(this.mesh);

    this.uniforms.resolution.value.x = window.innerWidth;
    this.uniforms.resolution.value.y = window.innerHeight;

    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    this.render();
  }

  render() {
    var elapsedMilliseconds = Date.now() - this.startTime;
    var elapsedSeconds = elapsedMilliseconds / 1000;
    this.uniforms.time.value = 60 * elapsedSeconds;
    this.renderer.render(this.scene, this.camera);
  }

  getShader(): THREE.ShaderMaterial {
    const frag = require("./shaders/frag.glsl");
    const vertex = require("./shaders/vert.glsl");

    return new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: frag
    });
  }
}
