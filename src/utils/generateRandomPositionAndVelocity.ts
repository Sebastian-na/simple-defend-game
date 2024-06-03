/**
 * generates a random position and velocity for a new bug
 */
const generateRandomPositionAndVelocity = () => {
  // random position for the bug. It should be in the border of the walls
  // which means at least the x or z coordinate should be 14 or -14
  const position = [Math.random() * 28 - 14, 0, Math.random() * 28 - 14] as [
    number,
    number,
    number
  ];

  // choose a random wall to spawn the bug
  const wall = Math.floor(Math.random() * 4);
  switch (wall) {
    case 0:
      position[0] = 14;
      break;
    case 1:
      position[0] = -14;
      break;
    case 2:
      position[2] = 14;
      break;
    case 3:
      position[2] = -14;
      break;
  }

  // calculate vector from position to origin
  const vectorToOrigin = position.map((coord) => -coord); // reverse the coordinates to point towards origin

  // calculate magnitude of the vector (distance from bug to origin)
  const distanceToOrigin = Math.sqrt(
    vectorToOrigin.reduce((acc, coord) => acc + coord * coord, 0)
  );

  // normalize the vector (convert to unit vector)
  const normalizedVector = vectorToOrigin.map(
    (coord) => coord / distanceToOrigin
  );

  // calculate velocity by scaling the normalized vector
  const velocity = 5; // you can adjust this value to control the speed of the bug
  const velocityVector = normalizedVector.map((coord) => coord * velocity) as [
    number,
    number,
    number
  ];

  return { position, velocity: velocityVector };
};

export default generateRandomPositionAndVelocity;
