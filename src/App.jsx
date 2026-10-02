import { useState } from "react";
import GameLayout from "./components/GameLayout.jsx";
import ImposterGame from "./tools/ImposterGame.jsx";
import RandomNumberGenerator from "./tools/RandomNumberGenerator.jsx";
import "./App.css";

export default function App() {
  const [selectedGame, setSelectedGame] = useState("imposter");

  // Preserve multiline JSX elements when running Prettier.
  // prettier-ignore
  return (
    <GameLayout selectedGame={selectedGame} onGameChange={setSelectedGame}>
      <div hidden={selectedGame !== "imposter"}>
        <ImposterGame />
      </div>
      <div hidden={selectedGame !== "random-number"}>
        <RandomNumberGenerator />
      </div>
    </GameLayout>
  );
}
