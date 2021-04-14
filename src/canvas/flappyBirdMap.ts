import { getContext } from "../context";

const context = <CanvasRenderingContext2D>getContext("2d");

const width = 512;
const height = 512;
const buffer = 2

const numberOfPoints = 10;
const stepSize = width / numberOfPoints;
const steps = [...Array(buffer * numberOfPoints)].map((c, i) => i * stepSize).map((i) => -width / 2 + i);
console.log(steps);
console.log(stepSize);

const bandHeight = 200;
const upperBand = { top: height, bottom: height - bandHeight };
const lowerBand = { top: bandHeight, bottom: 0 };

const upperPoints = generatePoints(steps, upperBand);
const lowerPoints = generatePoints(steps, lowerBand);

export function drawFalppyBirdMap() {
  context.fillStyle = "lightgreen";
  context.fillRect(0, 0, width, width);

  drawPoints(upperPoints);
  drawPoints(lowerPoints);

  // Update position
  for (let i = 0; i < numberOfPoints; i++) {
    upperPoints[i].x -= 5;
    lowerPoints[i].x -= 5;
  }

  // Replace points leaving the canvas with new ones
  if (upperPoints[0].x < -stepSize*buffer || lowerPoints[0].x < -stepSize*buffer) {
    upperPoints.splice(0, 1);
    upperPoints.push({ x: steps[steps.length - 1], y: getRandomInt(upperBand.bottom, upperBand.top) });
    lowerPoints.splice(0, 1);
    lowerPoints.push({ x: steps[steps.length - 1], y: getRandomInt(lowerBand.bottom, lowerBand.top) });
  }

  window.requestAnimationFrame(drawFalppyBirdMap);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function generatePoints(steps, yBand) {
  return steps.map((step) => {
    return { x: step, y: getRandomInt(yBand.bottom, yBand.top) };
  });
}

function drawPoints(points) {
  context.beginPath();
  context.moveTo(points[0].x, points[0].y);
  points.forEach((p) => {
    context.lineTo(p.x, p.y);
  });

  // Close the shape
  context.lineTo(height, points[points.length - 1].y > height / 2 ? height : 0);
  context.lineTo(0, points[points.length - 1].y > height / 2 ? height : 0);
  context.fillStyle = "rgba(125, 125, 125, 1)";
  context.fill();
}
