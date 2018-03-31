function randomPoint() {
  return {
    x: 450 + 100 * Math.random(),
    y: 450 + 100 * Math.random(),
    vX: 0,
    vY: 0,
    mass: 0.01 * Math.random()
  };
}
