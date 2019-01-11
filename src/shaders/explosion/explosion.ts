import { PerspectiveCamera, Vector3, BoxGeometry } from "three";
import { ShaderDrawer } from "../shaderDrawer";

export function drawExplosion() {
  const shaderDrawer = new ShaderDrawer();

  shaderDrawer.camera = new PerspectiveCamera(45, 1, 0.01, 1000);
  shaderDrawer.camera.position.set(20, 10, 10);
  shaderDrawer.camera.lookAt(new Vector3());

  shaderDrawer.geometry = new BoxGeometry(5, 5, 5);
  shaderDrawer.fragmentShader = require("./shaders/frag.glsl");
  shaderDrawer.vertexShader = require("./shaders/vert.glsl");

  shaderDrawer.animation = () => {
    shaderDrawer.scene.rotation.y += 0.025;
  };
  shaderDrawer.render();
}
