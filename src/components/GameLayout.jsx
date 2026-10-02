export default function GameLayout({ children, selectedGame, onGameChange }) {
  function changeGame(event) {
    onGameChange(event.target.value);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <main>
      <nav className="topbar">
        <a className="brand" href="./">
          <span className="brand-mark">
            i
          </span>{" "}
          game night
        </a>
        <label className="game-selector">
          Game
          <select value={selectedGame} onChange={changeGame}>
            <option value="imposter">
              Imposter
            </option>
            <option value="random-number">
              Random number generator
            </option>
          </select>
        </label>
      </nav>
      <header className="intro">
        {selectedGame === "imposter" && (
          <h1>
          Someone’s an{" "}
          <em>
            imposter.
          </em>
          </h1>
        )}
        {selectedGame === "random-number" && (
          <h1>
            Random number generator
          </h1>
        )}
      </header>
      {children}
      <footer className="site-footer">
        Made for the moments between “one more round.”{" "}
        <span>
          NO ACCOUNTS. JUST FRIENDS.
        </span>
      </footer>
    </main>
  );
}
