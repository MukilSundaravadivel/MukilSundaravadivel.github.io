import { useState } from "react";
import GameRound from "../components/GameRound.jsx";
import GameResults from "../components/GameResults.jsx";
import GameSetupPanel from "../components/GameSetupPanel.jsx";

export default function ImposterGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(10).fill(""));
  const [words, setWords] = useState(["", ""]);
  const [round, setRound] = useState(null);
  const [screen, setScreen] = useState("setup");
  const [revealedIndex, setRevealedIndex] = useState(null);
  const [error, setError] = useState("");

  function changePlayerName(index, value) {
    setPlayerNames((currentNames) => {
      const updatedNames = [...currentNames];
      updatedNames[index] = value;
      return updatedNames;
    });
  }

  function changeWord(index, value) {
    setWords((currentWords) => {
      const updatedWords = [...currentWords];
      updatedWords[index] = value;
      return updatedWords;
    });
  }

  function resetRound() {
    setRound(null);
    setScreen("setup");
    setRevealedIndex(null);
    setWords(["", ""]);
    setError("");
  }

  function showResults() {
    setRevealedIndex(null);
    setScreen("results");
  }

  function toggleCard(index) {
    setRevealedIndex((currentIndex) => (currentIndex === index ? null : index));
  }

  function startRound(event) {
    event.preventDefault();
    const [groupWord, imposterWord] = words.map((word) => word.trim());
    if (!groupWord || !imposterWord) {
      setError("Enter both words to deal the cards.");
      return;
    }
    if (groupWord.toLowerCase() === imposterWord.toLowerCase()) {
      setError("Choose two different words so there is an imposter.");
      return;
    }
    const imposterIndex = Math.floor(Math.random() * playerCount);
    const roundCards = Array.from({ length: playerCount }, (_, index) => {
      const name = playerNames[index].trim() || `Player ${index + 1}`;
      const word = index === imposterIndex ? imposterWord : groupWord;
      return { name, word };
    });
    const startingPlayerIndex = Math.floor(Math.random() * roundCards.length);
    setRound({
      cards: roundCards,
      startingPlayer: roundCards[startingPlayerIndex].name,
      imposterName: roundCards[imposterIndex].name,
      groupWord,
      imposterWord,
    });
    setScreen("play");
    setRevealedIndex(null);
    setError("");
  }

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <>
      {screen === "play" && (
        <GameRound
          cards={round.cards}
          startingPlayer={round.startingPlayer}
          revealedIndex={revealedIndex}
          onToggleCard={toggleCard}
          onShowResults={showResults}
        />
      )}
      {screen === "results" && (
        <GameResults
          imposterName={round.imposterName}
          groupWord={round.groupWord}
          imposterWord={round.imposterWord}
          onResetRound={resetRound}
        />
      )}
      {screen === "setup" && (
        <GameSetupPanel
          playerCount={playerCount}
          names={playerNames}
          words={words}
          error={error}
          onCountChange={setPlayerCount}
          onNameChange={changePlayerName}
          onWordChange={changeWord}
          onStartRound={startRound}
        />
      )}
    </>
  );
}
