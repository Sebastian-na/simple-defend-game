// Import necessary components from React and Three.js
import { RigidBody } from "@react-three/rapier"; // Component for rigid body physics simulation
import * as THREE from "three"; // Import the entire Three.js library as THREE

// Function to convert an angle from degrees to radians
const angleToRadians = (angleInDeg: number) => (Math.PI / 180) * angleInDeg;

// Array of data defining the positions and rotations of walls
const data: Array<{
  position: [x: number, y: number, z: number];
  rotation: [x: number, y: number, z: number];
  key: number;
}> = [
  {
    position: [0, 0, -15],
    rotation: [0, 0, 0],
    key: 1,
  },
  {
    position: [0, 0, 15],
    rotation: [0, 0, 0],
    key: 2,
  },
  {
    position: [15, 0, 0],
    rotation: [0, angleToRadians(90), 0],
    key: 3,
  },
  {
    position: [-15, 0, 0],
    rotation: [0, angleToRadians(-90), 0],
    key: 4,
  },
];

function Walls() {
  return (
    <>
      {data.map((item) => (
        <RigidBody
          colliders="cuboid"
          lockTranslations
          lockRotations
          position={item.position}
          rotation={item.rotation}
          key={item.key}
          name="wall"
        >
          <mesh>
            <planeGeometry args={[30, 10]} />
            <meshNormalMaterial side={THREE.DoubleSide} />
          </mesh>
        </RigidBody>
      ))}
      <RigidBody
        colliders="cuboid"
        lockTranslations={true}
        lockRotations
        position={[0, -2, 0]}
        rotation={[angleToRadians(-90), 0, 0]}
      >
        <mesh receiveShadow>
          <planeGeometry args={[30, 30]} />
          <meshNormalMaterial />
        </mesh>
      </RigidBody>
      <pointLight position={[0, 10, 0]} />
    </>
  );
}

export default Walls;
