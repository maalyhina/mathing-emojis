import ReactDOM from "react-dom";

export default function GameOverModal({ time, moves, onRestart, onNextLevel }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal">
        <h2>Game Over!</h2>
        <p>Time: <strong>{time}s</strong></p>
        <p>Moves: <strong>{moves}</strong></p>

        <div className="modal-buttons">
          <button onClick={onRestart}>Restart</button>
          <button onClick={onNextLevel}>Next Level</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
}
