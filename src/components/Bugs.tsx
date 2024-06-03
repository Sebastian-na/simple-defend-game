import { Dispatch, SetStateAction } from "react";
import Bug from "./Bug";

export interface IBug {
  position: [x: number, y: number, z: number];
  velocity: [x: number, y: number, z: number];
  id: number;
}

interface BugProps {
  bugs: Array<IBug>;
  setBugs: Dispatch<SetStateAction<IBug[]>>;
  gameOver: () => void;
  hitCount: number;
  setHitCount: Dispatch<SetStateAction<number>>;
}

export default function Bugs({
  bugs,
  setBugs,
  gameOver,
  hitCount,
  setHitCount,
}: BugProps) {
  return (
    <>
      {bugs.map((bug) => (
        <Bug
          key={bug.id}
          position={bug.position}
          velocity={bug.velocity}
          removeBug={() => {
            setBugs((prevBugs) => prevBugs.filter((b) => b.id !== bug.id));
          }}
          gameOver={gameOver}
          hitCount={hitCount}
          setHitCount={setHitCount}
        />
      ))}
    </>
  );
}
