import { useState, useEffect } from "react";

export default function useEmojiGame(level) {
  const emojiSet = ["🐶", "🐱", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯"];
  const [cards, setCards] = useState([]);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const gameEmojis = emojiSet.slice(0, 6);
    const shuffled = [...gameEmojis, ...gameEmojis]
      .sort(() => Math.random() - 0.5)
      .map((emoji, index) => ({ id: index, emoji, flipped: false }));
    
    setCards(shuffled);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setStartTime(Date.now());
  }, [level]);

  useEffect(() => {
    if (!startTime) return;
    const timer = setInterval(() => {
      setTime(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime]);

  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      setTimeout(() => {
        const [first, second] = flipped;
        if (cards[first].emoji === cards[second].emoji) {
          setMatched((prev) => [...prev, cards[first].emoji]);
          setCards((prev) =>
            prev.map((card, idx) =>
              flipped.includes(idx) ? { ...card, flipped: true } : card
            )
          );
        } else {
          setCards((prev) =>
            prev.map((card, idx) =>
              flipped.includes(idx) ? { ...card, flipped: false } : card
            )
          );
        }
        setFlipped([]);
        setMoves((m) => m + 1);
        setDisabled(false);
      }, 700);
    }
  }, [flipped, cards]);

  const flipCard = (index) => {
    if (
      disabled ||
      flipped.includes(index) ||
      matched.includes(cards[index].emoji)
    )
      return;

    setCards((prev) =>
      prev.map((card, idx) =>
        idx === index ? { ...card, flipped: true } : card
      )
    );
    setFlipped((prev) => [...prev, index]);
  };

  const isFinished = matched.length === cards.length / 2;

  return { cards, flipCard, moves, time, isFinished };
}
