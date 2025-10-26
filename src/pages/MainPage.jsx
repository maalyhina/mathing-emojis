import useEmojiGame from "../hooks/useEmojiGame";
import EmojiCard from "../components/EmojiCard";

export default function MainPage({ onFinish }) {
  const { cards, flipCard, moves, time, isFinished } = useEmojiGame("small");

  return (
    <div className="page">
      <h2>Matching Emojis</h2>

      <div className="meta">
        <div>Рухів: <strong>{moves}</strong></div>
        <div>Час: <strong>{time}s</strong></div>
      </div>

      <div className="grid">
        {cards.map((card, i) => (
          <div
            key={i}
            className={`card ${card.flipped ? "flipped" : ""}`}
            onClick={() => flipCard(i)}
          >
            {card.flipped || card.emojiMatched ? card.emoji : "❓"}
          </div>
        ))}
      </div>

      {isFinished && (
        <button onClick={onFinish} style={{ marginTop: "20px" }}>
          Game over!
        </button>
      )}
    </div>
  );
}
