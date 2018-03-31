const PointType = "point";
const TreeType = "tree";

function filterPointsByRect(points, rect) {
  const { x, y, width, height } = rect;

  const contains = [];
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    if (
      point.x > x &&
      point.x < x + width &&
      point.y > y &&
      point.y < y + height
    ) {
      contains.push(point);
    }
  }

  return contains;
}

function makeTree(x, y, width, height, points) {
  function subdivide(x, y, width, height) {
    const p = filterPointsByRect(points, { x, y, width, height });
    return makeTree(x, y, width, height, p);
  }

  let nodes;
  if (points.length <= 1) {
    nodes = {
      type: PointType,
      points: points
    };
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
  };
}
