function renderPoint(ctx, point) {
  const width = canvas.width;
  const height = canvas.height;

  const x = width * (point.x / 1000);
  const y = height * (point.y / 1000);
  // const radius = Math.max(1, point.mass);

  if (drawVelocity) {
    const t = 100;
    ctx.strokeStyle = "#ff00ff";
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + t * point.vX, y + t * point.vY);
    ctx.stroke();
  }

  // ctx.strokeStyle = "#ffff00";
  ctx.fillStyle = "#ffff00";
  // ctx.beginPath();
  // ctx.arc(x, y, radius, 0, 2 * Math.PI);
  // ctx.stroke();
  ctx.fillRect(x, y, 1, 1);
}

function renderTree(ctx, tree) {
  const width = canvas.width;
  const height = canvas.height;

  ctx.strokeStyle = "#00ffff";
  ctx.globalAlpha = 0.1;
  ctx.strokeRect(
    width * tree.x / 1000,
    height * tree.y / 1000,
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

function render(canvas, points) {
  const width = canvas.width;
  const height = canvas.height;
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "000000";
  // ctx.globalAlpha = 1.0;
  ctx.fillRect(0, 0, width, height);
  // ctx.globalAlpha = 1.0;

  const tree = makeTree(0, 0, 1000, 1000, points);
  renderTree(ctx, tree);
}
