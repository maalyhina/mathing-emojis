import { useState } from "react";
import "./App.css";
import StartPage from "./pages/StartPage";
import MainPage from "./pages/MainPage";
import ResultPage from "./pages/ResultPage";
import Header from "./components/Header";

export default function App() {
  const [currentPage, setCurrentPage] = useState("start");

  return (
    <div className="app-container">
      <Header />
      {currentPage === "start" && <StartPage onStart={() => setCurrentPage("main")} />}
      {currentPage === "main" && <MainPage onFinish={() => setCurrentPage("result")} />}
      {currentPage === "result" && <ResultPage onRestart={() => setCurrentPage("start")} />}
    </div>
  );
}
