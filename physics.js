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
///
function affectGravity(body, points) {
  let aX = 0;
  let aY = 0;
  for (let i = 0; i < points.length; j += 1) {
    const point = point[i];
    const f = forceBetween(body, point);

    aX += f.x * point.mass;
    aY += f.y * point.mass;
  }

  point.vX += aX;
  point.vY += aY;
}

const _aX = Symbol();
const _aY = Symbol();

///
///
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
