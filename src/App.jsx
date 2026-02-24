import { useState } from "react";
import "./index.css";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import Header from "./components/Header";
import CookiePopup from "./components/CookiePopup";

export default function App() {
  const [currentPage, setCurrentPage] = useState("start");
  const [selectedLevel, setSelectedLevel] = useState("1 (3×2)");
  const [gameKey, setGameKey] = useState(0);

  const levels = ["1 (3×2)", "2 (4×3)", "3 (6×4)", "4 (6×5)", "5 (8×6)"];

  const handleStart = (level) => {
    setSelectedLevel(level);
    setGameKey((k) => k + 1);
    setCurrentPage("main");
  };

  const handleNextLevel = () => {
    const currentIndex = levels.indexOf(selectedLevel);
    if (currentIndex < levels.length - 1) {
      const nextLevel = levels[currentIndex + 1];
      setSelectedLevel(nextLevel);
      setGameKey((k) => k + 1);
      setCurrentPage("main");
    } else {
      setCurrentPage("result");
    }
  };

  const handleRestart = () => {
    setGameKey((k) => k + 1);
    setCurrentPage("main");
  };

  return (
    <div className="app-container">
      <Header />
      <CookiePopup /> 
      {currentPage === "start" && <StartPage onStart={handleStart} />}
      {currentPage === "main" && (
        <MainPage
          key={gameKey}
          level={selectedLevel}
          onFinish={handleNextLevel}
           onBackToMenu={() => setCurrentPage("start")}
        />
      )}
      {currentPage === "result" && (
        <ResultPage onRestart={() => setCurrentPage("start")} />
      )}
    </div>
  );
}
