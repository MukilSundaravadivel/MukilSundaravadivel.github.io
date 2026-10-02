import { useState } from "react";
import GameRound from "../components/GameRound.jsx";
import GameResults from "../components/GameResults.jsx";
import GameSetupPanel from "../components/GameSetupPanel.jsx";
import useRandomWords from "../hooks/useRandomWords.js";
import { selectRandomGenshinCharacters } from "../services/genshinCharacters.js";

export default function ImposterGame() {
  const [playerCount, setPlayerCount] = useState(4);
  const [playerNames, setPlayerNames] = useState(Array(10).fill(""));
  const [words, setWords] = useState(["", ""]);
  const [wordSource, setWordSource] = useState("custom");
  const randomWords = useRandomWords();
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

  function changeWordSource(value) {
    setWordSource(value);
    setError("");
    randomWords.clearError();
  }

  function resetRound() {
    setRound(null);
    setScreen("setup");
    setRevealedIndex(null);
    setWords(["", ""]);
    setError("");
    randomWords.clearError();
  }

  function showResults() {
    setRevealedIndex(null);
    setScreen("results");
  }

  function revealCard(index) {
    setRevealedIndex(index);
  }

  function hideCard(index) {
    setRevealedIndex((currentIndex) =>
      currentIndex === index ? null : currentIndex,
    );
  }

  async function startRound(event) {
    event.preventDefault();
    if (randomWords.isLoading) return;
    setError("");

    let selectedWords = words;
    if (wordSource === "random") {
      selectedWords = await randomWords.loadWords();
    } else if (wordSource === "genshin") {
      try {
        selectedWords = selectRandomGenshinCharacters();
      } catch (selectionError) {
        setError(selectionError.message);
        return;
      }
    }
    if (!selectedWords) return;

    const [groupWord, imposterWord] = selectedWords.map((word) => word.trim());
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
          onRevealCard={revealCard}
          onHideCard={hideCard}
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
          wordSource={wordSource}
          isLoading={randomWords.isLoading}
          error={error || randomWords.error}
          onWordSourceChange={changeWordSource}
          onCountChange={setPlayerCount}
          onNameChange={changePlayerName}
          onWordChange={changeWord}
          onStartRound={startRound}
        />
      )}
    </>
  );
}
