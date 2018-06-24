const PointType = "point";
const TreeType = "tree";

function filterPointsByRect(points, rect) {
  const { x, y, width, height } = rect;

  let center = {
    mass: 0,
    x: null,
    y: null
  };

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

      const totalMass = center.mass + point.mass;
      if (center.x === null) {
        center.x = point.x;
        center.y = point.y;
      } else {
        center.x = (center.x * center.mass + point.x * point.mass) / totalMass;
        center.y = (center.y * center.mass + point.y * point.mass) / totalMass;
      }

      center.mass = totalMass;
    }
  }

  return {
    points: contains,
    center
  };
}

function subdivide(x, y, width, height) {
  const p = filterPointsByRect(points, { x, y, width, height });
  return makeTree(x, y, width, height, p.points, p.center);
}

function makeTree(x, y, width, height, points, center) {
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
    center,
    nodes: nodes
  };
}
