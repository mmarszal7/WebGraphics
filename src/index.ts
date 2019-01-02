import { SimpleDrawer } from "./simpleDrawer";

const canvas = <HTMLCanvasElement>document.getElementById("myCanvas");
canvas.width = 512;
canvas.height = 512;

const context = <CanvasRenderingContext2D>canvas.getContext("2d");

const simpleDrawer = new SimpleDrawer(context);
simpleDrawer.drawRectangle(100, 100);
simpleDrawer.drawCircle(200, 200, 50);
