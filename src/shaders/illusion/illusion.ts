import { ShaderDrawer } from "../shaderDrawer";

export function drawIllusion() {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.animationTimeMultiplier = 50;
  shaderDrawer.fragmentShader = require(`./frag.glsl`);
  shaderDrawer.render();
}
