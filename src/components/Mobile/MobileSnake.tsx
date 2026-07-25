import { useState } from "react";
import { SnakeWindowContent } from "../SnakeWindow/SnakeWindowContent";

/** The window kept score in its title bar; on a phone the game owns it. */
export const MobileSnake = () => {
  const [score, setScore] = useState(0);

  return <SnakeWindowContent score={score} setScore={setScore} />;
};
