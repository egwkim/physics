const canvas = <HTMLCanvasElement>document.getElementById('canvas');
const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

const movementAvgP = document.getElementById('movement-avg') as HTMLElement;
const movementSumP = document.getElementById('movement-sum') as HTMLElement;
const pauseBtn = document.getElementById('pause') as HTMLElement;
const resumeBtn = document.getElementById('resume') as HTMLElement;

function resizeCvs() {
  canvas.setAttribute('width', `${window.innerWidth - 10}px`);
  canvas.setAttribute('height', `${window.innerHeight - 10}px`);
}

window.onresize = resizeCvs;

let points: Point[] = [];
let interv: number;

// Physical constants
let springConstant = 1;
let initLen = 5; // Distance between two points when spring is undeformed
let gravityConstant = 1;
let friction = 0.2;
// If true, elastic force is applied only when the spring is extended (like a rubber band)
let toggleStretchOnly = false;

// Time constants
let dt = 0; // Timestep used in physics.js

// Points
let pointCnt = 50; // Total number of points
let pointDistance = 10; // Initial distance between two points

// Appearance
let toggleLine = true; // If true, draws lines between adjacent points
let toggleCircle = true; // If true, draws circle on the points
let toggleMovement = true; // If true, displays the sum of velocities

let movement; // Sum of the velocities

let updateSettings = true;

const settingInputs = document.querySelectorAll('#settings > div > input');

settingInputs.forEach((item) => {
  if (item.classList.contains('reset')) {
    item.addEventListener('change', () => {
      reset();
    });
  } else {
    item.addEventListener('change', () => {
      updateSettings = true;
    });
  }
});

resizeCvs();
reset();
