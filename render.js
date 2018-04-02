const X = 100;
const Y = 100;
const scale = 1100;

function renderPoint(ctx, point) {
  const width = canvas.width;
  const height = canvas.height;

  const x = X + width * (point.x / scale);
  const y = Y + height * (point.y / scale);

  if (drawVelocity) {
    const t = 100;
    ctx.strokeStyle = "#ff00ff";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + t * point.vX, y + t * point.vY);
    ctx.stroke();
  }

  ctx.fillStyle = "#ffff00";
  ctx.fillRect(x, y, 2, 2);

  // const radius = Math.max(1, point.mass * 500);
  // ctx.strokeStyle = "#ffff00";
  // ctx.beginPath();
  // ctx.arc(x, y, radius, 0, 2 * Math.PI);
  // ctx.stroke();
}

function renderTree(ctx, tree) {
  const width = canvas.width;
  const height = canvas.height;

  ctx.strokeStyle = "#00ffff";
  ctx.globalAlpha = 0.1;
  ctx.strokeRect(
    X + width * tree.x / scale,
    Y + height * tree.y / scale,
    width * tree.width / scale,
    height * tree.height / scale
  );
  ctx.globalAlpha = 1.0;

  if (tree.nodes !== null) {
    if (tree.nodes.type === PointType) {
      for (point of tree.nodes.points) {
        renderPoint(ctx, point);
      }
    } else if (tree.nodes.type === TreeType) {
      if (tree.width < 2) {
        return;
      }

      for (tree of tree.nodes.trees) {
        renderTree(ctx, tree);
      }
    }
  }
}

function render(canvas, tree) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#000000";
  // ctx.globalAlpha = 0.2;
  ctx.fillRect(0, 0, width, height);
  // ctx.globalAlpha = 1.0;

  renderTree(ctx, tree);
}
