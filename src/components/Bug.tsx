import { useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import React, { useRef } from "react";

interface BugProps {
  position: [x: number, y: number, z: number];
  velocity: [x: number, y: number, z: number];
  removeBug: () => void;
  gameOver: () => void;
  hitCount: number;
  setHitCount: React.Dispatch<React.SetStateAction<number>>;
}

export default function Bug({
  position,
  velocity,
  removeBug,
  gameOver,
  hitCount,
  setHitCount,
}: BugProps) {
  const api = useRef<RapierRigidBody>(null);

  // useFrame(() => {
  //   if (!api.current) return;
  //   // if for some external force the bug is not longer going to the center (look at the velocity)
  //   // apply a force to make it go to the center
  // });

  return (
    <RigidBody
      colliders="ball"
      position={position}
      friction={0}
      restitution={0}
      ref={api}
      linearVelocity={velocity}
      name="bug"
      onCollisionEnter={({ other }) => {
        if (other.rigidBodyObject?.name === "hamburguer") {
          setHitCount((prev) => prev + 1);
          if (hitCount >= 20) {
            gameOver();
          }
          removeBug();
        }

        if (other.rigidBodyObject?.name === "wall") {
          setHitCount((prev) => (prev -= 0.01));
          removeBug();
        }
      }}
    >
      <mesh>
        <sphereGeometry args={[1, 24, 24, 8]} />
        <meshNormalMaterial />
      </mesh>
    </RigidBody>
  );
}
