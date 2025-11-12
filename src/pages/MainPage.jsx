import useEmojiGame from "../hooks/useEmojiGame";
import GameOverModal from "../components/GameOverModal";

export default function MainPage({ level, onFinish, onBackToMenu }) {
  const { cards, flipCard, moves, time, isFinished, restart, remainingFlips, isWon, isLost } = useEmojiGame(level);

  function getColumns(level) {
    switch (level) {
      case "1 (3×2)": return 3;
      case "2 (4×3)": return 4;
      case "3 (6×4)": return 6;
      case "4 (6×5)": return 6;
      case "5 (8×6)": return 8;
      default: return 3;
    }
  }

  return (
    <div className="page">
      <button 
        onClick={onBackToMenu} 
        style={{ marginBottom: "10px", padding: "5px 10px" }}
      >
        Back to Menu
      </button>

      <div className="meta">
        <div>Moves: <strong>{moves}</strong></div>
        <div>Time: <strong>{time}s</strong></div>
        <div>Remaining flips: <strong>{remainingFlips}</strong></div>
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${getColumns(level)}, 1fr)`,
          gap: "10px",
        }}
      >
        {cards.map((card, i) => (
          <div
            key={i}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => flipCard(i)}
          >
            {card.flipped ? card.emoji : "❓"}
          </div>
        ))}
      </div>

      {isFinished && (
        <GameOverModal
          time={time}
          moves={moves}
          onRestart={restart}
          onNextLevel={onFinish}
          isWon={isWon}
          isLost={isLost}
        />
      )}
    </div>
  );
}
