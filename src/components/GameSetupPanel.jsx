const WORD_FIELDS = [
  {
    label: "The group’s word",
    placeholder: "e.g. Coffee",
    help: "Everyone except one player gets this.",
  },
  {
    label: "The imposter’s word",
    placeholder: "e.g. Tea",
    help: "A similar word keeps things interesting.",
  },
];

function WordField({ field, value, onChange }) {
  function handleChange(event) {
    onChange(event.target.value);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <label>
      {field.label}
      <input
        value={value}
        onChange={handleChange}
        placeholder={field.placeholder}
        maxLength={80}
        required
        autoComplete="off"
      />
      <small>
        {field.help}
      </small>
    </label>
  );
}

function WordSourceSelect({ value, onChange }) {
  function changeSource(event) {
    onChange(event.target.value);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <label className="word-source">
      Word source
      <select value={value} onChange={changeSource}>
        <option value="custom">
          My own words
        </option>
        <option value="random">
          Random words (API)
        </option>
        <option value="genshin">
          Random Genshin characters
        </option>
      </select>
    </label>
  );
}

function PlayerNameField({ index, name, onChange }) {
  const playerLabel = `Player ${index + 1}`;
  function handleChange(event) {
    onChange(index, event.target.value);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <label className="name-field">
      <span>
        {String(index + 1).padStart(2, "0")}
      </span>
      <input
        aria-label={`${playerLabel} name (optional)`}
        placeholder={playerLabel}
        value={name}
        maxLength={40}
        onChange={handleChange}
      />
    </label>
  );
}

function PlayerFields({ playerCount, names, onCountChange, onNameChange }) {
  function removePlayer() {
    onCountChange(playerCount - 1);
  }
  function addPlayer() {
    onCountChange(playerCount + 1);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <>
      <div className="players-heading">
        <div>
          <h3>
            Who’s playing?
          </h3>
          <p>
            Choose 1–10 players. Names are optional.
          </p>
        </div>
        <div className="counter" aria-label="Number of players">
          <button
            type="button"
            aria-label="Remove a player"
            disabled={playerCount === 1}
            onClick={removePlayer}
          >
            −
          </button>
          <output aria-live="polite">
            {playerCount}
          </output>
          <button
            type="button"
            aria-label="Add a player"
            disabled={playerCount === 10}
            onClick={addPlayer}
          >
            +
          </button>
        </div>
      </div>
      <div className="name-fields">
        {names.slice(0, playerCount).map((name, index) => (
          <PlayerNameField
            key={index}
            index={index}
            name={name}
            onChange={onNameChange}
          />
        ))}
      </div>
    </>
  );
}

export default function GameSetupPanel({
  playerCount,
  names,
  words,
  wordSource,
  isLoading,
  error,
  onWordSourceChange,
  onCountChange,
  onNameChange,
  onWordChange,
  onStartRound,
}) {
  function changeGroupWord(value) {
    onWordChange(0, value);
  }
  function changeImposterWord(value) {
    onWordChange(1, value);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <section className="panel">
      <div className="panel-heading">
        <span className="pill">
          01 / SETUP
        </span>
      </div>
      <form onSubmit={onStartRound} aria-busy={isLoading}>
        <fieldset className="setup-fields" disabled={isLoading}>
          <WordSourceSelect
            value={wordSource}
            onChange={onWordSourceChange}
          />
          {wordSource === "custom" ? (
            <div className="word-fields">
              <WordField
                field={WORD_FIELDS[0]}
                value={words[0]}
                onChange={changeGroupWord}
              />
              <WordField
                field={WORD_FIELDS[1]}
                value={words[1]}
                onChange={changeImposterWord}
              />
            </div>
          ) : null}
          {wordSource === "random" && (
            <p className="hint">
              We’ll pick two random words when you deal. They might not be related.
            </p>
          )}
          {wordSource === "genshin" && (
            <p className="hint">
              We’ll pick two different Genshin characters when you deal.
            </p>
          )}
          <PlayerFields
            playerCount={playerCount}
            names={names}
            onCountChange={onCountChange}
            onNameChange={onNameChange}
          />
          {playerCount < 3 && (
            <p className="hint">
              The guessing game works best with 3 or more players.
              {playerCount === 1 &&
                " With one player, the card gets the imposter word."}
            </p>
          )}
          {error && (
            <p className="error" role="alert">
              {error}
            </p>
          )}
          <div className="panel-footer">
            <button className="primary" type="submit" disabled={isLoading}>
              {isLoading ? "Getting words…" : "Deal the cards ↗"}
            </button>
          </div>
        </fieldset>
        {isLoading && (
          <p className="hint" role="status">
            Getting random words…
          </p>
        )}
      </form>
    </section>
  );
}
