function PlayerCard({ card, index, isRevealed, onToggle }) {
  const className = isRevealed ? "card is-flipped" : "card";
  const accessibleLabel = isRevealed
    ? `${card.name}: ${card.word}. Click to hide.`
    : `${card.name}. Click to reveal your word.`;
  function toggleCard() {
    onToggle(index);
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <button
      className={className}
      onClick={toggleCard}
      aria-pressed={isRevealed}
      aria-label={accessibleLabel}
    >
      <span className="card-inner">
        <span className="card-front" aria-hidden={isRevealed}>
          <span className="card-number">
            PLAYER {String(index + 1).padStart(2, "0")}
          </span>
          <span className="card-symbol" aria-hidden="true">
            ✳
          </span>
          <strong>
            {card.name}
          </strong>
          <span className="card-hint">
            Tap to reveal ↗
          </span>
        </span>
        <span className="card-back" aria-hidden={!isRevealed}>
          <span className="card-number">
            YOUR SECRET WORD
          </span>
          <strong>
            {isRevealed && card.word}
          </strong>
          <span className="card-hint">
            Keep it secret. Tap to hide.
          </span>
        </span>
      </span>
    </button>
  );
}

export default function GameRound({
  cards,
  startingPlayer,
  revealedIndex,
  onToggleCard,
  onShowResults,
}) {
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <section className="panel">
      <div className="panel-heading">
        <span className="pill">
          02 / PLAY
        </span>
      </div>
      <p className="round-instructions">
        Find your name, tap your card, and take a quiet peek. Tap again to hide
        it before passing the screen.
      </p>
      <div className="cards">
        {cards.map((card, index) => (
          <PlayerCard
            key={index}
            card={card}
            index={index}
            isRevealed={revealedIndex === index}
            onToggle={onToggleCard}
          />
        ))}
      </div>
      <p className="starting-player">
        <strong>
          {startingPlayer}
        </strong>{" "}
        goes first.
      </p>
      <div className="panel-footer">
        <span>
          {cards.length} players · 1 imposter · trust no one
        </span>
        <button className="primary" onClick={onShowResults}>
          Reveal results ↗
        </button>
      </div>
    </section>
  );
}
