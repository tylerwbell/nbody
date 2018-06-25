const combine = false;
const drawVelocity = false;
const renderBodies = false;
const useBarnesHut = true;
const motionBlur = true;

const points = [];
for (let i = 0; i < 1500; i += 1) {
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

const canvas = document.getElementById('canvas');

function resize() {
  canvas.width = 2 * document.documentElement.clientWidth;
  canvas.height = 2 * document.documentElement.clientHeight;
}

function step() {
  // main loop

  const tree = subdivide(0, 0, 1000, 1000, points);

  if (useBarnesHut) {
    barnesHutGravity(tree, points);
  } else {
    directSumGravity(points);
  }

  update(points);
  render(canvas, tree);

  requestAnimationFrame(step);
}

window.addEventListener('resize', resize, false);

resize();
step();

// Update the FPS counter
(function() {
  function resize() {
    const width = document.documentElement.clientWidth;
    const height = document.documentElement.clientHeight;
    console.log(`${width}, ${height}`);
    canvas.width = 2 * width;
    canvas.height = 2 * height;
  }
  window.addEventListener('resize', resize, false);
  resize();

  let counter = document.getElementById('counter');
  var lastLoop = new Date().getMilliseconds();
  var count = 1;
  var fps = 0;
  let f = function() {
    var currentLoop = new Date().getMilliseconds();
    if (lastLoop > currentLoop) {
      fps = count;
      count = 1;
    } else {
      count += 1;
    }
    lastLoop = currentLoop;
    counter.innerText = `${fps} fps`;
    requestAnimationFrame(f);
  };
  f();
})();
