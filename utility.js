function randomPoint() {
  return {
    x: 250 + 500 * Math.random(),
    y: 250 + 500 * Math.random(),
    vX: 0,
    vY: 0,
    fX: 0,
    fY: 0,
    mass: 0.001 * Math.random()
  };
}
