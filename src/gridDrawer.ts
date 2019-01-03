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

export class GridDrawer {
  palette = random.pick(palettes);
  margin = 70;
  points: Circle[] = [];

  constructor(private context: CanvasRenderingContext2D, private width: number, private height: number) {
    random.setSeed(random.getRandomSeed()); // setting seed allows you to "control"/lock randomisation
    console.log("Seed: " + random.getSeed());

    this.points = this.createGrid(20);
  }

  drawCircles() {
    this.points.forEach(point => {
      const { x, y, radius, color, rotation } = point;

      this.context.beginPath();
      this.context.arc(x, y, radius * this.width, 0, Math.PI * 2);
      this.context.fillStyle = color;
      this.context.fill();
    });
  }

  drawText() {
    this.points.forEach(point => {
      const { x, y, radius, color, rotation } = point;

      this.context.save();
      this.context.fillStyle = color;
      this.context.font = `${radius * this.width}px "Arial"`;
      this.context.translate(x, y);
      this.context.rotate(random.value());
      this.context.fillText(".=", 0, 0);
      this.context.restore();
    });
  }

  createGrid(count = 5): Circle[] {
    const points: Circle[] = [];

    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        // translating XY coordinates to 0-1 UV coordinates
        const u = count <= 1 ? 0.5 : x / (count - 1); // preventing dividing by 0 when count is <= 1
        const v = count <= 1 ? 0.5 : y / (count - 1);

        points.push({
          // lerp - linear interpolation - used for creating margin
          x: lerp(this.margin, this.width - this.margin, u),
          y: lerp(this.margin, this.height - this.margin, v),
          radius: Math.abs(random.noise2D(u, v)) * 0.2,
          color: random.pick(this.palette),
          rotation: random.noise2D(u, v)
        });
      }
    }
    return points.filter(() => random.value() > 0.5); // randomize points
  }
}
