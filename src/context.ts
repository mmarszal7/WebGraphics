export function getContext(
  context: string = "webgl",
  id: string = "myCanvas",
  width: number = 512,
  height: number = 512
): CanvasRenderingContext2D | WebGLRenderingContext | null {
  const canvas = <HTMLCanvasElement>document.getElementById(id);
  canvas.width = width;
  canvas.height = height;

  switch (context) {
    case "2d":
      return canvas.getContext("2d");
    case "webgl":
      return canvas.getContext("webgl", { antialias: true });
    default:
      return canvas.getContext(context);
  }
}
