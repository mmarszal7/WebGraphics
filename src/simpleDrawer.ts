export class SimpleDrawer {
  constructor(private context: CanvasRenderingContext2D) {}

  drawRectangle(width: number, height: number) {
    this.context.fillStyle = "pink";
    this.context.fillRect(0, 0, width, height);
  }

  drawCircle(positionX: number, positionY: number, radious: number) {
    this.context.beginPath();
    this.context.fillStyle = "green";
    this.context.arc(positionX, positionY, radious, 0, Math.PI * 2, false);
    this.context.fill();

    this.context.lineWidth = 5;
    this.context.strokeStyle = "blue";
    this.context.stroke();
  }
}
