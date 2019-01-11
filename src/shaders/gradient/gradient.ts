import { ShaderDrawer } from "../shaderDrawer";

export function drawGradient() {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.fragmentShader = require("./frag.glsl");
  shaderDrawer.render();
}
