import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef } from "react";
import { Mesh, Vector3 } from "three";

const Player = ({
  walk = 3,
  input = () => ({ move: [0, 0, 0], running: false }),
}) => {
  const api = useRef<RapierRigidBody>(null); // Reference to the RigidBody API provided by "@react-three/rapier".
  const mesh = useRef<Mesh>(null); // Reference to the 3D mesh of the player character.

  const speed = new Vector3(walk / 2, 0, walk); // Vector representing the player's movement speed.
  const offset = new Vector3(0, 0, 0); // Vector used to calculate the player's movement based on user input.

  useFrame(() => {
    if (!api.current || !mesh.current) return;
    const { move, running } = input();

    offset
      .fromArray(move)
      .normalize()
      .multiply(speed)
      .multiplyScalar(running ? 2 : 1);

    api.current.applyImpulse(offset, true);
  });
  return (
    <RigidBody
      ref={api}
      lockRotations
      position={[10, 0, 0]}
      friction={0}
      restitution={0}
      colliders="ball"
    >
      <mesh ref={mesh} userData={{ tag: "player" }} castShadow>
        <meshPhysicalMaterial metalness={0.5} roughness={0} />
        <sphereGeometry args={[1, 16, 16]} />
      </mesh>
    </RigidBody>
  );
};

export default Player;
