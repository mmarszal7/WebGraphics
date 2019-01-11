import { ShaderDrawer } from "../shaderDrawer";

export function drawGrid() {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.fragmentShader = require(`./frag.glsl`);
  shaderDrawer.render();
}
