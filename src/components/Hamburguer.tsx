import { useFBX } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";

interface HamburguerProps {
  position: [x: number, y: number, z: number];
}

export default function Hamburguer({ position }: HamburguerProps) {
  const b = useFBX("/burguer/burger.fbx");

  return (
    <RigidBody
      colliders="ball"
      position={position}
      type="fixed"
      name="hamburguer"
      restitution={0}
      scale={[0.01, 0.01, 0.01]}
    >
      <primitive object={b} />
    </RigidBody>
  );
}
