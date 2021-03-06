import { k, scale, pointList } from './script.js';

const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

let cvsHeight: number, cvsWidth: number;

function resizeCvs() {
  canvas.setAttribute('width', `${window.innerWidth}px`);
  canvas.setAttribute('height', `${window.innerHeight}px`);

  cvsHeight = canvas.clientHeight;
  cvsWidth = canvas.clientWidth;

  ctx.strokeStyle = 'black';
  ctx.lineCap = 'round';
  ctx.lineWidth = 3;

  try {
    drawLines();
  } catch (error) {}
}

window.onresize = resizeCvs;

resizeCvs();

function renderIsotherm(T: number, color='#22aa66aa') {
  ctx.beginPath();
  for (let y = 0; y < cvsHeight; y++) {
    let x = (k * T) / (scale * scale * (cvsHeight - y));
    if (cvsWidth < x) {
      break;
    }
    ctx.lineTo(x, y);
  }
  ctx.strokeStyle = color;
  ctx.stroke();
}

function drawLines() {
  if (!pointList.length) {
    return;
  }
  ctx.beginPath();
  ctx.moveTo(pointList[0].x, pointList[0].y);
  for (let i = 0; i < pointList.length; i++) {
    ctx.lineTo(pointList[i].x, pointList[i].y);
  }
  ctx.strokeStyle = '#000000';
  ctx.stroke();
}

function clearCvs() {
  ctx.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight);
}

export { cvsHeight, renderIsotherm, clearCvs, drawLines };
