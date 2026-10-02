import { GENSHIN_CHARACTER_LIST } from "../data/genshinCharacters.js";

export function selectRandomGenshinCharacters(
  characterList = GENSHIN_CHARACTER_LIST,
) {
  const characters = [];
  const seenNames = new Set();

  for (const line of characterList.split(/\r?\n/)) {
    const name = line.trim();
    const normalizedName = name.toLowerCase();
    if (!name || seenNames.has(normalizedName)) continue;
    seenNames.add(normalizedName);
    characters.push(name);
  }

  if (characters.length < 2) {
    throw new Error(
      "The Genshin character list needs at least two different names before you can deal.",
    );
  }

  const groupIndex = Math.floor(Math.random() * characters.length);
  const [groupCharacter] = characters.splice(groupIndex, 1);
  const imposterIndex = Math.floor(Math.random() * characters.length);

  return [groupCharacter, characters[imposterIndex]];
}
