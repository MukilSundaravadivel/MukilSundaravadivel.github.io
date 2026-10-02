import { useState } from "react";

export default function GameSetup() {
  const [players, setPlayers] = useState("");
  const [starter, setStarter] = useState("");
  const playerNames = players
    .split(/[,\n]/)
    .map((name) => name.trim())
    .filter(Boolean);

  function changePlayers(event) {
    setPlayers(event.target.value);
    setStarter("");
  }

  function chooseStarter(event) {
    event.preventDefault();
    if (playerNames.length === 0) {
      return;
    }
    const starterIndex = Math.floor(Math.random() * playerNames.length);
    setStarter(playerNames[starterIndex]);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <section aria-labelledby="setup-title">
      <h2 id="setup-title">
        Who goes first?
      </h2>
      <p>
        Add your players and pick a random starting player.
      </p>
      <form onSubmit={chooseStarter}>
        <label htmlFor="players">
          Player names
        </label>
        <textarea
          id="players"
          rows={4}
          value={players}
          onChange={changePlayers}
          placeholder={"Alex\nSam\nTaylor"}
          aria-describedby="players-help"
        />
        <small id="players-help">
          Use one name per line, or separate names with commas.
        </small>
        <button disabled={!playerNames.length}>
          Choose starting player
        </button>
      </form>
      <div className="result" role="status">
        {starter && (
          <p>
            <strong>
              {starter}
            </strong>{" "}
            goes first!
          </p>
        )}
      </div>
    </section>
  );
}
