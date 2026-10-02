const RANDOM_WORDS_URL =
  "https://random-word-api.herokuapp.com/word?number=3&diff=1";
const REQUEST_TIMEOUT_MS = 10000;

export async function fetchRandomWords({ signal } = {}) {
  const requestSignal = AbortSignal.any(
    [signal, AbortSignal.timeout(REQUEST_TIMEOUT_MS)].filter(Boolean),
  );

  const response = await fetch(RANDOM_WORDS_URL, {
    signal: requestSignal,
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Random word request failed (${response.status}).`);
  }

  const data = await response.json();
  if (!Array.isArray(data) || data.some((word) => typeof word !== "string")) {
    throw new Error("The word service returned an invalid response.");
  }

  const distinctWords = [];
  const seenWords = new Set();
  for (const value of data) {
    const word = value.trim();
    const normalizedWord = word.toLowerCase();
    if (!word || seenWords.has(normalizedWord)) continue;
    seenWords.add(normalizedWord);
    distinctWords.push(word);
  }

  if (distinctWords.length < 2) {
    throw new Error("The word service did not return two different words.");
  }

  return distinctWords.slice(0, 2);
}
