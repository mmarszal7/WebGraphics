import { ShaderDrawer } from "../shaderDrawer";

type IndicatorType = "bar" | "arc";

export function drawIndicator(indicatorType: IndicatorType = "bar") {
  const shaderDrawer = new ShaderDrawer();
  shaderDrawer.fragmentShader = require(`./${indicatorType}.glsl`);
  shaderDrawer.render();
}
