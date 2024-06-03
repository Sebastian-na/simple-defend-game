import { useLocalStorage } from "@uidotdev/usehooks";
import { useMemo } from "react";

const BestTimeHistory = () => {
  const [bestTimes, setBestTimes] = useLocalStorage<number[]>(
    "bestTimeHistory",
    []
  );

  const organized = useMemo(() => {
    return [...bestTimes]
      .sort((a, b) => b - a)
      .slice(0, 3)
      .map((time) => (time * 10) / 1000);
  }, [bestTimes]);

  return (
    <div>
      <h1 style={{ textWrap: "nowrap" }}>Best Times</h1>
      <ul>
        {organized.map((time, index) => (
          <li key={index}>{time}s</li>
        ))}
      </ul>
    </div>
  );
};

export default BestTimeHistory;
