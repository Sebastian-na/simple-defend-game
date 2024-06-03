import { useKeyboard } from "../hooks/useKeyboard";
import Player from "./Player";
import Walls from "./Walls";
import Hamburguer from "./Hamburguer";
import { Suspense, useEffect, useState } from "react";
import Bugs, { IBug } from "./Bugs";
import generateRandomPositionAndVelocity from "../utils/generateRandomPositionAndVelocity";
import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { Html } from "@react-three/drei";
import HealthBar from "./HealthBar";
import BestTimeHistory from "./BestTimeHistory";
import { useLocalStorage } from "@uidotdev/usehooks";
import Timer from "./Timer";
import { useCustomEventListener } from "react-custom-events";

// Function to get player input from keyboard and mouse
function getInput(keyboard: Record<string, boolean>) {
  let [x, y, z] = [0, 0, 0];
  // Checking keyboard inputs to determine movement direction
  if (keyboard["s"]) z += 1.0; // Move backward
  if (keyboard["w"]) z -= 1.0; // Move forward
  if (keyboard["d"]) x += 1.0; // Move right
  if (keyboard["a"]) x -= 1.0; // Move left

  // Returning an object with the movement and look direction
  return {
    move: [x, y, z],
    running: keyboard["shift"], // Boolean to determine if the player is running (Shift key pressed)
  };
}

const generateUniqueID = () => {
  return Math.floor(Math.random() * 1000000);
};

const Scene = () => {
  const keyboard = useKeyboard(); // Hook to get keyboard input

  const [bugs, setBugs] = useState<IBug[]>([
    { ...generateRandomPositionAndVelocity(), id: generateUniqueID() },
    { ...generateRandomPositionAndVelocity(), id: generateUniqueID() },
  ]); // State to store the number of bugs collected

  const [hitCount, setHitCount] = useState(0);

  const [intervalId, setIntervalId] = useState<number | null>(null);
  useEffect(() => {
    initiateInterval();
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, []);

  const initiateInterval = () => {
    const id = setInterval(() => {
      const newBusCount = Math.floor(Math.random() * 3);
      const newBugs = Array.from({ length: newBusCount }, () => ({
        ...generateRandomPositionAndVelocity(),
        id: generateUniqueID(),
      }));
      setBugs((prevBugs) => [...prevBugs, ...newBugs]);
    }, 5000);
    setIntervalId(id);
  };

  const [hamburguerKey, setHamburguerKey] = useState(generateUniqueID());

  const [, setBestTimes] = useLocalStorage<number[]>("bestTimeHistory", []);

  const [reset, setReset] = useState(false);

  useCustomEventListener("resetTimer", (time: number) => {
    console.log(time);
    setBestTimes((prevBestTimes) => {
      const newBestTimes = [...prevBestTimes, time];
      newBestTimes.sort((a, b) => b - a);
      return newBestTimes.slice(0, 5);
    });
  });
  const gameOver = () => {
    setReset(true);
    setHamburguerKey(generateUniqueID());
    setBugs([]);
    if (intervalId) {
      clearInterval(intervalId);
    }
    setHitCount(0);
    initiateInterval();
    setTimeout(() => setReset(false), 0);
  };

  return (
    <Canvas camera={{ position: [0, 20, 20] }}>
      <Suspense fallback={null}>
        <Physics>
          <group>
            <Walls />
            <Hamburguer position={[0, 0, 0]} key={hamburguerKey} />
            <Player walk={3} input={() => getInput(keyboard)} />
            <Bugs
              bugs={bugs}
              setBugs={setBugs}
              gameOver={gameOver}
              hitCount={hitCount}
              setHitCount={setHitCount}
            />
            {/* <OrbitControls /> */}
            <ambientLight intensity={2} />
          </group>

          <Html center style={{ position: "absolute", top: "-340px" }}>
            <Timer reset={reset} />
          </Html>

          <Html position={[-18, 16, 0]}>
            <HealthBar maxHp={20} hp={20 - hitCount} />
          </Html>
          <Html position={[12, 17, 0]}>
            <BestTimeHistory />
          </Html>
        </Physics>
      </Suspense>
    </Canvas>
  );
};

export default Scene;
