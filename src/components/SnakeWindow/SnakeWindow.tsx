import { useCallback, useState } from "react";
import { Windows } from "../Window";
import { SnakeWindowTitleBar } from "./components/SnakeWindowTitleBar";
import { SnakeWindowContent } from "./SnakeWindowContent";

export const SnakeWindow = () => {
  const [score, setScore] = useState(0);
  const handleSetScore = useCallback(
    (value: number | ((prev: number) => number)) => {
      setScore(value);
    },
    [],
  );

  return (
    <Windows name="snake">
      <Windows.TitleBar>
        <SnakeWindowTitleBar score={score} />
      </Windows.TitleBar>
      <Windows.Content>
        <SnakeWindowContent score={score} setScore={handleSetScore} />
      </Windows.Content>
    </Windows>
  );
};
