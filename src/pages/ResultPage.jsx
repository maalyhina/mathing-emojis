export default function ResultPage({ onRestart }) {
  return (
    <div className="page">
      <h1>Result</h1>
      <p className="lead">You have completed the app skeleton — game logic can be added later.</p>

      <div className="meta">
        <div>Time: <strong>-</strong></div>
        <div>Number of moves: <strong>-</strong></div>
      </div>

      <button onClick={onRestart}>Restart</button>
    </div>
  );
}
