import { Camera, WebGLRenderer, Scene, Mesh, PlaneGeometry, ShaderMaterial } from "three";
import { getContext } from "../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;

export class ShaderDrawer {
  camera: Camera = new Camera();
  renderer: WebGLRenderer = new WebGLRenderer({ context: context });
  scene: Scene = new Scene();
  geometry = new PlaneGeometry(2, 2);
  uniforms = {
    time: { type: "f", value: 0 }
  };
  animation = () => (this.uniforms.time.value += 0.02);

  vertexShader = `
    varying vec2 vUv;
    uniform vec2 resolution;

    void main()	{
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position.xyz , 1.0 );
    }`;

  fragmentShader = `
    varying vec2 vUv;

    void main()	{
        gl_FragColor = vec4(vUv.x, 0.0, 0.0, 1.0);
    }`;

  constructor() {
    this.renderer.setSize(width, height);
    this.camera.position.z = 1;
  }

  render() {
    const material = new ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader: this.vertexShader,
      fragmentShader: this.fragmentShader
    });

    const mesh = new Mesh(this.geometry, material);
    this.scene.add(mesh);
    this.animate();
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (this.animation) {
      this.animation();
    }
    this.renderer.render(this.scene, this.camera);
  }
}
