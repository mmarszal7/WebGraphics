import { lerp } from "../node_modules/canvas-sketch-util/math";
import random from "../node_modules/canvas-sketch-util/random";

export class GridDrawer {
  constructor(private context: CanvasRenderingContext2D) {}

  drawGrid(width: number, height: number) {
    let points = createGrid(20).filter(() => random.value() > 0.5);
    const margin = 70;

    points.forEach(([u, v]) => {
      // lerp - linear interpolation - used for creating margin
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      this.context.beginPath();
      this.context.arc(x, y, 5, 0, Math.PI * 2);
      this.context.strokeStyle = "black";
      this.context.stroke();
    });
  }
}

export function createGrid(count = 5): number[][] {
  const points: number[][] = [];
  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // translating XY coordinates to 0-1 UV coordinates
      const u = count <= 1 ? 0.5 : x / (count - 1); // preventing dividing by 0 when count is <= 1
      const v = count <= 1 ? 0.5 : y / (count - 1);
      points.push([u, v]);
    }
  }
  return points;
}
