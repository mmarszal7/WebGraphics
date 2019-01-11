import { Camera, WebGLRenderer, Scene, Mesh, PlaneGeometry, ShaderMaterial, Vector2 } from "three";
import { getContext } from "../context";

const context = <WebGLRenderingContext>getContext("webgl");
const width = context.canvas.width;
const height = context.canvas.height;
const uniforms = {
  time: { type: "f", value: 0 },
  mouse: { type: "v2", value: new Vector2(0.5, 0.5) },
  percentage: { type: "f", value: Math.random() }
};

export class ShaderDrawer {
  camera: Camera = new Camera();
  renderer: WebGLRenderer = new WebGLRenderer({ context: context });
  scene: Scene = new Scene();
  geometry = new PlaneGeometry(2, 2);

  animationTimeMultiplier = 1;
  animation = () => {
    uniforms.time.value += 0.02 * this.animationTimeMultiplier;
  };

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
    context.canvas.onmousemove = handleMouseMove;
  }

  render() {
    const material = new ShaderMaterial({
      uniforms: uniforms,
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

    uniforms.percentage.value = (uniforms.time.value / (this.animationTimeMultiplier * 2)) % 1;
    this.renderer.render(this.scene, this.camera);
  }
}

function handleMouseMove(event) {
  uniforms.mouse.value = new Vector2(
    1 - (event.pageX - this.offsetLeft) / width,
    (event.pageY - this.offsetTop) / height
  );
}
