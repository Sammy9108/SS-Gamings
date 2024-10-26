import Player from "./components/Players";
import GameBoard from "./components/GameBoard";
import { useState } from "react";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winning-combinations";
import GameOver from "./components/GameOver";

const PLAYERS = { X: "PLAYER 1", O: "PLAYER 2" };

const initial_GameArea = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveInitialSymbol(playerTurns) {
  let currentPlayer = "X";

  if (playerTurns.length > 0 && playerTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function derivedGameBoard(playerTurns) {
  let gameBoard = [...initial_GameArea.map((array) => [...array])];

  for (const turn of playerTurns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function derivedWinner(gameBoard, players) {
  let winer;
  for (const combination of WINNING_COMBINATIONS) {
    const firstBoxSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondBoxSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdBoxSymbol = gameBoard[combination[2].row][combination[2].column];

    if (
      firstBoxSymbol &&
      firstBoxSymbol === secondBoxSymbol &&
      firstBoxSymbol === thirdBoxSymbol
    ) {
      winer = players[firstBoxSymbol];
    }
  }
  return winer;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [playerTurns, setPlayerTurns] = useState([]);
  const activePlayer = deriveInitialSymbol(playerTurns);
  const gameBoard = derivedGameBoard(playerTurns);
  const winner = derivedWinner(gameBoard, players);
  const hasDraw = playerTurns.length === 9 && !winner;

  function handleReset() {
    setPlayerTurns([]);
  }

  function handlePlayerChange(symbol, newName) {
    setPlayers((prevPlayers) => {
      return { ...prevPlayers, [symbol]: newName };
    });
  }

  function handleSelectBox(rowIndex, colIndex) {
    // setActivePlayer((currentlyActive) => (currentlyActive === "X" ? "O" : "X"));
    setPlayerTurns((prevTurns) => {
      const currentPlayer = deriveInitialSymbol(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onNameChange={handlePlayerChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onNameChange={handlePlayerChange}
          />
        </ol>
        {(winner || hasDraw) && (
          <GameOver winner={winner} Reset={handleReset} />
        )}

        <GameBoard onSelectBox={handleSelectBox} board={gameBoard} />
      </div>
      <Log turns={playerTurns} />
    </main>
  );
}

export default App;
