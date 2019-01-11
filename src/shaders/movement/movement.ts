import { ShaderDrawer } from "../shaderDrawer";

export function drawMovement() {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.fragmentShader = require("./frag.glsl");
  shaderDrawer.render();
}
