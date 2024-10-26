export default function GameOver({ winner, Reset }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>Winner {winner}!</p>}
      {!winner && <p>It's a Draw!</p>}
      <button onClick={Reset}>Rematch!</button>
    </div>
  );
}
