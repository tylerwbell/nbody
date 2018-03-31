const combine = false;
const drawVelocity = true;

const points = [];

function makePoint() {
  return {
    x: 250 + 500 * Math.random(),
    y: 250 + 500 * Math.random(),
    vX: 0,
    vY: 0,
    fX: 0,
    fY: 0,
    mass: Math.random() * 5,
  };
}

for (let i = 0; i < 900; i += 1) {
  points.push(makePoint());
}

let time = 0;

function gravity(points) {
  const G = 0.001;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    for (let j = i + 1; j < points.length; j += 1) {
      const other = points[j];

      const uX = other.x - point.x;
      const uY = other.y - point.y;
      const d = Math.sqrt(uX * uX + uY * uY);
      if (combine && (d * d) < 1) {
        const mass = point.mass + other.mass;
        // point.vX += other.vX * (other.mass / mass) + point.vX * (point.mass / mass);
        // point.vY += other.vY * (other.mass / mass) + point.vY * (point.mass / mass);;
        point.mass = mass;

        points.splice(j, 1);
        j += 1;

        continue;
      }
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

    point.x += (t * point.vX);
    point.y += (t * point.vY);
  }
}

function render(points) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "000000";
  ctx.globalAlpha = 1.0;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    const x = width * (point.x / 1000);
    const y = height * (point.y / 1000);
    const radius = Math.max(1, point.mass);

    if (drawVelocity) {
      const t = 100;
      ctx.strokeStyle = "#ffff00";
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + t * point.vX, y + t * point.vY);
      ctx.stroke();
    }

    ctx.strokeStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.stroke();
  }
}

const canvas = document.getElementById("canvas");
//document.body.onmousemove = (event) => {
//  points[0].x = event.clientX;
//  points[0].y = event.clientY;
//  points[0].mass = 1000;
//};

function resize() {
  canvas.width = 2 * document.documentElement.clientWidth;
  canvas.height = 2 * document.documentElement.clientHeight;
}

function step() {
  // main loop
  
  gravity(points);
  update(points);
  render(points); 

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize, false);

resize();
step();
