const combine = false;
const drawVelocity = true;

const points = [];
for (let i = 0; i < 2000; i += 1) {
  points.push(randomPoint());
}

function gravity(points) {
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    for (let j = i + 1; j < points.length; j += 1) {
      const other = points[j];

      const uX = other.x - point.x;
      const uY = other.y - point.y;
      const d = Math.sqrt(uX * uX + uY * uY);
      const d2 = d * d;
      const fX = uX / d2;
      const fY = uY / d2;

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
  const t = 100;

  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];

    point.x += t * point.vX;
    point.y += t * point.vY;
  }
}

const canvas = document.getElementById("canvas");

function resize() {
  canvas.width = 2 * document.documentElement.clientWidth;
  canvas.height = 2 * document.documentElement.clientHeight;
}

function step() {
  // main loop

  gravity(points);
  update(points);
  render(canvas, points);

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize, false);

resize();
step();
