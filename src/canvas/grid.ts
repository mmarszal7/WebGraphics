import { getContext } from "../context";
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes/1000.json");

interface Circle {
  x: number;
  y: number;
  radius: number;
  color: string;
  rotation: number[];
}

const context = <CanvasRenderingContext2D>getContext("2d");
const width = context.canvas.width;
const height = context.canvas.height;

const palette = random.pick(palettes);
const margin = 70;

random.setSeed(random.getRandomSeed()); // setting seed allows you to "control"/lock randomisation
console.log("Seed: " + random.getSeed());

export function drawCircles() {
  createGrid(20).forEach(point => {
    const { x, y, radius, color, rotation } = point;

    context.beginPath();
    context.arc(x, y, radius * width, 0, Math.PI * 2);
    context.fillStyle = color;
    context.fill();
  });
}

export function drawText() {
  createGrid(20).forEach(point => {
    const { x, y, radius, color, rotation } = point;

    context.save();
    context.fillStyle = color;
    context.font = `${radius * width}px "Arial"`;
    context.translate(x, y);
    context.rotate(random.value());
    context.fillText(".=", 0, 0);
    context.restore();
  });
}

function createGrid(count = 5): Circle[] {
  const points: Circle[] = [];

  for (let x = 0; x < count; x++) {
    for (let y = 0; y < count; y++) {
      // translating XY coordinates to 0-1 UV coordinates
      const u = count <= 1 ? 0.5 : x / (count - 1); // preventing dividing by 0 when count is <= 1
      const v = count <= 1 ? 0.5 : y / (count - 1);

      points.push({
        // lerp - linear interpolation - used for creating margin
        x: lerp(margin, width - margin, u),
        y: lerp(margin, height - margin, v),
        radius: Math.abs(random.noise2D(u, v)) * 0.2,
        color: random.pick(palette),
        rotation: random.noise2D(u, v)
      });
    }
  }
  return points.filter(() => random.value() > 0.5); // randomize points
}
