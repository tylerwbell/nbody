///
///
///
function forceBetween(a, b) {
  const uX = a.x - b.x;
  const uY = a.y - b.y;
  const d = Math.sqrt(uX * uX + uY * uY);

  const d2 = d * d;
  return {
    x: uX / d2,
    y: uY / d2
  };
}

///
/// Barnes-Hut
///

///
///
function affectGravity(body, points) {
  let aX = 0;
  let aY = 0;
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const f = forceBetween(body, point);

    aX -= f.x * point.mass;
    aY -= f.y * point.mass;
  }

  body.vX += aX;
  body.vY += aY;
}

function affectedPoints(point, arr, tree) {
  if (tree.nodes === null) {
    return;
  }

  if (tree.nodes.type === PointType) {
    for (other of tree.nodes.points) {
      if (other === point) {
        continue;
      }

      arr.push(other);
    }
  } else if (tree.nodes.type === TreeType) {
    const uX = point.x - tree.center.x;
    const uY = point.y - tree.center.y;
    const d = Math.sqrt(uX * uX + uY * uY);

    if (tree.width / d < 0.5) {
      arr.push(tree.center);
    } else {
      for (tree of tree.nodes.trees) {
        affectedPoints(point, arr, tree);
      }
    }
  }
}

///
///
function barnesHutGravity(tree, points) {
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    const affectPoints = [];
    affectedPoints(point, affectPoints, tree);
    affectGravity(point, affectPoints);
  }
}

///
/// Direct Sum Algorithm
///

const _aX = Symbol();
const _aY = Symbol();

function directSumGravity(points) {
  for (let i = 0; i < points.length; i += 1) {
    const point = points[i];
    point[_aX] = 0;
    point[_aY] = 0;

    for (let j = i + 1; j < points.length; j += 1) {
      const other = points[j];
      const f = forceBetween(point, other);

      point[_aX] -= f.x * other.mass;
      point[_aY] -= f.y * other.mass;
      other[_aX] += f.x * point.mass;
      other[_aY] += f.y * point.mass;
    }

    point.vX += point[_aX];
    point.vY += point[_aY];
  }
}
