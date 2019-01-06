import { getContext } from "../context";

const context = <CanvasRenderingContext2D>getContext("2d");

export function drawRectangle(width: number = 100, height: number = 100) {
  context.fillStyle = "pink";
  context.fillRect(0, 0, width, height);
}

export function drawCircle(positionX: number = 200, positionY: number = 200, radious: number = 50) {
  context.beginPath();
  context.fillStyle = "green";
  context.arc(positionX, positionY, radious, 0, Math.PI * 2, false);
  context.fill();

  context.lineWidth = 5;
  context.strokeStyle = "blue";
  context.stroke();
}
