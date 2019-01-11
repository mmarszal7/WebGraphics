import { ShaderDrawer } from "../shaderDrawer";
import { Vector2 } from "three";

type shaderType = "cross" | "noise";

export function drawMouseInteraction(shaderType = "cross") {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.fragmentShader = require(`./${shaderType}.glsl`);
  shaderDrawer.render();
}
