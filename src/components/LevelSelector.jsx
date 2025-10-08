import { useState } from "react";

export default function LevelSelector({ onSelect }) {
  const levels = [
    "1 (3×2)",
    "2 (4×3)",
    "3 (6×4)",
    "4 (6×5)",
    "5 (8×6)",
  ];

  return (
    <div className="level-cards">
      {levels.map((label, index) => (
        <div
          key={index}
          className="card"
          onClick={() => onSelect(label)}
        >
          {label}
        </div>
      ))}
    </div>
  );
}
