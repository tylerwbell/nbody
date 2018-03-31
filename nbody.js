
const points = [];

function makePoint() {
  return {
    x: 100 + (200 * Math.random()),
    y: 100 + (200 * Math.random()),
    vX: 0,
    vY: 0,
    fX: 0,
    fY: 0,
    mass: 1,
  };
}

for (let i = 0; i < 100; i += 1) {
  points.push(makePoint());
}

function gravity(points) {
  const G = 0.001;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    for (let j = i + 1; j < points.length; j += 1) {
      const other = points[j];

      const uX = other.x - point.x;
      const uY = other.y - point.y;
      const d = Math.sqrt(uX * uX + uY * uY);
      const gravity = G / (d);

      const fX = gravity * (uX / d);
      const fY = gravity * (uY / d);

      point.fX += fX * other.mass;
      point.fY += fY * other.mass;
      other.fX -= fX * point.mass;
      other.fY -= fY * point.mass;
    }

    point.vX += point.fX;
    point.vY += point.fY;

    point.fX = 0;
    point.fY = 0;
  }
}

function update(points) {
  const t = 50;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    point.x += t * point.vX;
    point.y += t * point.vY;

    if (point.x > 400) {
      point.x = 0;
    } else if (point.x < 0) {
      point.x = 400;
    }

    if (point.y > 400) {
      point.y = 0;
    } else if (point.y < 0) {
      point.y = 400;
    }
  }
}

function render(points) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, 800, 800);
  ctx.fillColor = "white";

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    ctx.fillRect(point.x, point.y, 2, 2);
  }
}

const canvas = document.getElementById("canvas");
canvas.width = 400;
canvas.height = 400;

function step() {
  // main loop
  
  gravity(points);
  update(points);
  render(points); 

  requestAnimationFrame(step);
}

step();
