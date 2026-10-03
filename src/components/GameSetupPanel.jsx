import { useState } from "react";
import { MAX_PLAYERS, getMaximumImposters } from "../tools/imposterRound.js";

const WORD_FIELDS = [
  {
    label: "The group’s word",
    placeholder: "e.g. Coffee",
    help: "Everyone except the imposters gets this.",
  },
  {
    label: "The imposters’ word",
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

function GeneratedWordFields({ value, onChange }) {
  function changeSource(event) {
    onChange(event.target.value);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <div>
      <label className="word-source">
        Generate from
        <select value={value} onChange={changeSource}>
          <option value="random">
            Random words (quality not guaranteed)
          </option>
          <option value="genshin">
            Genshin characters (up to 10/26)
          </option>
        </select>
      </label>
      <p className="hint">
        {value === "genshin"
          ? "We’ll pick two different Genshin characters when you deal."
          : "We’ll pick two random words when you deal. They might not be related."}
      </p>
    </div>
  );
}

function WordSetup({ words, wordSource, onSourceChange, onWordChange }) {
  const [generatedSource, setGeneratedSource] = useState(
    wordSource === "custom" ? "random" : wordSource,
  );
  const isCustom = wordSource === "custom";

  function chooseCustomWords() {
    onSourceChange("custom");
  }

  function chooseGeneratedWords() {
    onSourceChange(generatedSource);
  }

  function changeGeneratedSource(value) {
    setGeneratedSource(value);
    onSourceChange(value);
  }

  function changeGroupWord(value) {
    onWordChange(0, value);
  }

  function changeImposterWord(value) {
    onWordChange(1, value);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <div className="word-setup">
      <div className="word-mode-switch" role="group" aria-label="Word source">
        <label className="word-mode-option">
          <input
            type="radio"
            name="word-mode"
            value="custom"
            checked={isCustom}
            onChange={chooseCustomWords}
          />
          <span>
            Custom words
          </span>
        </label>
        <label className="word-mode-option">
          <input
            type="radio"
            name="word-mode"
            value="generated"
            checked={!isCustom}
            onChange={chooseGeneratedWords}
          />
          <span>
            Generated words
          </span>
        </label>
      </div>
      {isCustom ? (
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
      ) : (
        <GeneratedWordFields
          value={wordSource}
          onChange={changeGeneratedSource}
        />
      )}
    </div>
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

function CountControl({ label, value, maximum, onChange }) {
  function decreaseCount() {
    onChange(value - 1);
  }

  function increaseCount() {
    onChange(value + 1);
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <div className="count-control" role="group" aria-label={label}>
      <span>
        {label}
      </span>
      <div className="counter">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= 1}
          onClick={decreaseCount}
        >
          −
        </button>
        <output aria-live="polite" aria-label={`${label} count`}>
          {value}
        </output>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= maximum}
          onClick={increaseCount}
        >
          +
        </button>
      </div>
    </div>
  );
}

function PlayerFields({
  playerCount,
  imposterCount,
  names,
  onCountChange,
  onImposterCountChange,
  onNameChange,
}) {
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
            Choose 1–{MAX_PLAYERS} players. Names are optional.
          </p>
        </div>
        <div className="player-count-fields">
          <CountControl
            label="Players"
            value={playerCount}
            maximum={MAX_PLAYERS}
            onChange={onCountChange}
          />
          <CountControl
            label="Imposters"
            value={imposterCount}
            maximum={getMaximumImposters(playerCount)}
            onChange={onImposterCountChange}
          />
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
  imposterCount,
  names,
  words,
  wordSource,
  isLoading,
  error,
  onWordSourceChange,
  onCountChange,
  onImposterCountChange,
  onNameChange,
  onWordChange,
  onStartRound,
}) {
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
          <WordSetup
            words={words}
            wordSource={wordSource}
            onSourceChange={onWordSourceChange}
            onWordChange={onWordChange}
          />
          <PlayerFields
            playerCount={playerCount}
            imposterCount={imposterCount}
            names={names}
            onCountChange={onCountChange}
            onImposterCountChange={onImposterCountChange}
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
