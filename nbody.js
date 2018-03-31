const combine = false;
const drawVelocity = true;

const PointType = "point";
const TreeType = "tree";

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

function makeTree(x, y, width, height, points) {
  function subdivide(x, y, width, height) {
    const p = [];
    for (let i = 0; i < points.length; i += 1) {
      const point = points[i];
      if (point.x > x && point.x < (x + width)
        && point.y > y && point.y < (y + height)) {
        p.push(point);
      }
    }

    return makeTree(x, y, width, height, p);
  }

  let nodes;
  if (points.length <= 1) {
    nodes = {
      type: PointType,
      points: points
    }
  } else {
    const midX = width / 2;
    const midY = height / 2;

    nodes = {
      type: TreeType, 
      trees: [
        subdivide(x, y, midX, midY),
        subdivide(x + midX, y, midX, midY),
        subdivide(x, y + midY, midX, midY),
        subdivide(x + midX, y + midY, midX, midY)
      ]
    };
  }

    return {
      x: x, 
      y: y,
      width: width,
      height: height,
      nodes: nodes
    }
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

function renderPoint(ctx, point) {
  const width = canvas.width;
  const height = canvas.height;

  const x = width * (point.x / 1000);
  const y = height * (point.y / 1000);
  const radius = Math.max(1, point.mass);

  if (drawVelocity) {
    const t = 100;
    ctx.strokeStyle = "#ff00ff";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + t * point.vX, y + t * point.vY);
    ctx.stroke();
  }

  ctx.strokeStyle = "#ffff00";
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, 2 * Math.PI);
  ctx.stroke();
}

function renderTree(ctx, tree) {
  const width = canvas.width;
  const height = canvas.height;

  ctx.strokeStyle = "#00ffff";
  ctx.globalAlpha = 0.1;
  ctx.strokeRect(
    width * tree.x / 1000, 
    height* tree.y / 1000, 
    width * tree.width / 1000, 
    height * tree.height / 1000
  );
  ctx.globalAlpha = 1.0;

  if (tree.nodes !== null) {
    if (tree.nodes.type === PointType) {
      for (point of tree.nodes.points) {
        renderPoint(ctx, point);
      }
    } else if (tree.nodes.type === TreeType) {
      for (tree of tree.nodes.trees) {
        renderTree(ctx, tree);
      }
    }
  }
}

function render(points) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "000000";
  ctx.globalAlpha = 0.5;
  ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1.0;

  const tree = makeTree(0, 0, 1000, 1000, points);
  renderTree(ctx, tree);
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
  render(points); 

  requestAnimationFrame(step);
}

window.addEventListener("resize", resize, false);

resize();
step();
