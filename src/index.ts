import { SimpleDrawer } from "./simpleDrawer";
import { GridDrawer } from "./gridDrawer";
import { CubeDrawer } from "./cubeDrawer";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
canvas.width = 512;
canvas.height = 512;

// 2D
// const context = <CanvasRenderingContext2D>canvas.getContext("2d");

// const simpleDrawer = new SimpleDrawer(context);
// simpleDrawer.drawRectangle(100, 100);
// simpleDrawer.drawCircle(200, 200, 50);

// const gridDrawer = new GridDrawer(context, canvas.width, canvas.height);
// gridDrawer.drawCircles();
// gridDrawer.drawText();

// 3D
const context = <WebGLRenderingContext>canvas.getContext("webgl", { antialias: true });
const cubeDrawer = new CubeDrawer(context, canvas.width, canvas.height);
cubeDrawer.drawCube();
