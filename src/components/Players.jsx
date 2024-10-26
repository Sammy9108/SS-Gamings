import { useState } from "react";

export default function Player({
  initialName,
  symbol,
  isActive,
  onNameChange,
}) {
  const [toggleButton, setToggleButton] = useState(true);
  const [playerName, setPlayerName] = useState(initialName);

  function handleOnClick() {
    setToggleButton(() => !toggleButton);
    if (!toggleButton) {
      onNameChange(symbol, playerName);
    }
  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {toggleButton ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input
            type="text"
            value={playerName}
            onChange={handleChange}
            required
          ></input>
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleOnClick}>{toggleButton ? "Edit" : "Save"}</button>
    </li>
  );
}
