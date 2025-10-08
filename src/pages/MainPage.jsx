import Grid from "../components/Grid";

export default function MainPage({ onFinish }) {
  return (
    <div className="page">
      <h2>Game Started</h2>
      <p className="lead">Click on a card to see the emoji (matching logic is not implemented yet).</p>
      <div className="meta">
        <div>Level: <strong>Small</strong></div>
        <div>Moves: <strong>-</strong></div>
      </div>
      <Grid />
      <button onClick={onFinish}>Finish Game</button>
    </div>
  );
}
