import { getContext } from "../context";
const imageUrl = require("./map.png");

class MapPoint {
  x: number;
  y: number;
  name: string;
}

const context = <CanvasRenderingContext2D>getContext("2d", "myCanvas", 610, 656);
const width = context.canvas.width;
const height = context.canvas.height;

const radious = 10;
const lineWidth = 5;
const points: MapPoint[] = [
  { x: 274, y: 157, name: "Gdansk" },
  { x: 57, y: 228, name: "Szczecin" },
  { x: 175, y: 325, name: "Poznan" },
  { x: 233, y: 264, name: "Bydgoszcz" },
  { x: 314, y: 390, name: "Lodz" },
  { x: 397, y: 345, name: "Warszawa" },
  { x: 515, y: 262, name: "Bialystok" },
  { x: 488, y: 431, name: "Lublin" },
  { x: 343, y: 541, name: "Krakow" },
  { x: 289, y: 523, name: "Katowice" },
  { x: 176, y: 445, name: "Wroclaw" }
];

export function drawMap() {
  const image = new Image();
  image.src = imageUrl;
  image.onload = () => context.drawImage(image, 0, 0, width, height);

  context.globalCompositeOperation = "destination-over";
  context.beginPath();

  points.forEach(p => {
    context.moveTo(p.x + radious, p.y);
    context.arc(p.x, p.y, radious, 0, Math.PI * 2, false);
  });

  context.lineWidth = lineWidth;
  context.fillStyle = "green";
  context.strokeStyle = "blue";
  context.fill();
  context.stroke();
  context.closePath();

  context.canvas.onmousemove = function(e) {
    // var rect = mycanvas.getBoundingClientRect();
    // const x = e.clientX - rect.left;
    // const y = e.clientY - rect.top;
    const x = e.clientX;
    const y = e.clientY;
    context.globalCompositeOperation = "source-over";

    points.forEach(p => {
      context.beginPath();
      context.arc(p.x, p.y, radious, 0, Math.PI * 2, false);
      context.lineWidth = lineWidth;
      context.strokeStyle = "blue";
      context.stroke();
      context.fillStyle = Math.abs(p.x - x) <= 2 * radious && Math.abs(p.y - y) <= 2 * radious ? "yellow" : "green";
      context.fill();
      context.closePath();
    });
  };

  context.canvas.onmousedown = function(e) {
    const x = e.clientX;
    const y = e.clientY;

    points.forEach(p => {
      if (Math.abs(p.x - x) <= 2 * radious && Math.abs(p.y - y) <= 2 * radious) {
        console.log(p.name);
      }
    });
  };

  // Point on click
  //   context.canvas.onmousedown = function(e) {
  //     const x = e.clientX;
  //     const y = e.clientY;

  //     context.beginPath();
  //     context.arc(x, y, radious, 0, Math.PI * 2, false);
  //     context.lineWidth = lineWidth;
  //     context.strokeStyle = "black";
  //     context.stroke();
  //     context.fillStyle = "yellow";
  //     context.fill();
  //     context.closePath();
  //   };
}
