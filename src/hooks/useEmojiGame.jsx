import { useState, useEffect } from "react";

export default function useEmojiGame(level = "1 (3×2)") {
  const emojiSet = [
    "🐶","🐱","🐰","🦊","🐻","🐼","🐨","🐯",
    "🦁","🐮","🐷","🐸","🐵","🐔","🐧","🐴",
    "🦄","🐝","🦋","🐌","🐙","🦖","🐊","🐢",
    "🐍","🦅","🦉","🦜","🦩","🐞","🦀","🐡",
    "🐬","🦈","🐳","🐋","🦦","🦭","🐫","🦓",
    "🐆","🐘","🦍","🐇","🐿️","🦔","🐉","🦕"
  ];

  const levelMap = {
    "1 (3×2)": { pairs: 3, flips: 20 },   
    "2 (4×3)": { pairs: 6, flips: 40 },   
    "3 (6×4)": { pairs: 12, flips: 60 },  
    "4 (6×5)": { pairs: 15, flips: 80}, 
    "5 (8×6)": { pairs: 24, flips: 100 },  
  };

  const currentLevel = levelMap[level] || levelMap["1 (3×2)"];
  const emojisForGame = emojiSet.slice(0, currentLevel.pairs);

  const generateCards = () =>
    [...emojisForGame, ...emojisForGame]
      .map((emoji, index) => ({ id: index, emoji, flipped: false }))
      .sort(() => Math.random() - 0.5);

  const [cards, setCards] = useState(generateCards);
  const [flipped, setFlipped] = useState([]);
  const [matched, setMatched] = useState([]);
  const [moves, setMoves] = useState(0);
  const [disabled, setDisabled] = useState(false);
  const [time, setTime] = useState(0);
  const [startTime, setStartTime] = useState(Date.now());
  const [remainingFlips, setRemainingFlips] = useState(currentLevel.flips);

  useEffect(() => {
    restart();
  }, [level]);

  useEffect(() => {
  if (!startTime) return;

  const timer = setInterval(() => {
    setTime((prevTime) => {
      if (matched.length === cards.length / 2) {
        clearInterval(timer);
        return prevTime;
      }
      return Math.floor((Date.now() - startTime) / 1000);
    });
  }, 1000);

  return () => clearInterval(timer);
}, [startTime, matched, cards.length]);


  useEffect(() => {
    if (flipped.length === 2) {
      setDisabled(true);
      const [first, second] = flipped;

      setTimeout(() => {
        if (cards[first].emoji === cards[second].emoji) {
          setMatched((prev) => [...prev, cards[first].emoji]);
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
  }, [flipped]);

  const flipCard = (index) => {
    if (disabled || flipped.includes(index) || matched.includes(cards[index].emoji)) return;
    if (remainingFlips <= 0) return; 

    setCards((prev) =>
      prev.map((card, idx) =>
        idx === index ? { ...card, flipped: true } : card
      )
    );
    setFlipped((prev) => [...prev, index]);
    setRemainingFlips((r) => r - 1);
  };

  const restart = () => {
    const newCards = generateCards();
    setCards(newCards);
    setFlipped([]);
    setMatched([]);
    setMoves(0);
    setDisabled(false);
    setTime(0);
    setStartTime(Date.now());
    setRemainingFlips(currentLevel.flips);
  };

  const isWon = matched.length === cards.length / 2;
  const isLost = remainingFlips <= 0 && !isWon;
  const isFinished = isWon || isLost;

  return {
    cards,
    flipCard,
    moves,
    time,
    isFinished,
    restart,
    remainingFlips,
    level,
    isWon,
    isLost
  };
}
