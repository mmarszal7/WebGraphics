import * as THREE from "three";
const glsl = require("glslify");

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
    const frag = glsl(`
    uniform float time;
      uniform vec2 resolution;
      void main()	{
          float x = mod(time + gl_FragCoord.x, 20.) < 10. ? 1. : 0.;
          float y = mod(time + gl_FragCoord.y, 20.) < 10. ? 1. : 0.;
          gl_FragColor = vec4(vec3(min(x, y)), 1.);
      }
      `);

    const vertex = glsl(`
    uniform float time;
    uniform vec2 resolution;
    void main()	{
        gl_Position = vec4( position, 1.0 );
    }
    `);

    return new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: vertex,
      fragmentShader: frag
    });
  }
}
