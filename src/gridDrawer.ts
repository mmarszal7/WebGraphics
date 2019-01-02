const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");
const palettes = require("nice-color-palettes/1000.json");

interface Circle {
  radius: number;
  position: number[];
  color: string;
  rotation: number[];
}

export class GridDrawer {
  palette = random.pick(palettes);

  constructor(private context: CanvasRenderingContext2D) {
    random.setSeed(random.getRandomSeed()); // setting seed allows you to "control"/lock randomisation
    console.log("Seed: " + random.getSeed());
  }

  drawGrid(width: number, height: number) {
    let points = this.createGrid(20).filter(() => random.value() > 0.5);
    const margin = 70;

    points.forEach(data => {
      const { position, radius, color, rotation } = data;
      const [u, v] = position;

      // lerp - linear interpolation - used for creating margin
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      //   this.context.beginPath();
      //   this.context.arc(x, y, radius * width, 0, Math.PI * 2);
      //   this.context.fillStyle = color;
      //   this.context.fill();

      this.context.save();
      this.context.fillStyle = color;
      this.context.font = `${radius * width}px "Arial"`;
      this.context.translate(x, y);
      this.context.rotate(rotation[0]);
      this.context.fillText("=", 0, 0);
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
          radius: Math.abs(random.noise2D(u, v)) * 0.2,
          position: [u, v],
          color: random.pick(this.palette),
          rotation: random.noise2D(u, v)
        });
      }
    }
    return points;
  }
}
