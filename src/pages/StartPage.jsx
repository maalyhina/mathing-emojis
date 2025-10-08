import { useState } from "react";
import LevelSelector from "../components/LevelSelector";

export default function StartPage({ onStart }) {
  const [selectedLevel, setSelectedLevel] = useState("small");

  return (
    <div>
      <p className="lead">Select the difficulty level</p>

      <LevelSelector onSelect={(level) => setSelectedLevel(level)} />

      <button onClick={() => onStart(selectedLevel)}>Start game</button>
    </div>
  );
}
