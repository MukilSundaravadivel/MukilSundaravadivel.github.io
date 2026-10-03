export const MAX_PLAYERS = 20;

export function getMaximumImposters(playerCount) {
  return Math.max(1, playerCount - 1);
}

export function createImposterRound({
  playerCount,
  imposterCount,
  playerNames,
  groupWord,
  imposterWord,
}) {
  if (
    !Number.isInteger(playerCount) ||
    playerCount < 1 ||
    playerCount > MAX_PLAYERS
  ) {
    throw new Error(`Choose between 1 and ${MAX_PLAYERS} players.`);
  }
  if (
    !Number.isInteger(imposterCount) ||
    imposterCount < 1 ||
    imposterCount > getMaximumImposters(playerCount)
  ) {
    throw new Error("Choose a valid imposter count for this group.");
  }

  const playerIndices = Array.from(
    { length: playerCount },
    (_, index) => index,
  );
  for (let index = playerIndices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [playerIndices[index], playerIndices[swapIndex]] = [
      playerIndices[swapIndex],
      playerIndices[index],
    ];
  }
  const imposterIndices = new Set(playerIndices.slice(0, imposterCount));
  const cards = Array.from({ length: playerCount }, (_, index) => ({
    name: playerNames[index].trim() || `Player ${index + 1}`,
    word: imposterIndices.has(index) ? imposterWord : groupWord,
  }));
  const imposterNames = cards
    .filter((card, index) => imposterIndices.has(index))
    .map((card) => card.name);
  const startingPlayerIndex = Math.floor(Math.random() * cards.length);

  return {
    cards,
    startingPlayer: cards[startingPlayerIndex].name,
    imposterNames,
    groupWord,
    imposterWord,
  };
}
