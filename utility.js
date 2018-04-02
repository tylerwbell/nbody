function randomPoint() {
  return {
    x: 250 + 500 * Math.random(),
    y: 250 + 500 * Math.random(),
    vX: 0.5 * (0.5 - Math.random()),
    vY: 0.5 * (0.5 - Math.random()),
    mass: 0.01 * Math.random()
  };
}
