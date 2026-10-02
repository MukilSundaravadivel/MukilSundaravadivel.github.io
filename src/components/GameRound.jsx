import { useEffect } from "react";

function PlayerCard({ card, index, isRevealed, onReveal, onHide }) {
  const className = isRevealed ? "card is-flipped" : "card";
  const accessibleLabel = isRevealed
    ? `${card.name}: ${card.word}. Release to hide.`
    : `${card.name}. Hold to reveal your word.`;

  useEffect(() => {
    if (!isRevealed) return;

    function hideCard() {
      onHide(index);
    }

    window.addEventListener("blur", hideCard);
    document.addEventListener("visibilitychange", hideCard);
    return () => {
      window.removeEventListener("blur", hideCard);
      document.removeEventListener("visibilitychange", hideCard);
    };
  }, [isRevealed, index, onHide]);

  function revealOnPointerDown(event) {
    if (!event.isPrimary || event.button !== 0) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    onReveal(index);
  }

  function hideCard() {
    onHide(index);
  }

  function revealOnKeyDown(event) {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    if (!event.repeat) onReveal(index);
  }

  function hideOnKeyUp(event) {
    if (event.key !== " " && event.key !== "Enter") return;
    event.preventDefault();
    hideCard();
  }

  function preventContextMenu(event) {
    event.preventDefault();
  }
  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <button
      className={className}
      type="button"
      onPointerDown={revealOnPointerDown}
      onPointerUp={hideCard}
      onPointerCancel={hideCard}
      onLostPointerCapture={hideCard}
      onKeyDown={revealOnKeyDown}
      onKeyUp={hideOnKeyUp}
      onBlur={hideCard}
      onContextMenu={preventContextMenu}
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
            Hold to reveal
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
            Release to hide.
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
  onRevealCard,
  onHideCard,
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
        Hold your card to see your word. Release to hide it before passing
        the screen.
      </p>
      <div className="cards">
        {cards.map((card, index) => (
          <PlayerCard
            key={index}
            card={card}
            index={index}
            isRevealed={revealedIndex === index}
            onReveal={onRevealCard}
            onHide={onHideCard}
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
