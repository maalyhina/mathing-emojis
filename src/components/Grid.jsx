import EmojiCard from "./EmojiCard";

export default function Grid() {
  const emojis = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸"];

  return (
    <div className="grid">
      {emojis.map((emoji, index) => (
        <EmojiCard key={index} emoji={emoji} />
      ))}
    </div>
  );
}
