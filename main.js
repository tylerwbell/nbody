const combine = false;
const drawVelocity = true;

const points = [];
for (let i = 0; i < 2000; i += 1) {
  points.push(randomPoint());
}

function update(points) {
  const t = 50;

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

  const tree = subdivide(0, 0, 1000, 1000, points);
  // barnesHutGravity(tree, points);
  directSumGravity(points);
  update(points);
  render(canvas, tree);

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize, false);

resize();
step();
